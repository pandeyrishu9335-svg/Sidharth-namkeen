import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import ScrollReveal from "../components/ScrollReveal";
import { categories, products, type CategoryId } from "../data/products";

type FilterId = "all" | CategoryId;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "namkeen", label: "Namkeen" },
  { id: "chips", label: "Chips" },
  { id: "traditional", label: "Traditional Snacks" },
  { id: "roasted", label: "Roasted & Healthy" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as FilterId) || "all";
  const [activeFilter, setActiveFilter] = useState<FilterId>(
    filters.some((f) => f.id === initialCategory) ? initialCategory : "all"
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Products | Siddharth Namkeen";
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category") as FilterId;
    if (cat && filters.some((f) => f.id === cat)) setActiveFilter(cat);
  }, [searchParams]);

  const handleFilter = (id: FilterId) => {
    setActiveFilter(id);
    if (id === "all") setSearchParams({});
    else setSearchParams({ category: id });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeFilter === "all" || p.category === activeFilter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark to-cream py-14 sm:py-16">
        <div className="jaali-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron-dark">Full Catalogue</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brown sm:text-5xl">Our Products</h1>
          <p className="mt-4 text-lg text-brown-soft">
            Browse our complete range of namkeen, chips, traditional snacks and roasted delights.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="sticky top-[73px] z-30 -mx-4 mb-10 bg-cream/95 px-4 py-4 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilter(f.id)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
                    activeFilter === f.id
                      ? "bg-gradient-to-r from-saffron to-red text-cream shadow-md"
                      : "bg-paper text-brown-soft hover:bg-cream-dark"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brown-soft" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border-2 border-brown/10 bg-paper py-2.5 pl-11 pr-4 text-sm text-brown outline-none transition-colors focus:border-saffron"
              />
            </div>
          </div>
        </div>

        <ScrollReveal>
          <ProductGrid
            products={filtered}
            emptyMessage="No products match your search. Try a different keyword or category."
          />
        </ScrollReveal>
      </section>

      <section className="bg-cream-dark/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="Browse by Range" title="Shop by Category" />
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilter(cat.id)}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-paper p-4 text-center shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-cream-dark">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs font-bold text-brown sm:text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
