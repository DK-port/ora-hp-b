import ScrollFade from "@/components/ScrollFade";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/news",
  title: "NEWS | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ からのお知らせ。",
});

const news = [
  { id:1, date:"2025-06-01", category:"お知らせ", title:"O-RA ～TOKYO～ グランドオープンのご案内", body:"この度、O-RA ～TOKYO～ はグランドオープンを迎えました。皆様のご来店を心よりお待ちしております。" },
  { id:2, date:"2025-06-10", category:"キャンペーン", title:"オープン記念キャンペーン実施中", body:"グランドオープンを記念して、期間限定のスペシャルキャンペーンを実施しております。詳細はお問い合わせください。" },
  { id:3, date:"2025-06-20", category:"キャスト", title:"新キャスト加入のご案内", body:"新たなキャストが仲間に加わりました。ぜひご来店の際にお会いください。" },
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
              </article>
            </ScrollFade>
          ))}
        </div>
      </section>
    </main>
  );
}
