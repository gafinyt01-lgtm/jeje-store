"use client";

import { MessageCircle, Image as ImageIcon } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/types";
import { whatsappUrl } from "@/lib/whatsapp";

export default function ProductCard({ product }: { product: Product }) {
  const detail = product.category === "ml"
    ? `Halo JEJE STORE, saya tertarik dengan akun ML: ${product.title}. Harga: ${formatRupiah(product.price)}. Apakah masih tersedia?`
    : `Halo JEJE STORE, saya ingin membeli ${product.title} seharga ${formatRupiah(product.price)}.`;
  const link = whatsappUrl(detail);
  const image = product.images?.[0];

  return <article className="card-animated overflow-hidden rounded-3xl border border-slate-100 bg-white p-3 shadow-sm">
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
      {image ? <img src={image} alt={product.title} className="h-full w-full object-cover" /> : <div className="flex flex-col items-center gap-2 text-slate-400"><ImageIcon size={32}/><span className="text-xs">Belum ada foto</span></div>}
      {!product.is_available && <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white">Terjual / Habis</span>}
    </div>
    <div className="p-2 pt-4">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{product.category === "ml" ? "Akun Mobile Legends" : "Roblox"}</p>
      <h3 className="mt-1 line-clamp-1 text-lg font-extrabold text-slate-900">{product.title}</h3>
      {product.description && <p className="mt-2 line-clamp-2 text-sm text-slate-500">{product.description}</p>}
      {product.specs && Object.keys(product.specs).length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{Object.entries(product.specs).slice(0,3).map(([k,v]) => <span key={k} className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">{k}: {v}</span>)}</div>}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div><p className="text-[11px] text-slate-400">Harga</p><p className="text-base font-black text-slate-900">{formatRupiah(product.price)}</p></div>
        {link && product.is_available ? <a href={link} target="_blank" rel="noreferrer" className="btn-animated inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-bold text-white"><MessageCircle size={15}/> Beli</a> : <span className="rounded-xl bg-slate-100 px-3 py-3 text-xs font-bold text-slate-400">{product.is_available ? "Atur WhatsApp" : "Tidak tersedia"}</span>}
      </div>
    </div>
  </article>;
}
