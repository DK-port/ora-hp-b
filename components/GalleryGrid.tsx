"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollFade from "@/components/ScrollFade";

/** 写真、または動画（video があれば src はその表紙の画像として使う） */
export type GalleryItem = { src: string; alt: string; video?: string };

/**
 * ギャラリーの一覧と、タップしたときの拡大表示（ライトボックス）。
 *
 * 一覧はタップを受けるので、このコンポーネントごとクライアント側で描く。
 * 閉じる操作は「× ボタン」「背景のタップ」「Esc」の3つ。
 * 送りは「左右の矢印」「下のサムネイル」「左右のスワイプ」「← → キー」。
 *
 * 動画は開いたときに初めて読み込まれる（一覧では表紙の画像しか出ない）。
 * 自動で再生するため音は消してあり、音はプレーヤーの操作で出せる。
 */
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus(); // 閉じたら、押したところへフォーカスを戻す
  }, []);

  const move = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  const open = index !== null;

  // 開いている間は背景をスクロールさせない。開いたら閉じるボタンにフォーカス
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);

  // 選択中のサムネイルを見える位置へ寄せる
  useEffect(() => {
    if (index === null) return;
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const arrow = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute", [side]: 4, top: "50%", transform: "translateY(-50%)",
    width: 44, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
    background: "none", border: "none", color: "rgba(255,255,255,0.8)",
    fontSize: 32, lineHeight: 1, cursor: "pointer",
  });

  const current = index === null ? null : items[index];

  return (
    <>
      {/* 拡大したときの大きさと、動画の表紙に重ねる再生の印 */}
      <style>{`
        .lb-photo { max-width: 92vw; max-height: 54vh; object-fit: contain; display: block; }
        .lb-video { max-width: 92vw; max-height: 62vh; display: block; background: #000; }
        @media (min-width: 768px) {
          .lb-photo { max-width: 78vw; max-height: 64vh; }
          .lb-video { max-width: 78vw; max-height: 72vh; }
        }
        .gal-play {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.8); background: rgba(6,6,6,0.42);
          pointer-events: none;
        }
        .gal-play::after {
          content: ""; width: 0; height: 0; margin-left: 3px;
          border-left: 12px solid #fff;
          border-top: 7px solid transparent; border-bottom: 7px solid transparent;
        }
        .gal-play-sm { width: 20px; height: 20px; border-width: 1px; }
        .gal-play-sm::after {
          margin-left: 2px; border-left-width: 7px;
          border-top-width: 4px; border-bottom-width: 4px;
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {items.map((p, i) => (
          <ScrollFade key={p.src} delay={(i % 3) * 0.1}>
            <button
              type="button"
              aria-label={p.video ? `${p.alt} を再生` : `${p.alt} を大きく表示`}
              onClick={(e) => { openerRef.current = e.currentTarget; setIndex(i); }}
              style={{
                position: "relative",
                display: "block", width: "100%", aspectRatio: "4/3", background: "#1a1a1a",
                overflow: "hidden", padding: 0, border: "none", cursor: "pointer",
              }}
            >
              {/* 動画の表紙は縦長なので、横長の枠に入れると顔が切れる。上寄せで切る */}
              <img src={p.src} alt={p.alt} loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  objectPosition: p.video ? "50% 35%" : undefined,
                }} />
              {p.video && <span className="gal-play" aria-hidden="true" />}
            </button>
          </ScrollFade>
        ))}
      </div>

      {current !== null && index !== null && (
        <div
          role="dialog" aria-modal="true" aria-label="ギャラリー"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); // 左へ払ったら次へ
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 200, background: "rgba(6,6,6,0.95)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          {current.video ? (
            // 動画はここで初めて読み込まれる。閉じるか送ると外されるので再生も止まる
            <video
              className="lb-video"
              src={current.video} poster={current.src}
              controls autoPlay muted loop playsInline
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()} // プレーヤーの操作を送りと競合させない
              onTouchEnd={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              className="lb-photo"
              src={current.src} alt={current.alt}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <p style={{
            marginTop: 18, fontFamily: "var(--font-display)", fontSize: 12,
            letterSpacing: "0.35em", marginRight: "-0.35em", color: "var(--color-gold)",
          }}>
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>

          <button ref={closeRef} type="button" aria-label="閉じる"
            onClick={(e) => { e.stopPropagation(); close(); }}
            style={{
              position: "absolute", top: 16, right: 16, width: 38, height: 38,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "1px solid rgba(201,168,76,0.5)",
              color: "var(--color-gold-lt)", fontSize: 17, lineHeight: 1, cursor: "pointer",
            }}
          >×</button>

          <button type="button" aria-label="前へ"
            onClick={(e) => { e.stopPropagation(); move(-1); }} style={arrow("left")}>‹</button>
          <button type="button" aria-label="次へ"
            onClick={(e) => { e.stopPropagation(); move(1); }} style={arrow("right")}>›</button>

          <div ref={thumbsRef}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()} // サムネイルの横スクロールを送りと競合させない
            style={{
              position: "absolute", bottom: 22, left: 0, right: 0,
              display: "flex", gap: 7, padding: "0 12px", overflowX: "auto",
            }}
          >
            {items.map((p, i) => (
              <button key={p.src} type="button" aria-label={`${i + 1}番目`} aria-current={i === index}
                onClick={() => setIndex(i)}
                style={{
                  position: "relative",
                  flex: "0 0 auto", width: 54, height: 40, padding: 0, border: "none",
                  background: "none", cursor: "pointer", opacity: i === index ? 1 : 0.42,
                  outline: i === index ? "2px solid var(--color-gold)" : "none", outlineOffset: -2,
                }}
              >
                <img src={p.src} alt="" loading="lazy"
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    objectPosition: p.video ? "50% 35%" : undefined,
                  }} />
                {p.video && <span className="gal-play gal-play-sm" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
