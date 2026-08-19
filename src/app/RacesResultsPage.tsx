import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import {
  WireLabel,
  SectionTag,
  BtnPrimary,
  BtnOutline,
  BtnGhost,
  ImageBox,
} from "./shared";

// ─── 1-up Slider (local copy matching HomePage) ───────────────────────────────

function Slider({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((child, i) => (
            <div key={i} className="min-w-full">
              {child}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-5 bg-foreground" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Responsive slider ────────────────────────────────────────────────────────
// Mobile (@sm:hidden)  → original Slider unchanged.
// Desktop (hidden @sm:block) → continuous N-up, slides one card at a time.

const DESKTOP_GAP = 24; // gap-6

function ResponsiveSlider({
  children,
  desktopCols,
}: {
  children: React.ReactNode;
  desktopCols: 3 | 4;
}) {
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
      {/* Mobile: original Slider — untouched */}
      <div className="@md:hidden">
        <Slider>{children}</Slider>
      </div>

      {/* Desktop: continuous N-up slider */}
      <div className="hidden @md:block">
        <div ref={wrapRef} className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${idx * slideUnit}px)` }}
          >
            {items.map((child, i) => (
              <div key={i} className="shrink-0" style={{ width: cssW }}>
                {child}
              </div>
            ))}
          </div>
        </div>
        {maxIdx > 0 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              aria-label="Previous"
              className="bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to position ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === idx ? "w-5 bg-foreground" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => Math.min(maxIdx, i + 1))}
              disabled={idx === maxIdx}
              aria-label="Next"
              className="bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-40"
            >
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
      <ImageBox label="Hero image / race banner" aspect="aspect-[21/7] @md:aspect-[21/5]" />
      {/* Compact copy band below */}
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-8 @sm:py-10 flex flex-col @md:flex-row @md:items-center @md:justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">Races & Results Hero</p>
          <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold leading-tight tracking-tight">
            Races & Results
          </h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-md leading-relaxed">
            Placeholder supporting copy — find your next race or look up your
            finish time from a past event.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="#results"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
          >
            Get Your Results
            <span className="text-[10px] opacity-60 font-normal">(↓ #results)</span>
          </a>
          <a
            href="#upcoming-races"
            className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Browse Upcoming Races
            <span className="text-[10px] opacity-60 font-normal">(↓ #upcoming-races)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

const results = [
  {
    name: "Greenway 5K & 10K",
    date: "June 15, 2025",
    location: "Riverside Park, Columbus, OH",
  },
  {
    name: "Harbor Half Marathon",
    date: "May 4, 2025",
    location: "Lakefront Trail, Chicago, IL",
  },
  {
    name: "Summit Trail Challenge",
    date: "April 12, 2025",
    location: "Blue Ridge Trailhead, Asheville, NC",
  },
  {
    name: "Spring Classic 5K",
    date: "March 22, 2025",
    location: "Centennial Park, Nashville, TN",
  },
];

function ResultCard({ result }: { result: (typeof results)[number] }) {
  return (
    <div className="bg-card border border-border flex flex-col">
      <ImageBox label="Race photo" aspect="aspect-[16/9]" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">
            {result.date} · {result.location}
          </p>
          <h3 className="text-base font-semibold leading-snug">{result.name}</h3>
        </div>
        <div className="mt-auto pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
          >
            View Results
            <ExternalLink size={12} />
            <span className="text-[10px] opacity-60">(→ Results platform)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Results() {
  return (
    <section id="results" className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <h2 className="text-2xl font-bold mb-6 @sm:mb-8">Results</h2>
      <ResponsiveSlider desktopCols={3}>
        {results.map((r) => (
          <ResultCard key={r.name} result={r} />
        ))}
      </ResponsiveSlider>
    </section>
  );
}

// ─── Upcoming Races ───────────────────────────────────────────────────────────

const upcomingRaces = [
  {
    name: "Greenway 5K & 10K",
    date: "August 10, 2025",
    location: "Riverside Park, Columbus, OH",
  },
  {
    name: "Harbor Half Marathon",
    date: "September 6, 2025",
    location: "Lakefront Trail, Chicago, IL",
  },
  {
    name: "Summit Trail Challenge",
    date: "September 27, 2025",
    location: "Blue Ridge Trailhead, Asheville, NC",
  },
  {
    name: "Fall Finish 10K",
    date: "October 18, 2025",
    location: "Forest Park, Portland, OR",
  },
];

function UpcomingRaceCard({ race }: { race: (typeof upcomingRaces)[number] }) {
  return (
    <div className="bg-card border border-border flex flex-col">
      <ImageBox label="Race image" aspect="aspect-[16/9]" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">
            {race.date} · {race.location}
          </p>
          <h3 className="text-base font-semibold leading-snug">{race.name}</h3>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
          >
            Register
            <ExternalLink size={12} />
            <span className="text-[10px] opacity-60">(→ RunSignUp)</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Race Details
            <ExternalLink size={12} />
            <span className="text-[10px] opacity-60">(→ Host info)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function UpcomingRaces() {
  return (
    <section id="upcoming-races" className="bg-secondary/40 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-6 @sm:mb-8">Upcoming Races</h2>
        <ResponsiveSlider desktopCols={3}>
          {upcomingRaces.map((race) => (
            <UpcomingRaceCard key={race.name} race={race} />
          ))}
        </ResponsiveSlider>
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            See all upcoming events <ArrowRight size={13} />
            <span className="text-[10px] opacity-50 font-normal no-underline">(→ External events listing)</span>
          </a>
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
          <h2 className="text-2xl font-bold mb-4">Built for Race Day</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Placeholder about copy — two or three sentences about Arsenal
            Events, its mission, and what differentiates the service for both
            race directors and runners.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            Get to Know Our Team <ArrowRight size={13} />
            <span className="text-[10px] opacity-50 font-normal no-underline">(→ About Us)</span>
          </Link>
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
    </section>
  );
}

// ─── Resources ────────────────────────────────────────────────────────────────

const resources = [
  {
    category: "Runners",
    title: "Understanding Your Race Results: A Runner's Guide",
    date: "May 2025",
  },
  {
    category: "Runners",
    title: "Race Day Prep: What to Bring to the Start Line",
    date: "March 2025",
  },
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
    title: "Post-Race Wrap-Up: Communicating Results to Participants",
    date: "February 2025",
  },
];

function Resources() {
  return (
    <section className="bg-secondary/40 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-6 @sm:mb-8">From the Arsenal Blog</h2>
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
            <h2 className="text-2xl font-bold mb-2">Ready to Run?</h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Browse the full calendar and find your next finish line.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 @md:justify-end">
            <a
              href="#upcoming-races"
              className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Sign Up For Your Next Race
              <span className="text-[10px] opacity-60">(↑ #upcoming-races)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RacesResultsPage() {
  return (
    <main>
      <Hero />
      <Results />
      <UpcomingRaces />
      <WhyArsenal />
      <Resources />
      <PageCTA />
    </main>
  );
}
