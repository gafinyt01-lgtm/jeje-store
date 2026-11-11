-- JEJE STORE: jalankan seluruh SQL ini di Supabase > SQL Editor.
-- 1) Buat tabel profil admin. Masukkan UUID user admin setelah membuat user di Authentication.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('robux','ml')),
  title text not null,
  price bigint not null check (price >= 0),
  description text,
  specs jsonb not null default '{}'::jsonb,
  images text[] not null default '{}',
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.products enable row level security;

-- Fungsi SECURITY DEFINER ini memeriksa daftar admin tanpa terkena RLS pada tabel admins.
-- Client tidak diberi akses langsung untuk membaca daftar admin.
create or replace function public.is_store_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_store_admin() from public;
grant execute on function public.is_store_admin() to authenticated;

-- Produk dapat dibaca publik; hanya user yang tercatat di admins dapat mengubahnya.
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select using (true);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products" on public.products for insert
with check (public.is_store_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products for update
using (public.is_store_admin())
with check (public.is_store_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products for delete
using (public.is_store_admin());

-- Bucket gambar produk. Foto dapat dilihat publik, upload/hapus hanya admin.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images" on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images" on storage.objects for insert
with check (
  bucket_id = 'product-images'
  and public.is_store_admin()
);

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images" on storage.objects for delete
using (
  bucket_id = 'product-images'
  and public.is_store_admin()
);

-- Catatan: jangan pernah menaruh service_role key di browser atau NEXT_PUBLIC_ env.
