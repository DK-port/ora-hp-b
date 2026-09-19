"""サイトのアイコン一式（ブラウザのタブ・スマホのホーム画面）を生成する。

デザイン（2026-09-19 DK 決定）: 黒地にゴールドの丸いリングを描き、その中に店名ロゴ
「O-RA / —TOKYO—」を同じゴールドで置く。

素材はサイネージのロゴ logo_type.png（白抜き・透過）の形だけを使い、HP と同じゴールドで塗る。
どのサイズも素材から直接 LANCZOS で縮小する（大きい PNG を縮小し直すと細部がぼやけるため）。

    python scripts/make-icons.py

出力:
    app/favicon.ico               16/32/48px   ブラウザのタブ
    app/apple-icon.png            180px        iPhone のホーム画面（不透明）
    public/icon-192.png           192px        Android のホーム画面（app/manifest.webmanifest から参照）
    public/icon-512.png           512px        同上
    public/icon-maskable-512.png  512px        Android で丸などの形に切り抜かれる用。
                                               切り抜かれても欠けないよう、リングを内側に寄せる

依存: Pillow。素材は OneDrive 上のサイネージの素材フォルダにある。
"""

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
LOGO_TYPE = Path(r"C:\Users\starx\OneDrive\o-ra tokyo\サイネージ\signage_img\logo_type.png")

DARK = (14, 14, 14)  # --color-dark
GOLD = (201, 168, 76)  # --color-gold

RING_D = 0.86  # リングの外径（アイコンの幅に対する比）
RING_D_MASKABLE = 0.72  # maskable 用。Android が残すのは中央の直径 80% の円（safe zone）
RING_W = 0.028  # リングの線幅（アイコンの幅に対する比）
LOGO_W = 0.76  # ロゴの幅（リングの内径に対する比）
SS = 4  # 円の縁を滑らかにするための描画倍率


def circle_mask(size, d):
    """中央に直径 d の円を描いたマスク。SS 倍で描いて縮小し、縁だけを滑らかにする。"""
    k = size * SS
    m = Image.new("L", (k, k), 0)
    c, r = k / 2, d * SS / 2
    ImageDraw.Draw(m).ellipse([c - r, c - r, c + r, c + r], fill=255)
    return m.resize((size, size), Image.LANCZOS)


def icon(logo, size, ring_d=RING_D):
    img = Image.new("RGB", (size, size), DARK)
    d_out = size * ring_d
    d_in = d_out - 2 * max(size * RING_W, 1.5)  # 16px でもリングが消えないよう最低 1.5px
    ring = ImageChops.subtract(circle_mask(size, d_out), circle_mask(size, d_in))
    img.paste(GOLD, (0, 0, size, size), ring)

    w = round(d_in * LOGO_W)
    a = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)
    x, y = round((size - a.width) / 2), round((size - a.height) / 2)
    img.paste(GOLD, (x, y, x + a.width, y + a.height), a)
    return img


def main():
    logo = Image.open(LOGO_TYPE).getchannel("A")
    logo = logo.crop(logo.getbbox())

    outputs = {
        ROOT / "app" / "apple-icon.png": icon(logo, 180),
        ROOT / "public" / "icon-192.png": icon(logo, 192),
        ROOT / "public" / "icon-512.png": icon(logo, 512),
        ROOT / "public" / "icon-maskable-512.png": icon(logo, 512, RING_D_MASKABLE),
    }
    for path, img in outputs.items():
        img.save(path, optimize=True)
        print(f"written: {path.relative_to(ROOT)}  {img.size}")

    # favicon.ico は各サイズを個別に描いて1ファイルに入れる（48px を縮小させない）
    fav = {s: icon(logo, s).convert("RGBA") for s in (16, 32, 48)}
    path = ROOT / "app" / "favicon.ico"
    fav[48].save(path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)],
                 append_images=[fav[16], fav[32]])
    print(f"written: {path.relative_to(ROOT)}  {sorted(Image.open(path).info['sizes'])}")


if __name__ == "__main__":
    main()
