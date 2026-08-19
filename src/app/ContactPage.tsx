import React, { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { SectionTag, ImageBox } from "./shared";

// ─── Data ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "How far in advance should I book Arsenal Events for my race?",
    a: "Placeholder answer — one or two sentences giving a recommended lead time and noting that popular dates book early.",
  },
  {
    q: "What timing technology do you use?",
    a: "Placeholder answer — brief description of chip/RFID timing systems Arsenal Events uses and what accuracy runners and directors can expect.",
  },
  {
    q: "Do you provide registration support or just timing?",
    a: "Placeholder answer — clarify the range of services offered beyond timing, e.g. registration setup on RunSignUp, results publishing, etc.",
  },
  {
    q: "Can Arsenal Events handle races of any size?",
    a: "Placeholder answer — note the range of event sizes the team has experience with and any minimums or maximums.",
  },
  {
    q: "What happens if there is a technical issue on race day?",
    a: "Placeholder answer — describe backup procedures, on-site support, and how issues are resolved in real time.",
  },
  {
    q: "Where is Arsenal Events based and what areas do you serve?",
    a: "Placeholder answer — mention home base, primary service region, and willingness to travel for events outside that area.",
  },
];

const serviceRegions = [
  { label: "Primary Region", detail: "Placeholder — city / metro area" },
  { label: "Secondary Region", detail: "Placeholder — surrounding states or region" },
  { label: "Travel Available", detail: "Placeholder — note on travel availability" },
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-medium hover:text-muted-foreground transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed pb-4 pr-6">{a}</p>
      )}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-secondary/40 border-b border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-12 @sm:py-20">
        {/* Centered heading — no image */}
        <div className="text-center max-w-lg mx-auto mb-10">
          <SectionTag label="Contact — Hero" />
          <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Placeholder supporting copy — one or two sentences inviting race
            directors and runners to reach out with questions, bookings, or
            general inquiries.
          </p>
        </div>
        {/* Two large action tiles */}
        <div className="grid @md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <a
            href="#contact-form"
            className="flex items-center gap-4 bg-card border border-border px-6 py-5 hover:bg-accent transition-colors group"
          >
            <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center shrink-0">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Message Us</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fill out the contact form
                <span className="opacity-50"> (↓ Contact Form)</span>
              </p>
            </div>
          </a>
          <a
            href="#call"
            className="flex items-center gap-4 bg-card border border-border px-6 py-5 hover:bg-accent transition-colors group"
          >
            <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center shrink-0">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Call Us</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Speak with the team directly
                <span className="opacity-50"> (↓ Phone)</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Service Area ─────────────────────────────────────────────────────────────

function ServiceArea() {
  return (
    <section className="bg-secondary/40 border-b border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-2">Service Area</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-xl leading-relaxed">
          Placeholder — a sentence about where Arsenal Events operates and
          whether travel is available for out-of-region events.
        </p>
        <div className="grid @md:grid-cols-2 gap-6 items-start">
          {/* Map placeholder */}
          <ImageBox label="Service area map" aspect="aspect-[4/3]" />
          {/* Region list */}
          <div className="flex flex-col gap-px bg-border">
            {serviceRegions.map((r) => (
              <div key={r.label} className="bg-card px-5 py-5 flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">{r.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form + Alternate Contact ─────────────────────────────────────────

function ContactForm() {
  return (
    <section id="contact-form" className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <div className="grid @md:grid-cols-[1fr_auto] gap-10 @md:gap-16 items-start">

        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Contact Form</h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Placeholder — a short line inviting the user to fill out the form
            and setting expectations for response time.
          </p>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid @md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Placeholder"
                  className="bg-input-background border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Placeholder"
                  className="bg-input-background border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Placeholder"
                className="bg-input-background border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium">I am a…</label>
              <select className="bg-input-background border border-border px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring appearance-none">
                <option value="">Select one</option>
                <option>Runner</option>
                <option>Race Director</option>
                <option>Event Sponsor / Partner</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Placeholder — describe your question or inquiry"
                className="bg-input-background border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-muted-foreground transition-colors"
              >
                Send Your Message
              </button>
            </div>
          </form>
        </div>

        {/* Alternate Contact */}
        <div id="call" className="@md:w-64 bg-card border border-border p-6 flex flex-col gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
              Alternate Contact
            </p>
            <h3 className="text-base font-bold mb-1">Prefer to talk?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Placeholder — note on phone availability or best hours to call.
            </p>
          </div>
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <a
              href="tel:+10000000000"
              className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              <Phone size={13} className="shrink-0" />
              Call Us
              <span className="text-[10px] opacity-50 font-normal no-underline">(tel: link)</span>
            </a>
            <p className="text-xs text-muted-foreground">
              (000) 000-0000
            </p>
          </div>
          <div className="border-t border-border pt-4 flex flex-col gap-1">
            <p className="text-xs font-medium">Hours</p>
            <p className="text-xs text-muted-foreground">Placeholder — Mon–Fri, 9am–5pm ET</p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

function FAQs() {
  return (
    <section className="bg-secondary/40 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <div className="grid @md:grid-cols-[1fr_2fr] gap-8 @md:gap-16 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">FAQs</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Placeholder — a line inviting users to check for answers before
              reaching out, and noting the team is happy to help with anything
              not covered here.
            </p>
          </div>
          <div className="bg-card border border-border px-5 divide-y divide-border">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <ServiceArea />
      <ContactForm />
      <FAQs />
    </main>
  );
}
