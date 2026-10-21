// ポケパラの埋め込み用ページ（女の子一覧・ブログ）を、HP のデザインで出すためのデータに読みかえる。
// functions/api/pokepara.ts（Cloudflare で動く）から使う。テストは node --test scripts/pokepara.test.mts
// ⚠️ ポケパラのページの作りが変わると読めなくなる。そのときはキャストが0人になり、HP は「ポケパラで見る」を出す。
// 外から読まれるので、このファイルは他のファイルを import しない。

export type PokeparaCast = {
  id: string;
  name: string;
  catch: string;
  /** 写真（中サイズ）。未登録（no photo）なら null */
  photo: string | null;
  /** ポケパラのプロフィールページ。プロフィールを公開していないキャストは null */
  profileUrl: string | null;
  /** 本日の出勤時刻（例「19:30〜」）。出勤しないなら null */
  today: string | null;
};

export type PokeparaBlog = {
  castId: string;
  name: string;
  title: string;
  /** 投稿日時（ポケパラの表記のまま。例「10/21 21:00」） */
  time: string;
  photo: string | null;
  url: string;
};

export type PokeparaData = {
  fetchedAt: string;
  casts: PokeparaCast[];
  blogs: PokeparaBlog[];
};

export const pokeparaUrls = (sid: string) => ({
  list: `https://www.pokepara.jp/___/widget/gal_list.html?sid=${sid}&width=840`,
  blog: `https://www.pokepara.jp/___/widget/gal_blog.aspx?sid=${sid}&width=840&photo=&count=12&gid=0`,
});

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** タグを外し、&amp; などを戻し、空白を詰める */
function text(html: string | null) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function pick(block: string, re: RegExp) {
  const m = block.match(re);
  return m ? m[1] : null;
}

/** mark の手前まで（無ければ全部） */
function before(s: string, mark: string) {
  const i = s.indexOf(mark);
  return i < 0 ? s : s.slice(0, i);
}

/** mark から後ろ（無ければ全部） */
function from(s: string, mark: string) {
  const i = s.indexOf(mark);
  return i < 0 ? s : s.slice(i);
}

/** 写真の URL。一覧に載っている小サイズ（_s）を中サイズ（_m）に替える。no photo は null */
function photoUrl(src: string | null) {
  if (!src || src.includes("/no_photo/")) return null;
  return src.replace(/_s\.jpg$/, "_m.jpg");
}

/** 女の子一覧（gal_list.html）。キャスト1人が <li> 1つ */
export function parseGalList(html: string): PokeparaCast[] {
  return html.split("<li>").slice(1).map(raw => {
    const b = before(raw, "</li>");
    const photo = from(b, '<div class="photo">');
    const today = text(pick(b, /class="honjitsu[^"]*"><span>([\s\S]*?)<\/span>/));
    return {
      id: pick(b, /\/gal\/(\d+)\//) ?? pick(b, /id="p_(\d+)"/) ?? "",
      name: text(pick(photo, /alt="([^"]*)"/)),
      catch: text(pick(b, /class="catch">([\s\S]*?)<\/div>/)),
      photo: photoUrl(pick(photo, /<img src="([^"]+)"/)),
      profileUrl: pick(photo, /<a href="(https:[^"]+)"/),
      // ポケパラは「19：30～」と全角で書くので、HP の表記（19:30〜）にそろえる
      today: today ? today.replace(/：/g, ":").replace(/～/g, "〜") : null,
    };
  }).filter(c => c.id && c.name);
}

/** ブログ一覧（gal_blog.aspx）。記事1件が <td> 1つ */
export function parseBlog(html: string): PokeparaBlog[] {
  return html.split(/<td class="[^"]*">/).slice(1).map(b => {
    const url = pick(b, /<a class="photo"[^>]*href="([^"]+)"/) ?? "";
    return {
      castId: pick(url, /\/gal\/(\d+)\//) ?? "",
      name: text(pick(b, /<li class="name">([\s\S]*?)<\/li>/)),
      title: text(pick(b, /<li class="title">([\s\S]*?)<\/li>/)),
      time: text(pick(b, /<li class="time">([\s\S]*?)<\/li>/)),
      photo: photoUrl(pick(b, /<div class="blog_photo">[\s\S]*?<img src="([^"]+)"/)),
      url,
    };
  }).filter(p => p.url && p.title);
}
