import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../data/business";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  className?: string;
  full?: boolean;
}

export default function WhatsAppButton({
  message = "Hello Siddharth Namkeen! I would like to enquire about your products.",
  label = "Order on WhatsApp",
  className = "",
  full = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex ${full ? "w-full" : ""} items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm md:text-base font-bold text-cream shadow-md shadow-green/30 transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-95 ${className}`}
    >
      <MessageCircle size={19} strokeWidth={2.4} />
      {label}
    </a>
  );
}
