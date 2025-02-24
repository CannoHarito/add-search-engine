import { html } from "@hono/hono/html";

const searchTerms = /%(25)?[sS]/g;
const osdxSearchTerms = "{searchTerms}";
interface osdxParams {
  shortName: string;
  description: string;
  searchURL: string;
  suggestionURL?: string;
  imageURL: string;
}
export function getParams(
  query: Record<string, string>,
):
  | { ok: false; error: string }
  | { ok: true } & osdxParams {
  const searchURL = query.url?.replaceAll(searchTerms, osdxSearchTerms);
  if (!searchURL?.includes(osdxSearchTerms)) {
    return {
      ok: false,
      error: `"%s"か"${osdxSearchTerms}"を含むurlが必要`,
    };
  }
  const hostname = query.hostname || new URL(searchURL).hostname;
  const description = query.description || `Search on ${hostname}`;
  const shortName = query.name || hostname;
  const imageURL = query.icon ||
    `https://www.google.com/s2/favicons?domain=${hostname}`;
  const suggestionURL = query.googlesuggest
    ? "https://www.google.com/complete/search?client=chrome&q=" +
      osdxSearchTerms
    : query.suggest?.replaceAll(searchTerms, osdxSearchTerms);
  return {
    ok: true,
    ...{ shortName, description, searchURL, imageURL },
    ...(suggestionURL?.includes(osdxSearchTerms) ? { suggestionURL } : {}),
  };
}
export function openSearchDescription(params: osdxParams) {
  const suggest = params.suggestionURL
    ? html`
  <Url type="application/x-suggestions+json" template="${params.suggestionURL}"/>`
    : "";
  return (html`<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${params.shortName}</ShortName>
  <Description>${params.description}</Description>
  <Url type="text/html" method="get" template="${params.searchURL}"/>${suggest}
  <Image width="16" height="16">${params.imageURL}</Image>
  <InputEncoding>UTF-8</InputEncoding>
</OpenSearchDescription>
`).toString();
}
