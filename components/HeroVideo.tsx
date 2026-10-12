"use client";

/**
 * トップのヒーローの動画。
 *
 * 2026-10-12: 一時はスマホに縦の動画を出し分けていたが、DK の指示で
 * 1本（横・内観3カット）に戻した。スマホでは height:100vh ＋ object-fit:cover のため
 * 横幅の中央 26% ほどしか映らないが、人が写っていないカットなので成立している。
 * 縦を戻すときは、幅で src を選ぶ作り（matchMedia）に戻す。
 */
export default function HeroVideo() {
  return (
    <video
      src="/video/hero.mp4"
      poster="/images/hero-poster.jpg"
      autoPlay muted loop playsInline
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", background: "#0e0e0e",
      }}
    />
  );
}
