# JEJE STORE

Website marketplace gaming sederhana: katalog top up Roblox dan akun Mobile Legends, checkout melalui WhatsApp, serta admin dashboard untuk mengelola produk.

## Teknologi
- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth, Database, dan Storage
- Deploy ke Vercel

## 1. Jalankan project
Butuh Node.js versi 18.18 atau lebih baru.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000

## 2. Siapkan Supabase
1. Buat project di https://supabase.com
2. Buka SQL Editor dan jalankan seluruh isi `supabase/schema.sql`.
3. Buka Project Settings > API, salin Project URL dan anon/public key.
4. Isi `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (format 62..., tanpa + dan tanpa 0 di depan)

## 3. Buat admin
1. Di Supabase, buka Authentication > Users.
2. Tambahkan user admin dengan email dan password yang kuat.
3. Salin UUID user tersebut.
4. Jalankan SQL berikut di SQL Editor (ganti UUID):
```sql
insert into public.admins (user_id)
values ('PASTE-UUID-USER-DI-SINI');
```
5. Login di `/admin/login`.

Jangan aktifkan public sign-up untuk admin. Hanya UUID yang dimasukkan ke tabel `admins` yang boleh mengelola produk. RLS membatasi operasi database dan upload gambar.

## 4. Kelola katalog
- Login ke `/admin/login`.
- Tambahkan produk.
- Kategori `Akun Mobile Legends` untuk stok akun ML.
- Kategori `Paket Roblox` untuk paket Robux.
- Spesifikasi ditulis satu per baris, format `Nama: Nilai`.
- Upload gambar JPG, PNG, atau WebP maksimal 5 MB per gambar.
- Tombol beli akan membuat pesan WhatsApp berisi nama produk dan harga.
- Untuk Robux custom, pelanggan meminta konfirmasi harga melalui WhatsApp.

## 5. Deploy ke Vercel
1. Push project ke GitHub.
2. Import repository di https://vercel.com/new.
3. Tambahkan environment variables yang sama dengan `.env.local`.
4. Deploy.

## Catatan penting
- Jangan commit `.env.local` ke GitHub.
- Jangan pernah menggunakan Supabase service_role key di frontend.
- Buat admin hanya melalui Supabase Dashboard.
- Katalog dan panel admin adalah fondasi awal; pembayaran otomatis, status pesanan, edit detail produk, dan pengaturan nomor toko dari dashboard belum termasuk.
- Periksa ketentuan resmi Roblox dan Mobile Legends serta risiko transaksi akun sebelum menjual produk.

JEJE STORE - Deployment setup.
