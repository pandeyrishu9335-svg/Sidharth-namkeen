import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl bg-paper p-6 shadow-[0_6px_20px_-10px_rgba(61,35,20,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(232,113,42,0.3)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-red text-cream shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={26} strokeWidth={2.2} />
      </div>
      <h3 className="font-display text-lg font-bold text-brown">{title}</h3>
      <p className="text-sm leading-relaxed text-brown-soft">{description}</p>
    </div>
  );
}
