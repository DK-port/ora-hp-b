// lib/pokepara.ts の読み取りのテスト。実行: node --test scripts/pokepara.test.mts
// fixtures は 2026-10-22 01:20 に取得したポケパラの埋め込み用ページ（女の子一覧 11人・本日出勤 4人、ブログ 12件）
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseBlog, parseGalList } from "../lib/pokepara.ts";

const fixture = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8");

test("女の子一覧: 11人を名前の順に読む", () => {
  const casts = parseGalList(fixture("pokepara-gal-list.html"));
  assert.deepEqual(casts.map(c => c.name),
    ["朝陽", "ルリ", "ユキホ", "エマ", "リオン", "ベティ", "ノア", "イズミ", "リン", "ウララ", "サユ"]);
});

test("女の子一覧: 本日出勤は4人で、時刻を HP の表記にそろえる", () => {
  const casts = parseGalList(fixture("pokepara-gal-list.html"));
  assert.deepEqual(casts.filter(c => c.today).map(c => `${c.name} ${c.today}`),
    ["ユキホ 19:30〜", "エマ 20:00〜", "リオン 19:00〜", "ノア 19:00〜"]);
});

test("女の子一覧: 写真は中サイズ、no photo は null", () => {
  const casts = parseGalList(fixture("pokepara-gal-list.html"));
  const asahi = casts.find(c => c.name === "朝陽")!;
  assert.equal(asahi.id, "860360");
  assert.match(asahi.photo!, /\/gal\/860360\/photo\/profile\/.+_m\.jpg$/);
  assert.equal(asahi.profileUrl, "https://www.pokepara.jp/tokyo/m9/a10035/shop24352/gal/860360/");
  assert.equal(asahi.catch, "あじあんびゅーてぃ");
  assert.equal(casts.find(c => c.name === "ルリ")!.photo, null);
});

test("女の子一覧: プロフィールを公開していないキャスト（リン）はリンクなし", () => {
  const rin = parseGalList(fixture("pokepara-gal-list.html")).find(c => c.name === "リン")!;
  assert.equal(rin.id, "860367");
  assert.equal(rin.profileUrl, null);
  assert.match(rin.photo!, /_m\.jpg$/);
});

test("ブログ: 12件を新しい順に読む", () => {
  const blogs = parseBlog(fixture("pokepara-blog.html"));
  assert.equal(blogs.length, 12);
  assert.deepEqual(blogs[0], {
    castId: "860360",
    name: "朝陽",
    title: "バニーガールの危機",
    time: "10/21 21:00",
    photo: blogs[0].photo,
    url: "https://www.pokepara.jp/tokyo/m9/a10035/shop24352/gal/860360/blog/diary_45103832.html",
  });
  assert.match(blogs[0].photo!, /_m\.jpg$/);
  assert.ok(blogs.every(b => b.castId && b.name && b.time));
});

test("作りが変わったページ（中身が無い）では空になる", () => {
  assert.deepEqual(parseGalList("<html><body>メンテナンス中</body></html>"), []);
  assert.deepEqual(parseBlog("<html><body>メンテナンス中</body></html>"), []);
});
