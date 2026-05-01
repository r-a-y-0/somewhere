"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function makeToken() {
  return crypto.randomUUID().replaceAll("-", "").slice(0, 16);
}

export default function NewBoardPage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const shareToken = makeToken();
    const { error } = await supabase.from("boards").insert({ title, share_token: shareToken });
    setLoading(false);
    if (error) return alert(error.message);
    router.push(`/board/${shareToken}`);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-5 py-16">
      <h1 className="mb-6 text-2xl font-semibold">旅行ボードを作成</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">旅行名</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：2026 夏のソウル" required />
        <button disabled={loading} className="rounded-full bg-gray-900 px-5 py-2 text-sm text-white disabled:opacity-50">
          {loading ? "作成中..." : "作成する"}
        </button>
      </form>
    </main>
  );
}
