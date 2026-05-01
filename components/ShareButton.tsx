"use client";

export function ShareButton() {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("URLをコピーしました。これ送る？");
  };

  return (
    <button onClick={copyUrl} className="rounded-full bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
      これ送る？
    </button>
  );
}
