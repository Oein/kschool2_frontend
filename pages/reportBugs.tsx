import axios from "axios";
import errorHandle from "../functions/axiosErrorHandle";

var POP_SERVER = "[백엔드 주소]";

export default function UsingMacro() {
  if (typeof window !== "undefined") {
    var x = document.getElementsByClassName(
      "alert-container"
    )[0] as HTMLDivElement;

    if (x) x.remove();
  }

  axios
    .post(`${POP_SERVER}/bansure`)
    .then((v) => {
      console.log("친구야 정말정말 진심으로 축하해!");
    })
    .catch(errorHandle);

  return (
    <>
      <div className="macro-container">
        <div className="macro">
          <span className="title">
            🎉축하합니다!! 1일 타임아웃 당하였습니다!!🎉
          </span>
          <div className="contents">
            재미로 콘솔을 열어봤든 매크로를 사용하려고 열어봤든 일단 10일
            타임아웃이에요! 축하합니다! -SDnight5
          </div>

          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: "5px",
              marginTop: "5px",
            }}
          >
            ⛔ 콘솔 이용시 10일 밴입니다. 밴 해지 요청은{" "}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">👉여기👈</a>
            에서 해주세요
          </div>
        </div>
      </div>

      <style>{`
        .macro-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 16px;
          border: 1px solid #ccc;
          padding: 30px;
        }

        .title {
          font-size: 20px;
        }

        .contents {
          padding-top: 10px;
          font-size: 17px;
        }
      `}</style>
    </>
  );
}
