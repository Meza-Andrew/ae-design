import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { WireLabel, SectionTag, BtnGhost, ImageBox } from "./shared";

// ─── 1-up Slider ──────────────────────────────────────────────────────────────

function Slider({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((child, i) => <div key={i} className="min-w-full">{child}</div>)}
        </div>
      </div>
      {items.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors">
            <ChevronRight size={16} />
          </button>
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${i === index ? "w-5 bg-foreground" : "w-1.5 bg-border"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Responsive N-up Slider ───────────────────────────────────────────────────
// Mobile (@md:hidden) → Slider. Desktop (hidden @md:block) → continuous N-up.

const DESKTOP_GAP = 24;

function ResponsiveSlider({ children, desktopCols }: { children: React.ReactNode; desktopCols: 3 | 4 }) {
  const items = React.Children.toArray(children);
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [slideUnit, setSlideUnit] = useState(0);
  const maxIdx = Math.max(0, items.length - desktopCols);
  const cssW = `calc((100% - ${(desktopCols - 1) * DESKTOP_GAP}px) / ${desktopCols})`;

  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return;
      const card = (wrapRef.current.clientWidth - (desktopCols - 1) * DESKTOP_GAP) / desktopCols;
      setSlideUnit(card + DESKTOP_GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [desktopCols]);

  return (
    <>
      <div className="@md:hidden"><Slider>{children}</Slider></div>
      <div className="hidden @md:block">
        <div ref={wrapRef} className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${idx * slideUnit}px)` }}>
            {items.map((child, i) => (
              <div key={i} className="shrink-0" style={{ width: cssW }}>{child}</div>
            ))}
          </div>
        </div>
        {maxIdx > 0 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}
              aria-label="Previous"
              className="bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-40">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to position ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${i === idx ? "w-5 bg-foreground" : "w-1.5 bg-border"}`} />
              ))}
            </div>
            <button onClick={() => setIdx((i) => Math.min(maxIdx, i + 1))} disabled={idx === maxIdx}
              aria-label="Next"
              className="bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-40">
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-card border-b border-border">
      {/* Full-width banner image on top */}
      <ImageBox label="Hero image / race day banner" aspect="aspect-[21/7] @md:aspect-[21/5]" />
      {/* Compact copy band below */}
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-8 @sm:py-10 flex flex-col @md:flex-row @md:items-center @md:justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">For Race Directors — Hero</p>
          <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold leading-tight tracking-tight">
            Race Day, Handled.
          </h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-md leading-relaxed">
            Placeholder hero copy — two sentences positioning Arsenal as the
            trusted timing and race management partner for event directors.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
          >
            See What We Offer
            <span className="text-[10px] opacity-60">(↓ anchor: #services)</span>
          </a>
          <a
            href="#form"
            className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Request Timing Services
            <span className="text-[10px] opacity-60">(↓ anchor: #form)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const services = [
  {
    name: "Registration",
    description:
      "Online and on-site participant registration with custom fields, wave assignments, and confirmation emails.",
    icon: "📋",
  },
  {
    name: "Timing & Results",
    description:
      "Chip timing, live results posting, age-group splits, and official finish-line certificate generation.",
    icon: "⏱",
  },
  {
    name: "Race Management",
    description:
      "End-to-end event coordination including course setup, volunteer management, and day-of logistics support.",
    icon: "🗂",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="bg-card border border-border p-6 flex flex-col gap-4">
      <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center text-lg">
        {service.icon}
      </div>
      <div>
        <h3 className="text-base font-semibold mb-1">{service.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex flex-col gap-2">
        <a
          href="#form"
          className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
        >
          Request This Service
          <span className="text-[10px] opacity-60">(↓ anchor: #form)</span>
        </a>
        <a
          href="#faqs"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
        >
          Browse FAQs <ArrowRight size={13} />
          <span className="text-[10px] opacity-50 font-normal no-underline">(↓ anchor: #faqs)</span>
        </a>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16 scroll-mt-16">
      <h2 className="text-2xl font-bold mb-6 @sm:mb-8">What We Offer</h2>
      <ResponsiveSlider desktopCols={3}>
        {services.map((s) => (
          <ServiceCard key={s.name} service={s} />
        ))}
      </ResponsiveSlider>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const images = [
    { label: "Finish line timing setup", span: "@md:col-span-2 @md:row-span-2" },
    { label: "Results board" },
    { label: "Registration tent" },
    { label: "Chip timing mat" },
    { label: "Race morning crew" },
  ];
  return (
    <section className="bg-secondary/40 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-6 @sm:mb-8">Arsenal at Race Day</h2>
        <div className="grid grid-cols-2 @md:grid-cols-3 gap-2 @sm:gap-3 auto-rows-[140px] @sm:auto-rows-[180px]">
          {images.map((img) => (
            <div
              key={img.label}
              className={`bg-muted border border-border flex flex-col items-center justify-center gap-1 ${img.span ?? ""}`}
            >
              <div className="w-8 h-8 border-2 border-muted-foreground/40 rounded-sm flex items-center justify-center">
                <div className="w-4 h-3 border border-muted-foreground/40" />
              </div>
              <WireLabel>{img.label}</WireLabel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Arsenal / About ──────────────────────────────────────────────────────

const stats = [
  { value: "200+", label: "Races Timed" },
  { value: "50K+", label: "Finishers Tracked" },
  { value: "12", label: "Years Experience" },
  { value: "98%", label: "Director Satisfaction" },
];

function WhyArsenal() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <div className="grid @md:grid-cols-2 gap-8 @md:gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4">Why Race Directors Choose Arsenal</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Placeholder about copy — three to four sentences speaking directly
            to race directors about reliability, experience, and the Arsenal
            team's hands-on approach to every event.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="#tech"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              See Our Race Day Tech <ArrowRight size={13} />
              <span className="text-[10px] opacity-50 font-normal no-underline">(↓ anchor: #tech)</span>
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Meet the Team <ArrowRight size={13} />
              <span className="text-[10px] opacity-50 font-normal no-underline">(→ About Us)</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-4">
              <div className="text-2xl font-bold tabular-nums">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech placeholder */}
      <div id="tech" className="mt-8 @sm:mt-12 scroll-mt-16">
        <h3 className="text-lg font-semibold mb-4">Race Day Technology</h3>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-3 @sm:gap-4">
          {["RFID Chip Timing", "Live Results Portal", "Registration Platform", "Director Dashboard"].map(
            (item) => (
              <div
                key={item}
                className="bg-card border border-border p-4 flex flex-col gap-2"
              >
                <div className="w-8 h-8 bg-muted border border-border flex items-center justify-center">
                  <div className="w-3.5 h-3.5 border border-muted-foreground/50" />
                </div>
                <p className="text-xs font-medium leading-snug">{item}</p>
                <p className="text-[11px] text-muted-foreground">
                  Placeholder tech description for this product or feature.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Form + FAQs ──────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "How far in advance should I book Arsenal for timing?",
    a: "We recommend reaching out at least 6–8 weeks before your event date to ensure availability and proper setup time.",
  },
  {
    q: "What race sizes do you support?",
    a: "Arsenal has successfully timed events ranging from 50 participants to over 5,000. We scale our equipment accordingly.",
  },
  {
    q: "Do you provide on-site support on race day?",
    a: "Yes — a certified Arsenal timing technician will be on-site from setup through final results publication.",
  },
  {
    q: "Can you integrate with my existing registration platform?",
    a: "We work with most major registration platforms. Reach out and we'll confirm compatibility during your inquiry.",
  },
];

function FormAndFAQs() {
  return (
    <section id="form" className="bg-secondary/40 border-y border-border scroll-mt-16">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <div className="grid @md:grid-cols-2 gap-8 @md:gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Request Timing Services</h2>
            <div className="bg-card border border-border p-6 space-y-4">
              {[
                { label: "Race / Event Name", type: "text", placeholder: "e.g. Greenway 5K & 10K" },
                { label: "Event Date", type: "date", placeholder: "" },
                { label: "Expected Participants", type: "number", placeholder: "e.g. 500" },
                { label: "Location / City", type: "text", placeholder: "e.g. Columbus, OH" },
                { label: "Your Name", type: "text", placeholder: "Race director full name" },
                { label: "Email Address", type: "email", placeholder: "director@yourevent.com" },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {field.label}
                  </label>
                  <div className="h-9 bg-input-background border border-border flex items-center px-3">
                    <span className="text-xs text-muted-foreground/60 italic">
                      {field.placeholder || field.type}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Additional Notes
                </label>
                <div className="h-20 bg-input-background border border-border" />
              </div>
              <button className="w-full bg-foreground text-background py-2.5 text-sm font-medium hover:bg-muted-foreground transition-colors">
                Submit Request
                <span className="text-[10px] opacity-60 ml-1.5">(form submission)</span>
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div id="faqs" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-card border border-border group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none">
                    {faq.q}
                    <ArrowRight
                      size={14}
                      className="shrink-0 ml-3 text-muted-foreground transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Resources ────────────────────────────────────────────────────────────────

const resources = [
  {
    category: "Race Directors",
    title: "How to Choose a Timing Partner for Your First Event",
    date: "June 2025",
  },
  {
    category: "Race Directors",
    title: "Registration Best Practices for Small to Mid-Size Races",
    date: "April 2025",
  },
  {
    category: "Race Directors",
    title: "What to Expect on Race Day: A Director's Timeline",
    date: "March 2025",
  },
  {
    category: "Race Directors",
    title: "Post-Race Wrap-Up: Communicating Results to Participants",
    date: "February 2025",
  },
  {
    category: "Race Directors",
    title: "Volunteer Coordination Tips for Race Morning",
    date: "January 2025",
  },
];

function Resources() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <h2 className="text-2xl font-bold mb-6 @sm:mb-8">For Race Directors</h2>
      <ResponsiveSlider desktopCols={4}>
        {resources.map((r) => (
          <div key={r.title} className="bg-card border border-border p-5 flex flex-col gap-3">
            <div>
              <WireLabel>{r.category}</WireLabel>
              <h3 className="text-sm font-semibold mt-1 leading-snug">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
            </div>
            <div className="mt-auto">
              <BtnGhost note="→ Individual post">Read This</BtnGhost>
            </div>
          </div>
        ))}
      </ResponsiveSlider>
      <div className="mt-8 flex justify-center">
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
        >
          See All Resources <ArrowRight size={13} />
          <span className="text-[10px] opacity-50 font-normal no-underline">(→ Resources)</span>
        </Link>
      </div>
    </section>
  );
}

// ─── Page CTA ─────────────────────────────────────────────────────────────────

function PageCTA() {
  return (
    <section className="bg-foreground text-background">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <div className="grid @md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Let's Make Your Race a Success</h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Ready to partner with Arsenal? Review our services or reach out to start planning your event.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 @md:justify-end">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              See What We Offer
              <span className="text-[10px] opacity-60">(↓ anchor: #services)</span>
            </a>
            <a
              href="#form"
              className="inline-flex items-center gap-2 border border-background/40 text-background px-5 py-2.5 text-sm font-medium hover:border-background transition-colors"
            >
              Request Timing Services
              <span className="text-[10px] opacity-60">(↓ anchor: #form)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForRaceDirectorsPage() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <WhyArsenal />
      <FormAndFAQs />
      <Resources />
      <PageCTA />
    </main>
  );
}
