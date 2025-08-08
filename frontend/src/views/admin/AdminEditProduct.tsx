import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiAuthed, apiGet } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "../types";

export default function AdminEditProduct(){
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const token = localStorage.getItem("admin_token") || "";
  useEffect(()=>{
    apiGet<Product>(`/products/${id}`).then(setProduct).catch(console.error);
  },[id]);
  const save = async ()=>{
    if(!id || !product) return;
    const { title, author, description, price_cents, visible } = product;
    await apiAuthed<Product>("PUT", `/admin/products/${id}`, { title, author, description, price_cents, visible }, token);
    alert("Saved");
  }
  const delItem = async ()=>{
    if(!id) return;
    await apiAuthed<unknown>("DELETE", `/admin/products/${id}`, {}, token);
    history.back();
  }
  if(!product) return <div>Loading…</div>;
  return (
    <div className="space-y-3">
      <Input value={product.title} onChange={e=>setProduct({...product, title: e.target.value})} />
      <Input value={product.author} onChange={e=>setProduct({...product, author: e.target.value})} />
      <Input value={product.description} onChange={e=>setProduct({...product, description: e.target.value})} />
      <Input type="number" value={product.price_cents} onChange={e=>setProduct({...product, price_cents: Number(e.target.value)})} />
      <div className="flex gap-3">
        <Button onClick={save}>Save</Button>
        <Button variant="destructive" onClick={delItem}>Delete</Button>
      </div>
    </div>
  )
}
