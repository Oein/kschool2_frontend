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

        <script src="/gan.js"></script>

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/pwa/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/pwa/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/pwa/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/pwa/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/pwa/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/pwa/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/pwa/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/pwa/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/pwa/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="/pwa/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/pwa/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/pwa/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/pwa/favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="K학교전" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content="/pwa/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/pwa/mstile-70x70.png"
        />
        <meta name="theme-color" content="#307EFA" />
        <meta
          name="msapplication-square150x150logo"
          content="/pwa/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/pwa/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/pwa/mstile-310x310.png"
        />
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
