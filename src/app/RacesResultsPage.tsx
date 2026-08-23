import { Search } from "lucide-react";
import imgHero from "@/imports/races-results-hero.png";
import {
  AeButton,
  PageBand,
  PageCTA,
  RaceCard,
  RUNNER_STATS_QUOTES,
  ResourceSection,
  SectionIntro,
  SHARED_RACES,
  SITE_BODY_COPY_STYLE,
  SliderControls,
  StatsBand,
} from "./sitePatterns";

const resultRows = Array.from({ length: 6 }).map((_, index) => ({
  title: "Halloween 5k & Monster Mile",
  date: "October 30, 2026",
  location: "Stafford, VA",
  key: index,
}));

function Hero() {
  return (
    <section className="races-results-hero-section relative min-h-[clamp(420px,42vw,620px)] overflow-hidden" style={{ background: "var(--surface-dark)" }}>
      <style>{`
        .races-results-hero-photo {
          object-position: 48% 18%;
        }
        .races-results-hero-content {
          min-height: clamp(420px, 42vw, 620px);
        }
        @media (min-width: 1550px) {
          .races-results-hero-section,
          .races-results-hero-content {
            min-height: clamp(620px, 38vw, 860px);
          }
        }
        @media (max-width: 1200px) {
          .races-results-hero-photo {
            object-position: 55% 18%;
          }
        }
        @media (max-width: 900px) {
          .races-results-hero-photo {
            object-position: 61% 18%;
          }
        }
        @media (max-width: 640px) {
          .races-results-hero-photo {
            object-position: 67% 18%;
          }
        }
        @media (max-width: 767px) {
          .races-results-hero-actions {
            margin-left: 0 !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            width: 100%;
          }
        }
        .races-results-hero-overlay {
          width: 100%;
          height: 72%;
          background: linear-gradient(
            0deg,
            rgba(35,41,67,0.92) 0%,
            rgba(35,41,67,0.84) 34%,
            rgba(35,41,67,0.58) 58%,
            rgba(35,41,67,0.24) 80%,
            rgba(35,41,67,0) 100%
          );
        }
        @media (max-width: 900px) {
          @media (max-width: 767px) {
          .races-results-hero-actions {
            margin-left: 0 !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            width: 100%;
          }
        }
        .races-results-hero-overlay {
            height: 78%;
          }
        }
      `}</style>
      <img
        src={imgHero}
        alt="Runners on a wooded race course"
        className="races-results-hero-photo absolute inset-0 h-full w-full object-cover"
      />
      <div className="races-results-hero-overlay absolute bottom-0 left-0 pointer-events-none" />
      <div className="homepage-built-mobile-padding races-results-hero-content relative z-10 mx-auto flex max-w-[1440px] flex-col justify-end px-5 pb-8 @sm:px-10 @md:pb-10">
        <div className="grid gap-7 @lg:grid-cols-[minmax(0,760px)_auto] @lg:items-end @lg:justify-between">
          <div>
            <h1 className="mb-5 text-[clamp(48px,5.7vw,76px)] font-bold italic leading-none" style={{ color: "var(--text-inverse)", textShadow: "0 4px 4px rgba(0,0,0,0.25)" }}>
              Races & Results
            </h1>
            <p className="max-w-[650px]" style={{ ...SITE_BODY_COPY_STYLE, color: "var(--text-inverse)", textShadow: "0 4px 4px rgba(0,0,0,0.25)" }}>
              Placeholder supporting headline copy - one or two sentences describing both race director and runner-facing value propositions.
            </p>
          </div>
          <div className="races-results-hero-actions ml-auto flex flex-col items-end gap-5 @sm:flex-row @sm:justify-end @lg:flex-col @lg:pb-2">
            <AeButton href="#results" className="min-w-[260px]">Get Your Results</AeButton>
            <AeButton href="#upcoming-races" className="min-w-[302px]">Browse Upcoming Races</AeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterBar() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 @md:grid-cols-3">
        {["Search by Month", "Search by Distance", "Search by Location"].map((label) => (
          <select key={label} aria-label={label} className="h-14 rounded-[4px] border-0 bg-white px-5 text-[17px] font-medium" style={{ color: "var(--text-default)" }}>
            <option>{label}</option>
          </select>
        ))}
      </div>
      <label className="relative block">
        <input aria-label="Search by Name" placeholder="Search by Name" className="h-14 w-full rounded-[4px] border-0 bg-white px-5 pr-14 text-[17px] font-medium" />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2" size={22} style={{ color: "var(--text-default)" }} />
      </label>
    </div>
  );
}

function Results() {
  return (
    <PageBand tone="subtle">
      <section id="results" className="mx-auto max-w-[1180px] scroll-mt-20">
        <h2 className="mb-9 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          Results
        </h2>
        <FilterBar />
        <div className="mt-10 grid gap-5">
          {resultRows.map((row) => (
            <article key={row.key} className="grid items-center gap-4 rounded-[4px] bg-white p-4 shadow-[0_4px_12px_rgba(35,41,67,0.12)] @md:grid-cols-[120px_1fr_auto]">
              <img src={SHARED_RACES[0].logo} alt="" className="max-h-[48px] object-contain" />
              <div className="grid gap-1 @md:grid-cols-[1fr_auto] @md:items-center">
                <h3 className="text-[19px] font-bold italic" style={{ color: "var(--text-accent)" }}>{row.title}</h3>
                <p className="text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.6)" }}>{row.date} | {row.location}</p>
              </div>
              <AeButton to="/races" variant="secondary" className="min-h-[38px] min-w-[150px] px-5 py-2 text-[15px]">Results</AeButton>
            </article>
          ))}
        </div>
        <SliderControls onPrev={() => undefined} onNext={() => undefined} />
      </section>
    </PageBand>
  );
}

function UpcomingRaces() {
  return (
    <PageBand>
      <section id="upcoming-races" className="mx-auto max-w-[1180px] scroll-mt-20">
        <h2 className="mb-9 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          Upcoming Races
        </h2>
        <FilterBar />
        <div className="mt-10 grid gap-8 @md:grid-cols-2 @xl:grid-cols-3">
          {[...SHARED_RACES, ...SHARED_RACES].map((race, index) => (
            <RaceCard key={`${race.title}-${index}`} race={race} />
          ))}
        </div>
        <SliderControls onPrev={() => undefined} onNext={() => undefined} />
      </section>
    </PageBand>
  );
}

export default function RacesResultsPage() {
  return (
    <main style={{ background: "var(--surface-default)" }}>
      <Hero />
      <Results />
      <UpcomingRaces />
      <StatsBand quotes={RUNNER_STATS_QUOTES} ctaLabel="See Our Race Day Tech" ctaTo="/for-race-directors" stackBelow950 />
      <ResourceSection />
      <PageCTA title="Ready to Run?" />
    </main>
  );
}
















