export default function UsingMacro() {
  if (typeof window !== "undefined") {
    let x = document.getElementsByClassName(
      "alert-container"
    )[0] as HTMLDivElement;

    if (x) x.remove();
  }
  return (
    <>
      <div className="macro-container">
        <div className="macro">
          <span className="title">⚠️ 해외 접속 발각</span>
          <div className="contents">
            서버에 부담을 줄이기 위해, 상관이 없다고 생각하는 해외🇺🇸 접속을 막고
            있습니다. VPN을 사용하고 계시다면 VPN을 잠시 중지해 주세요.
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
