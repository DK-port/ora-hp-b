// GET /api/pokepara — ポケパラの埋め込み用ページ（女の子一覧・ブログ）を読み、JSON で返す。
// Cloudflare Pages Functions として動く（next build の out/ とは別に、リポジトリ直下の functions/ を Cloudflare が拾う）。
// CAST ページとトップ（components/PokeparaCast.tsx）がこれを読んで、HP のデザインで並べる。
import { pokeparaUrls, parseBlog, parseGalList, type PokeparaData } from "../../lib/pokepara";
import { cachedJson, fetchText, type FunctionContext } from "../../lib/pokepara-cache";
import { POKEPARA } from "../../lib/site";

export function onRequestGet(context: FunctionContext) {
  return cachedJson(context, "/api/pokepara", async () => {
    const urls = pokeparaUrls(POKEPARA.sid);
    const [list, blog] = await Promise.all([fetchText(urls.list), fetchText(urls.blog)]);
    const data: PokeparaData = { fetchedAt: new Date().toISOString(), casts: parseGalList(list), blogs: parseBlog(blog) };
    // 在籍が0人になることは無いので、0人なら読み方が合っていない（ポケパラの作りが変わった）とみなす
    if (data.casts.length === 0) throw new Error("ポケパラの女の子一覧を読めませんでした");
    return data;
  });
}
