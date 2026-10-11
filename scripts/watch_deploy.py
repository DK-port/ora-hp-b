"""本番に目印が出るまで待つ。15秒ごと、最長8分。

使い方: python watch_deploy.py "<目印>" "<完全な URL>"
  ⚠️ URL はパスだけ（"/gallery"）で渡さないこと。Git Bash が Windows のパスに
     変換してしまう（2026-09-27 に8分空振りした）。必ず https:// から書く。
  ⚠️ 出力をパイプ（| tail など）に通さないこと。終わるまで何も見えなくなる。
"""
import sys
import time
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")
MARK = sys.argv[1]
URL = sys.argv[2] if len(sys.argv) > 2 else "https://ora-tokyo.com/"
print(f"待機開始 {time.strftime('%H:%M:%S')} / 目印 {MARK!r} / {URL}", flush=True)
deadline = time.time() + 480
while time.time() < deadline:
    try:
        req = urllib.request.Request(f"{URL}?watch={int(time.time())}",
                                     headers={"User-Agent": "Mozilla/5.0 (deploy-watch)", "Cache-Control": "no-cache"})
        doc = urllib.request.urlopen(req, timeout=20).read().decode("utf-8")
        if MARK in doc:
            print(f"deployed {time.strftime('%H:%M:%S')}")
            sys.exit(0)
        print(f"waiting {time.strftime('%H:%M:%S')}", flush=True)
    except Exception as e:
        print(f"error {time.strftime('%H:%M:%S')} {e}", flush=True)
    time.sleep(15)
print("timeout")
sys.exit(1)
