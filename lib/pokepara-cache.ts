// functions/api/pokepara*.ts で共通: ポケパラのページを読み、結果を Cloudflare のキャッシュに置いて JSON で返す。
// ポケパラへの読み込みは5分に1回まで。失敗はキャッシュせず 502 を返す（HP 側は「ポケパラで見る」などに切り替える）。

const CACHE_SECONDS = 300;

export type FunctionContext = { request: Request; waitUntil(promise: Promise<unknown>): void };

export async function fetchText(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": "ora-tokyo.com (+https://ora-tokyo.com/)" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function json(body: unknown, status: number, maxAge: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": `public, max-age=${maxAge}` },
  });
}

/** path（例 "/api/pokepara"）ごとにキャッシュする。load が投げたら 502 */
export async function cachedJson({ request, waitUntil }: FunctionContext, path: string, load: () => Promise<unknown>) {
  const cache = await caches.open("pokepara");
  const key = new Request(new URL(path, request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;
  try {
    const res = json(await load(), 200, CACHE_SECONDS);
    waitUntil(cache.put(key, res.clone()));
    return res;
  } catch (e) {
    return json({ error: String(e) }, 502, 0);
  }
}
