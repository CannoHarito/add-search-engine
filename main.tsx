import { Hono } from "@hono/hono";
import { raw } from "@hono/hono/html";
import { getParams, openSearchDescription } from "./openSearchDescription.ts";
import Layout from "./layout.tsx";
import Form from "./form.tsx";
import type { Child } from "@hono/hono/jsx";

const app = new Hono();

const favicon = "https://cdn.jsdelivr.net/npm/@twemoji/svg@latest/1f50d.svg";
app.get("/favicon.ico", (c) => c.redirect(favicon, 301));

app.get("/opensearch.xml", (c) => {
  const params = getParams(c.req.query());
  if (!params.ok) return c.text(params.error, 400);
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
      <h1>
        Add Search Engine <image src={favicon} style="height: 1em;" />
      </h1>
      <h5>
        Desktop用Firefoxに検索エンジンを追加するのを、お手伝いするWebページ。
      </h5>
      {/* TODO 設定されたosdxを確認のため表示する */}
      <Form {...(c.req.query())} />
    </Layout>,
  );
});

export default app;
