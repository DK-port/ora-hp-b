// GET /api/pokepara — ポケパラの埋め込み用ページ（女の子一覧・ブログ）を読み、JSON で返す。
// Cloudflare Pages Functions として動く（next build の out/ とは別に、リポジトリ直下の functions/ を Cloudflare が拾う）。
// CAST ページとトップ（components/PokeparaCast.tsx）がこれを読んで、HP のデザインで並べる。
// ポケパラへの読み込みは5分に1回まで（Cloudflare のキャッシュに置く）。
import { pokeparaUrls, parseBlog, parseGalList, type PokeparaData } from "../../lib/pokepara";
import { POKEPARA } from "../../lib/site";

const CACHE_SECONDS = 300;

type Context = { request: Request; waitUntil(promise: Promise<unknown>): void };

async function fetchText(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": "ora-tokyo.com (+https://ora-tokyo.com/cast)" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function json(body: unknown, status: number, maxAge: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": `public, max-age=${maxAge}` },
  });
}

export async function onRequestGet({ request, waitUntil }: Context) {
  const cache = await caches.open("pokepara");
  const key = new Request(new URL("/api/pokepara", request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;

  try {
    const urls = pokeparaUrls(POKEPARA.sid);
    const [list, blog] = await Promise.all([fetchText(urls.list), fetchText(urls.blog)]);
    const data: PokeparaData = { fetchedAt: new Date().toISOString(), casts: parseGalList(list), blogs: parseBlog(blog) };
    // 在籍が0人になることは無いので、0人なら読み方が合っていない（ポケパラの作りが変わった）とみなす
    if (data.casts.length === 0) throw new Error("ポケパラの女の子一覧を読めませんでした");
    const res = json(data, 200, CACHE_SECONDS);
    waitUntil(cache.put(key, res.clone()));
    return res;
  } catch (e) {
    // 失敗はキャッシュしない。HP 側は「ポケパラで見る」を出す
    return json({ error: String(e) }, 502, 0);
  }
}
