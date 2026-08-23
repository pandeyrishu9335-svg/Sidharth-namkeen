import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: QuantityStepperProps) {
  const dims = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center rounded-full border-2 border-brown/10 bg-paper">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={`flex ${dims} items-center justify-center rounded-full text-brown transition-colors hover:bg-cream-dark disabled:opacity-30`}
      >
        <Minus size={14} />
      </button>
      <span className={`w-8 text-center font-bold text-brown ${textSize}`}>{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className={`flex ${dims} items-center justify-center rounded-full text-brown transition-colors hover:bg-cream-dark disabled:opacity-30`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
