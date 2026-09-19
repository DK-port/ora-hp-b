/**
 * ロゴタイプ「O-RA」と、その下に横線で挟んだ「TOKYO」。
 *
 * 店のブランドロゴ（サイネージ素材 logo_ora.png）の文字組みに合わせている。
 * ロゴの「O-RA」はディドン体なので Bodoni Moda を使う（サイネージの額装ロゴと同じ書体）。
 * 色は親の color を引き継ぐ（ヘッダーはスクロールで白→ゴールドに切り替わるため）。
 */
export default function LogoType({ size }: { size: number }) {
  const rule = { flex: 1, height: 1, background: "currentColor", opacity: 0.75 };
  const tokyo = Math.max(8, Math.round(size * 0.27));

  return (
    <span style={{
      display: "inline-flex", flexDirection: "column", alignItems: "stretch", lineHeight: 1,
    }}>
      <span style={{
        fontFamily: "var(--font-logo)", fontWeight: 600, fontSize: size,
        letterSpacing: "0.02em", textAlign: "center",
      }}>O-RA</span>
      <span style={{
        display: "flex", alignItems: "center", gap: size * 0.15, marginTop: size * 0.18,
      }}>
        <span style={rule} />
        <span style={{
          fontFamily: "var(--font-logo)", fontWeight: 500, fontSize: tokyo,
          letterSpacing: "0.35em", marginRight: "-0.35em",
        }}>TOKYO</span>
        <span style={rule} />
      </span>
    </span>
  );
}
