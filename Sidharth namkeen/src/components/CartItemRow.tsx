import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";
import QuantityStepper from "./QuantityStepper";

interface CartItemRowProps {
  item: CartItem;
  compact?: boolean;
}

export default function CartItemRow({ item, compact = false }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className={`flex gap-3 ${compact ? "py-3" : "py-4"} border-b border-brown/8 last:border-none`}>
      <Link
        to={`/products/${item.slug}`}
        className={`shrink-0 overflow-hidden rounded-xl bg-cream-dark ${compact ? "h-16 w-16" : "h-20 w-20 sm:h-24 sm:w-24"}`}
      >
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-1.5 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/products/${item.slug}`}
              className={`block truncate font-display font-bold text-brown hover:text-saffron-dark ${compact ? "text-sm" : "text-base"}`}
            >
              {item.name}
            </Link>
            <span className="text-xs font-semibold text-brown-soft">Size: {item.size}</span>
          </div>
          <button
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeItem(item.slug, item.size)}
            className="shrink-0 text-brown-soft/60 transition-colors hover:text-red"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <QuantityStepper
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.slug, item.size, q)}
            size="sm"
          />
          <span className={`font-display font-bold text-brown ${compact ? "text-sm" : "text-base"}`}>
            {formatINR(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
