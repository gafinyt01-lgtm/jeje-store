import Link from "next/link";
export default function Footer() {
  return <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
    <p className="font-black tracking-wide text-slate-800">JEJE STORE</p>
    <p className="mt-2">© {new Date().getFullYear()} JEJE STORE. Semua hak dilindungi.</p>
    <div className="mt-3 flex justify-center gap-4"><Link href="/roblox">Top Up Roblox</Link><Link href="/mobile-legends">Akun ML</Link><Link href="/admin/login">Admin</Link></div>
  </footer>;
}
