"""キャスト一覧に並べるブランドロゴのカード画像（public/images/cast/cast-07.jpg）を生成する。

DK の指定（2026-09-19）: ロゴマーク全部入りの画像でキャストを一人追加する。
ロゴの完全版（円弧の ENTERTAINMENT GIRLS BAR ＋ 顔 ＋ O-RA / TOKYO）のうち、
暗い背景用に文字を白にした logo_ora_white.png を、他のキャスト写真と同じ 747x1000 の中央に置く。

    python scripts/make-logo-cast.py

依存: Pillow。素材は OneDrive 上のサイネージの素材フォルダにある。
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOGO = Path(r"C:\Users\starx\OneDrive\o-ra tokyo\サイネージ\signage_img\logo_ora_white.png")
OUT = ROOT / "public" / "images" / "cast" / "cast-07.jpg"

W, H = 747, 1000  # 他のキャスト写真と同じ（3:4）
BG = (26, 26, 26)  # CAST ページの画像枠の背景 #1a1a1a と同じ
LOGO_W = 0.80  # ロゴの幅（画像の幅に対する比）


def main():
    logo = Image.open(LOGO).convert("RGBA")
    logo = logo.crop(logo.getbbox())
    w = round(W * LOGO_W)
    logo = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)

    img = Image.new("RGB", (W, H), BG)
    img.paste(logo, ((W - logo.width) // 2, (H - logo.height) // 2), logo)
    img.save(OUT, quality=90, optimize=True, progressive=True)
    print(f"written: {OUT.relative_to(ROOT)}  {img.size}  {OUT.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
