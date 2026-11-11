"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductCategory } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { LoadingGrid } from "@/components/Skeleton";

export default function ProductCatalog({ category }: { category: ProductCategory }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("products").select("*").eq("category", category).order("created_at", { ascending: false });
        if (error) throw error;
        if (active) setProducts((data || []) as Product[]);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Gagal memuat produk.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [category]);

  if (loading) return <LoadingGrid/>;
  if (error) return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">Produk belum dapat dimuat. Pastikan Supabase sudah disiapkan. Detail: {error}</div>;
  if (!products.length) return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-lg font-bold text-slate-800">Belum ada produk</p><p className="mt-2 text-sm text-slate-500">Stok baru akan muncul di sini setelah admin menambahkannya.</p></div>;
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div>;
}
