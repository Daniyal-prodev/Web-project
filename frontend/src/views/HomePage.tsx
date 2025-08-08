import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
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
          <Button variant="outline" asChild>
            <Link to="/secret-admin/login">Admin</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-white shadow p-6">
        <img src="/favicon.svg" alt="Kids Ebooks" className="mx-auto w-2/3" />
      </div>
    </section>
  );
}
