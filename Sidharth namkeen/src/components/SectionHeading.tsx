interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment} max-w-2xl mb-10 md:mb-14`}>
      {eyebrow && (
        <span
          className={`uppercase tracking-[0.25em] text-xs md:text-sm font-bold mb-3 ${
            light ? "text-yellow" : "text-saffron-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
          light ? "text-cream" : "text-brown"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-cream/80" : "text-brown-soft"}`}>
          {subtitle}
        </p>
      )}
      <div className="mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-saffron via-yellow to-red" />
    </div>
  );
}
