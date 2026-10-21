"use client";
import { useEffect, useState } from "react";
import type { PokeparaCast, PokeparaData } from "@/lib/pokepara";
import { POKEPARA } from "@/lib/site";

// CAST ページとトップの「在籍キャスト」。データは /api/pokepara（functions/api/pokepara.ts）がポケパラから読んだもの。
// 見た目は globals.css の .pp-*。

/** 写真をまだ登録していないキャストは O-RA のロゴのカードを出す */
const NO_PHOTO = "/images/cast/cast-07.jpg";

type State = { status: "loading" } | { status: "ok"; data: PokeparaData } | { status: "error" };

function usePokepara(): State {
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    let alive = true;
    fetch("/api/pokepara")
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: PokeparaData) => { if (alive) setState({ status: "ok", data }); })
      .catch(() => { if (alive) setState({ status: "error" }); });
    return () => { alive = false; };
  }, []);
  return state;
}

/** 本日出勤のキャストを出勤時刻の早い順に。0時〜5時は翌日の深夜として後ろへ */
function todayCasts(casts: PokeparaCast[]) {
  const minutes = (t: string) => {
    const [h, m] = t.split(":").map(n => parseInt(n, 10) || 0);
    return (h < 6 ? h + 24 : h) * 60 + m;
  };
  return casts.filter(c => c.today).sort((a, b) => minutes(a.today!) - minutes(b.today!));
}

function CastCard({ cast }: { cast: PokeparaCast }) {
  const body = (
    <>
      <div className="pp-photo"><img src={cast.photo ?? NO_PHOTO} alt={cast.name} loading="lazy" /></div>
      <div className="pp-body">
        <p className="pp-name">{cast.name}</p>
        {cast.today && <p className="pp-today">本日 {cast.today}</p>}
        {cast.catch && <p className="pp-catch">{cast.catch}</p>}
      </div>
    </>
  );
  // プロフィールを公開していないキャストはリンクにしない
  return cast.profileUrl
    ? <a href={cast.profileUrl} target="_blank" rel="noopener noreferrer" className="pp-card">{body}</a>
    : <div className="pp-card">{body}</div>;
}

function ShopLink({ children }: { children: React.ReactNode }) {
  return <a href={POKEPARA.shopUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
}

/** CAST ページ: 本日出勤／全員の切り替え、カード、ブログの新着 */
export function CastBoard() {
  const state = usePokepara();
  const [tab, setTab] = useState<"today" | "all" | null>(null);

  if (state.status === "loading") return <div className="pp-loading" aria-busy="true" />;
  if (state.status === "error") {
    return <p className="pp-empty">キャスト情報を読み込めませんでした。<br /><ShopLink>ポケパラで見る →</ShopLink></p>;
  }

  const { casts, blogs } = state.data;
  const today = todayCasts(casts);
  // 最初は本日出勤を出す。本日出勤がまだ登録されていなければ全員
  const current = tab ?? (today.length > 0 ? "today" : "all");
  const list = current === "today" ? today : casts;

  return (
    <>
      <div className="pp-tabs" role="tablist">
        <button role="tab" aria-selected={current === "today"} onClick={() => setTab("today")}>本日出勤 {today.length}</button>
        <button role="tab" aria-selected={current === "all"} onClick={() => setTab("all")}>全員 {casts.length}</button>
      </div>
      {list.length > 0
        ? <div className="pp-grid">{list.map(c => <CastCard key={c.id} cast={c} />)}</div>
        : <p className="pp-empty">本日の出勤はまだ登録されていません。</p>}

      {blogs.length > 0 && (
        <div className="pp-blog">
          <span className="section-eyebrow">BLOG</span>
          <h2 className="section-title">キャストブログ</h2>
          <ul className="pp-blog-list">
            {blogs.map(b => (
              <li key={b.url}>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  <img src={b.photo ?? NO_PHOTO} alt="" loading="lazy" />
                  <div>
                    <p className="pp-blog-title">{b.title}</p>
                    <p className="pp-blog-meta">{b.name}　{b.time}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="pp-source">キャスト・出勤・ブログは <ShopLink>ポケパラ</ShopLink> の掲載から表示しています</p>
    </>
  );
}

/** トップ: 本日出勤のキャストを4人まで（本日出勤がいなければ在籍から4人）。読めないときは何も出さない */
export function CastPreview() {
  const state = usePokepara();
  if (state.status === "loading") return <div className="pp-loading pp-loading-short" aria-busy="true" />;
  if (state.status === "error") return null;
  const today = todayCasts(state.data.casts);
  const list = (today.length > 0 ? today : state.data.casts).slice(0, 4);
  return <div className="pp-grid">{list.map(c => <CastCard key={c.id} cast={c} />)}</div>;
}
