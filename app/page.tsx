import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import ScrollFade from "@/components/ScrollFade";
import { CastPreview } from "@/components/PokeparaCast";
import { TEL, galleryPhoto, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  title: "O-RA ～TOKYO～ | 今夜、オーラをまとう",
  description:
    "O-RA ～TOKYO～ 接待・会食・特別なひとときをご提供する東京のエンターテインメントガールズバー。JR神田駅徒歩2分、19:00〜LAST営業。",
});

export default function Home() {
  return (
    <main>

      {/* ① ヒーロー動画 — フルスクリーン */}
      <section style={{ position:"relative", height:"100vh", minHeight:640, overflow:"hidden" }}>
        {/* スマホには縦、それより広い画面には横を出す（components/HeroVideo.tsx） */}
        <HeroVideo />
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
            BUNNY CLUB · EST. 2026
          </p>
          <h1 style={{
            fontFamily:"var(--font-display)", fontWeight:300,
            fontSize:"clamp(52px,9vw,110px)", letterSpacing:"0.2em",
            color:"#fff", lineHeight:1, marginBottom:16,
          }}>O<span className="hero-hyphen">-</span>RA</h1>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(14px,2vw,22px)", letterSpacing:"0.7em", color:"rgba(255,255,255,0.6)", marginBottom:52 }}>
            ～ TOKYO ～
          </p>
          <div style={{ width:1, height:48, background:"var(--color-gold)", marginBottom:28 }} />
          <p style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(12px,1.5vw,15px)", letterSpacing:"0.3em", color:"rgba(255,255,255,0.6)" }}>
            今夜、オーラをまとう。
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
          /* Cormorant Garamond のハイフンは右上がりに約10°傾いた形なので、文字は透明にして水平の線を重ねる。
             線の寸法は元のハイフン（幅 0.267em・太さ 0.039em・中心の高さ）を測って合わせた。字間とテキスト（O-RA）は元のまま */
          .hero-hyphen { position:relative; color:transparent; }
          .hero-hyphen::after { content:""; position:absolute; left:0.028em; width:0.267em; top:0.694em; height:0.039em; background:#fff; }
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
        {/* 左右の余白は .section-inner のまま（PC 64px・スマホ 28px）。前は 64px を直書きしていて、スマホで文が細切れに折れた */}
        <div className="section-inner" style={{ textAlign:"center", maxWidth:760, margin:"0 auto" }}>
          <ScrollFade>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:40 }}>
              <div className="gold-line gold-line-center" />
              {/* 読点・句点の区切り（span）ごとに折り返す。PC もスマホも4行になる */}
              <p className="concept-copy" style={{
                fontFamily:"var(--font-display)", fontWeight:300,
                fontSize:"clamp(16px,4.6vw,26px)", letterSpacing:"0.15em",
                lineHeight:2.0, color:"var(--color-text-light)",
              }}>
                <span>赤と金に照らされた空間で、</span><span>心ほどける会話とショーを。</span><br />
                <span>ここでしか出会えない輝きが、</span><span>あなたを待っています。</span>
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
          {/* 本日出勤のキャスト（ポケパラから）。2026-10-22 までは data/cast.ts の仮のキャストだった */}
          <div style={{ marginBottom:64 }}>
            <CastPreview />
          </div>
          <ScrollFade className="section-cta">
            <Link href="/cast" className="btn">VIEW ALL CAST</Link>
          </ScrollFade>
        </div>
      </section>

      {/* ④ ギャラリー — ダークセクション・フルワイド。2026-10-22 DK の指示でシステムと入れ替えた。
          上のキャストも黒なので、つなぎ目に細い金の線を引く */}
      <section className="section section-dark" style={{ borderTop:"1px solid var(--color-border-dk)" }}>
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow">GALLERY</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title" style={{ color:"var(--color-text-dark)" }}>ギャラリー</h2></ScrollFade>
          <ScrollFade>
            {/* 並び方（PC とモバイルで違う）は globals.css の .home-gallery */}
            <div className="home-gallery">
              {/* 大きい1枚。写真は枠に敷くだけにして、枠の高さを写真に合わせない
                  （縦の写真だと行が縦に伸び、右の4枚の下に隙間が出た。2026-10-09 実写に差し替えたとき） */}
              <div className="home-gallery-main" style={{ background:"#1e1e1e", overflow:"hidden", position:"relative" }}>
                <img src={galleryPhoto(1)} alt="店内の様子 1" loading="lazy"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              {[2,3,4,5].map(n => (
                <div key={n} style={{ background:"#1a1a1a", aspectRatio:"4/3", overflow:"hidden" }}>
                  <img src={galleryPhoto(n)} alt={`店内の様子 ${n}`} loading="lazy"
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

      {/* ⑤ システム — ライトセクション */}
      <section className="section section-light">
        <div className="section-inner">
          <ScrollFade><span className="section-eyebrow" style={{ color:"var(--color-muted-lt)" }}>SYSTEM</span></ScrollFade>
          <ScrollFade delay={0.15}><h2 className="section-title section-title-dark">料金・システム</h2></ScrollFade>
          <ScrollFade>
            {/* 1fr は中身より小さくならないので、スマホで3列が収まらず横にはみ出した
                （390px で scrollWidth 397px。2026-10-12）。minmax(0,1fr) で縮むようにする */}
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))",
              borderTop:"1px solid var(--color-border-lt)",
              marginBottom:64,
            }}>
              {[["初回料金","40分 ¥4,000"],["延長料金","20分 ¥2,000"],["指名料","¥1,500〜"]].map(([label,price],i) => (
                <div key={label} style={{
                  // 画面が狭いときは左右の余白を詰める（40px×2×3列 だとスマホで入らない）
                  padding:"clamp(36px,7vw,56px) clamp(10px,3vw,40px)", textAlign:"center",
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
                  ["営業時間","19:00 〜 LAST"],
                  ["定休日","日曜日"],
                  ["TEL",TEL.display],
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
