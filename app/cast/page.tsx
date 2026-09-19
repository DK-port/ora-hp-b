import ScrollFade from "@/components/ScrollFade";
import { casts } from "@/data/cast";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/cast",
  title: "CAST | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の在籍キャストをご紹介します。",
});

export default function CastPage() {
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">CAST</span>
        <h1 className="page-hero-title">在籍キャスト</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {casts.map((cast, i) => (
              <ScrollFade key={cast.id} delay={(i % 3) * 0.1}>
                <article style={{
                  background: "var(--color-bg-2)", border: "1px solid var(--color-border)",
                  overflow: "hidden",
                }}>
                  <div style={{ aspectRatio: "3/4", background: "#1a1a1a", overflow:"hidden" }}>
                    <img src={cast.img} alt={cast.name} loading="lazy"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding: 20, textAlign:"center", borderTop:"1px solid var(--color-border)" }}>
                    <p style={{ fontFamily:"var(--font-serif)", fontSize:18, fontWeight:300, letterSpacing:"0.15em", marginBottom:6 }}>{cast.name}</p>
                    <p style={{ fontSize:12, color:"var(--color-muted)", letterSpacing:"0.1em" }}>{cast.catch}</p>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
