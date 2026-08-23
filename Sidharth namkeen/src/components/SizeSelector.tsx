import type { Product } from "../data/products";
import { getPriceForSize } from "../data/products";
import { formatINR } from "../lib/format";

interface SizeSelectorProps {
  product: Product;
  selected: string;
  onSelect: (size: string) => void;
  compact?: boolean;
}

export default function SizeSelector({ product, selected, onSelect, compact = false }: SizeSelectorProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "gap-2.5"}`}>
      {product.sizes.map((size) => {
        const price = getPriceForSize(product, size);
        const isActive = size === selected;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`flex flex-col items-center rounded-xl border-2 px-3 py-1.5 transition-colors ${
              compact ? "min-w-[52px]" : "min-w-[64px] px-4 py-2.5"
            } ${
              isActive
                ? "border-saffron bg-saffron/10 text-saffron-dark"
                : "border-brown/10 bg-paper text-brown-soft hover:border-saffron/50"
            }`}
          >
            <span className={`font-bold ${compact ? "text-xs" : "text-sm"}`}>{size}</span>
            <span className={`${compact ? "text-[10px]" : "text-xs"} font-semibold`}>{formatINR(price)}</span>
          </button>
        );
      })}
    </div>
  );
}
