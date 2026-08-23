import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Gem,
  Wallet,
  Leaf,
  Wheat,
  SprayCan,
  BadgeCheck,
  PackageCheck,
  HeartHandshake,
} from "lucide-react";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import FeatureCard from "../components/FeatureCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { categories, featuredProducts, packSizes } from "../data/products";

const whyChooseUs = [
  {
    icon: Sparkles,
    title: "Authentic Taste",
    description: "Traditional Indian recipes with familiar flavours in every packet.",
  },
  {
    icon: Gem,
    title: "Quality Ingredients",
    description: "Carefully selected ingredients for great taste and consistent quality.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Preparation",
    description: "Manufactured with a strong focus on cleanliness and hygiene.",
  },
  {
    icon: Leaf,
    title: "Freshness",
    description: "Products prepared and packed with freshness in mind.",
  },
  {
    icon: HeartHandshake,
    title: "Women Empowerment",
    description: "Every purchase supports women-led entrepreneurship and livelihood opportunities.",
  },
  {
    icon: Wallet,
    title: "Affordable Quality",
    description: "Delicious snacks at accessible prices for everyday families.",
  },
];

const missionValues = [
  { title: "Taste", desc: "Authentic Indian flavours in every single bite." },
  { title: "Trust", desc: "Consistent quality families can rely on." },
  { title: "Empowerment", desc: "Livelihoods built by women, for the community." },
];

const qualitySteps = [
  { icon: Wheat, title: "Carefully Selected Ingredients" },
  { icon: SprayCan, title: "Hygienic Preparation" },
  { icon: BadgeCheck, title: "Quality Checking" },
  { icon: PackageCheck, title: "Fresh Packaging" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* BRAND STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal className="order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-saffron-dark">Our Foundation</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brown sm:text-4xl">
              More Than Just Namkeen
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brown-soft sm:text-lg">
              Siddharth Namkeen, a unit of <strong className="text-brown">Maa Oba Prerna Mahila Laghu Udyog</strong>,
              is a symbol of women's entrepreneurship, self-reliance and rural empowerment. Dedicated women
              entrepreneurs transform traditional recipes into delicious, high-quality namkeen and snacks —
              prepared with care, and packed with pride.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Women Entrepreneurship",
                "Rural Employment",
                "Traditional Recipes",
                "Quality Manufacturing",
                "Local Economic Development",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2 rounded-xl bg-cream-dark/60 px-3.5 py-2.5 text-sm font-semibold text-brown">
                  <Users size={16} className="shrink-0 text-red" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 font-display text-base font-bold text-red transition-all hover:gap-3"
            >
              Discover Our Story <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={150} className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-brown/15">
              <img
                src="/images/brand-story.png"
                alt="Women entrepreneurs preparing namkeen at Siddharth Namkeen's production unit"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brown/15 to-transparent" />
      </div>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Make"
            title="Our Product Range"
            subtitle="Traditional flavours, made with care."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 100}>
              <CategoryCard category={cat} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-cream-dark/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Fan Favourites"
              title="Featured Products"
              subtitle="A few of the snacks our customers keep coming back for."
            />
          </ScrollReveal>
          <ScrollReveal>
            <ProductGrid products={featuredProducts} />
          </ScrollReveal>
          <ScrollReveal className="mt-10 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border-2 border-red px-7 py-3.5 text-base font-bold text-red transition-colors hover:bg-red hover:text-cream"
            >
              View All Products <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* PACK SIZES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Pick Your Pack"
            title="Available in Sizes for Every Occasion"
            subtitle="From a quick trial to bulk family stock — there's a Siddharth Namkeen pack for every need."
          />
        </ScrollReveal>
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6">
          {packSizes.map((size, i) => (
            <ScrollReveal key={size.weight} delay={i * 80}>
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-paper px-5 py-6 shadow-[0_8px_20px_-8px_rgba(61,35,20,0.2)] transition-transform hover:-translate-y-1.5">
                <div
                  className="flex items-center justify-center rounded-full bg-gradient-to-br from-yellow via-saffron to-red text-cream font-display font-extrabold shadow-inner"
                  style={{
                    width: `${56 + i * 10}px`,
                    height: `${56 + i * 10}px`,
                    fontSize: `${13 + i}px`,
                  }}
                >
                  {size.weight}
                </div>
                <span className="text-center text-sm font-bold text-brown">{size.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-brown py-20 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Our Promise"
              title="Why Families Choose Siddharth Namkeen"
              light
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <FeatureCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WOMEN EMPOWERMENT */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-brown/15">
              <img
                src="/images/empowerment.png"
                alt="Women entrepreneurs of Maa Oba Prerna Mahila Laghu Udyog"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red">Our Heart & Soul</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brown sm:text-4xl">
              Every Packet Carries a Story of Empowerment
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brown-soft sm:text-lg">
              Behind every packet of Siddharth Namkeen is the hard work, determination and dream of women
              building a brighter future for their families and communities.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Women's financial independence",
                "Rural livelihood opportunities",
                "Local entrepreneurship",
                "Community development",
                "Self-reliance",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-brown">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron-dark">
                    <HeartHandshake size={15} />
                  </span>
                  <span className="font-semibold">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red to-saffron-dark px-7 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/25 transition-transform hover:scale-[1.03]"
              >
                Support Women. Taste the Difference.
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-saffron-dark via-red to-red-dark py-20 text-cream">
        <div className="jaali-pattern pointer-events-none absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow">Our Mission</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Fresh, Tasty & Affordable — For an Atmanirbhar Bharat
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/90 sm:text-lg">
              Our mission is to deliver fresh, tasty and affordable snacks while promoting women's financial
              independence and contributing to the vision of an Atmanirbhar Bharat.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {missionValues.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="rounded-3xl bg-cream/10 p-8 backdrop-blur-sm ring-1 ring-cream/20">
                  <p className="font-display text-3xl font-extrabold text-yellow">{v.title}</p>
                  <p className="mt-3 text-sm text-cream/85">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Process"
            title="Made With Care. Packed With Trust."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {qualitySteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 100}>
              <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-paper p-7 text-center shadow-[0_8px_22px_-10px_rgba(61,35,20,0.22)]">
                <span className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red font-display text-sm font-bold text-cream shadow-md">
                  {i + 1}
                </span>
                <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow to-saffron text-cream">
                  <step.icon size={28} />
                </div>
                <p className="font-display text-base font-bold text-brown">{step.title}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-gradient-to-r from-brown via-brown to-saffron-dark px-6 py-14 text-center text-cream sm:px-16">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to taste tradition, trust and empowerment?
            </h2>
            <p className="max-w-xl text-cream/80">
              Reach out today to place an enquiry, ask about our products, or place a bulk order.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-bold text-brown transition-transform hover:scale-105"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
              <WhatsAppButton />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
