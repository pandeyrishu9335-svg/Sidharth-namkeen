import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { buildWhatsAppLink } from "../data/business";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Frontend-only enquiry capture. Structured so a backend/API endpoint
    // (e.g. POST /api/enquiries) can be wired in here later without changing
    // the form markup.
    setSubmitted(true);
  };

  const whatsappMessage = `Hello Siddharth Namkeen,\nName: ${form.name || "-"}\nPhone: ${form.phone || "-"}\nMessage: ${form.message || "I would like to enquire about your products."}`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-paper p-10 text-center shadow-[0_10px_28px_-10px_rgba(61,35,20,0.25)]">
        <CheckCircle2 size={48} className="text-green" />
        <h3 className="font-display text-2xl font-bold text-brown">Thank you, {form.name || "Friend"}!</h3>
        <p className="max-w-sm text-brown-soft">
          Your enquiry has been noted. Our team will get back to you shortly. For a faster response,
          continue the conversation on WhatsApp.
        </p>
        <a
          href={buildWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-bold text-cream shadow-md transition-transform hover:scale-105"
        >
          Continue on WhatsApp
        </a>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-saffron-dark underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl bg-paper p-6 shadow-[0_10px_28px_-10px_rgba(61,35,20,0.25)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-bold text-brown">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none transition-colors focus:border-saffron"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-bold text-brown">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none transition-colors focus:border-saffron"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-bold text-brown">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none transition-colors focus:border-saffron"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-bold text-brown">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us what you'd like to order or ask about..."
          className="resize-none rounded-xl border-2 border-brown/10 bg-cream px-4 py-3 text-brown outline-none transition-colors focus:border-saffron"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-red px-6 py-3.5 text-base font-bold text-cream shadow-lg shadow-red/20 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
      >
        Send Enquiry <Send size={18} />
      </button>
    </form>
  );
}
