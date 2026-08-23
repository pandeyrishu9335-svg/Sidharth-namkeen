import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Truck,
  Store,
  Zap,
  CheckCircle2,
  MessageCircle,
  CreditCard,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { deliveryOptions, FREE_DELIVERY_THRESHOLD } from "../data/delivery";
import { formatINR, generateOrderRef } from "../lib/format";
import { business, buildWhatsAppLink } from "../data/business";

const deliveryIcon: Record<string, typeof Truck> = {
  standard: Truck,
  express: Zap,
  pickup: Store,
};

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "Uttar Pradesh",
  pincode: "",
};

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [deliveryId, setDeliveryId] = useState(deliveryOptions[0].id);
  const [placed, setPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  useEffect(() => {
    document.title = "Checkout | Siddharth Namkeen";
  }, []);

  const selectedDelivery = deliveryOptions.find((d) => d.id === deliveryId) ?? deliveryOptions[0];
  const isPickup = selectedDelivery.id === "pickup";
  const deliveryFee =
    selectedDelivery.price === 0 || totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : selectedDelivery.price;
  const grandTotal = totalPrice + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ref = generateOrderRef();
    setOrderRef(ref);

    const lines = items
      .map((i) => `• ${i.name} (${i.size}) x${i.quantity} — ${formatINR(i.price * i.quantity)}`)
      .join("\n");

    const message = [
      `New Order Enquiry — ${ref}`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      isPickup ? `Pickup Location: ${business.address.full}` : `Delivery Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      ``,
      `Items:`,
      lines,
      ``,
      `Delivery Option: ${selectedDelivery.label} (${selectedDelivery.eta})`,
      `Subtotal: ${formatINR(totalPrice)}`,
      `Delivery Fee: ${deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}`,
      `Total: ${formatINR(grandTotal)}`,
      ``,
      `Please confirm my order. I will pay via Cash on Delivery / as advised.`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <CheckCircle2 size={64} className="text-green" />
        <h1 className="font-display text-3xl font-bold text-brown">Order Sent for Confirmation!</h1>
        <p className="rounded-full bg-cream-dark px-5 py-2 font-mono text-sm font-bold text-brown">
          Reference: {orderRef}
        </p>
        <p className="text-brown-soft">
          We've opened WhatsApp with your order details. Our team will confirm availability, delivery
          timelines and payment on WhatsApp shortly. Thank you for supporting women-led entrepreneurship!
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3 text-sm font-bold text-cream shadow-md transition-transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brown/15 px-6 py-3 text-sm font-bold text-brown"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-brown/20" />
        <h1 className="font-display text-3xl font-bold text-brown">Your cart is empty</h1>
        <p className="text-brown-soft">Add a few snacks to your cart before checking out.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-7 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/cart" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brown-soft hover:text-saffron-dark">
        <ArrowLeft size={16} /> Back to Cart
      </Link>
      <h1 className="mb-8 font-display text-3xl font-extrabold text-brown sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Delivery / Contact details */}
          <div className="rounded-3xl bg-paper p-6 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)]">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <MapPin size={19} className="text-saffron-dark" /> Contact & Delivery Details
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-bold text-brown">Full Name</label>
                <input
                  id="name" name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-bold text-brown">Phone Number</label>
                <input
                  id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="email" className="text-sm font-bold text-brown">Email (optional)</label>
                <input
                  id="email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                />
              </div>

              {!isPickup && (
                <>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="address" className="text-sm font-bold text-brown">Delivery Address</label>
                    <input
                      id="address" name="address" required={!isPickup} value={form.address} onChange={handleChange}
                      placeholder="House no, street, locality"
                      className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-sm font-bold text-brown">City</label>
                    <input
                      id="city" name="city" required={!isPickup} value={form.city} onChange={handleChange}
                      placeholder="City"
                      className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="state" className="text-sm font-bold text-brown">State</label>
                    <input
                      id="state" name="state" required={!isPickup} value={form.state} onChange={handleChange}
                      placeholder="State"
                      className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pincode" className="text-sm font-bold text-brown">Pincode</label>
                    <input
                      id="pincode" name="pincode" required={!isPickup} value={form.pincode} onChange={handleChange}
                      placeholder="6-digit pincode" inputMode="numeric" maxLength={6}
                      className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none focus:border-saffron"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Delivery options */}
          <div className="rounded-3xl bg-paper p-6 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)]">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <Truck size={19} className="text-saffron-dark" /> Delivery Options
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              {deliveryOptions.map((option) => {
                const Icon = deliveryIcon[option.id] ?? Truck;
                const isFree = option.price === 0 || totalPrice >= FREE_DELIVERY_THRESHOLD;
                const isActive = deliveryId === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition-colors ${
                      isActive ? "border-saffron bg-saffron/5" : "border-brown/10 hover:border-saffron/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={isActive}
                      onChange={() => setDeliveryId(option.id)}
                      className="mt-1.5 accent-red"
                    />
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-red text-cream">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display font-bold text-brown">{option.label}</span>
                        <span className="font-bold text-brown">
                          {isFree ? "Free" : formatINR(option.price)}
                        </span>
                      </div>
                      <p className="text-sm text-brown-soft">{option.description}</p>
                      <p className="text-xs font-semibold text-saffron-dark">{option.eta}</p>
                    </div>
                  </label>
                );
              })}
              <p className="text-xs text-brown-soft">
                Free standard delivery on orders above {formatINR(FREE_DELIVERY_THRESHOLD)}.
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-3xl bg-paper p-6 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)]">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <CreditCard size={19} className="text-saffron-dark" /> Payment
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-saffron bg-saffron/5 p-4">
                <MessageCircle size={20} className="text-green shrink-0" />
                <p className="text-sm text-brown">
                  <strong>Cash on Delivery / Pay as Confirmed on WhatsApp.</strong> Submit your order below and
                  our team will confirm final availability, delivery charges and payment with you directly.
                </p>
              </div>
              <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center justify-between rounded-2xl border-2 border-dashed border-brown/15 p-4 text-left opacity-60"
              >
                <span className="text-sm font-bold text-brown-soft">Pay Online (UPI / Card)</span>
                <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-bold text-brown-soft">Coming Soon</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-24 flex flex-col gap-5 rounded-3xl bg-paper p-6 shadow-[0_8px_22px_-10px_rgba(61,35,20,0.2)]">
            <h2 className="font-display text-lg font-bold text-brown">Order Summary</h2>
            <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.slug}-${item.size}`} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-bold text-brown">{item.name}</p>
                    <p className="text-xs text-brown-soft">{item.size} × {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-brown">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-brown/10" />
            <div className="flex flex-col gap-2 text-sm text-brown-soft">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-brown">{formatINR(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({selectedDelivery.label})</span>
                <span className="font-bold text-brown">{deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}</span>
              </div>
            </div>
            <div className="h-px bg-brown/10" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-brown">Total</span>
              <span className="font-display text-xl font-extrabold text-red">{formatINR(grandTotal)}</span>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle size={18} /> Confirm Order via WhatsApp
            </button>
            <p className="text-center text-xs text-brown-soft">
              By placing this order, you agree to be contacted by our team to confirm details.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
