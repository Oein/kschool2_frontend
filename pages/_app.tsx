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

import axios from "axios";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  let [alertOpen, setAlertOpen] = useState(true);

  let router = useRouter();

  useEffect(() => {
    axios.get("http://ip-api.com/json").then((v) => {
      console.log(v.data);
      if (v.data.countryCode != "KR") {
        router.push("/notKR");
        return;
      }
    });
  }, [router]);

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
