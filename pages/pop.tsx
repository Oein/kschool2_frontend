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
import errorHandle from "../functions/axiosErrorHandle";

var PERSONALCOUNT_LOCALSTORAGE_KEY = "myPop";
var BACKEND =
  "https://port-0-kschool2-backend-20z52flc2w05e1.gksl2.cloudtype.app";
var MAX_POP_LIMIT = 200;

function getPopImage(i: number) {
  if (i == 0)
    return {
      backgroundImage: `url(/punch0${getSession()}.png)`,
    };
  return {
    backgroundImage: `url(/punch1${getSession()}.png)`,
  };
}

var showRank = (rank: number) => {
  if (rank == 1) return "🥇";
  if (rank == 2) return "🥈";
  if (rank == 3) return "🥉";
  return rank;
};

export default function Pop() {
  var router = useRouter();

  var [schoolCount, setSchoolCount] = useState("-");
  var [schoolRank, setSchoolRank] = useState("-");
  var [schoolName, setSchoolName] = useState("-");
  var [globalCount, setGlobalCount] = useState("-");
  var [personalCnt, setPersonalCnt] = useState("-");
  var [leaderboardOpened, setLeaderboardOpened] = useState(false);
  var [leaderboard, setLeaderboard] = useState<Rank[]>([]);
  var [totalSchoolCount, setTotalSchoolCount] = useState(0);
  var [captchaAllowed, setCaptchaAllowed] = useState(false);
  var [popCount, setPopCount] = useState(0);
  var [easterClick, setEasterClick] = useState(0);
  let [clickPerSecond, setClickPerSecond] = useState(0);

  var getPersonalCnt = () => {
    return parseInt(
      localStorage.getItem(PERSONALCOUNT_LOCALSTORAGE_KEY) || "0"
    );
  };
  var refreshLeader = () => {
    axios
      .get(`${BACKEND}/lead`)
      .then((v) => {
        var strg = v.data as string;
        var strx = strg.split("*");
        var str = strx[0] as string;
        var cnt = strx[1];
        var lb: Rank[] = [];
        str.split("/").forEach((v, i) => {
          var ox = v.split(".");
          lb.push({
            pops: ox[1],
            schoolName: ox[0],
            schoolRank: (i + 1).toString(),
          });
        });
        setLeaderboard(lb);
        setTotalSchoolCount(parseInt(cnt));
      })
      .catch((err) => errorHandle);
  };
  var onCaptchaVerify = (v: any) => {
    setTimeout(() => {
      setCaptchaAllowed((prev) => true);
      axios
        .get(`${BACKEND}/register?token=${v}`)
        .then((v) => {
          if (v.data.error) {
            setCaptchaAllowed((prev) => false);
          } else {
            window.token = v.data as string;
            axios
              .get(
                `${BACKEND}/first?schoolCode=${localStorage.getItem(
                  "schoolCode"
                )}`
              )
              .then((v) => {
                var x = v.data as string;
                var y = x.split("/");
                setSchoolCount(y[2]);
                setSchoolRank(y[1]);
                setGlobalCount(y[0]);
              });
            setTimeout(() => {
              setCaptchaAllowed((prev) => false);
            }, 1000 * 60 * 29.5);
          }
        })
        .catch((err) => errorHandle);
    }, 500);
  };
  var getCount = () => {
    return popCount;
  };
  var getCaptchaAllowed = () => {
    return captchaAllowed;
  };
  var sendPop = () => {
    setCaptchaAllowed((prev) => {
      setPopCount((prevC) => {
        if (prev && prevC > 0)
          axios
            .post(
              `${BACKEND}/pop?schoolCode=${localStorage.getItem(
                "schoolCode"
              )}&count=${Math.min(prevC, MAX_POP_LIMIT)}&token=${window.token}`
            )
            .then((v) => {
              var x = v.data as string;
              var y = x.split("/");
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
    var usingMacro = () => {
      window.localStorage.setItem("macro", "1");
      router.push("/usingMacro");
      var x = parseInt(localStorage.getItem("macroed") || "0") + 1;
      localStorage.setItem("macroed", x.toString());
    };
    var animate = () => {
      var el = document.getElementById("text.cnt") as HTMLDivElement;
      el.style.animationName = "tr";
      setTimeout(() => {
        el.style.animationName = "";
      }, 100);
      document.documentElement.style.setProperty(
        "--rand",
        Math.floor(Math.random() * 5).toString()
      );
    };
    var pop = () => {
      localStorage.setItem(
        PERSONALCOUNT_LOCALSTORAGE_KEY,
        (getPersonalCnt() + 1).toString()
      );
      setPersonalCnt(getPersonalCnt().toString());
      animate();
      setPopCount((prev) => prev + 1);
      setClickPerSecond((prev) => {
        setTimeout(() => {
          setClickPerSecond((prev) => {
            if (prev <= 1) return 0;
            return prev - 1;
          });
        }, 1000);
        if (prev / 2 + 1 > 200) {
          localStorage.setItem(
            "macroed",
            (parseInt(localStorage.getItem("macroed") || "0") + 1).toString()
          );
          router.push("/usingMacro");
        }
        return prev + 2;
      });
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
            className={classNames([style.count, style.cps])}
            style={{
              color:
                clickPerSecond / 2 < 70
                  ? "white"
                  : clickPerSecond / 2 < 90
                  ? "yellow"
                  : clickPerSecond / 2 < 120
                  ? "orange"
                  : "red",
              transform: `scale(${
                1 + Math.max(clickPerSecond / 2 - 150, 0) / 1.1
              })`,
              transition: "all .3s",
            }}
          >
            {clickPerSecond / 2} / sec
          </div>
          <div
            className={classNames([style.popImage])}
            style={getPopImage(popCount % 2)}
          ></div>
          <div className={style.ads}>
            <center>
              <iframe
                style={{
                  overflow: "hidden",
                  border: "none",
                  display: "block",
                }}
                width="724"
                scrolling="no"
                src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1124013%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL&mon_direct_url=URLENCODE_PASSBACK_INPUT"
              ></iframe>
            </center>
          </div>
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
