import GalleryGrid, { type Photo } from "@/components/GalleryGrid";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "GALLERY | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の店内の様子をご覧いただけます。",
});

// 写真はカメラマンの撮影分に差し替える予定（今は仮の画像）
const photos: Photo[] = [...Array(9)].map((_, i) => ({
  src: `/images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
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
          <GalleryGrid photos={photos} />
        </div>
      </section>
    </main>
  );
}
