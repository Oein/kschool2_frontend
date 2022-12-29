import style from "../styles/snow.module.css";

var MAX_SNOW_FLAKES = 100;

export default function SnowFlakes() {
  var makeSnowFlake = () => {
    if (
      document.getElementById("snowcont")!.childElementCount > MAX_SNOW_FLAKES
    )
      return;
    var snowFlake = document.createElement("div");
    var delay = Math.random() * 10;
    var fall = Math.random() * 10 + 10;
    var randomX = Math.random() * window.screen.width;
    var randomW = Math.floor(Math.random() * 8);
    snowFlake.className = "snowflake";
    snowFlake.style.left = `${randomX}px`;
    snowFlake.style.opacity = `${Math.random() / 2 + 0.5}`;
    snowFlake.style.transition = `all ${fall}s linear`;
    snowFlake.style.width = `${randomW}px`;
    snowFlake.style.height = `${randomW}px`;
    snowFlake.style.transform = "translateY(0vh)";
    document.getElementById("snowcont")?.appendChild(snowFlake);
    setTimeout(() => {
      snowFlake.style.opacity = "0";
      snowFlake.style.transform = "translateY(100vh)";
      snowFlake.style.left = `${
        randomX +
        Math.floor(
          (Math.random() * window.screen.width) / 4 - window.screen.width / 8
        )
      }px`;
    }, 100);

    setTimeout(() => {
      document.getElementById("snowcont")!.removeChild(snowFlake);
      if (
        document.getElementById("snowcont")?.childElementCount ||
        0 <= MAX_SNOW_FLAKES
      )
        makeSnowFlake();
    }, (delay + fall) * 1000 + 1000);
  };

  var makeSnowFlakes = () => {
    for (var i = 0; i < MAX_SNOW_FLAKES; i++) {
      setTimeout(makeSnowFlake, Math.random() * 15000);
    }
  };

  if (typeof window !== "undefined" && typeof document !== "undefined")
    makeSnowFlakes();

  return (
    <div
      style={{
        opacity: "var(--winter)",
        transition: "all .2s",
      }}
    >
      <div className={style.glass}></div>
      <div className={style.container} id="snowcont"></div>

      <style>{`
        .snowflake {
            border-radius: 50%;
            background-color: white;
            position: absolute;
            top: -8px;
        }
      `}</style>
    </div>
  );
}
