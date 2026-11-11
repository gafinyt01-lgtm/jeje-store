import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";

export default function MobileLegendsPage() {
  return <><Navbar/><main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-12 sm:px-6">
    <p className="text-xs font-black tracking-[.2em] text-blue-600">JEJE STORE / MOBILE LEGENDS</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight">Akun Mobile Legends</h1>
    <p className="mt-3 max-w-2xl text-slate-500">Lihat stok akun yang tersedia beserta foto, rank, skin, hero, dan spesifikasi lainnya.</p>
    <div className="mt-10"><ProductCatalog category="ml"/></div>
    <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Catatan: pastikan setiap transaksi jual beli akun mematuhi ketentuan resmi Mobile Legends dan lakukan pemeriksaan keamanan sebelum pembayaran.</p>
  </main><Footer/></>;
}
