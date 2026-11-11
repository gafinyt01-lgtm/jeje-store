export type ProductCategory = "robux" | "ml";

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  price: number;
  description: string | null;
  specs: Record<string, string>;
  images: string[];
  is_available: boolean;
  created_at: string;
};

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
