import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Leaf, HeartHandshake, ShieldCheck } from "lucide-react";

const trustPoints = [
  { icon: Sparkles, label: "Fresh & Hygienic" },
  { icon: Leaf, label: "Authentic Indian Taste" },
  { icon: HeartHandshake, label: "Women Empowerment" },
  { icon: ShieldCheck, label: "Quality Ingredients" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark via-cream to-cream pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* decorative pattern + floaters */}
      <div className="jaali-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-10 top-24 h-24 w-24 rounded-full bg-yellow/30 blur-2xl animate-float-slow" />
      <div className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-red/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute right-16 bottom-10 hidden text-6xl sm:block animate-float-slow select-none">🥜</div>
      <div className="pointer-events-none absolute left-8 bottom-24 hidden text-5xl md:block animate-float-slower select-none">🌶️</div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red">
            A Women-Led Indian Snack Brand
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-brown sm:text-5xl md:text-6xl">
            Har Bite Mein <span className="text-red">Bharose</span> Ka Swad
          </h1>
          <p className="mt-4 font-display text-lg font-semibold text-saffron-dark sm:text-xl">
            Traditional Taste. Trusted Quality. Empowered Women.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brown-soft sm:text-lg">
            Siddharth Namkeen brings you fresh, flavorful and hygienically prepared Indian snacks made
            with carefully selected ingredients and authentic recipes.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-7 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Explore Our Products <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brown/15 bg-paper px-7 py-3.5 text-base font-bold text-brown transition-colors duration-200 hover:border-saffron hover:text-saffron-dark"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-paper/70 p-3 text-center shadow-sm ring-1 ring-brown/5"
              >
                <Icon size={20} className="text-saffron-dark" />
                <span className="text-[11px] font-bold leading-tight text-brown-soft sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2.5rem] border-8 border-paper shadow-2xl shadow-brown/20 sm:max-w-lg">
            <img
              src="/images/hero-namkeen.png"
              alt="Assorted premium Siddharth Namkeen Indian snacks"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-paper px-6 py-4 shadow-xl sm:block">
            <p className="font-display text-2xl font-extrabold text-red">100%</p>
            <p className="text-xs font-semibold text-brown-soft">Women-Led Enterprise</p>
          </div>
          <div className="absolute -top-6 -right-4 hidden rounded-3xl bg-paper px-6 py-4 shadow-xl md:block">
            <p className="font-display text-2xl font-extrabold text-saffron-dark">18+</p>
            <p className="text-xs font-semibold text-brown-soft">Snack Varieties</p>
          </div>
        </div>
      </div>
    </section>
  );
}
