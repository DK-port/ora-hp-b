import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "GALLERY | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の店内の様子と PR 動画をご覧いただけます。",
});

// 先頭はサイネージで流している PR 動画。写真は 2026-10-07 にカメラマンが撮った店内（10/9 に仮の画像から差し替え）
const items: GalleryItem[] = [
  {
    src: "/images/gallery/pr-ukiyoe.jpg",
    alt: "PR動画 オーラ三十六景 神田の夜",
    video: "/videos/pr-ukiyoe.mp4",
  },
  ...[...Array(7)].map((_, i) => ({
    src: `/images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `店内の様子 ${i + 1}`,
  })),
];

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
