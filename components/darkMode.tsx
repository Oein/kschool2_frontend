import { useEffect, useState } from "react";

import style from "../styles/darkmode.module.css";

import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkMode() {
  var [darkmode, setDarkMode] = useState(false);

  useEffect(() => {
    var dark = localStorage.getItem("dark");

    if (!dark) {
      localStorage.setItem("dark", "0");
    } else {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div
      className={style.darkmode}
      onClick={() => {
        setDarkMode((prev) => {
          if (prev) {
            document.body.classList.remove("dark");
            localStorage.setItem("dark", "0");
          } else {
            document.body.classList.add("dark");
            localStorage.setItem("dark", "1");
          }
          return !prev;
        });
      }}
    >
      <div
        className={style.icon}
        style={{
          transform: `translateY(${darkmode ? "-22px" : "0px"})`,
        }}
      >
        <FaSun size="22px" />
      </div>
      <div
        className={style.icon}
        style={{
          transform: `translateY(${darkmode ? "-25px" : "0px"})`,
        }}
      >
        <FaMoon size="22px" />
      </div>
    </div>
  );
}
