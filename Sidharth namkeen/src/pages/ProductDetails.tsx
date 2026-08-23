import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import {
  ChevronRight,
  Info,
  ShieldCheck,
  Package,
  CheckCircle2,
  ShoppingCart,
  Zap,
  Truck,
} from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";
import ProductGrid from "../components/ProductGrid";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import SizeSelector from "../components/SizeSelector";
import QuantityStepper from "../components/QuantityStepper";
import { getProductBySlug, getCategoryById, getPriceForSize, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";

const categoryLabel: Record<string, string> = {
  namkeen: "Namkeen",
  chips: "Chips",
  traditional: "Traditional Snacks",
  roasted: "Roasted & Healthy",
};

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [size, setSize] = useState(product?.sizes[2] ?? product?.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Siddharth Namkeen`;
      setSize(product.sizes[2] ?? product.sizes[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return <Navigate to="/products" replace />;

  const category = getCategoryById(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const message = `Hello! I would like to enquire about ${product.name}.`;
  const price = getPriceForSize(product, size);

  const cartPayload = {
    slug: product.slug,
    name: product.name,
    image: product.image,
    category: product.category,
    size,
    price,
  };

  const handleAddToCart = () => {
    addItem(cartPayload, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addItem(cartPayload, quantity);
    navigate("/checkout");
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-brown-soft">
          <Link to="/" className="hover:text-saffron-dark">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-saffron-dark">Products</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-brown">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-[2rem] bg-cream-dark shadow-xl shadow-brown/15">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <span className="inline-flex items-center rounded-full bg-saffron/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-saffron-dark">
              {categoryLabel[product.category]}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-brown sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-brown-soft sm:text-lg">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-red">{formatINR(price)}</span>
              <span className="text-sm text-brown-soft">for {size} · inclusive of taxes</span>
            </div>

            <div className="mt-6">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-brown">
                <Package size={18} className="text-saffron-dark" /> Choose Size
              </h3>
              <div className="mt-3">
                <SizeSelector product={product} selected={size} onSelect={setSize} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div>
                <h3 className="mb-2 font-display text-base font-bold text-brown">Quantity</h3>
                <QuantityStepper quantity={quantity} onChange={setQuantity} />
              </div>
              <div className="flex-1 rounded-2xl bg-green/10 px-4 py-3 text-xs text-green">
                <span className="flex items-center gap-1.5 font-bold">
                  <Truck size={14} /> Delivery options available at checkout
                </span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream-dark/60 p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-brown">
                  <Info size={16} className="text-saffron-dark" /> Ingredients
                </h4>
                <p className="mt-1.5 text-sm text-brown-soft">Product information coming soon.</p>
              </div>
              <div className="rounded-2xl bg-cream-dark/60 p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-brown">
                  <ShieldCheck size={16} className="text-saffron-dark" /> Quality Information
                </h4>
                <p className="mt-1.5 text-sm text-brown-soft">
                  Prepared in a hygienic facility with carefully selected ingredients.
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-2 text-sm text-brown-soft">
              {["Freshly prepared in small batches", "Sealed for freshness", "Available in multiple pack sizes"].map((li) => (
                <li key={li} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green" /> {li}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 text-base font-bold transition-all duration-200 active:scale-95 ${
                  added
                    ? "border-green bg-green text-cream"
                    : "border-saffron text-saffron-dark hover:bg-saffron hover:text-cream"
                }`}
              >
                <ShoppingCart size={18} /> {added ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                <Zap size={18} /> Buy Now
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brown/15 px-6 py-3 text-sm font-bold text-brown transition-colors hover:border-saffron"
              >
                Enquire Now
              </Link>
              <WhatsAppButton message={message} className="flex-1" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream-dark/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow={category?.name}
                title="You May Also Like"
                subtitle="More from the same category"
              />
            </ScrollReveal>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
