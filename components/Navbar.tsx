import Link from "next/link";
import { Gamepad2, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Navbar() {
  const contact = whatsappUrl("Halo JEJE STORE, saya ingin bertanya.");
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200"><Gamepad2 size={22}/></span>
          <span className="text-xl font-black tracking-tight text-slate-950">JEJE <span className="text-blue-600">STORE</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/roblox" className="hidden text-sm font-semibold text-slate-600 hover:text-blue-600 sm:block">Roblox</Link>
          <Link href="/mobile-legends" className="hidden text-sm font-semibold text-slate-600 hover:text-blue-600 sm:block">Akun ML</Link>
          {contact ? <a href={contact} target="_blank" rel="noreferrer" className="btn-animated inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white sm:text-sm"><MessageCircle size={16}/> WhatsApp</a> : <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">WhatsApp belum diatur</span>}
        </div>
      </nav>
    </header>
  );
}
