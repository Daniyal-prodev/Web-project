import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "@/lib/api";
import type { Product } from "./types";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    apiGet<Product[]>("/products").then(setProducts).catch(console.error);
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Catalog</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
            {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} className="rounded mb-3 h-44 w-full object-cover" />}
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-slate-600">{p.author}</div>
            <div className="mt-2 font-bold">${(p.price_cents/100).toFixed(2)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
