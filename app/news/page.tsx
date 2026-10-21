import NewsList, { type News } from "@/components/NewsList";
import { LINE_URL, TEL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/news",
  title: "NEWS | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ からのお知らせ。2026年10月16日（金）グランドオープン。男性スタッフ・女性フロアスタッフを募集しております。",
});

// HP で書く記事。新しいものを上に足す。ポケパラの「お店からのニュース」は NewsList が日付順に混ぜる
const news: News[] = [
  {
    id: 4,
    date: "2026-10-20",
    category: "イベント",
    title: "10月30日（金）・31日（土）ハロウィンイベント",
    body: "O-RA ～TOKYO～ で初めてのハロウィン。キャストが特別な衣装でお迎えいたします。"
      + "2日間だけの夜を、ぜひお楽しみください。ご予約は公式LINEにて承っております。",
    link: { href: LINE_URL, label: "公式LINEでご予約" },
    // 元は Claude-開発\O-RA\ハロウィン\O-RA_ハロウィン_20261030_実写風.jpg（1414×2000）を長辺 1200 に
    image: { src: "/images/news/halloween-2026.jpg", alt: "ハロウィンイベント 10.30 FRI — 10.31 SAT のポスター", width: 848, height: 1200 },
  },
  {
    id: 1,
    date: "2026-09-24",
    category: "お知らせ",
    title: "10月16日（金）グランドオープン",
    body: `O-RA ～TOKYO～ は 2026年10月16日（金）にグランドオープンいたします。JR「神田駅」から徒歩2分、`
      + `落ち着いた空間で東京の夜をお過ごしいただけます。ご予約・お問い合わせは公式LINE、またはお電話（${TEL.display}）にて承っております。`,
    link: { href: LINE_URL, label: "公式LINEでご予約" },
  },
  {
    id: 2,
    date: "2026-09-24",
    category: "求人",
    title: "男性スタッフ募集",
    body: "グランドオープンに向けて、男性スタッフを募集しております。"
      + "勤務時間や待遇の詳細は、公式LINEまたはお電話にてお気軽にお問い合わせください。",
    link: { href: LINE_URL, label: "公式LINEでお問い合わせ" },
  },
  {
    id: 3,
    date: "2026-09-24",
    category: "求人",
    title: "女性フロアスタッフ募集",
    body: "グランドオープンに向けて、女性フロアスタッフを募集しております。"
      + "勤務時間や待遇の詳細は、公式LINEまたはお電話にてお気軽にお問い合わせください。",
    link: { href: LINE_URL, label: "公式LINEでお問い合わせ" },
  },
];

export default function NewsPage() {
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">NEWS</span>
        <h1 className="page-hero-title">お知らせ</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <NewsList items={news} />
        </div>
      </section>
    </main>
  );
}
