"use client";
import { useEffect, useRef } from "react";

/**
 * トップのヒーローの動画。スマホには縦、それより広い画面には横を出す。
 *
 * ヒーローは height:100vh ＋ object-fit:cover なので、縦長のスマホに横の動画を敷くと
 * 横幅の中央 26% しか映らない（390×844 で実測）。幅で読み分ける。
 *
 * src と poster を JSX に書かず useEffect で入れているのは、2本とも読み込ませないため。
 * <source media> は Safari しか見ず、display:none にしても読み込まれる。
 * 判定の幅は app/globals.css の @media (max-width: 768px) と揃える
 * （ヘッダーのハンバーガーは 960px だが、こちらはレイアウトの境目に合わせる）。
 */
const PC = { src: "/video/hero.mp4", poster: "/images/hero-poster.jpg" };
const SP = { src: "/video/hero-sp.mp4", poster: "/images/hero-poster-sp.jpg" };

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { src, poster } = window.matchMedia("(max-width: 767px)").matches ? SP : PC;
    el.poster = poster;
    el.src = src;
    el.load();
    // 自動再生を拒まれても黙って poster のままにする（音は消してあるので普通は通る）
    el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      autoPlay muted loop playsInline preload="none"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", background: "#0e0e0e",
      }}
    />
  );
}
