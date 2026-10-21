"use client";
import { useEffect, useState } from "react";
import ScrollFade from "@/components/ScrollFade";
import type { PokeparaNews } from "@/lib/pokepara";

// NEWS ページの記事の一覧。HP で書いた記事（app/news/page.tsx）に、ポケパラの「お店からのニュース」
// （/api/pokepara-news、functions/api/pokepara-news.ts）を日付順に混ぜて出す。
// ポケパラが読めないときは HP で書いた記事だけになる。

export type News = {
  id: number;
  date: string;
  category: string;
  title: string;
  body: string;
  /** 本文の下に出す導線（公式LINEなど）。無くてもよい */
  link?: { href: string; label: string };
  /**
   * 記事の画像。PC では本文の右、スマホでは本文の下に出す。無くてもよい。
   * 押すと href（無ければ画像そのもの）を新しいタブで開く。ポケパラの画像は大きさが分からないので width・height は無い
   */
  image?: { src: string; alt: string; width?: number; height?: number; href?: string };
};

function fromPokepara(n: PokeparaNews): News {
  return {
    id: Number(n.id),
    date: n.date,
    category: "お知らせ",
    title: n.title,
    body: n.body,
    link: { href: n.url, label: "ポケパラで見る" },
    image: n.image ? { src: n.image, alt: n.title, href: n.url } : undefined,
  };
}

export default function NewsList({ items }: { items: News[] }) {
  const [pokepara, setPokepara] = useState<News[]>([]);
  useEffect(() => {
    let alive = true;
    fetch("/api/pokepara-news")
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { news: PokeparaNews[] }) => { if (alive) setPokepara(data.news.map(fromPokepara)); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  // 日付の新しい順。同じ日付なら HP の記事が先（sort は元の並びを崩さない）
  const all = [
    ...items.map(item => ({ item, key: `hp-${item.id}` })),
    ...pokepara.map(item => ({ item, key: `pp-${item.id}` })),
  ].sort((a, b) => b.item.date.localeCompare(a.item.date));

  return (
    <>
      {all.map(({ item, key }, i) => (
        <ScrollFade key={key} delay={i * 0.1}>
          <article className={item.image ? "news-item has-image" : "news-item"} style={{ borderBottom:"1px solid var(--color-border)", padding:"36px 0", ...(i === 0 ? { borderTop:"1px solid var(--color-border)" } : {}) }}>
            <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
              <time style={{ fontSize:12, letterSpacing:"0.1em", color:"var(--color-muted)", fontFamily:"var(--font-serif)" }}>{item.date}</time>
              <span style={{ fontSize:10, letterSpacing:"0.2em", color:"var(--color-gold)", border:"1px solid var(--color-border)", padding:"3px 10px" }}>{item.category}</span>
            </div>
            <h3 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(16px,2vw,20px)", fontWeight:300, letterSpacing:"0.05em", marginBottom:12, lineHeight:1.6 }}>{item.title}</h3>
            {/* ポケパラの記事は改行がある */}
            <p style={{ fontSize:14, color:"var(--color-muted)", lineHeight:1.9, maxWidth:680, whiteSpace:"pre-line" }}>{item.body}</p>
            {item.link && (
              // 外部リンクなので新しいタブで開く
              <a href={item.link.href} target="_blank" rel="noopener noreferrer" style={{
                display:"inline-block", marginTop:18, fontSize:12, letterSpacing:"0.15em",
                color:"var(--color-gold)", borderBottom:"1px solid rgba(201,168,76,0.45)", paddingBottom:4,
              }}>{item.link.label} →</a>
            )}
            </div>
            {item.image && (
              <a href={item.image.href ?? item.image.src} target="_blank" rel="noopener noreferrer" className="news-image">
                <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height}
                  loading="lazy" style={{ display:"block", width:"100%", height:"auto", border:"1px solid var(--color-border)" }} />
              </a>
            )}
          </article>
        </ScrollFade>
      ))}
      <style>{`
        /* 画像のある記事: PC は本文の右に縦長の画像、スマホは本文の下 */
        .news-item.has-image{ display:grid; grid-template-columns:minmax(0,1fr) 220px; gap:40px; align-items:start; }
        .news-image{ display:block; }
        @media (max-width:768px){
          .news-item.has-image{ grid-template-columns:minmax(0,1fr); gap:24px; }
          .news-image{ max-width:320px; }
        }
      `}</style>
    </>
  );
}
