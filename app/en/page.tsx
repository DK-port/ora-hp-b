import ScrollFade from "@/components/ScrollFade";
import { LINE_URL, TEL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/en",
  title: "English | O-RA TOKYO",
  description:
    "O-RA TOKYO — an entertainment dining bar in Kanda, Tokyo. Grand opening Friday, October 16, 2026. Price, access, hours and reservations.",
  locale: "en_US",
});

const PRICE: [string, string][] = [
  ["First 40 minutes", "¥4,000"],
  ["Extension, each 20 minutes", "¥2,000"],
  ["Cast request", "¥1,500 – ¥2,000"],
  ["Drink for a cast", "from ¥1,500"],
  ["Champagne / tequila shots", "from ¥1,500"],
];

const ACCESS: [string, React.ReactNode][] = [
  ["ADDRESS", "Hayashi Bldg. 3F, 1-6-2 Kajicho, Chiyoda-ku, Tokyo"],
  ["TRAIN", <>2 min walk from JR Kanda Station<br />3 min walk from Kanda Station (Tokyo Metro Ginza Line)</>],
  ["HOURS", "19:00 – 05:00, open daily"],
  ["TEL", <a href={TEL.href} style={{ color: "var(--color-gold)" }}>{TEL.display}</a>],
];

export default function EnglishPage() {
  return (
    // このページだけ英語。ブラウザの自動翻訳に日本語として扱われないよう lang を上書きする
    <main lang="en">
      <style>{`
        /* Cormorant Garamond のハイフンは傾いた形なので、文字を透かして水平の線を重ねる。
           color: transparent にすると線の currentColor まで消えるため、-webkit-text-fill-color を使う */
        .en-hyphen { position: relative; -webkit-text-fill-color: transparent; }
        .en-hyphen::after {
          content: ""; position: absolute; left: 0.028em; width: 0.267em;
          top: 0.694em; height: 0.039em; background: currentColor;
        }
        .en-open {
          text-align: center; padding: 34px 0; margin-bottom: 72px;
          border-top: 1px solid var(--color-border-dk); border-bottom: 1px solid var(--color-border-dk);
        }
        .en-h2 {
          font-family: var(--font-display); font-size: clamp(22px, 3vw, 30px); font-weight: 300;
          letter-spacing: 0.12em; margin-bottom: 28px; color: var(--color-text-dark);
        }
        .en-block { margin-bottom: 78px; }
        .en-table { width: 100%; border-collapse: collapse; max-width: 620px; }
        .en-table td { padding: 15px 18px; border-bottom: 1px solid var(--color-border-dk); font-size: 14px; }
        .en-table td:first-child { color: var(--color-gold); font-family: var(--font-serif); }
        .en-table td:last-child { text-align: right; color: var(--color-text-dark); }
        .en-note { font-size: 13px; color: var(--color-muted-dk); line-height: 2; margin-top: 20px; }
        .en-dl { display: grid; grid-template-columns: 112px 1fr; gap: 16px 24px; font-size: 14px; max-width: 620px; }
        .en-dl dt { font-size: 11px; letter-spacing: 0.2em; color: var(--color-gold); font-family: var(--font-display); padding-top: 3px; }
        .en-dl dd { color: var(--color-text-dark); line-height: 1.8; margin: 0; }
        @media (max-width: 767px) { .en-dl { grid-template-columns: 92px 1fr; } }
      `}</style>

      <div className="page-hero">
        <span className="page-hero-eyebrow">ENTERTAINMENT DINING</span>
        <h1 className="page-hero-title">O<span className="en-hyphen">-</span>RA TOKYO</h1>
        <p style={{ marginTop: 18, fontSize: 13, letterSpacing: "0.18em", color: "var(--color-muted-dk)" }}>
          Kanda, Tokyo
        </p>
      </div>

      <section className="section">
        <div className="section-inner">
          <ScrollFade>
            <div className="en-open">
              <p style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.4em", color: "var(--color-gold)", marginBottom: 12 }}>
                GRAND OPENING
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,26px)", fontWeight: 300, letterSpacing: "0.1em", color: "var(--color-text-dark)" }}>
                Friday, October 16, 2026
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="en-block">
              <h2 className="en-h2">About</h2>
              <p style={{ fontSize: 14, lineHeight: 2, color: "var(--color-muted-dk)", maxWidth: 640 }}>
                A calm room of black and gold, two minutes from Kanda Station. Our cast serves drinks and
                conversation at the counter — drop in after work, or bring guests for a quiet celebration.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="en-block">
              <h2 className="en-h2">Price</h2>
              <table className="en-table">
                <tbody>
                  {PRICE.map(([item, yen]) => (
                    <tr key={item}><td>{item}</td><td>{yen}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="en-note">
                — Tax 10%, service charge 10% and table charge 10% are added to the above.<br />
                — Cash only.<br />
                — Guests must be 20 years or older.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="en-block">
              <h2 className="en-h2">Access</h2>
              <dl className="en-dl">
                {ACCESS.map(([dt, dd]) => (
                  <div key={dt} style={{ display: "contents" }}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="en-block" style={{ marginBottom: 0, textAlign: "center" }}>
              <h2 className="en-h2">Reservation</h2>
              <p style={{ fontSize: 14, color: "var(--color-muted-dk)", marginBottom: 28 }}>
                Message us on LINE, or call the shop. English messages are welcome.
              </p>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-fill">
                Reserve on LINE
              </a>
              <p style={{ marginTop: 22, fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 200, letterSpacing: "0.12em" }}>
                <a href={TEL.href} style={{ color: "var(--color-gold)" }}>{TEL.display}</a>
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>
    </main>
  );
}
