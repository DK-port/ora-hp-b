import ScrollFade from "@/components/ScrollFade";
import { LINE_URL, TEL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/news",
  title: "NEWS | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ からのお知らせ。2026年10月16日（金）グランドオープン。男性スタッフ・女性フロアスタッフを募集しております。",
});

type News = {
  id: number;
  date: string;
  category: string;
  title: string;
  body: string;
  /** 本文の下に出す導線（公式LINEなど）。無くてもよい */
  link?: { href: string; label: string };
};

const news: News[] = [
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
          {news.map((item, i) => (
            <ScrollFade key={item.id} delay={i * 0.1}>
              <article style={{ borderBottom:"1px solid var(--color-border)", padding:"36px 0", ...(i === 0 ? { borderTop:"1px solid var(--color-border)" } : {}) }}>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
                  <time style={{ fontSize:12, letterSpacing:"0.1em", color:"var(--color-muted)", fontFamily:"var(--font-serif)" }}>{item.date}</time>
                  <span style={{ fontSize:10, letterSpacing:"0.2em", color:"var(--color-gold)", border:"1px solid var(--color-border)", padding:"3px 10px" }}>{item.category}</span>
                </div>
                <h3 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(16px,2vw,20px)", fontWeight:300, letterSpacing:"0.05em", marginBottom:12, lineHeight:1.6 }}>{item.title}</h3>
                <p style={{ fontSize:14, color:"var(--color-muted)", lineHeight:1.9, maxWidth:680 }}>{item.body}</p>
                {item.link && (
                  // 外部リンクなので新しいタブで開く
                  <a href={item.link.href} target="_blank" rel="noopener noreferrer" style={{
                    display:"inline-block", marginTop:18, fontSize:12, letterSpacing:"0.15em",
                    color:"var(--color-gold)", borderBottom:"1px solid rgba(201,168,76,0.45)", paddingBottom:4,
                  }}>{item.link.label} →</a>
                )}
              </article>
            </ScrollFade>
          ))}
        </div>
      </section>
    </main>
  );
}
