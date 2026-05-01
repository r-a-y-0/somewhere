import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-5 py-16">
      <h1 className="mb-4 text-3xl font-semibold">Travel Board</h1>
      <p className="mb-10 text-sm leading-7 text-gray-600">
        Instagram / TikTok / GoogleMap / Webで見つけた「ここ良さそう」を1つに集めるための、ログイン不要ボードです。
      </p>
      <Link href="/board/new" className="inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm text-white hover:bg-black">
        新しい旅行ボードを作る
      </Link>
    </main>
  );
}
