// GET /api/pokepara-news — ポケパラの「お店からのニュース」（ピックアップニュース）を読み、JSON で返す。
// NEWS ページ（components/NewsList.tsx）が、HP で書いた記事と日付順に混ぜて出す。
import { parseNews, type PokeparaNews } from "../../lib/pokepara";
import { cachedJson, fetchText, type FunctionContext } from "../../lib/pokepara-cache";
import { POKEPARA } from "../../lib/site";

export function onRequestGet(context: FunctionContext) {
  return cachedJson(context, "/api/pokepara-news", async () => {
    // ニュースが1件も無いこともあるので、0件でも失敗にはしない
    const news: PokeparaNews[] = parseNews(await fetchText(`${POKEPARA.shopUrl}pickupnews/`));
    return { fetchedAt: new Date().toISOString(), news };
  });
}
