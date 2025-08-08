import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";
import type { Product } from "./types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    apiGet<Product[]>("/products").then(setProducts).catch(console.error);
  }, []);
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Magical stories for curious kids
          </h1>
          <p className="mt-4 text-slate-600">
            Explore our handpicked library of delightful children’s ebooks designed to spark imagination and foster a love of reading.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link to="/catalog">Browse Catalog</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow p-6">
          <img src="/favicon.svg" alt="Kids Ebooks" className="mx-auto w-2/3" />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">All Books</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => {
            const sale = typeof p.sale_price_cents === "number" && p.sale_price_cents! >= 0;
            const price = sale ? p.sale_price_cents! : p.price_cents;
            return (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="mt-2 font-bold flex items-center gap-2">
                  <span>${(price/100).toFixed(2)}</span>
                  {sale && <span className="text-slate-400 line-through text-sm">${(p.price_cents/100).toFixed(2)}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
