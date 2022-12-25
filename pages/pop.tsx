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

const PERSONALCOUNT_LOCALSTORAGE_KEY = "myPop";
const POP_SERVER =
  "https://port-0-kschool2-backend-20z52flc2w05e1.gksl2.cloudtype.app";
const LEADERBOARD_SERVER =
  "https://port-0-kschool2-leaderboard-20z52flc2w05e1.gksl2.cloudtype.app";
const MAX_POP_LIMIT = 200;

function getPopImage(i: number) {
  if (i == 0) return style.popImage0;
  else return style.popImage1;
}

export default function Pop() {
  const router = useRouter();

  let [schoolCount, setSchoolCount] = useState("-");
  let [schoolRank, setSchoolRank] = useState("-");
  let [schoolName, setSchoolName] = useState("-");
  let [globalCount, setGlobalCount] = useState("-");
  let [personalCnt, setPersonalCnt] = useState("-");
  let [imageIDX, setImageIDX] = useState(0);
  let [leaderboardOpened, setLeaderboardOpened] = useState(false);
  let [leaderboard, setLeaderboard] = useState<Rank[]>([]);
  let [totalSchoolCount, setTotalSchoolCount] = useState(0);
  let [captchaAllowed, setCaptchaAllowed] = useState(false);

  const getPersonalCnt = () => {
    return parseInt(
      localStorage.getItem(PERSONALCOUNT_LOCALSTORAGE_KEY) || "0"
    );
  };
  const refreshLeader = () => {
    axios.get(`${LEADERBOARD_SERVER}/`).then((v) => {
      setLeaderboard(v.data);
    });
    axios.get(`${LEADERBOARD_SERVER}/cnt`).then((v) => {
      setTotalSchoolCount(parseInt(v.data.cnt));
    });
  };
  const onCaptchaVerify = (v: any) => {
    setTimeout(() => {
      setCaptchaAllowed(true);
      window.captchaAllowed = true;
      axios.get(`${POP_SERVER}/register?token=${v}`).then((v) => {
        if (v.data.error) {
          setCaptchaAllowed(false);
          window.captchaAllowed = false;
        } else {
          window.token = v.data.token;
          setTimeout(() => {
            // regenerate hCaptcha
            setCaptchaAllowed(false);
            window.captchaAllowed = false;
          }, 1000 * 60 * 29.5);
        }
      });
    }, 500);
  };
  const sendPop = () => {
    if (window.captchaAllowed && window.popCount > 0)
      axios
        .post(
          `${POP_SERVER}/pop?schoolCode=${localStorage.getItem(
            "schoolCode"
          )}&count=${Math.min(window.popCount, MAX_POP_LIMIT)}&token=${
            window.token
          }`
        )
        .then((v) => {
          window.popCount = 0;
          window.token = v.data.token;
          setGlobalCount(v.data.total);
          setSchoolCount(v.data.schoolPop);
          setSchoolRank(v.data.rank);
        });
    else window.popCount = 0;
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      window.popCount = 0;
    }

    // 20초 마다 sendPop
    setInterval(sendPop, 20 * 1000);
  }, []);
  useEffect(() => {
    const usingMacro = () => {
      window.localStorage.setItem("macro", "1");
      router.push("/usingMacro");
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
      setImageIDX((imageIDX + 1) % 2);
      setPersonalCnt(getPersonalCnt().toString());
      animate();
      window.popCount++;
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

    if (captchaAllowed) {
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
  }, [captchaAllowed, imageIDX, personalCnt, router, setPersonalCnt]);

  if (captchaAllowed)
    return (
      <NoSSR>
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
          src="/Sgif1@.png"
          alt=""
          style={{
            display: "none",
          }}
        />
        <img
          src="/Sgif2@.png"
          alt=""
          style={{
            display: "none",
          }}
        />
        <div className={style.pop}>
          <div className={classNames([style.mainBtn, style.btnSize])}>🌐</div>
          <div className={classNames([style.searchSchoolBtn, style.btnSize])}>
            🔍
          </div>
          <div className={style.title}>
            <h1>K-SCHOOL</h1>
            <img className={style.jo} src="/jo.png" draggable="false" alt="" />
          </div>

          <div className={style.school}>
            <div className={style.schoolData}>
              <div className={classNames([style.fontSize, style.schoolRank])}>
                {schoolRank}
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
            className={classNames([style.popImage, getPopImage(imageIDX)])}
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
        </div>
      </NoSSR>
    );

  return (
    <>
      <div className={style.title}>
        <h1>K-SCHOOL</h1>
        <img className={style.jo} src="/jo.png" draggable="false" alt="" />
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
    </>
  );
}
