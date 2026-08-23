import { useEffect } from "react";
import { Phone, Mail, MapPin, FileBadge, MessageCircle } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollReveal from "../components/ScrollReveal";
import { business } from "../data/business";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    lines: business.phones,
    hrefPrefix: "tel:",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [business.email],
    hrefPrefix: "mailto:",
  },
  {
    icon: MapPin,
    title: "Manufacturing Unit",
    lines: [business.manufacturer, business.address.line1, business.address.line2],
  },
  {
    icon: FileBadge,
    title: "GSTIN",
    lines: [business.gstin],
  },
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Siddharth Namkeen";
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark to-cream py-16 sm:py-20">
        <div className="jaali-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron-dark">Get In Touch</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brown sm:text-5xl">Let's Connect</h1>
          <p className="mt-4 text-lg text-brown-soft">
            Have a question, bulk order, or want to become a stockist? Reach out — we'd love to hear from you.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton label="Chat With Us on WhatsApp" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 90}>
              <div className="flex h-full flex-col gap-3 rounded-3xl bg-paper p-6 shadow-[0_8px_20px_-10px_rgba(61,35,20,0.2)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-red text-cream">
                  <card.icon size={22} />
                </div>
                <h3 className="font-display text-base font-bold text-brown">{card.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-brown-soft">
                  {card.lines.map((line) =>
                    card.hrefPrefix ? (
                      <a key={line} href={`${card.hrefPrefix}${line}`} className="hover:text-saffron-dark break-all">
                        {line}
                      </a>
                    ) : (
                      <span key={line}>{line}</span>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading align="left" eyebrow="Send a Message" title="Place an Enquiry" />
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="flex h-full flex-col gap-6">
              <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-brown/15">
                <img
                  src="/images/empowerment.png"
                  alt="Siddharth Namkeen manufacturing team"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-4 rounded-3xl bg-brown p-7 text-cream">
                <div className="flex items-center gap-3">
                  <MessageCircle size={22} className="text-yellow" />
                  <h3 className="font-display text-lg font-bold">Prefer WhatsApp?</h3>
                </div>
                <p className="text-sm text-cream/80">
                  Skip the form and message us directly for a quick response about products, sizes and bulk
                  orders.
                </p>
                <WhatsAppButton full />
              </div>
              <div className="overflow-hidden rounded-3xl border-2 border-brown/10">
                <iframe
                  title="Siddharth Namkeen Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(business.address.full)}&output=embed`}
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
