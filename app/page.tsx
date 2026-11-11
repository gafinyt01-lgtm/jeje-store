import Link from "next/link";
import { ArrowUpRight, Gamepad2, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Home() {
  const contact = whatsappUrl("Halo JEJE STORE, saya ingin bertanya tentang produk.");
  return <main>
    <Navbar/>
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100 blur-3xl"/>
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-sky-100 blur-3xl"/>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold tracking-widest text-blue-700"><Zap size={14}/> GAMING MARKETPLACE</span>
          <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">Semua kebutuhan gaming, <span className="text-blue-600">di satu tempat.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">Top up Roblox dan temukan akun Mobile Legends pilihanmu dengan proses pemesanan langsung melalui WhatsApp.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/roblox" className="btn-animated inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white">Jelajahi produk <ArrowUpRight size={18}/></Link>
            {contact && <a href={contact} target="_blank" rel="noreferrer" className="btn-animated inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700"><MessageCircle size={18}/> Hubungi admin</a>}
          </div>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-3 sm:max-w-xl">
          {[["Praktis","Pesan via WhatsApp"],["Transparan","Harga ditampilkan"],["Responsif","Nyaman di HP"]].map(([a,b])=><div key={a} className="rounded-2xl border border-slate-100 bg-white/80 p-3 shadow-sm backdrop-blur"><p className="text-sm font-extrabold text-slate-900">{a}</p><p className="mt-1 text-[11px] text-slate-500 sm:text-xs">{b}</p></div>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8"><p className="text-xs font-black tracking-[.2em] text-blue-600">PILIH LAYANAN</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Mau cari apa hari ini?</h2><p className="mt-2 text-slate-500">Pilih kategori untuk melihat produk yang tersedia.</p></div>
      <div className="grid gap-5 md:grid-cols-2">
        <Link href="/roblox" className="card-animated group rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Gamepad2 size={30}/></div>
          <p className="mt-8 text-xs font-black tracking-widest text-blue-600">TOP UP GAME</p><h3 className="mt-2 text-3xl font-black text-slate-950">Roblox</h3><p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Pilih paket Robux atau tanyakan nominal khusus kepada admin.</p><span className="mt-7 inline-flex items-center gap-2 font-bold text-blue-600">Lihat paket <ArrowUpRight size={18}/></span>
        </Link>
        <Link href="/mobile-legends" className="card-animated group rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><ShieldCheck size={30}/></div>
          <p className="mt-8 text-xs font-black tracking-widest text-indigo-600">MARKETPLACE AKUN</p><h3 className="mt-2 text-3xl font-black text-slate-950">Mobile Legends</h3><p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Jelajahi stok akun lengkap dengan foto, spesifikasi, dan harga.</p><span className="mt-7 inline-flex items-center gap-2 font-bold text-indigo-600">Lihat stok <ArrowUpRight size={18}/></span>
        </Link>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6"><div className="rounded-[2rem] bg-blue-600 px-6 py-10 text-center text-white sm:px-12"><h2 className="text-2xl font-black sm:text-3xl">Ada yang ingin ditanyakan?</h2><p className="mt-3 text-sm text-blue-100">Hubungi JEJE STORE untuk informasi produk dan pemesanan.</p>{contact && <a href={contact} target="_blank" rel="noreferrer" className="btn-animated mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700"><MessageCircle size={18}/> Chat WhatsApp</a>}</div></section>
    <Footer/>
  </main>;
}
