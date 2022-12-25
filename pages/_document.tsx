/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="K학교전!" />
        <meta property="og:image" content="./Sgif1@.png" />
        <meta property="og:title" content="K학교전!" />
        <meta
          property="og:description"
          content="국내 초중고 학교에서 단합력이 가장 좋은 학교는 어디일까요? 친구들과 같이 자신의 학교를 검색해서 클릭하시죠!"
        />

        <title>K학교전!</title>

        <link rel="icon" type="image/png" href="/Sgif1@.png" />

        <script src="/ban.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
