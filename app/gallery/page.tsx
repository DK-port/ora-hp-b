import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import { galleryPhoto, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "GALLERY | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の店内の様子をご覧いただけます。",
});

// 写真は 2026-10-07 にカメラマンが撮った店内（10/9 に仮の画像から差し替え）。
// 先頭にあった PR 動画（浮世絵）は 10/10 に外した（DK「動画は削除」）
const items: GalleryItem[] = [...Array(7)].map((_, i) => ({
  src: galleryPhoto(i + 1),
  alt: `店内の様子 ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">GALLERY</span>
        <h1 className="page-hero-title">ギャラリー</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <GalleryGrid items={items} />
        </div>
      </section>
    </main>
  );
}
