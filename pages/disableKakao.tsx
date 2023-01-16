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
          <span className="title">⚠️ 카카오톡 접속 감지</span>
          <div className="contents">
            카카오톡으로 접속할 경우 버그가 발생되는 경우가 있습니다. Chrome
            브라우저를 이용해 주세요.
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
