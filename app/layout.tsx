import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OG_IMAGE, SITE_URL, baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "O-RA ～TOKYO～ | 今夜、オーラをまとう",
  description: "O-RA ～TOKYO～ 接待・会食・特別なひとときをご提供する東京のエンターテインメントガールズバー",
  // url は入れない（入れると全ページに継承される）。各ページは pageMetadata() で上書きする
  openGraph: { ...baseOpenGraph },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
