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
