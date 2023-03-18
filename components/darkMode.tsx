import { useEffect, useState } from "react";

import style from "../styles/darkmode.module.css";

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
    <span
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
      style={{
        background: "rgba(0,0,0,0.5)",
        padding: "7px",
        borderRadius: "8px",
      }}
    >
      {darkmode ? "🌙" : "☀️"}
    </span>
  );
}
