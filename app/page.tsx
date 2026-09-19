import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";
import { casts } from "@/data/cast";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  title: "O-RA ～TOKYO～ | 東京の夜を、あなただけの時間へ",
  description:
    "O-RA ～TOKYO～ 接待・会食・特別なひとときをご提供する東京のエンターテインメントダイニング。JR神田駅徒歩2分、19:00〜翌5:00営業。",
});

export default function Home() {
  return (
    <main>

      {/* ① ヒーロー動画 — フルスクリーン */}
      <section style={{ position:"relative", height:"100vh", minHeight:640, overflow:"hidden" }}>
        <video
          src="/video/hero.mp4"
          autoPlay muted loop playsInline
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(14,14,14,0.25) 0%, rgba(14,14,14,0.6) 70%, rgba(14,14,14,0.9) 100%)",
        }} />
        <div style={{
          position:"relative", zIndex:1, height:"100%",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:0,
          animation:"heroFade 2s cubic-bezier(0.25,0.46,0.45,0.94) both",
        }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:11, letterSpacing:"0.6em", color:"rgba(255,255,255,0.55)", marginBottom:28 }}>
            ENTERTAINMENT DINING
          </p>
          <h1 style={{
            fontFamily:"var(--font-display)", fontWeight:300,
            fontSize:"clamp(52px,9vw,110px)", letterSpacing:"0.2em",
            color:"#fff", lineHeight:1, marginBottom:16,
          }}>O-RA</h1>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(14px,2vw,22px)", letterSpacing:"0.7em", color:"rgba(255,255,255,0.6)", marginBottom:52 }}>
            ～ TOKYO ～
          </p>
          <div style={{ width:1, height:48, background:"var(--color-gold)", marginBottom:28 }} />
          <p style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(12px,1.5vw,15px)", letterSpacing:"0.3em", color:"rgba(255,255,255,0.6)" }}>
            東京の夜を、あなただけの時間へ
          </p>
        </div>
        <div style={{
          position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:10, zIndex:1,
        }}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:9, letterSpacing:"0.5em", color:"rgba(255,255,255,0.4)" }}>SCROLL</span>
          <div style={{ width:1, height:48, background:"var(--color-gold)", animation:"scrollLine 2s ease-in-out infinite" }} />
        </div>
        <style>{`
          @keyframes heroFade { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
          @keyframes scrollLine {
            0%{transform:scaleY(0);transform-origin:top;}
            50%{transform:scaleY(1);transform-origin:top;}
            51%{transform:scaleY(1);transform-origin:bottom;}
            100%{transform:scaleY(0);transform-origin:bottom;}
          }
        `}</style>
      </section>

      {/* ② コンセプト — ライトセクション */}
      <section className="section section-light">
        <div className="section-inner" style={{ textAlign:"center", maxWidth:760, margin:"0 auto", padding:"0 64px" }}>
          <ScrollFade>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:40 }}>
              <div className="gold-line gold-line-center" />
              <p style={{
                fontFamily:"var(--font-display)", fontWeight:300,
                fontSize:"clamp(18px,2.5vw,26px)", letterSpacing:"0.15em",
                lineHeight:2.0, color:"var(--color-text-light)",
              }}>
                洗練された空間と、心を解きほぐすひとときを。<br />
                選ばれた夜の舞台で、特別な時間をお届けします。
              </p>
              <div className="gold-line gold-line-center" />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ③ キャスト — ダークセクション・大判グリッド */}
      <section className="section section-dark">
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow">CAST</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title" style={{ color:"var(--color-text-dark)" }}>在籍キャスト</h2></ScrollFade>
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:64,
          }}>
            {casts.slice(0,4).map((cast,i) => (
              <ScrollFade key={cast.id} delay={i*0.1}>
                <article style={{ border:"1px solid var(--color-border-dk)", overflow:"hidden" }}>
                  <div style={{ aspectRatio:"2/3", background:"#1e1e1e", overflow:"hidden" }}>
                    <img src={cast.img} alt={cast.name} loading="lazy"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                  <div style={{ padding:"20px 18px", borderTop:"1px solid var(--color-border-dk)", textAlign:"center" }}>
                    <p style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:300, letterSpacing:"0.2em", color:"var(--color-text-dark)", marginBottom:6 }}>{cast.name}</p>
                    <p style={{ fontSize:11, color:"var(--color-muted-dk)", letterSpacing:"0.1em" }}>{cast.catch}</p>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
          <ScrollFade className="section-cta">
            <Link href="/cast" className="btn">VIEW ALL CAST</Link>
          </ScrollFade>
        </div>
      </section>

      {/* ④ システム — ライトセクション */}
      <section className="section section-light">
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow" style={{ color:"var(--color-muted-lt)" }}>SYSTEM</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title section-title-dark">料金・システム</h2></ScrollFade>
          <ScrollFade>
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              borderTop:"1px solid var(--color-border-lt)",
              marginBottom:64,
            }}>
              {[["初回料金","40分 ¥4,000"],["延長料金","20分 ¥2,000"],["指名料","¥1,500〜"]].map(([label,price],i) => (
                <div key={label} style={{
                  padding:"56px 40px", textAlign:"center",
                  borderRight: i < 2 ? "1px solid var(--color-border-lt)" : "none",
                }}>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:10, letterSpacing:"0.4em", color:"var(--color-gold)", marginBottom:20 }}>{label}</p>
                  <p style={{ fontSize:13, color:"var(--color-muted-lt)" }}>{price}</p>
                </div>
              ))}
            </div>
          </ScrollFade>
          <ScrollFade className="section-cta">
            <Link href="/system" className="btn btn-dark">詳細を見る</Link>
          </ScrollFade>
        </div>
      </section>

      {/* ⑤ ギャラリー — ダークセクション・フルワイド */}
      <section className="section section-dark">
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow">GALLERY</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title" style={{ color:"var(--color-text-dark)" }}>ギャラリー</h2></ScrollFade>
          <ScrollFade>
            <div style={{
              display:"grid",
              gridTemplateColumns:"2fr 1fr 1fr",
              gridTemplateRows:"auto auto",
              gap:8, marginBottom:64,
            }}>
              {/* 大きい1枚 */}
              <div style={{ gridRow:"1 / 3", background:"#1e1e1e", minHeight:400, overflow:"hidden" }}>
                <img src="/images/gallery/gallery-01.jpg" alt="店内の様子 1" loading="lazy"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              {[2,3,4,5].map(n => (
                <div key={n} style={{ background:"#1a1a1a", aspectRatio:"4/3", overflow:"hidden" }}>
                  <img src={`/images/gallery/gallery-0${n}.jpg`} alt={`店内の様子 ${n}`} loading="lazy"
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
              ))}
            </div>
          </ScrollFade>
          <ScrollFade className="section-cta">
            <Link href="/gallery" className="btn">VIEW GALLERY</Link>
          </ScrollFade>
        </div>
      </section>

      {/* ⑥ アクセス — ライトセクション */}
      <section className="section section-light">
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow" style={{ color:"var(--color-muted-lt)" }}>ACCESS</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title section-title-dark">アクセス</h2></ScrollFade>
          <div className="two-col" style={{ gap:80 }}>
            <ScrollFade>
              <dl style={{ display:"grid", gridTemplateColumns:"90px 1fr", gap:"20px 28px", marginBottom:40 }}>
                {[
                  ["住所","東京都千代田区鍛冶町1-6-2\n林ビル 3階"],
                  ["最寄り駅","JR「神田駅」徒歩2分"],
                  ["営業時間","19:00 〜 翌 5:00"],
                  ["定休日","年中無休"],
                  ["TEL","080-2386-1671"],
                ].map(([dt,dd]) => (
                  <div key={dt} style={{ display:"contents" }}>
                    <dt style={{ fontSize:10, letterSpacing:"0.25em", color:"var(--color-gold)", fontFamily:"var(--font-display)", paddingTop:4 }}>{dt}</dt>
                    <dd style={{ fontSize:14, color:"var(--color-text-light)", lineHeight:1.8, whiteSpace:"pre-line" }}>{dd}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/access" className="btn btn-dark">詳細マップを見る</Link>
            </ScrollFade>
            <ScrollFade delay={0.2}>
              <div style={{
                width:"100%", aspectRatio:"4/3", background:"#e8e4dd",
                border:"1px solid var(--color-border-lt)",
                overflow:"hidden",
              }}>
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
          </div>
        </div>
      </section>

    </main>
  );
}
