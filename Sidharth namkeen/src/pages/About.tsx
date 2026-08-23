import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Sprout, BookHeart, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { business } from "../data/business";

const highlights = [
  { icon: Users, title: "Women Entrepreneurship", desc: "Led end-to-end by dedicated women entrepreneurs." },
  { icon: Sprout, title: "Rural Employment", desc: "Creating sustainable livelihood opportunities close to home." },
  { icon: BookHeart, title: "Traditional Recipes", desc: "Time-honoured recipes passed down through generations." },
  { icon: ShieldCheck, title: "Quality Manufacturing", desc: "Careful ingredient selection and hygienic practices." },
  { icon: TrendingUp, title: "Local Economic Development", desc: "Strengthening the local economy, one packet at a time." },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | Siddharth Namkeen";
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark to-cream py-16 sm:py-20">
        <div className="jaali-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron-dark">Our Journey</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brown sm:text-5xl">About Siddharth Namkeen</h1>
          <p className="mt-4 text-lg text-brown-soft">
            A story of taste, trust and the tireless spirit of women entrepreneurs.
          </p>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-brown/15">
            <img
              src="/images/brand-story.png"
              alt="Women preparing namkeen at Maa Oba Prerna Mahila Laghu Udyog"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brown-soft sm:text-lg">
            <p>
              <strong className="text-brown">Siddharth Namkeen</strong>, a unit of{" "}
              <strong className="text-brown">{business.manufacturer}</strong>, is more than just a snack
              brand — it is a symbol of women's entrepreneurship, self-reliance, and rural empowerment.
            </p>
            <p>
              Founded with the vision of creating sustainable livelihood opportunities for women, our
              enterprise is proudly led by dedicated women entrepreneurs who transform traditional recipes
              into delicious, high-quality namkeen and snacks.
            </p>
            <p>
              Every product is prepared with carefully selected ingredients, hygienic manufacturing
              practices, and a commitment to authentic Indian taste.
            </p>
            <p>
              At Siddharth Namkeen, we believe that every packet represents the hard work, determination,
              and dreams of women who are building a brighter future for their families and communities.
            </p>
            <p>
              By choosing our products, you are not only enjoying premium-quality snacks but also
              supporting women-led enterprises and local economic development.
            </p>
            <p>
              Our mission is to deliver fresh, tasty, and affordable snacks while promoting women's
              financial independence and contributing to the vision of an <strong className="text-brown">Atmanirbhar Bharat</strong>.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="mx-auto mt-14 max-w-2xl rounded-3xl bg-gradient-to-r from-saffron-dark to-red px-8 py-8 text-center text-cream shadow-xl">
            <p className="font-display text-xl font-bold sm:text-2xl">
              Siddharth Namkeen – Taste with Trust, Empowered by Women.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-cream-dark/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="What Defines Us" title="Built on Five Pillars" />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 90}>
                <div className="flex h-full flex-col items-center gap-3 rounded-3xl bg-paper p-6 text-center shadow-[0_8px_20px_-10px_rgba(61,35,20,0.2)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-red text-cream">
                    <h.icon size={24} />
                  </div>
                  <p className="font-display text-sm font-bold text-brown">{h.title}</p>
                  <p className="text-xs text-brown-soft">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-10 rounded-[2.5rem] bg-brown px-6 py-12 text-cream sm:grid-cols-2 sm:px-12">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Want to know what we make?</h2>
              <p className="mt-3 text-cream/80">
                Explore our full range of namkeen, chips, traditional snacks and roasted treats.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-yellow px-6 py-3 font-bold text-brown shadow-lg transition-transform hover:scale-105"
              >
                Browse Products <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex justify-center sm:justify-end">
              <WhatsAppButton />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
