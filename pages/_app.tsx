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
import Jo from "../components/eventAlert/jocoding";
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

  if (typeof location !== "undefined")
    console.log(
      `축하드립니다! 콘솔에 들어오셨네요. 콘솔이 뚫렸으니 👉( ${location.protocol}//${location.host}/reportBugs )👈를 눌러 버그를 제보합시다! 위에 링크에 뚫은 방법을 담은 영상과 계좌 번호를 업로드 하시면 어썸링님의 사비로 소정의 money가 지급됩니다.`
    );

  if (typeof localStorage !== "undefined") {
    if (
      parseInt(localStorage.getItem("macroed") || "0") == 5 &&
      location.pathname !== "/reportBugs"
    )
      location.href = "/reportBugs";
    localStorage.setItem("macroed", "6");
  }

  return (
    <>
      {alertOpen ? (
        <Alert
          title="이벤트 알림"
          onClose={() => {
            setAlertOpen(false);
          }}
        >
          <Jo />
        </Alert>
      ) : null}

      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
