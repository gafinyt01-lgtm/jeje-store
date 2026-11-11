"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductCategory } from "@/lib/types";
import { formatRupiah } from "@/lib/types";
import { LogOut, Plus, Trash2, UploadCloud, Package, RefreshCw } from "lucide-react";

const emptyForm = { category: "ml" as ProductCategory, title: "", price: "", description: "", specs: "", is_available: true };

export default function AdminDashboard() {
  const router = useRouter();
  const [products,setProducts] = useState<Product[]>([]);
  const [form,setForm] = useState(emptyForm);
  const [files,setFiles] = useState<FileList | null>(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) { router.replace("/admin/login"); return; }
      const { data, error } = await supabase.from("products").select("*").order("created_at",{ascending:false});
      if (error) throw error;
      setProducts((data || []) as Product[]);
    } catch(e) { setError(e instanceof Error ? e.message : "Gagal memuat data."); }
    finally { setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login"); router.refresh();
  }

  async function uploadImages(supabase: ReturnType<typeof createClient>, selected: FileList | null) {
    const urls: string[] = [];
    if (!selected) return urls;
    for (const file of Array.from(selected)) {
      if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar.");
      if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran setiap gambar maksimal 5 MB.");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g,"-");
      const path = `${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage.from("product-images").upload(path,file,{upsert:false});
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function addProduct(e: FormEvent) {
    e.preventDefault(); setSaving(true); setMessage(""); setError("");
    try {
      const price = Number(form.price);
      if (!form.title.trim() || !Number.isFinite(price) || price < 0) throw new Error("Isi nama produk dan harga yang valid.");
      const specs: Record<string,string> = {};
      form.specs.split("\n").filter(Boolean).forEach(line => {
        const i = line.indexOf(":");
        if (i > 0) specs[line.slice(0,i).trim()] = line.slice(i+1).trim();
      });
      const supabase = createClient();
      const images = await uploadImages(supabase,files);
      const { error } = await supabase.from("products").insert({
        category: form.category, title: form.title.trim(), price,
        description: form.description.trim() || null, specs, images,
        is_available: form.is_available
      });
      if (error) throw error;
      setForm(emptyForm); setFiles(null);
      const input = document.getElementById("product-images") as HTMLInputElement | null;
      if (input) input.value = "";
      setMessage("Produk berhasil ditambahkan.");
      await load();
    } catch(e) { setError(e instanceof Error ? e.message : "Gagal menyimpan produk."); }
    finally { setSaving(false); }
  }

  async function toggleAvailability(product: Product) {
    const supabase = createClient();
    const { error } = await supabase.from("products").update({is_available:!product.is_available}).eq("id",product.id);
    if (error) setError(error.message); else await load();
  }

  async function deleteProduct(product: Product) {
    if (!confirm(`Hapus produk "${product.title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id",product.id);
    if (error) setError(error.message); else { setMessage("Produk dihapus."); await load(); }
  }

  return <main className="min-h-screen bg-slate-50">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><div><p className="text-xs font-bold tracking-widest text-blue-600">JEJE STORE</p><h1 className="text-xl font-black">Admin Dashboard</h1></div><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold text-slate-600"><LogOut size={16}/> Keluar</button></div></header>
    <div className="mx-auto grid max-w-6xl gap-7 px-4 py-8 lg:grid-cols-[.9fr_1.1fr]">
      <section className="h-fit rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-2"><Plus className="text-blue-600"/><h2 className="text-xl font-black">Tambah produk</h2></div>
        <form onSubmit={addProduct} className="mt-6 space-y-4">
          <label className="block text-sm font-bold">Kategori<select value={form.category} onChange={e=>setForm({...form,category:e.target.value as ProductCategory})} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3"><option value="ml">Akun Mobile Legends</option><option value="robux">Paket Roblox</option></select></label>
          <label className="block text-sm font-bold">Nama produk<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={form.category==="ml"?"Contoh: Akun Mythic 120 Skin":"Contoh:  Robux Paket 400"} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"/></label>
          <label className="block text-sm font-bold">Harga (Rupiah)<input required type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="150000" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"/></label>
          <label className="block text-sm font-bold">Deskripsi<textarea rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Deskripsi produk..." className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"/></label>
          <label className="block text-sm font-bold">Spesifikasi <span className="font-normal text-slate-400">(satu baris: Kunci: Nilai)</span><textarea rows={4} value={form.specs} onChange={e=>setForm({...form,specs:e.target.value})} placeholder={"Rank: Mythic\nSkin: 120\nHero: 85"} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"/></label>
          <label className="block text-sm font-bold">Upload foto <span className="font-normal text-slate-400">(maks. 5 MB per gambar)</span><span className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 text-sm text-blue-700"><UploadCloud/> Pilih satu atau beberapa gambar<input id="product-images" type="file" accept="image/*" multiple onChange={e=>setFiles(e.target.files)} className="sr-only"/></span>{files && <span className="mt-2 block text-xs text-slate-500">{files.length} gambar dipilih</span>}</label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.is_available} onChange={e=>setForm({...form,is_available:e.target.checked})}/> Produk tersedia</label>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          <button disabled={saving} className="btn-animated w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white disabled:opacity-60">{saving?"Menyimpan...":"Simpan produk"}</button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-black tracking-widest text-blue-600">INVENTARIS</p><h2 className="mt-1 text-2xl font-black">Produk toko</h2></div><button onClick={load} className="rounded-xl border bg-white p-3 text-slate-600"><RefreshCw size={17}/></button></div>
        {loading ? <div className="rounded-2xl bg-white p-8 text-center text-slate-500">Memuat produk...</div> : !products.length ? <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500"><Package className="mx-auto mb-3"/><p className="font-bold">Belum ada produk</p><p className="mt-1 text-sm">Tambahkan produk pertama melalui form.</p></div> : <div className="space-y-3">{products.map(p=><article key={p.id} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">{p.images?.[0] ? <img src={p.images[0]} alt="" className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>}</div>
          <div className="min-w-0 flex-1"><p className="text-[10px] font-black uppercase tracking-wider text-blue-600">{p.category}</p><p className="truncate font-extrabold">{p.title}</p><p className="text-sm font-bold text-slate-600">{formatRupiah(p.price)}</p><button onClick={()=>toggleAvailability(p)} className="mt-1 text-xs font-bold text-blue-600">{p.is_available?"Tersedia — ubah status":"Habis — ubah status"}</button></div>
          <button onClick={()=>deleteProduct(p)} aria-label="Hapus produk" className="self-start rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={17}/></button>
        </article>)}</div>}
      </section>
    </div>
  </main>;
}
