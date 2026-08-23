import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, FileBadge, Facebook, Instagram, Youtube } from "lucide-react";
import { business } from "../data/business";
import { categories } from "../data/products";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-brown text-cream">
      <div className="diya-border w-full" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron via-yellow to-red font-display text-base font-bold text-cream">
                SN
              </span>
              <span className="font-display text-xl font-bold">Siddharth Namkeen</span>
            </div>
            <p className="mt-4 max-w-xs text-sm italic text-cream/75">"{business.tagline}"</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-cream/50">A unit of {business.manufacturer}</p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70"
                  aria-label="Social media placeholder"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-yellow">Quick Links</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/80">
              <li><Link to="/" className="hover:text-yellow">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow">About Us</Link></li>
              <li><Link to="/products" className="hover:text-yellow">Products</Link></li>
              <li><Link to="/about#story" className="hover:text-yellow">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-yellow">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-yellow">Product Categories</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/80">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.id}`} className="hover:text-yellow">
                    {cat.name.replace(" Range", "").replace(" Collection", "").replace("Traditional Indian Snacks", "Traditional Snacks").replace("Roasted & Healthy Snacks", "Roasted Snacks")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-yellow">Get in Touch</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/80">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-saffron" />
                <span className="flex flex-col">
                  {business.phones.map((p) => (
                    <a key={p} href={`tel:${p}`} className="hover:text-yellow">{p}</a>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-saffron" />
                <a href={`mailto:${business.email}`} className="hover:text-yellow break-all">{business.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-saffron" />
                <span>{business.address.full}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileBadge size={16} className="mt-0.5 shrink-0 text-saffron" />
                <span>GSTIN: {business.gstin}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>© 2026 Siddharth Namkeen. All Rights Reserved.</p>
          <p>Manufactured by {business.manufacturer}</p>
        </div>
      </div>
    </footer>
  );
}
