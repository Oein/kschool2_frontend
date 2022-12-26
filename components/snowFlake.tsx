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
    snowFlake.className = "snowflake";
    snowFlake.style.left = `${Math.random() * window.screen.width}px`;
    snowFlake.style.animationDelay = `${delay}s`;
    snowFlake.style.opacity = `${Math.random() / 2 + 0.5}`;
    snowFlake.style.animation = `fall ${fall}s linear`;
    document.getElementById("snowcont")?.appendChild(snowFlake);

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
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: white;
            position: absolute;
            top: -8px;
        }

        @keyframes fall {
            from {}
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
      `}</style>
    </div>
  );
}
