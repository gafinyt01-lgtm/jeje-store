"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Gamepad2, LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace("/admin"); router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login gagal.");
    } finally { setBusy(false); }
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600">← Kembali ke toko</Link>
      <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white"><Gamepad2 size={28}/></div>
      <h1 className="mt-6 text-3xl font-black">Admin JEJE STORE</h1>
      <p className="mt-2 text-sm text-slate-500">Masuk untuk mengelola katalog dan stok toko.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block text-sm font-bold">Email<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder="admin@email.com"/></label>
        <label className="block text-sm font-bold">Password<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder="Password admin"/></label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="btn-animated flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white disabled:opacity-60"><LockKeyhole size={17}/>{busy ? "Memeriksa..." : "Login admin"}</button>
      </form>
      <p className="mt-5 text-xs leading-5 text-slate-400">Akun admin dibuat melalui Supabase Authentication dan harus didaftarkan pada tabel admins sesuai panduan instalasi.</p>
    </div>
  </main>;
}
