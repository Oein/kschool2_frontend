/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import NoSSR from "react-no-ssr";
import Leaderboard, { Rank } from "../components/Leaderboard";
import tier from "../functions/getTierString";

import classNames from "classnames";

import style from "./../styles/pop.module.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import Link from "next/link";
import SnowFlakes from "../components/snowFlake";
import DarkMode from "../components/darkMode";
import getSession from "../functions/getSeason";

const PERSONALCOUNT_LOCALSTORAGE_KEY = "myPop";
const POP_SERVER =
  "https://port-0-kschool2-backend-20z52flc2w05e1.gksl2.cloudtype.app";
const LEADERBOARD_SERVER =
  "https://port-0-kschool2-leaderboard-20z52flc2w05e1.gksl2.cloudtype.app";
const MAX_POP_LIMIT = 200;

function getPopImage(i: number) {
  if (i == 0)
    return {
      backgroundImage: `url(/punch0${getSession()}.png)`,
    };
  return {
    backgroundImage: `url(/punch1${getSession()}.png)`,
  };
}

const showRank = (rank: number) => {
  if (rank == 1) return "🥇";
  if (rank == 2) return "🥈";
  if (rank == 3) return "🥉";
  return rank;
};

export default function Pop() {
  const router = useRouter();

  let [schoolCount, setSchoolCount] = useState("-");
  let [schoolRank, setSchoolRank] = useState("-");
  let [schoolName, setSchoolName] = useState("-");
  let [globalCount, setGlobalCount] = useState("-");
  let [personalCnt, setPersonalCnt] = useState("-");
  let [leaderboardOpened, setLeaderboardOpened] = useState(false);
  let [leaderboard, setLeaderboard] = useState<Rank[]>([]);
  let [totalSchoolCount, setTotalSchoolCount] = useState(0);
  let [captchaAllowed, setCaptchaAllowed] = useState(false);
  let [popCount, setPopCount] = useState(0);
  let [easterClick, setEasterClick] = useState(0);

  const getPersonalCnt = () => {
    return parseInt(
      localStorage.getItem(PERSONALCOUNT_LOCALSTORAGE_KEY) || "0"
    );
  };
  const refreshLeader = () => {
    axios.get(`${LEADERBOARD_SERVER}/`).then((v) => {
      let str = v.data as string;
      let lb: Rank[] = [];
      str.split("/").forEach((v, i) => {
        let ox = v.split(".");
        lb.push({
          pops: ox[1],
          schoolName: ox[0],
          schoolRank: (i + 1).toString(),
        });
      });
      setLeaderboard(lb);
    });
    axios.get(`${LEADERBOARD_SERVER}/cnt`).then((v) => {
      setTotalSchoolCount(parseInt(v.data));
    });
  };
  const onCaptchaVerify = (v: any) => {
    setTimeout(() => {
      setCaptchaAllowed((prev) => true);
      axios.get(`${POP_SERVER}/register?token=${v}`).then((v) => {
        if (v.data.error) {
          setCaptchaAllowed((prev) => false);
        } else {
          window.token = v.data as string;
          axios
            .get(
              `${POP_SERVER}/first?schoolCode=${localStorage.getItem(
                "schoolCode"
              )}`
            )
            .then((v) => {
              let x = v.data as string;
              let y = x.split("/");
              setSchoolCount(y[2]);
              setSchoolRank(y[1]);
              setGlobalCount(y[0]);
            });
          setTimeout(() => {
            setCaptchaAllowed((prev) => false);
          }, 1000 * 60 * 29.5);
        }
      });
    }, 500);
  };
  const getCount = () => {
    return popCount;
  };
  const getCaptchaAllowed = () => {
    return captchaAllowed;
  };
  const sendPop = () => {
    setCaptchaAllowed((prev) => {
      setPopCount((prevC) => {
        if (prev && prevC > 0)
          axios
            .post(
              `${POP_SERVER}/pop?schoolCode=${localStorage.getItem(
                "schoolCode"
              )}&count=${Math.min(prevC, MAX_POP_LIMIT)}&token=${window.token}`
            )
            .then((v) => {
              let x = v.data as string;
              let y = x.split("/");
              window.token = y[3];
              setGlobalCount(y[0]);
              setSchoolCount(y[2]);
              setSchoolRank(y[1]);
            });
        return 0;
      });
      return prev;
    });
  };
  useEffect(() => {
    setInterval(sendPop, 20 * 1000);
  }, []);
  useEffect(() => {
    setInterval(() => {}, 10 * 1000);
  }, []);
  useEffect(() => {
    const usingMacro = () => {
      window.localStorage.setItem("macro", "1");
      router.push("/usingMacro");
      let x = parseInt(localStorage.getItem("macroed") || "0") + 1;
      localStorage.setItem("macroed", x.toString());
    };
    const animate = () => {
      let el = document.getElementById("text.cnt") as HTMLDivElement;
      el.style.animationName = "tr";
      setTimeout(() => {
        el.style.animationName = "";
      }, 100);
      document.documentElement.style.setProperty(
        "--rand",
        Math.floor(Math.random() * 5).toString()
      );
    };
    const pop = () => {
      localStorage.setItem(
        PERSONALCOUNT_LOCALSTORAGE_KEY,
        (getPersonalCnt() + 1).toString()
      );
      setPersonalCnt(getPersonalCnt().toString());
      animate();
      setPopCount((prev) => prev + 1);
    };

    setSchoolName(localStorage.getItem("schoolName") || "-");

    if (navigator.webdriver) {
      usingMacro();
      return;
    }

    if (
      window.localStorage.getItem("schoolName") == null ||
      window.localStorage.getItem("schoolCode") == null
    )
      router.push("/findSchool");

    setPersonalCnt(getPersonalCnt().toString());

    if (getCaptchaAllowed()) {
      document.onkeydown = (e) => {
        if (!e.repeat && e.isTrusted) {
          pop();
        }
        if (!e.isTrusted) usingMacro();
      };
      document.onpointerdown = (e) => {
        if (e.isTrusted && e.clientX && e.clientY) {
          pop();
        } else usingMacro();
      };
    }
  }, [captchaAllowed, personalCnt, router, setPersonalCnt]);

  if (getCaptchaAllowed())
    return (
      <NoSSR>
        <SnowFlakes />
        {leaderboardOpened ? (
          <Leaderboard
            onClose={() => {
              setLeaderboardOpened(false);
            }}
            totalSchoolCount={totalSchoolCount}
            leaderboard={leaderboard}
          />
        ) : null}
        <img
          src={`/punch0${getSession()}.png`}
          alt=""
          style={{
            display: "none",
          }}
        />
        <img
          src={`/punch1${getSession()}.png`}
          alt=""
          style={{
            display: "none",
          }}
        />
        <div className={style.pop}>
          <div className={classNames([style.mainBtn, style.btnSize])}>
            <Link href="https://twitter.com/_awesome_dream">🌐</Link>
          </div>
          <div className={classNames([style.searchSchoolBtn, style.btnSize])}>
            <Link href="/findSchool">🔍</Link>
          </div>
          <div className={style.title}>
            <h1
              onClick={() => {
                setEasterClick(easterClick + 1);
              }}
            >
              {easterClick > 1000 ? "LOOHCS-K" : "K-SCHOOL"}
            </h1>
            <img className={style.jo} src="/jo.png" draggable="false" alt="" />
            <DarkMode />
          </div>

          <div className={style.school}>
            <div className={style.schoolData}>
              <div className={classNames([style.fontSize, style.schoolRank])}>
                {showRank(parseInt(schoolRank))}
              </div>
              <div className={classNames([style.fontSize, style.schoolName])}>
                {schoolName}
              </div>
              <span
                className={classNames([
                  style.schoolTier,
                  style.tierIcon,
                  tier(schoolCount),
                ])}
              ></span>
              <div className={classNames([style.fontSize, style.schoolCount])}>
                {schoolCount}
              </div>
            </div>
          </div>

          <div className={style.count} id="text.cnt">
            {personalCnt}
          </div>
          <div
            className={classNames([style.popImage])}
            style={getPopImage(popCount % 2)}
          ></div>
          <div
            className={style.leaderboardContx}
            onClick={() => {
              setLeaderboardOpened(true);
              refreshLeader();
            }}
          >
            <div className={style.leaderboardInfo}>
              <div className={classNames(style.totalCount, style.fontSize)}>
                🌎 {globalCount}
              </div>
              <div
                className={classNames(style.showLeaderboard, style.fontSize)}
              >
                &ensp;🏆
              </div>
            </div>
          </div>
          <div
            style={{
              display: "none",
            }}
          >
            {getCount()}
            {getCaptchaAllowed() ? "a" : "b"}
          </div>
        </div>
        <style>{`* {color: var(--color);}}`}</style>
      </NoSSR>
    );

  return (
    <>
      <div className={style.title}>
        <h1>K-SCHOOL</h1>
        <img className={style.jo} src="/jo.png" draggable="false" alt="" />
        <DarkMode />
      </div>

      <div className={style.captchaContainer}>
        <div className={style.containerHeader}>캡챠 인증</div>
        <div className={classNames([style.fontSize, style.capconBody])}>
          매크로로 인해 서버에 많은 부담이 가해지고 있습니다. 매크로 방지를 위해
          캡챠 인증을 진행해 주세요.
        </div>
        <div className={style.capcon}>
          <HCaptcha
            sitekey="7b343af6-9f17-4e45-b715-3022da43b6c9"
            onVerify={onCaptchaVerify}
          />
        </div>
      </div>

      <div
        style={{
          display: "none",
        }}
      >
        {getCount()}
        {getCaptchaAllowed() ? "a" : "b"}
      </div>
      <style>{`* {color: var(--color);}`}</style>
    </>
  );
}
