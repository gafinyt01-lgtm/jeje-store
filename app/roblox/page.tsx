import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import CustomRobux from "@/components/RobuxCustom";

export default function RobloxPage() {
  return <><Navbar/><main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-12 sm:px-6">
    <p className="text-xs font-black tracking-[.2em] text-blue-600">JEJE STORE / ROBLOX</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight">Top Up Roblox</h1>
    <p className="mt-3 max-w-2xl text-slate-500">Pilih paket Robux yang tersedia. Untuk nominal lain, gunakan form permintaan custom.</p>
    <div className="mt-10"><h2 className="mb-5 text-xl font-extrabold">Paket Robux</h2><ProductCatalog category="robux"/></div>
    <div className="mt-12"><CustomRobux/></div>
  </main><Footer/></>;
}
