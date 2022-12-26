import axios from "axios";
import errorHandle from "../functions/axiosErrorHandle";

var POP_SERVER =
  "https://port-0-kschool2-backend-20z52flc2w05e1.gksl2.cloudtype.app";

export default function UsingMacro() {
  if (typeof window !== "undefined") {
    var x = document.getElementsByClassName(
      "alert-container"
    )[0] as HTMLDivElement;

    if (x) x.remove();
  }

  axios
    .get(`${POP_SERVER}/banme`)
    .then((v) => {
      console.log("친구야 정말정말 진심으로 축하해!"); // ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
    })
    .catch((err) => errorHandle);

  return (
    <>
      <div className="macro-container">
        <div className="macro">
          <span className="title">
            🎉축하합니다!! 1일 타임아웃 당하였습니다!!🎉
          </span>
          <div className="contents">
            재미로 콘솔을 열어봤든 매크로를 사용하려고 열어봤든 일단 1일
            타임아웃이에요! 축하합니다! -SDnight5
          </div>

          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: "5px",
              marginTop: "5px",
            }}
          >
            ⛔ 콘솔 이용시 1일 밴입니다. 밴 해지 요청은{" "}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">👉여기👈</a>
            에서 해주세요
            <div
              style={{
                fontSize: "1px",
                opacity: "0.01",
              }}
            >
              여기는 계좌를 쓸 공간이 없으니 어썸링님은 돈 안줘요
            </div>
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
