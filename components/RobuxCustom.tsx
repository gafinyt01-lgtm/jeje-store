"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export default function CustomRobux() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const value = Number(amount);
  const link = value > 0 && Number.isSafeInteger(value) ? whatsappUrl(`Halo JEJE STORE, saya ingin tanya top up Roblox custom sebanyak ${value} Robux. ${note}`) : "";
  return <section className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
    <p className="text-xs font-black tracking-widest text-blue-700">NOMINAL CUSTOM</p>
    <h2 className="mt-2 text-2xl font-black">Butuh jumlah Robux lain?</h2>
    <p className="mt-2 text-sm text-slate-600">Masukkan jumlah Robux. Admin akan mengonfirmasi harga dan ketersediaannya melalui WhatsApp.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <label className="text-sm font-semibold text-slate-700">Jumlah Robux<input type="number" min="1" step="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Contoh: 500" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"/></label>
      <label className="text-sm font-semibold text-slate-700">Catatan (opsional)<input value={note} onChange={e=>setNote(e.target.value)} placeholder="Catatan pesanan" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"/></label>
      <div className="flex items-end">{link ? <a href={link} target="_blank" rel="noreferrer" className="btn-animated inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white sm:w-auto"><MessageCircle size={17}/> Tanya harga</a> : <button disabled className="w-full rounded-xl bg-slate-300 px-5 py-3.5 font-bold text-white sm:w-auto">Tanya harga</button>}</div>
    </div>
  </section>;
}
