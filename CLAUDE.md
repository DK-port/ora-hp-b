@AGENTS.md

# ORA 公式HP（https://ora-tokyo.com）

O-RA ～TOKYO～（神田）の公式HP。Next.js の静的書き出し（`output: 'export'`）。

**経緯・決定事項は Vault の `Projects/ora-website.md`、店舗情報とブランドの決まりは `Projects/ora.md`、
過去の失敗は `Knowledge/mistakes-ora.md`**（Vault は `C:\Users\starx\OneDrive\claude\Claude-開発\OBSIDIAN関連\`）。

## 公開の仕組み（2026-09-19〜）

| 項目 | 内容 |
|---|---|
| URL | https://ora-tokyo.com（`www.` も同じ内容） |
| ホスティング | Cloudflare Pages プロジェクト `ora-tokyo`（`ora-tokyo.pages.dev`） |
| デプロイ | GitHub `DK-port/ora-hp-b` と連携。**master に push すると自動で本番に出る** |
| ビルド | `npm run build` → `out/`（Node は `.node-version` の 22） |

## 作業のしかた

- 作業ブランチ（`feat/...`）で直す → `npm run build` → `out/` と本番の検証 → master へ fast-forward して push
- **master への push ＝ 本番公開。** 検証が済むまで master に入れない
- 検証スクリプトは `C:\Users\starx\OneDrive\claude\Claude-開発\O-RA\hp-verify\`
  （`verify_live.py` `verify_meta.py` など。`out/` と本番の両方を見る。2026-09-26 に一時フォルダから移した）
- 店の電話・公式 LINE・OG 画像は `lib/site.ts` に1か所ずつ置いてある（`TEL` `LINE_URL` `OG_IMAGE`）。直書きしない

## 紛らわしいもの

- 現行はこのフォルダ（`C:\Users\starx\dev\ora-hp-b`）だけ。`C:\Users\starx\dev\O-RA\pattern-a` / `pattern-b` は
  2026-08-18 で止まった古い複製（pattern-b は同じ GitHub リポジトリの古い clone）。使わない
- ルート直下の `index.html` `404.html` `*.txt` `_next/` `access/` `cast/` `gallery/` `news/` `system/` は、
  pattern-b 時代のビルド出力が git に残っているもの。ビルド・公開には使われない（Cloudflare は `out/` だけを配信）
- `package.json` の name が `pattern-b` のまま（動作には影響しない）
