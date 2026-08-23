import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";
import CartItemRow from "../components/CartItemRow";
import ScrollReveal from "../components/ScrollReveal";

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  useEffect(() => {
    document.title = "Your Cart | Siddharth Namkeen";
  }, []);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-brown/20" />
        <h1 className="font-display text-3xl font-bold text-brown">Your cart is empty</h1>
        <p className="text-brown-soft">
          Looks like you haven't added any snacks yet. Explore our range and find your favourite namkeen!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-7 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform hover:scale-105"
        >
          Explore Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-brown sm:text-4xl">
          Your Cart <span className="text-saffron-dark">({totalItems})</span>
        </h1>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-soft hover:text-red"
        >
          <RotateCcw size={14} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2">
          <div className="rounded-3xl bg-paper p-5 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)] sm:p-6">
            {items.map((item) => (
              <CartItemRow key={`${item.slug}-${item.size}`} item={item} />
            ))}
          </div>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-saffron-dark hover:gap-3 transition-all"
          >
            ← Continue Shopping
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="sticky top-24 flex flex-col gap-5 rounded-3xl bg-paper p-6 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)]">
            <h2 className="font-display text-lg font-bold text-brown">Order Summary</h2>
            <div className="flex flex-col gap-2 text-sm text-brown-soft">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-brown">{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-green">Calculated at checkout</span>
              </div>
            </div>
            <div className="h-px bg-brown/10" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-brown">Estimated Total</span>
              <span className="font-display text-xl font-extrabold text-red">{formatINR(totalPrice)}</span>
            </div>
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform hover:scale-[1.02]"
            >
              Proceed to Checkout <ArrowRight size={17} />
            </Link>
            <div className="flex flex-col gap-2 border-t border-brown/10 pt-4 text-xs text-brown-soft">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-green" /> Hygienically packed & sealed for freshness</span>
              <span className="flex items-center gap-2"><Truck size={14} className="text-green" /> Multiple delivery options available</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
