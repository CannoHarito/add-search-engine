import { Hono } from "@hono/hono";
import { html, raw } from "@hono/hono/html";
import { getParams, openSearchDescription } from "./openSearchDescription.ts";
import type { Child } from "@hono/hono/jsx";

interface SiteData {
  head?: Child;
  children?: Child;
}
const Layout = (props: SiteData) =>
  html`<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Add Search Engine</title>
${props.head}

${props.children}
`;

const app = new Hono();

const favicon = "https://cdn.jsdelivr.net/npm/@twemoji/svg@latest/1f50d.svg";
app.get("/favicon.ico", (c) => c.redirect(favicon, 301));

app.get("/opensearch.xml", (c) => {
  const params = getParams(c.req.query());
  if (!params.ok) throw new Error(params.error);
  const osdx = openSearchDescription(params);
  c.header("Content-Type", "application/opensearchdescription+xml");
  // c.header("Content-Type", "application/xml");
  return c.body(osdx);
});

app.get("/", (c) => {
  const params = getParams(c.req.query());
  let head: Child = "";
  if (params.ok) {
    const osdxURL = "/opensearch.xml" + new URL(c.req.url).search;
    head = (
      <>
        <link rel="icon" href={params.imageURL} />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href={raw(osdxURL)}
          title={params.shortName}
        />
      </>
    );
  }

  return c.html(
    <Layout head={head}>
      {/* TODO 設定されたosdxを確認のため表示する */}
      <form method="get">
        {/* TODO フォーム入力内容を再描画する */}
        <label>
          Search URL
          <input
            type="url"
            name="url"
            placeholder="https://example.org/search?q=%s"
            required
          />
        </label>
        <p>検索キーワードに %s を入れて検索したURLを貼り付ける</p>
        <label>
          Name (Optional)
          <input type="text" name="name" placeholder="Example検索" />
        </label>
        <label>
          <input type="checkbox" name="googlesuggest" />
          Google Suggestionsを使用する
        </label>
        <label>
          Suggestions URL (Optional)
          <input
            type="text"
            name="suggest"
            placeholder="https://example.org/suggestions?q=%s"
          />
        </label>
        <button type="submit">追加用ページ生成</button>
      </form>
    </Layout>,
  );
});

export default app;
