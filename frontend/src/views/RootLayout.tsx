import { Link, Outlet, NavLink } from "react-router-dom";
import { ShoppingCart, BookOpen } from "lucide-react";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-blue-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="text-pink-600" />
            <span className="font-extrabold text-xl">Kids Ebooks</span>
          </Link>
          <nav className="flex items-center gap-4">
            <NavLink to="/catalog" className="text-sm hover:text-pink-600">Catalog</NavLink>
            <NavLink to="/about" className="text-sm hover:text-pink-600">About</NavLink>
            <NavLink to="/contact" className="text-sm hover:text-pink-600">Contact</NavLink>
            <NavLink to="/cart" className="text-sm hover:text-pink-600 flex items-center gap-1">
              <ShoppingCart size={18} /> Cart
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Kids Ebooks. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
