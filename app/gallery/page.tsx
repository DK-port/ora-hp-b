import ScrollFade from "@/components/ScrollFade";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "GALLERY | O-RA ～TOKYO～",
  description:
    "O-RA ～TOKYO～ の店内の様子をご覧いただけます。",
});

export default function GalleryPage() {
  const photos = [...Array(9)].map((_, i) => i + 1);
  return (
    <main>
      <div className="page-hero">
        <span className="page-hero-eyebrow">GALLERY</span>
        <h1 className="page-hero-title">ギャラリー</h1>
      </div>
      <section className="section">
        <div className="section-inner">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {photos.map((n, i) => (
              <ScrollFade key={n} delay={(i % 3) * 0.1}>
                <div style={{ aspectRatio:"4/3", background:"#1a1a1a", overflow:"hidden" }}>
                  <img
                    src={`/images/gallery/gallery-${String(n).padStart(2,"0")}.jpg`}
                    alt={`店内の様子 ${n}`}
                    loading="lazy"
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  />
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
