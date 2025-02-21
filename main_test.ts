import { assertEquals } from "@std/assert";
import server from "./main.tsx";

Deno.test(async function serverFetch() {
  const req = new Request("https://deno.land");
  const res = await server.fetch(req);
  // assertEquals(await res.text(), "Home page");
  assertEquals(
    res.headers.get("content-type"),
    "text/html; charset=UTF-8",
  );
});

Deno.test(async function serverFetchNotFound() {
  const req = new Request("https://deno.land/404");
  const res = await server.fetch(req);
  assertEquals(res.status, 404);
});

Deno.test(async function serverFetchIcon() {
  const req = new Request("https://deno.land/favicon.ico");
  const res = await server.fetch(req);
  assertEquals(res.status, 301);
});
