// css
import "../styles/globals.css";
import "../styles/alert.css";

// type
import type { AppProps } from "next/app";

// use
import { useEffect, useState } from "react";

// alert component
import Alert from "../components/Alert";
import Jo from "../components/eventAlert/jocoding";

export default function App({ Component, pageProps }: AppProps) {
  let [alertOpen, setAlertOpen] = useState(true);

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

  console.log(
    "%c%s",
    ["font-size: xx-large;", "color: red;"].join(""),
    "안녕하세요. 매크로 쓰지 말라니까 왜 여기왔니 이 이쁜 친구야. 좋은말 할때 끄즈라"
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
    </>
  );
}
