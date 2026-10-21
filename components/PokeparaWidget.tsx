"use client";
import { useEffect, useRef } from "react";
import { POKEPARA } from "@/lib/site";

// ポケパラの埋め込みタグ（管理画面「ウィジェット」で配っているもの）を、置き場所の幅に合わせて作る。
// 中身はポケパラの iframe なので、色や文字は変えられない（背景は白で固定）。
// iframe の中の高さは外から測れないので、幅ごとの列数から高さを計算する。
// 下の数字は 2026-10-22 に幅を変えて実測した値。

type Kind = "list" | "blog";

const SCRIPTS: Record<Kind, { className: string; src: string }> = {
  list: { className: "pokeparaGalListWidget", src: "https://www.pokepara.jp/js/wiget/get_gal_list_widget.js" },
  blog: { className: "pokeparaBlogWidget",    src: "https://www.pokepara.jp/js/wiget/get_widget.js" },
};

const MAX_WIDTH = 840;   // 女の子一覧は 4列、ブログは 7列になる幅

function layout(kind: Kind, available: number) {
  const width = Math.floor(Math.min(available, MAX_WIDTH));
  if (kind === "list") {
    // 女の子一覧は中の CSS が 300 / 400 / 600px で列数を切り替える。1人分の高さは約 302px、上の見出しとタブで 58px
    const cols = width > 600 ? 4 : width > 400 ? 3 : width > 300 ? 2 : 1;
    const rows = Math.ceil(POKEPARA.castCount / cols);
    return { width, height: 58 + rows * 302, count: 0 };
  }
  // ブログは1件の幅が約 120px で、入るだけ横に並ぶ。件数は列数で割り切れる数にする
  const cols = Math.max(2, Math.floor(width / 120));
  const rows = cols >= 5 ? 2 : cols >= 3 ? 3 : 4;
  // 実測は 2行 486〜531px・3行 750px・4行 955px（見出しと下のページ送り「1 2 次へ」込み）
  return { width, height: 100 + rows * 220, count: cols * rows };
}

export default function PokeparaWidget({ kind }: { kind: Kind }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 幅をまだ決めていない div は親の中身の幅いっぱいになるので、それを測る（親の clientWidth は左右の余白込み）
    el.style.width = "";
    const { width, height, count } = layout(kind, el.clientWidth);
    // 配布のタグと同じ data 属性を付けてから、配布のスクリプトを読む（スクリプトが iframe を作る）
    el.dataset.sid = POKEPARA.sid;
    el.dataset.width = String(width);
    el.dataset.height = String(height);
    if (kind === "blog") Object.assign(el.dataset, { photo: "", count: String(count), gid: "0" });
    el.style.width = `${width}px`;
    const script = document.createElement("script");
    script.src = SCRIPTS[kind].src;
    el.appendChild(script);
    // ページを離れて戻ったときに作り直せるよう、中身を空にしておく
    return () => { el.replaceChildren(); };
  }, [kind]);

  return <div ref={ref} className={SCRIPTS[kind].className} style={{ margin: "0 auto", maxWidth: "100%" }} />;
}
