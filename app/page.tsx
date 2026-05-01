import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Trip Share + Split MVP</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">ログイン不要。URLを送るだけで旅程と割り勘を共有。</p>
      <Link href="/trip/syd-mel-2026" className="rounded-full bg-zinc-900 px-5 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">デモを開く</Link>
    </main>
  );
}
