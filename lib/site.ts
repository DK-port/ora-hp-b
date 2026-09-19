import type { Metadata } from "next";

export const SITE_URL = "https://ora-tokyo.com";
export const SITE_NAME = "O-RA ～TOKYO～";

/**
 * OG 画像（LINE や SNS で URL を送ったときのプレビュー）。scripts/make-og-image.py で生成する。
 *
 * LINE や Facebook は URL 単位でプレビューを長くキャッシュするので、
 * 画像を差し替えたら OG_IMAGE_VERSION を上げて URL を変える。
 */
const OG_IMAGE_VERSION = 1;
export const OG_IMAGE = {
  url: `/og.jpg?v=${OG_IMAGE_VERSION}`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} 東京の夜を、あなただけの時間へ`,
};

/**
 * 全ページ共通の Open Graph 項目。url はページごとに違うのでここには置かない。
 *
 * 画像もここに含める。app/opengraph-image.jpg（ファイル規約）に置くと、子ページで
 * openGraph を書いた時点で浅いマージにより消える（2026-09-19 のビルドで実測:
 * トップ以外の5ページで og:image が出なかった）。
 */
export const baseOpenGraph = {
  siteName: SITE_NAME,
  locale: "ja_JP",
  type: "website" as const,
  images: [OG_IMAGE],
};

/**
 * ページごとの metadata を組み立てる。
 *
 * Next.js の metadata は親子で「浅く」マージされる。子ページで openGraph を書くと
 * 親の openGraph が丸ごと置き換わるため、共通部分をここで毎回展開する。
 *
 * canonical も layout に置くと全ページへ継承され、全ページが「正規URLはトップ」と
 * 宣言してしまう。必ずページごとに自分のパスを出す。
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title, description, url: path },
  };
}
