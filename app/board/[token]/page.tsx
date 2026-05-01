"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShareButton } from "@/components/ShareButton";
import { SpotCard } from "@/components/SpotCard";
import type { Board, Section, Spot } from "@/lib/types";

const sections: { key: Section; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "day1", label: "Day1" },
  { key: "day2", label: "Day2" },
  { key: "maybe", label: "Maybe" },
  { key: "favorite", label: "お気に入り" }
];

export default function BoardPage({ params }: { params: { token: string } }) {
  const [board, setBoard] = useState<Board | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filter, setFilter] = useState<Section>("all");
  const [form, setForm] = useState({ title: "", memo: "", source_url: "", image_url: "", section: "maybe", tags: "" });

  const loadBoard = async () => {
    const { data } = await supabase.from("boards").select("*").eq("share_token", params.token).single();
    if (data) setBoard(data as Board);
  };

  const loadSpots = async () => {
    const { data } = await supabase.from("spots").select("*").eq("board_id", board?.id).order("created_at", { ascending: false });
    setSpots((data ?? []) as Spot[]);
  };

  useEffect(() => {
    loadBoard();
  }, []);

  useEffect(() => {
    if (board?.id) loadSpots();
  }, [board?.id]);

  const filtered = useMemo(() => {
    if (filter === "all") return spots;
    if (filter === "favorite") return spots.filter((s) => s.is_favorite);
    return spots.filter((s) => s.section === filter);
  }, [filter, spots]);

  const addSpot = async (e: FormEvent) => {
    e.preventDefault();
    if (!board?.id) return;
    const { error } = await supabase.from("spots").insert({
      board_id: board.id,
      title: form.title,
      memo: form.memo,
      source_url: form.source_url,
      image_url: form.image_url,
      section: form.section,
      is_favorite: false
    });
    if (error) return alert(error.message);
    setForm({ title: "", memo: "", source_url: "", image_url: "", section: "maybe", tags: "" });
    loadSpots();
  };

  if (!board) return <main className="p-10 text-sm">読み込み中...</main>;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">{board.title}</h1>
        <ShareButton />
      </header>

      <form onSubmit={addSpot} className="mb-8 grid gap-3 rounded-2xl bg-white p-4 md:grid-cols-2">
        <input placeholder="タイトル" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="元URL" value={form.source_url} onChange={(e) => setForm({ ...form, source_url: e.target.value })} />
        <input placeholder="画像URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <input placeholder="タグ(カンマ区切り)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
          <option value="day1">Day1</option>
          <option value="day2">Day2</option>
          <option value="maybe">Maybe</option>
        </select>
        <textarea placeholder="メモ" value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} />
        <button className="rounded-full bg-gray-900 px-5 py-2 text-sm text-white md:col-span-2">スポットを追加</button>
      </form>

      <div className="mb-5 flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`rounded-full px-3 py-1 text-xs ${filter === s.key ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <section className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {filtered.map((spot) => (
          <SpotCard key={spot.id} spot={spot} onFavoriteChange={loadSpots} />
        ))}
      </section>
    </main>
  );
}
