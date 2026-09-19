"""OGP 画像（public/og.jpg, 1200x630）を生成する。

LINE や SNS で URL を送ったときのプレビュー画像。トップのヒーローと同じ構成
（ENTERTAINMENT DINING / O-RA / ～ TOKYO ～ / ゴールドの線 / キャッチ）で描く。

背景写真を差し替えたら、このスクリプトを実行し直して画像を作り直す:

    python scripts/make-og-image.py

作り直したら lib/site.ts の OG_IMAGE_VERSION を 1 つ上げること。
LINE は URL 単位でプレビューをキャッシュするので、URL が同じだと古い画像が出続ける。

依存: Pillow。フォントは Windows 同梱のものを使う
（見出しの Cormorant Garamond の代わりに Garamond、和文はサイトと同じ Noto Serif JP）。
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BACKGROUND = ROOT / "public" / "images" / "gallery" / "gallery-04.jpg"
OUT = ROOT / "public" / "og.jpg"

W, H = 1200, 630

FONT_LATIN = r"C:\Windows\Fonts\GARA.TTF"
FONT_JP = r"C:\Windows\Fonts\NotoSerifJP-VF.ttf"
FONT_JP_FALLBACK = r"C:\Windows\Fonts\yuminl.ttf"

WHITE = (255, 255, 255)
GOLD = (201, 168, 76)  # --color-gold
DARK = (14, 14, 14)  # --color-dark


def jp_font(size, weight=300):
    """Noto Serif JP（可変フォント）を指定ウェイトで開く。使えなければ游明朝 Light。"""
    try:
        f = ImageFont.truetype(FONT_JP, size)
        f.set_variation_by_axes([weight])
        return f
    except Exception:
        return ImageFont.truetype(FONT_JP_FALLBACK, size)


class Line:
    """字間つきで1行を描く。ASCII は欧文フォント、それ以外は和文フォントで描き分ける。"""

    def __init__(self, text, size, spacing_em, alpha, latin=True):
        self.text = text
        self.spacing = size * spacing_em
        self.alpha = alpha
        latin_font = ImageFont.truetype(FONT_LATIN, size) if latin else None
        jp = jp_font(size)
        self.runs = [
            (ch, latin_font if (latin_font and ord(ch) < 0x100) else jp) for ch in text
        ]
        metrics = [f.getmetrics() for _, f in self.runs]
        self.ascent = max(a for a, _ in metrics)
        self.descent = max(d for _, d in metrics)

    @property
    def width(self):
        # 最後の文字の後ろの字間は含めない（中央揃えの見た目を合わせるため）
        return sum(f.getlength(ch) for ch, f in self.runs) + self.spacing * (len(self.runs) - 1)

    @property
    def height(self):
        return self.ascent + self.descent

    def draw(self, layer, top):
        d = ImageDraw.Draw(layer)
        x = (W - self.width) / 2
        baseline = top + self.ascent
        fill = WHITE + (int(255 * self.alpha),)
        for ch, f in self.runs:
            d.text((x, baseline), ch, font=f, fill=fill, anchor="ls")
            x += f.getlength(ch) + self.spacing


def background():
    """写真を 1200x630 に切り抜き、ヒーローと同じ調子で暗くする。"""
    src = Image.open(BACKGROUND).convert("RGB")
    scale = W / src.width
    src = src.resize((W, round(src.height * scale)), Image.LANCZOS)
    top = (src.height - H) // 2
    img = src.crop((0, top, W, top + H)).convert("RGBA")

    overlay = Image.new("RGBA", (W, H))
    od = ImageDraw.Draw(overlay)
    # 全体を落としたうえで、上下の端をさらに暗くする（中央の文字を読みやすく）
    for y in range(H):
        t = y / (H - 1)
        edge = abs(t - 0.5) * 2  # 中央 0 → 端 1
        a = 0.58 + 0.30 * edge ** 2
        od.line([(0, y), (W, y)], fill=DARK + (int(255 * a),))
    img = Image.alpha_composite(img, overlay)

    # 文字が乗る中央だけ、ぼかした楕円でさらに落とす。
    # 写真の中央下にボトルとグラスがあり、そのままだと「O」やキャッチと重なって読みにくい
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse(
        [W * 0.2, H * 0.1, W * 0.8, H * 0.9], fill=int(255 * 0.42)
    )
    mask = mask.filter(ImageFilter.GaussianBlur(80))
    shade = Image.new("RGBA", (W, H), DARK + (0,))
    shade.putalpha(mask)
    return Image.alpha_composite(img, shade)


def main():
    img = background()
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    eyebrow = Line("ENTERTAINMENT DINING", 17, 0.6, 0.55)
    name = Line("O-RA", 124, 0.2, 1.0)
    city = Line("～ TOKYO ～", 26, 0.7, 0.62)
    catch = Line("東京の夜を、あなただけの時間へ", 21, 0.3, 0.66, latin=False)
    rule_h = 44

    blocks = [(eyebrow, 24), (name, 16), (city, 34), ("rule", 26), (catch, 0)]
    total = sum((rule_h if b == "rule" else b.height) + gap for b, gap in blocks)
    y = (H - total) / 2

    for block, gap in blocks:
        if block == "rule":
            ImageDraw.Draw(layer).rectangle(
                [W / 2 - 0.75, y, W / 2 + 0.75, y + rule_h], fill=GOLD + (255,)
            )
            y += rule_h + gap
        else:
            block.draw(layer, y)
            y += block.height + gap

    out = Image.alpha_composite(img, layer).convert("RGB")
    out.save(OUT, quality=86, optimize=True, progressive=True)
    print(f"written: {OUT}  {out.size}  {OUT.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
