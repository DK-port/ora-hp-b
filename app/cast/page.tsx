import PokeparaWidget from "@/components/PokeparaWidget";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/cast",
  title: "CAST | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の在籍キャストと本日の出勤、キャストブログをご紹介します。",
});

// キャスト一覧と本日の出勤・ブログは、ポケパラに登録したものをそのまま出す（ポケパラが更新元）。
// 2026-10-22 までは data/cast.ts の仮のキャストを並べていた
export default function CastPage() {
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">CAST</span>
        <h1 className="page-hero-title">在籍キャスト</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <p className="cast-note">「本日出勤」を押すと、今日出勤するキャストに切り替わります。</p>
          <PokeparaWidget kind="list" />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="cast-frame">
            <span className="section-eyebrow">BLOG</span>
            <h2 className="section-title">キャストブログ</h2>
            <PokeparaWidget kind="blog" />
          </div>
        </div>
      </section>
      <style>{`
        /* 見出しをウィジェットの左端にそろえる（ウィジェットは最大 840px で中央寄せ） */
        .cast-frame{ max-width:840px; margin:0 auto; }
        .cast-note{ font-size:13px; color:var(--color-muted); letter-spacing:0.05em; text-align:center; margin-bottom:24px; }
      `}</style>
    </main>
  );
}
