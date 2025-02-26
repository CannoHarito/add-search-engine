import { css, Style } from "@hono/hono/css";
import { html } from "@hono/hono/html";
import type { Child } from "@hono/hono/jsx";

interface SiteData {
  head?: Child;
  children?: Child;
}

const globalClass = css`
  * {
    box-sizing: border-box;
  }
  :root {
    color-scheme: light dark;
    color: light-dark(#212529, #adb5bd);
    background-color: light-dark(#efedea, #212529);
    font: 1em/1.6 "BIZ UDPGothic", sans-serif;
  }
  body {
    max-width: 60em;
    padding: 1em;
    margin: auto;
    min-height: 90vh;
  }
`;

const Layout = (props: SiteData) =>
  html`<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Add Search Engine</title>
<meta name="description" content="Desktop用Firefoxに検索エンジンを追加するのを、お手伝いします" />
<meta property="og:image" content="https://i.gyazo.com/eb63fdc310a90abf24031768cdfa7718.png" />
${<Style>{globalClass}</Style>}
${props.head}

${props.children}
`;

export default Layout;
