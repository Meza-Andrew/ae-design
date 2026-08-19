import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { WireLabel, SectionTag, ImageBox } from "./shared";

// ─── 1-up Slider ──────────────────────────────────────────────────────────────

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
            <div key={i} className="min-w-full">{child}</div>
          ))}
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-12 @sm:py-20 grid @md:grid-cols-[3fr_2fr] gap-8 @md:gap-0 items-stretch">
        {/* Copy left */}
        <div className="flex flex-col justify-center @md:pr-12 @md:border-r @md:border-border">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">About Us — Hero</p>
          <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            Get to Know Arsenal Events
          </h1>
          <p className="text-muted-foreground text-base mb-8 max-w-sm leading-relaxed">
            Placeholder supporting copy — two sentences about who Arsenal
            Events is and what drives the team to show up on race day.
          </p>
          <a
            href="#community"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors self-start"
          >
            See Our Upcoming Races
            <span className="text-[10px] opacity-60 font-normal">(↓ #community)</span>
          </a>
        </div>
        {/* Tall portrait image right */}
        <div className="@md:pl-12">
          <ImageBox label="Hero image / team photo" aspect="aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}

// ─── Community Impact ─────────────────────────────────────────────────────────

const impactStats = [
  { value: "200+", label: "Races Timed" },
  { value: "50K+", label: "Finishers Tracked" },
  { value: "12", label: "Years in the Community" },
  { value: "30+", label: "Cities Served" },
];

const upcomingRaces = [
  { name: "Greenway 5K & 10K", date: "August 10, 2025", location: "Riverside Park, Columbus, OH" },
  { name: "Harbor Half Marathon", date: "September 6, 2025", location: "Lakefront Trail, Chicago, IL" },
  { name: "Summit Trail Challenge", date: "September 27, 2025", location: "Blue Ridge Trailhead, Asheville, NC" },
];

function CommunityImpact() {
  return (
    <section id="community" className="bg-secondary/40 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-2">Community Impact</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-xl leading-relaxed">
          Placeholder — a sentence or two about Arsenal's footprint in the
          running community and what these numbers represent.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-px bg-border mb-10">
          {impactStats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-6">
              <div className="text-3xl font-bold tabular-nums mb-0.5">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming races — desktop 3-up grid, mobile 1-up slider */}
        <h3 className="text-base font-semibold mb-4">Upcoming Races</h3>

        {/* Mobile */}
        <div className="@md:hidden">
          <Slider>
            {upcomingRaces.map((race) => (
              <div key={race.name} className="bg-card border border-border p-5 flex flex-col gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{race.date} · {race.location}</p>
                  <p className="text-base font-semibold leading-snug">{race.name}</p>
                </div>
                <div className="mt-auto pt-2">
                  <Link
                    to="/races"
                    className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
                  >
                    Register <ArrowRight size={13} />
                    <span className="text-[10px] opacity-50 font-normal no-underline">(→ Races & Results)</span>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop */}
        <div className="hidden @md:grid grid-cols-3 gap-6">
          {upcomingRaces.map((race) => (
            <div key={race.name} className="bg-card border border-border p-5 flex flex-col gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{race.date} · {race.location}</p>
                <p className="text-base font-semibold leading-snug">{race.name}</p>
              </div>
              <div className="mt-auto pt-2">
                <Link
                  to="/races"
                  className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
                >
                  Register <ArrowRight size={13} />
                  <span className="text-[10px] opacity-50 font-normal no-underline">(→ Races & Results)</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/races"
            className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            See All Upcoming Races <ArrowRight size={13} />
            <span className="text-[10px] opacity-50 font-normal no-underline">(→ Races & Results)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Mission / Vision / Values ────────────────────────────────────────────────

const mvv = [
  {
    label: "Mission",
    body: "Placeholder mission statement — one or two sentences describing why Arsenal Events exists and the problem it solves for the running community.",
  },
  {
    label: "Vision",
    body: "Placeholder vision statement — one sentence describing the future Arsenal Events is working toward for race directors and runners alike.",
  },
  {
    label: "Values",
    body: "Placeholder values copy — two or three bullet-style phrases or a short paragraph capturing what the team believes in (reliability, community, precision, etc.).",
  },
];

function MissionVisionValues() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <h2 className="text-2xl font-bold mb-8">Mission, Vision & Values</h2>
      <div className="grid @md:grid-cols-3 gap-6">
        {mvv.map((item) => (
          <div key={item.label} className="border border-border bg-card p-6 flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              {item.label}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

const teamMembers = [
  { name: "Team Member Name", title: "Founder & Race Director" },
  { name: "Team Member Name", title: "Lead Timing Technician" },
  { name: "Team Member Name", title: "Registration & Logistics" },
  { name: "Team Member Name", title: "Community & Partnerships" },
];

function Team() {
  return (
    <section id="team" className="bg-secondary/40 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
        <h2 className="text-2xl font-bold mb-8">Meet the Team</h2>

        {/* Mobile: 1-up slider */}
        <div className="@md:hidden">
          <Slider>
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-card border border-border flex flex-col">
                <ImageBox label="Team member photo" aspect="aspect-square" />
                <div className="p-5">
                  <p className="text-sm font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop: 4-up grid */}
        <div className="hidden @md:grid grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-card border border-border flex flex-col">
              <ImageBox label="Team member photo" aspect="aspect-square" />
              <div className="p-5">
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

function Story() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 @sm:px-6 py-10 @sm:py-16">
      <div className="grid @md:grid-cols-2 gap-8 @md:gap-16 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Placeholder paragraph one — origin story of Arsenal Events. How
              it started, who founded it, and what gap in the market it was
              built to fill.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Placeholder paragraph two — growth story. Key milestones, races
              timed, communities served, and how the team has evolved over the
              years.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Placeholder paragraph three — where Arsenal Events is headed.
              Commitment to the running community going forward.
            </p>
          </div>
        </div>
        <ImageBox label="Story image / race day photo" aspect="aspect-[4/3]" />
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
            <h2 className="text-2xl font-bold mb-2">Have a Question for Our Team?</h2>
            <p className="text-sm opacity-70 leading-relaxed">
              We'd love to hear from you — whether you're a runner, a race
              director, or just curious about what we do.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 @md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Contact Us
              <span className="text-[10px] opacity-60">(→ Contact Form)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      <Hero />
      <CommunityImpact />
      <MissionVisionValues />
      <Team />
      <Story />
      <PageCTA />
    </main>
  );
}
