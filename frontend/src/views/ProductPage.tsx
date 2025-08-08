import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "@/lib/api";
import type { Product } from "./types";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    apiGet<Product>(`/products/${id}`).then(setProduct).catch(console.error);
  }, [id]);
  if (!product) return <div className="max-w-6xl mx-auto px-4 py-10">Loading…</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      {product.cover_image_url && <img src={product.cover_image_url} className="rounded-xl shadow" />}
      <div>
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <div className="text-slate-600">{product.author}</div>
        <div className="mt-4">{product.description}</div>
        <div className="mt-6 text-2xl font-extrabold">${(product.price_cents/100).toFixed(2)}</div>
        <div className="mt-6 flex gap-3">
          <Button asChild><Link to="/cart">Add to Cart</Link></Button>
          <Button variant="outline" asChild><Link to="/checkout">Buy Now</Link></Button>
        </div>
      </div>
    </div>
  );
}
