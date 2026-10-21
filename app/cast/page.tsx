import { CastBoard } from "@/components/PokeparaCast";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/cast",
  title: "CAST | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の在籍キャストと本日の出勤、キャストブログをご紹介します。",
});

// キャスト・本日の出勤・ブログは、ポケパラに登録したものを HP のデザインで出す（ポケパラが更新元）。
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
          <CastBoard />
        </div>
      </section>
    </main>
  );
}
