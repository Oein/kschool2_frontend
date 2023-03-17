// css
import "../styles/globals.css";
import "../styles/alert.css";
import "react-toastify/dist/ReactToastify.css";

// type
import type { AppProps } from "next/app";

// use
import { useEffect, useState } from "react";

// alert component
import Alert from "../components/Alert";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  var [alertOpen, setAlertOpen] = useState(true);

  useEffect(() => {
    if (typeof location !== "undefined")
      axios.get("https://api.ip.pe.kr/json/").then((v) => {
        if (v.data.country_code !== "KR" && location.pathname != "/notKR")
          location.href == "/notKR";
      });

    if (typeof navigator !== "undefined")
      if (navigator.userAgent.includes("KAKAO"))
        if (location.pathname != "/disableKakao")
          location.href == "/disableKakao";
  }, []);

  console.log(
    "%c%s",
    [
      "font-size: 20px;",
      'font-family: font-family: "ONE-Mobile-POP";',
      "background: rgb(27,34,38);",
      "color: rgb(190,190,190);",
    ].join(""),
    `
  ********************************************************************  
                                                                        
   K   KK             SSSSS     CCCC   H   H   OOOOO    OOOOO   L       
   K KK              SS        CC  CC  H   H  OO   OO  OO   OO  L       
   KK       -----     SSSSS    C       HHHHH  O     O  O     O  L       
   K KK                   SS   CC  CC  H   H  OO   OO  OO   OO  L       
   K   KK             SSSSS     CCCC   H   H   OOOOO    OOOOO   LLLLL   
                                                                        
             CCCCC    L      IIIII   CCCCC   K   KK                     
            CC   CC   L        I    CC   CC  K KK                       
            C         L        I    C        KK                         
            CC   CC   L        I    CC   CC  K KK                       
             CCCCC    LLLLL  IIIII   CCCCC   K   KK            v2.0.0   
                                                                        
  ********************************************************************  
                                                                        
     Developers      (@Github)            Special Thanks to             
      - AwesomeDream (@awesomeSwam)        - JoCoding (https://www.youtube.com/@jocoding)
      - SungHyun     (@Oein)               -                            
      - sdnight5     (@sdnight5)           -                            
      - sangho129    (@sangho129)          -                            
                                                                        
  ********************************************************************  
`
  );

  return (
    <>
      {alertOpen ? (
        <Alert
          title="이벤트 알림"
          onClose={() => {
            setAlertOpen(false);
          }}
        >
          학교 간식차 이벤트 실제로 진행하겠습니다.
          <br />
          협의가 성공한 학교에 전교생을 워한 간식차를 보내드리겠습니다.
          <br />
          <br />
          간식차비는{" "}
          <a className="link fontSize" href="https://www.youtube.com/@jocoding">
            조코딩
          </a>
          님께서 지원해주신다고 하셨습니다.
          <br />
          루머를 현실로 만들어주신{" "}
          <a className="link fontSize" href="https://www.youtube.com/@jocoding">
            조코딩
          </a>
          님께 진심으로 감사드립니다.
          <br />
          자세한 내용은 밑에 있는 링크들을 확인해주세요.
          <br />
          <a className="link fontSize" href="https://youtu.be/yBW1HdjRGww">
            유튜브 영상 바로가기
          </a>
          <br />
          <a
            className="link fontSize"
            href="https://twitter.com/_awesome_dream/status/1605161640931909632"
          >
            트위터 공지 바로가기
          </a>
          <br />
          <br />
          개발자 일동 : 서버 버그는 열심히 고치고 있습니다!
        </Alert>
      ) : null}

      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
