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
          <Jo />
        </Alert>
      ) : null}

      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
