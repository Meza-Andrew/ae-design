import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { SectionTag, ImageBox } from "./shared";

// ─── Constants ────────────────────────────────────────────────────────────────

const DESKTOP_GAP = 24;

// ─── 1-up Slider ──────────────────────────────────────────────────────────────

function Slider({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, items.length - 1));
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((child, i) => (
            <div key={i} className="min-w-full">{child}</div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <>
          <button onClick={prev} disabled={index === 0} aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} disabled={index === items.length - 1} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
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

// ─── N-up continuous slider ────────────────────────────────────────────────────

function ResponsiveSlider({
  children,
  desktopCols,
}: {
  children: React.ReactNode;
  desktopCols: number;
}) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideUnit, setSlideUnit] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const containerWidth = el.offsetWidth;
      const cardWidth = (containerWidth - (desktopCols - 1) * DESKTOP_GAP) / desktopCols;
      setSlideUnit(cardWidth + DESKTOP_GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktopCols]);

  const maxIndex = items.length - desktopCols;

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  const cardWidthCss = `calc((100% - ${(desktopCols - 1) * DESKTOP_GAP}px) / ${desktopCols})`;

  return (
    <>
      {/* Mobile: delegate to 1-up Slider */}
      <div className="@md:hidden">
        <Slider>{children}</Slider>
      </div>

      {/* Desktop: continuous N-up */}
      <div className="hidden @md:block">
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${index * slideUnit}px)` }}
            >
              {items.map((child, i) => (
                <div key={i} className="shrink-0" style={{ width: cardWidthCss }}>
                  {child}
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} disabled={index === 0} aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} disabled={index >= maxIndex} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const featuredGuide = {
  tag: "Featured Guide",
  title: "The Race Director's Complete Timing Handbook",
  summary:
    "Everything you need to know about chip timing, result management, and keeping your finish line running smoothly — whether it's your first 5K or your tenth marathon.",
  readTime: "12 min read",
};

const articles = [
  {
    tag: "Race Planning",
    title: "How to Choose the Right Timing System for Your Event",
    summary: "Placeholder summary — 1–2 sentences describing the article's main takeaway for a race director.",
    readTime: "5 min read",
  },
  {
    tag: "Results",
    title: "Publishing Live Results: Best Practices for Race Day",
    summary: "Placeholder summary — 1–2 sentences describing what runners and directors should know about live result feeds.",
    readTime: "4 min read",
  },
  {
    tag: "Registration",
    title: "RunSignUp Tips: Building a Registration Page That Converts",
    summary: "Placeholder summary — 1–2 sentences on optimizing your registration funnel and reducing drop-off.",
    readTime: "6 min read",
  },
  {
    tag: "Community",
    title: "5 Ways to Grow Your Local Race Series Year Over Year",
    summary: "Placeholder summary — 1–2 sentences on community-building tactics that keep runners coming back.",
    readTime: "7 min read",
  },
  {
    tag: "Logistics",
    title: "Course Marking & Volunteer Coordination on Race Morning",
    summary: "Placeholder summary — 1–2 sentences covering the logistics checklist for a smooth race-day operation.",
    readTime: "5 min read",
  },
];

// ─── Hero / Featured Resource (combined) ─────────────────────────────────────

function Hero() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-12 @sm:py-20">
        {/* Desktop: image left, copy right */}
        <div className="grid @md:grid-cols-[3fr_2fr] gap-8 @md:gap-12 items-stretch">
          <ImageBox label="Featured article cover image" aspect="aspect-[4/3]" />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
                {featuredGuide.tag}
              </p>
              <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold leading-tight mb-4 tracking-tight">
                {featuredGuide.title}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed mb-3 max-w-md">
                {featuredGuide.summary}
              </p>
              <p className="text-xs text-muted-foreground">{featuredGuide.readTime}</p>
            </div>
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
              >
                Read the Guide <ArrowRight size={13} />
                <span className="text-[10px] opacity-60 font-normal">(→ Individual Post)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <div className="bg-card border border-border flex flex-col h-full">
      <ImageBox label="Article thumbnail" aspect="aspect-[16/9]" />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
          {article.tag}
        </p>
        <p className="text-sm font-semibold leading-snug">{article.title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {article.summary}
        </p>
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-border">
          <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            Read More <ArrowRight size={11} />
            <span className="text-[10px] opacity-50 font-normal no-underline">(→ Post)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Latest Articles ──────────────────────────────────────────────────────────

function LatestArticles() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
      <ResponsiveSlider desktopCols={4}>
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </ResponsiveSlider>
    </section>
  );
}

// ─── Page CTA ─────────────────────────────────────────────────────────────────

function PageCTA() {
  return (
    <section className="bg-foreground text-background border-t border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <div className="grid @md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Put It Into Practice?</h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Whether you're planning your next event or looking for a race to
              run, Arsenal Events has you covered.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 @md:justify-end">
            <Link
              to="/for-race-directors"
              className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Plan Your Event
              <span className="text-[10px] opacity-60">(→ For Race Directors)</span>
            </Link>
            <Link
              to="/races"
              className="inline-flex items-center gap-2 border border-background/40 text-background px-5 py-2.5 text-sm font-medium hover:bg-background/10 transition-colors"
            >
              Browse Upcoming Events
              <span className="text-[10px] opacity-60">(→ Races & Results)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  return (
    <main>
      <Hero />
      <LatestArticles />
      <PageCTA />
    </main>
  );
}
