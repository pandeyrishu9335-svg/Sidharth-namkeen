import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "../data/products";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl shadow-[0_10px_28px_-10px_rgba(61,35,20,0.3)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative h-52 overflow-hidden sm:h-60">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-bold text-cream md:text-2xl">{category.name}</h3>
          <p className="mt-1 text-sm text-cream/85">{category.tagline}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 bg-paper p-5">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-brown-soft">
          {category.items.slice(0, 6).map((item) => (
            <li key={item} className="flex items-center gap-1.5 truncate">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              {item}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red group-hover:gap-2.5 transition-all">
          Explore range <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
