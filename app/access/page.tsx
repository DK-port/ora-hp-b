import ScrollFade from "@/components/ScrollFade";
import { LINE_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/access",
  title: "ACCESS | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ へのアクセス。JR神田駅徒歩2分、東京メトロ銀座線 神田駅徒歩3分。東京都千代田区鍛冶町1-6-2 林ビル3階。",
});

const info = [
  ["店名", "O-RA ～TOKYO～"],
  ["住所", "東京都千代田区鍛冶町1-6-2\n林ビル 3階"],
  ["最寄り駅", "JR「神田駅」徒歩2分\n東京メトロ銀座線「神田駅」徒歩3分"],
  ["営業時間", "19:00 〜 翌 5:00"],
  ["定休日", "年中無休"],
];

export default function AccessPage() {
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">ACCESS</span>
        <h1 className="page-hero-title">アクセス</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="two-col" style={{ gap:60 }}>
            <ScrollFade>
              <div style={{ width:"100%", aspectRatio:"4/3", background:"#1a1a1a", border:"1px solid var(--color-border)", overflow:"hidden" }}>
                <iframe
                  src="https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA%E9%8D%9B%E5%86%B6%E7%94%BA1-6-2&hl=ja&z=17&output=embed"
                  title="O-RA ～TOKYO～ 所在地マップ"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ width:"100%", height:"100%", border:0, display:"block" }}
                />
              </div>
            </ScrollFade>
            <ScrollFade delay={0.15}>
              <dl style={{ display:"grid", gridTemplateColumns:"90px 1fr", gap:"18px 24px", marginBottom:32 }}>
                {info.map(([dt, dd]) => (
                  <dl key={dt} style={{ display:"contents" }}>
                    <dt style={{ fontSize:11, letterSpacing:"0.2em", color:"var(--color-gold)", fontFamily:"var(--font-serif)", paddingTop:3 }}>{dt}</dt>
                    <dd style={{ fontSize:14, lineHeight:1.8, whiteSpace:"pre-line" }}>{dd}</dd>
                  </dl>
                ))}
              </dl>
              <div style={{ textAlign:"center", padding:"40px 0", border:"1px solid var(--color-border)", marginBottom:24 }}>
                <p style={{ fontSize:12, letterSpacing:"0.2em", color:"var(--color-muted)", marginBottom:12 }}>ご予約・お問い合わせ</p>
                <a href="tel:08023861671" style={{ fontFamily:"var(--font-serif)", fontSize:28, fontWeight:200, letterSpacing:"0.15em", color:"var(--color-gold)" }}>080-2386-1671</a>
                <small style={{ display:"block", marginTop:8, fontSize:11, color:"var(--color-dim)" }}>営業時間内にお気軽にどうぞ</small>
              </div>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-fill" style={{ display:"block", textAlign:"center" }}>LINE でご予約</a>
            </ScrollFade>
          </div>
        </div>
      </section>
    </main>
  );
}
