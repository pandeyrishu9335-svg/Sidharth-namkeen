import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingCart, Check } from "lucide-react";
import type { Product } from "../data/products";
import { getCategoryById, getPriceForSize } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const categoryLabel: Record<string, string> = {
  namkeen: "Namkeen",
  chips: "Chips",
  traditional: "Traditional Snacks",
  roasted: "Roasted & Healthy",
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const category = getCategoryById(product.category);
  const { addItem } = useCart();
  const defaultSize = product.sizes[2] ?? product.sizes[0];
  const [size, setSize] = useState(defaultSize);
  const [added, setAdded] = useState(false);
  const price = getPriceForSize(product, size);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      category: product.category,
      size,
      price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-3xl bg-paper border border-brown/5 shadow-[0_6px_24px_-8px_rgba(61,35,20,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-10px_rgba(179,38,30,0.28)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-dark">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 rounded-full bg-brown/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream backdrop-blur-sm">
          {category?.name.split(" ")[0] ?? categoryLabel[product.category]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-dark">
          {categoryLabel[product.category]}
        </span>
        <h3 className="font-display text-xl font-bold text-brown leading-snug">{product.name}</h3>
        <p className="text-sm text-brown-soft line-clamp-2">{product.description}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                s === size ? "bg-saffron text-cream" : "bg-cream-dark text-brown-soft hover:bg-cream-dark/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="font-display text-lg font-extrabold text-brown">{formatINR(price)}</span>
          <span className="text-[11px] text-brown-soft">for {size}</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-md transition-all duration-200 active:scale-95 ${
              added
                ? "bg-green text-cream"
                : "bg-gradient-to-r from-saffron to-red text-cream hover:scale-[1.02]"
            }`}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
          <div className="flex gap-2">
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-saffron px-3 py-2 text-xs font-bold text-saffron-dark transition-colors duration-200 hover:bg-saffron hover:text-cream"
            >
              View <ArrowUpRight size={14} />
            </Link>
            <WhatsAppButton
              label="WhatsApp"
              message={`Hello! I would like to enquire about ${product.name}.`}
              className="!py-2 !text-xs flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
