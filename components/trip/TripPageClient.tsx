"use client";
import { useMemo, useState } from "react";
import { dummyTrip } from "@/lib/dummyData";
import { calculateSplit } from "@/lib/split";
import type { ItineraryItem, ItineraryType, Payment, PaymentCategory } from "@/types/trip";

type Tab = "itinerary" | "split";
const typeColor: Record<ItineraryType, string> = { Sightseeing:"bg-blue-500", Dining:"bg-orange-500", "Café":"bg-green-500", Architecture:"bg-gray-500", Shopping:"bg-pink-500", Transit:"bg-white text-black", Stay:"bg-purple-500", "To-Do":"bg-yellow-500 text-black" };

export default function TripPageClient() {
  const [tab, setTab] = useState<Tab>("itinerary");
  const [view, setView] = useState<"today" | "board">("today");
  const [name, setName] = useState(typeof window !== "undefined" ? localStorage.getItem("trip-nickname") || "" : "");
  const [itineraries, setItineraries] = useState(dummyTrip.itineraries);
  const [payments, setPayments] = useState(dummyTrip.payments);
  const members = dummyTrip.members.map((m) => m.name);
  const today = dummyTrip.startDate;
  const summary = useMemo(() => calculateSplit(payments, members), [payments]);

  const grouped = useMemo(() => itineraries.reduce<Record<string, ItineraryItem[]>>((acc, item) => {
    (acc[item.date] ||= []).push(item); return acc;
  }, {}), [itineraries]);

  const addItinerary = () => {
    const nameInput = prompt("予定名"); if (!nameInput) return;
    const date = prompt("日付 YYYY-MM-DD", dummyTrip.startDate) || dummyTrip.startDate;
    const time = prompt("時刻 HH:mm", "10:00") || "10:00";
    const type = (prompt("Type", "Sightseeing") as ItineraryType) || "Sightseeing";
    const item: ItineraryItem = { id: crypto.randomUUID(), name: nameInput, date, time, type, status: "Idea", createdBy: name || "Guest", updatedBy: name || "Guest" };
    setItineraries((prev) => [item, ...prev]);
  };

  const addPayment = () => {
    const title = prompt("支払いタイトル"); if (!title) return;
    const amount = Number(prompt("金額", "0") || 0);
    const paidBy = prompt(`誰が払った？ (${members.join(", ")})`, members[0]) || members[0];
    const payment: Payment = { id: crypto.randomUUID(), title, amount, date: today, currency: "AUD", paidBy, participants: members, category: "Other" as PaymentCategory, createdBy: name || "Guest" };
    setPayments((prev) => [payment, ...prev]);
  };

  const join = () => { const n = prompt("ニックネーム") || "Guest"; setName(n); localStorage.setItem("trip-nickname", n); };

  return <main className="mx-auto min-h-screen max-w-md bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
    <header className="sticky top-0 z-10 border-b border-zinc-200/70 bg-white/90 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="flex items-start justify-between gap-2"><div><p className="text-lg font-semibold">{dummyTrip.name}</p><p className="text-xs text-zinc-500">{dummyTrip.startDate} - {dummyTrip.endDate}</p></div><button onClick={()=>navigator.clipboard.writeText(window.location.href)} className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">共有</button></div>
      <div className="mt-3 flex items-center gap-2">{dummyTrip.members.map((m)=><span key={m.id} className="rounded-full bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700">{m.avatar}</span>)}<button onClick={join} className="text-xs underline">{name?`参加中: ${name}`:"ニックネーム参加"}</button></div>
      <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={addItinerary} className="rounded-xl bg-blue-600 py-2 text-sm font-medium text-white">ADD</button><button onClick={addPayment} className="rounded-xl bg-emerald-600 py-2 text-sm font-medium text-white">PAY</button></div>
      <div className="mt-3 flex gap-2 text-sm"><button onClick={()=>setTab("itinerary")} className={`rounded-full px-3 py-1 ${tab==="itinerary"?"bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900":"bg-zinc-200 dark:bg-zinc-700"}`}>Itinerary</button><button onClick={()=>setTab("split")} className={`rounded-full px-3 py-1 ${tab==="split"?"bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900":"bg-zinc-200 dark:bg-zinc-700"}`}>Split</button></div>
    </header>
    <section className="p-4 pb-24">{tab==="itinerary" ? <>
      <div className="mb-3 flex gap-2 text-xs"><button className={`rounded-full px-3 py-1 ${view==="today"?"bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900":"bg-zinc-200 dark:bg-zinc-700"}`} onClick={()=>setView("today")}>Today</button><button className={`rounded-full px-3 py-1 ${view==="board"?"bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900":"bg-zinc-200 dark:bg-zinc-700"}`} onClick={()=>setView("board")}>Board</button></div>
      {view==="today" ? itineraries.filter(i=>i.date===today).sort((a,b)=>a.time.localeCompare(b.time)).map(i=><article key={i.id} className="mb-3 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900"><div className="mb-2 flex items-center justify-between"><span className={`rounded-full px-2 py-1 text-[11px] ${typeColor[i.type]}`}>{i.type}</span><span className="text-xs text-zinc-500">{i.time}</span></div><p className="font-medium">{i.name}</p><p className="mt-1 text-xs text-zinc-500">{i.status} · by {i.createdBy}</p><a href={i.mapUrl || "#"} target="_blank" className={`mt-2 inline-block rounded-lg px-3 py-1 text-xs ${i.mapUrl?"bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900":"pointer-events-none bg-zinc-200 text-zinc-400 dark:bg-zinc-700"}`}>MAP</a></article>) : Object.entries(grouped).sort().map(([date,items])=><div key={date} className="mb-4"><p className="mb-2 text-xs font-semibold text-zinc-500">{date}</p>{items.sort((a,b)=>a.time.localeCompare(b.time)).map(i=><article key={i.id} className="mb-2 rounded-xl bg-white p-3 dark:bg-zinc-900"><p className="text-sm">{i.time} · {i.name}</p><p className="text-xs text-zinc-500">{i.type} · by {i.updatedBy}</p></article>)}</div>)}
    </> : <>
      <div className="mb-3 grid grid-cols-2 gap-2 text-sm"><div className="rounded-xl bg-white p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">総支出</p><p className="font-semibold">{payments.reduce((s,p)=>s+p.amount,0).toFixed(2)} AUD</p></div><div className="rounded-xl bg-white p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">1人あたり目安</p><p className="font-semibold">{(payments.reduce((s,p)=>s+p.amount,0)/members.length).toFixed(2)} AUD</p></div></div>
      <div className="mb-3 rounded-xl bg-white p-3 dark:bg-zinc-900">{members.map(m=>{const b=summary.balance[m]||0;return <p key={m} className="text-sm">{m}: {b>=0?`受け取り ${b.toFixed(2)}`:`支払い ${Math.abs(b).toFixed(2)}`} AUD</p>;})}</div>
      <div className="mb-3 rounded-xl bg-white p-3 dark:bg-zinc-900"><p className="mb-2 text-sm font-semibold">精算案</p>{summary.settlements.map((s,idx)=><p key={idx} className="text-sm">{s.from} → {s.to}: {s.amount.toFixed(2)} AUD</p>)}</div>
      {payments.map(p=><article key={p.id} className="mb-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900"><p className="text-sm font-medium">{p.title} · {p.amount} {p.currency}</p><p className="text-xs text-zinc-500">{p.date} · {p.category} · paid by {p.paidBy} · by {p.createdBy}</p></article>)}
    </>}
    </section>
  </main>;
}
