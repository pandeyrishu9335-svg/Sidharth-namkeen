import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";
import CartItemRow from "./CartItemRow";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isDrawerOpen, closeDrawer } = useCart();
  const location = useLocation();

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-[70] ${isDrawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-brown/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brown/10 bg-paper px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
            <ShoppingBag size={20} className="text-saffron-dark" />
            Your Cart {totalItems > 0 && <span className="text-saffron-dark">({totalItems})</span>}
          </h2>
          <button
            aria-label="Close cart"
            onClick={closeDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full text-brown hover:bg-cream-dark"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <ShoppingBag size={44} className="text-brown/20" />
              <p className="text-brown-soft">Your cart is empty.</p>
              <Link
                to="/products"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-2.5 text-sm font-bold text-cream"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={`${item.slug}-${item.size}`} item={item} compact />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brown/10 bg-paper px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-brown-soft">Subtotal</span>
              <span className="font-display text-xl font-extrabold text-brown">{formatINR(totalPrice)}</span>
            </div>
            <p className="mb-4 text-xs text-brown-soft">Delivery charges calculated at checkout.</p>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/checkout"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform hover:scale-[1.02]"
              >
                Proceed to Checkout <ArrowRight size={17} />
              </Link>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brown/15 px-6 py-3 text-sm font-bold text-brown transition-colors hover:border-saffron"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
