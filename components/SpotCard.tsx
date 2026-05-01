"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Spot } from "@/lib/types";

export function SpotCard({ spot, onFavoriteChange }: { spot: Spot; onFavoriteChange: () => void }) {
  const [imgError, setImgError] = useState(false);

  const toggleFavorite = async () => {
    await supabase.from("spots").update({ is_favorite: !spot.is_favorite }).eq("id", spot.id);
    onFavoriteChange();
  };

  return (
    <article className="mb-4 break-inside-avoid rounded-2xl bg-white p-3 shadow-sm">
      <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-100">
        {!imgError && spot.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={spot.image_url} alt={spot.title} className="h-auto w-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <div className="flex h-40 items-center justify-center text-sm text-gray-500">No image</div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{spot.title}</h3>
        {spot.memo && <p className="text-xs text-gray-500">{spot.memo}</p>}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] uppercase text-gray-500">{spot.section}</span>
          <button onClick={toggleFavorite} className="text-lg" aria-label="favorite">
            {spot.is_favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}
