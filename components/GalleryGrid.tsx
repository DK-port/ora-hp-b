"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollFade from "@/components/ScrollFade";

export type Photo = { src: string; alt: string };

/**
 * ギャラリーの一覧と、写真をタップしたときの拡大表示（ライトボックス）。
 *
 * 一覧はタップを受けるので、このコンポーネントごとクライアント側で描く。
 * 閉じる操作は「× ボタン」「背景のタップ」「Esc」の3つ。
 * 写真の移動は「左右の矢印」「下のサムネイル」「左右のスワイプ」「← → キー」。
 */
export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus(); // 閉じたら、押した写真へフォーカスを戻す
  }, []);

  const move = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
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

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {photos.map((p, i) => (
          <ScrollFade key={p.src} delay={(i % 3) * 0.1}>
            <button
              type="button"
              aria-label={`${p.alt} を大きく表示`}
              onClick={(e) => { openerRef.current = e.currentTarget; setIndex(i); }}
              style={{
                display: "block", width: "100%", aspectRatio: "4/3", background: "#1a1a1a",
                overflow: "hidden", padding: 0, border: "none", cursor: "pointer",
              }}
            >
              <img src={p.src} alt={p.alt} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          </ScrollFade>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog" aria-modal="true" aria-label="ギャラリー"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); // 左へ払ったら次の写真
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 200, background: "rgba(6,6,6,0.95)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* 写真の高さは画面によって変える（スマホは下のサムネイルの分を残す、PC は大きく見せる） */}
          <style>{`
            .lb-photo { max-width: 92vw; max-height: 54vh; object-fit: contain; display: block; }
            @media (min-width: 768px) { .lb-photo { max-width: 78vw; max-height: 64vh; } }
          `}</style>
          <img
            className="lb-photo"
            src={photos[index].src} alt={photos[index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p style={{
            marginTop: 18, fontFamily: "var(--font-display)", fontSize: 12,
            letterSpacing: "0.35em", marginRight: "-0.35em", color: "var(--color-gold)",
          }}>
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
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

          <button type="button" aria-label="前の写真"
            onClick={(e) => { e.stopPropagation(); move(-1); }} style={arrow("left")}>‹</button>
          <button type="button" aria-label="次の写真"
            onClick={(e) => { e.stopPropagation(); move(1); }} style={arrow("right")}>›</button>

          <div ref={thumbsRef}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()} // サムネイルの横スクロールを写真の送りと競合させない
            style={{
              position: "absolute", bottom: 22, left: 0, right: 0,
              display: "flex", gap: 7, padding: "0 12px", overflowX: "auto",
            }}
          >
            {photos.map((p, i) => (
              <button key={p.src} type="button" aria-label={`${i + 1}枚目`} aria-current={i === index}
                onClick={() => setIndex(i)}
                style={{
                  flex: "0 0 auto", width: 54, height: 40, padding: 0, border: "none",
                  background: "none", cursor: "pointer", opacity: i === index ? 1 : 0.42,
                  outline: i === index ? "2px solid var(--color-gold)" : "none", outlineOffset: -2,
                }}
              >
                <img src={p.src} alt="" loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
