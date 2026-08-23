import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBasket, Phone } from "lucide-react";
import { business } from "../data/business";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Our Story", to: "/about#story" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-paper/95 shadow-[0_4px_20px_-6px_rgba(61,35,20,0.25)] backdrop-blur-sm"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="diya-border w-full" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron via-yellow to-red text-lg font-bold text-cream shadow-md font-display">
            SN
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-brown sm:text-xl">Siddharth Namkeen</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-saffron-dark sm:block">
              Taste with Trust
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive && link.to === location.pathname
                    ? "bg-saffron/15 text-saffron-dark"
                    : "text-brown hover:bg-saffron/10 hover:text-saffron-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${business.phones[0]}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-brown-soft hover:text-saffron-dark"
          >
            <Phone size={16} /> {business.phones[0]}
          </a>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-red/20 transition-transform hover:scale-105 active:scale-95"
          >
            Explore Products
          </Link>
          <button
            aria-label={`View cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            onClick={openDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-brown/10 text-brown transition-colors hover:border-saffron hover:text-saffron-dark"
          >
            <ShoppingBasket size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red px-1 text-[9px] font-bold text-cream">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            aria-label={`View cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            onClick={openDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-brown"
          >
            <ShoppingBasket size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red px-1 text-[9px] font-bold text-cream">
                {totalItems}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden bg-paper transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 pb-5 pt-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="rounded-xl px-4 py-3 text-base font-semibold text-brown hover:bg-saffron/10"
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-brown/10 pt-4">
            <a
              href={`tel:${business.phones[0]}`}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-saffron px-4 py-3 text-sm font-bold text-saffron-dark"
            >
              <Phone size={16} /> Call {business.phones[0]}
            </a>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-4 py-3 text-sm font-bold text-cream"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
