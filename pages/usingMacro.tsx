export default function UsingMacro() {
  if (typeof window !== "undefined") {
    var x = document.getElementsByClassName(
      "alert-container"
    )[0] as HTMLDivElement;

    if (x) x.remove();
  }
  return (
    <>
      <div className="macro-container">
        <div className="macro">
          <span className="title">⚠️ 매크로 사용 감지</span>
          <div className="contents">
            최근 서버에 부담을 주는 가장 큰 원인인 매크로 사용을 자제해주셨으면
            합니다.
          </div>

          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: "5px",
              marginTop: "5px",
            }}
          >
            ⛔ 매크로 이용시 1일 밴입니다. 밴 해지 요청은{" "}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">👉여기👈</a>
            에서 해주세요. 또한 5회 매크로 이용시 영구밴 이니 조심하세요.
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
