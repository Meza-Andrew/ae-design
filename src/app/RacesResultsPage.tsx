import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import imgHero from "@/imports/races-results-hero.png";
import filledChevron from "@/imports/race-day-chevron.svg";
import outlineChevron from "@/imports/results-upcoming-chevron-outline.svg";
import topographyBg from "@/imports/topography-bg-1.svg";
import grandSlamrock2026 from "@/imports/race-logos/race-logo-2026-03-13-grand-slamrock-5k-1-mile-half-mile.png";
import zoe5k2026 from "@/imports/race-logos/race-logo-2026-08-01-zoe-5k-to-end-overdose.png";
import dahlgrenHeritage50k2026 from "@/imports/race-logos/race-logo-2026-08-08-dahlgren-heritage-rail-trail-50k.png";
import threeHHalfMarathon2026 from "@/imports/race-logos/race-logo-2026-08-08-the-3h-half-marathon.png";
import devilsDenTenMiler2026 from "@/imports/race-logos/race-logo-2026-08-16-devils-den-ten-miler.jpg";
import goForBo2026 from "@/imports/race-logos/race-logo-2026-09-12-go-for-bo.png";
import hartwoodStallionXc2026 from "@/imports/race-logos/race-logo-2026-09-12-hartwood-stallionxc-open-5k.png";
import runForJuju2026 from "@/imports/race-logos/race-logo-2026-09-13-run-for-juju.pdf";
import downtownMile2026 from "@/imports/race-logos/race-logo-2026-09-19-downtown-mile.png";
import mocoDems5k2026 from "@/imports/race-logos/race-logo-2026-09-27-moco-dems-5k-fall-funrun.png";
import galaxyGlowRun2026 from "@/imports/race-logos/race-logo-2026-10-03-galaxy-glow-run.jpg";
import potomacShores2026 from "@/imports/race-logos/race-logo-2026-10-03-potomac-shores-10k-5k.png";
import kingGeorgeFallFestival2026 from "@/imports/race-logos/race-logo-2026-10-04-king-george-fall-festival-5k-1-mile-tot-dash.png";
import plaidToTheBone2026 from "@/imports/race-logos/race-logo-2026-10-11-plaid-to-the-bone-10k.png";
import hyattsvilleZombieRun2026 from "@/imports/race-logos/race-logo-2026-10-17-hyattsville-zombie-run.png";
import halloweenMonsterMile2026 from "@/imports/race-logos/race-logo-2026-10-24-halloween-5k-monster-mile.png";
import iwalkForActs2026 from "@/imports/race-logos/race-logo-2026-10-24-iwalk-for-acts.png";
import valorRanch2026 from "@/imports/race-logos/race-logo-2026-11-14-valor-ranch-10k-5k-1-mile.png";
import ymcaTurkeyTrot2026 from "@/imports/race-logos/race-logo-2026-11-26-rappahannock-area-ymca-turkey-trot.png";
import southRidingJingleDash2026 from "@/imports/race-logos/race-logo-2026-12-05-south-riding-jingle-dash-10k-5k.png";
import blueAndGrayHalfMarathon2026 from "@/imports/race-logos/race-logo-2026-12-06-blue-and-gray-half-marathon.pdf";
import frostyReindeerRun2026 from "@/imports/race-logos/race-logo-2026-12-12-frosty-5k-reindeer-run.png";
import dahlgrenTrailHalfMarathon2027 from "@/imports/race-logos/race-logo-2027-01-16-dahlgren-trail-half-marathon.png";
import loveTheRunYoureWith2027 from "@/imports/race-logos/race-logo-2027-02-13-love-the-run-youre-with-4-miler.png";
import springFever2027 from "@/imports/race-logos/race-logo-2027-04-17-spring-fever-5k-half-mile.png";
import racesData from "../data/races.json";
import {
  AeButton,
  PageBand,
  PageCTA,
  RUNNER_STATS_QUOTES,
  ResourceSection,
  SITE_BODY_COPY_STYLE,
  SliderControls,
  StatsBand,
} from "./sitePatterns";

const TODAY = "2026-08-24";

const raceLogoAssets = {
  grandSlamrock2026,
  zoe5k2026,
  dahlgrenHeritage50k2026,
  threeHHalfMarathon2026,
  devilsDenTenMiler2026,
  goForBo2026,
  hartwoodStallionXc2026,
  runForJuju2026,
  downtownMile2026,
  mocoDems5k2026,
  galaxyGlowRun2026,
  potomacShores2026,
  kingGeorgeFallFestival2026,
  plaidToTheBone2026,
  hyattsvilleZombieRun2026,
  halloweenMonsterMile2026,
  iwalkForActs2026,
  valorRanch2026,
  ymcaTurkeyTrot2026,
  southRidingJingleDash2026,
  blueAndGrayHalfMarathon2026,
  frostyReindeerRun2026,
  dahlgrenTrailHalfMarathon2027,
  loveTheRunYoureWith2027,
  springFever2027,
} as const;

type RaceLogoKey = keyof typeof raceLogoAssets;
type RaceEntry = {
  id: string;
  title: string;
  date: string;
  distances: string[];
  location: string;
  logoKey?: RaceLogoKey;
  logoUrl?: string;
  infoUrl?: string;
  resultsUrl?: string;
  registrationUrl?: string;
};

type RaceFilters = {
  year: string;
  month: string;
  distance: string;
  location: string;
  query: string;
};

const races = (racesData as RaceEntry[])
  .map((race) => ({ ...race, logo: race.logoKey ? raceLogoAssets[race.logoKey] : race.logoUrl }))
  .sort((a, b) => a.date.localeCompare(b.date));

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

const formatRaceDate = (date: string) => dateFormatter.format(new Date(`${date}T12:00:00`));
const getRaceMonth = (date: string) => monthFormatter.format(new Date(`${date}T12:00:00`));
const getDistanceLabel = (race: RaceEntry) => race.distances.length > 0 ? race.distances.join(", ") : "";
const getMetaLine = (race: RaceEntry) => [formatRaceDate(race.date), race.location].filter(Boolean).join(" | ");

const defaultFilters: RaceFilters = {
  year: "",
  month: "",
  distance: "",
  location: "",
  query: "",
};

const getFilterOptions = (items: RaceEntry[]) => ({
  years: Array.from(new Set(items.map((race) => race.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
  months: Array.from(new Set(items.map((race) => getRaceMonth(race.date)))),
  distances: Array.from(new Set(items.flatMap((race) => race.distances))).sort(),
  locations: Array.from(new Set(items.map((race) => race.location).filter(Boolean))).sort(),
});

const applyRaceFilters = (items: RaceEntry[], filters: RaceFilters) => {
  const query = filters.query.trim().toLowerCase();
  return items.filter((race) => {
    const matchesYear = !filters.year || race.date.startsWith(filters.year);
    const matchesMonth = !filters.month || getRaceMonth(race.date) === filters.month;
    const matchesDistance = !filters.distance || race.distances.includes(filters.distance);
    const matchesLocation = !filters.location || race.location === filters.location;
    const searchable = [race.title, race.location, getDistanceLabel(race), formatRaceDate(race.date)].join(" ").toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    return matchesYear && matchesMonth && matchesDistance && matchesLocation && matchesQuery;
  });
};

function RaceLogo({ race, className = "" }: { race: RaceEntry & { logo?: string }; className?: string }) {
  const logoSrc = race.logo || race.logoUrl || "";
  const isPdf = logoSrc.toLowerCase().includes(".pdf");

  if (!logoSrc || isPdf) {
    return (
      <div className={`flex items-center justify-center rounded-[4px] px-4 py-3 text-center text-[15px] font-bold italic leading-tight ${className}`} style={{ background: "var(--surface-subtle)", color: "var(--text-accent)" }}>
        {race.title}
      </div>
    );
  }

  return <img src={logoSrc} alt={`${race.title} logo`} className={className} />;
}

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const id = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

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
        <div
          className="grid gap-7 @lg:grid-cols-[minmax(0,760px)_auto] @lg:items-end @lg:justify-between"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-48px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            willChange: "opacity, transform",
          }}
        >
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

function FilterBar({
  filters,
  onChange,
  options,
  showYear = false,
}: {
  filters: RaceFilters;
  onChange: (filters: RaceFilters) => void;
  options: ReturnType<typeof getFilterOptions>;
  showYear?: boolean;
}) {
  const updateFilter = (key: keyof RaceFilters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <div className="grid gap-5">
      <div className={`grid gap-5 ${showYear ? "@md:grid-cols-2 @xl:grid-cols-4" : "@md:grid-cols-3"}`}>
        {showYear ? (
          <select aria-label="Search by Year" value={filters.year} onChange={(event) => updateFilter("year", event.currentTarget.value)} className="h-14 rounded-[4px] border-0 bg-white px-5 text-[17px] font-medium" style={{ color: filters.year ? "var(--text-default)" : "rgba(35,41,67,0.52)" }}>
            <option value="">Search by Year</option>
            {options.years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        ) : null}
        <select aria-label="Search by Month" value={filters.month} onChange={(event) => updateFilter("month", event.currentTarget.value)} className="h-14 rounded-[4px] border-0 bg-white px-5 text-[17px] font-medium" style={{ color: filters.month ? "var(--text-default)" : "rgba(35,41,67,0.52)" }}>
          <option value="">Search by Month</option>
          {options.months.map((month) => <option key={month} value={month}>{month}</option>)}
        </select>
        <select aria-label="Search by Distance" value={filters.distance} onChange={(event) => updateFilter("distance", event.currentTarget.value)} className="h-14 rounded-[4px] border-0 bg-white px-5 text-[17px] font-medium" style={{ color: filters.distance ? "var(--text-default)" : "rgba(35,41,67,0.52)" }}>
          <option value="">Search by Distance</option>
          {options.distances.map((distance) => <option key={distance} value={distance}>{distance}</option>)}
        </select>
        <select aria-label="Search by Location" value={filters.location} onChange={(event) => updateFilter("location", event.currentTarget.value)} className="h-14 rounded-[4px] border-0 bg-white px-5 text-[17px] font-medium" style={{ color: filters.location ? "var(--text-default)" : "rgba(35,41,67,0.52)" }}>
          <option value="">Search by Location</option>
          {options.locations.map((location) => <option key={location} value={location}>{location}</option>)}
        </select>
      </div>
      <label className="relative block">
        <input aria-label="Search by Name" placeholder="Search by Name" value={filters.query} onChange={(event) => updateFilter("query", event.currentTarget.value)} className="h-14 w-full rounded-[4px] border-0 bg-white px-5 pr-14 text-[17px] font-medium placeholder:text-[rgba(35,41,67,0.52)]" />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2" size={22} style={{ color: "var(--text-default)" }} />
      </label>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[4px] bg-white px-6 py-8 text-center text-[18px] font-semibold shadow-[0_4px_12px_rgba(35,41,67,0.12)]" style={{ color: "var(--text-default)" }}>
      No races match those filters.
    </div>
  );
}

function Results() {
  const pastRaces = useMemo(() => races.filter((race) => race.date < TODAY).sort((a, b) => b.date.localeCompare(a.date)), []);
  const options = useMemo(() => getFilterOptions(pastRaces), [pastRaces]);
  const [filters, setFilters] = useState(defaultFilters);
  const filteredRaces = useMemo(() => applyRaceFilters(pastRaces, filters), [pastRaces, filters]);

  return (
    <PageBand>
      <section id="results" className="mx-auto max-w-[1180px] scroll-mt-20">
        <h2 className="mb-9 flex items-center gap-3 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          <span>Results</span>
          <img src={filledChevron} alt="" className="h-[clamp(24px,3.2vw,42px)] w-auto" />
        </h2>
        <FilterBar filters={filters} onChange={setFilters} options={options} showYear />
        <div className="mt-10 grid gap-5">
          {filteredRaces.length > 0 ? filteredRaces.map((race) => (
            <article key={race.id} className="grid items-center gap-4 rounded-[4px] bg-white p-4 shadow-[0_4px_12px_rgba(35,41,67,0.12)] @md:grid-cols-[120px_1fr_auto]">
              <RaceLogo race={race} className="h-[56px] w-full object-contain @md:max-w-[120px]" />
              <div className="grid gap-1 @md:grid-cols-[1fr_auto] @md:items-center">
                <h3 className="text-[19px] font-bold italic" style={{ color: "var(--text-accent)" }}>{race.title}</h3>
                <p className="text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.6)" }}>{getMetaLine(race)}</p>
              </div>
              <AeButton href={race.resultsUrl || race.infoUrl} to={race.resultsUrl || race.infoUrl ? undefined : "/races"} variant="secondary" className="min-h-[38px] min-w-[150px] px-5 py-2 text-[15px]">Results</AeButton>
            </article>
          )) : <EmptyState />}
        </div>
        <SliderControls onPrev={() => undefined} onNext={() => undefined} />
      </section>
    </PageBand>
  );
}

function UpcomingRaceCard({ race }: { race: RaceEntry & { logo?: string } }) {
  return (
    <article className="overflow-hidden rounded-[4px] bg-white shadow-[0_4px_14px_rgba(35,41,67,0.18)]">
      <div className="relative flex aspect-[1.45/1] items-center justify-center overflow-hidden bg-white p-6">
        <div className="absolute left-0 top-0 z-10 rounded-br-[6px] px-3 py-1 text-[12px] font-bold uppercase" style={{ background: "var(--action-tertiary-default)", color: "var(--text-inverse)" }}>
          Arsenal Event
        </div>
        <RaceLogo race={race} className="relative z-10 max-h-[76%] max-w-[82%] object-contain" />
      </div>
      <div className="px-5 pb-6 pt-5 text-center">
        <p className="mb-2 text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.58)" }}>
          {getMetaLine(race)}
        </p>
        <h3 className="mx-auto mb-2 max-w-[260px] text-[20px] font-bold italic leading-[1.05]" style={{ color: "var(--text-accent)" }}>
          {race.title}
        </h3>
        {getDistanceLabel(race) && (
          <p className="mx-auto mb-5 max-w-[260px] text-[13px] font-semibold" style={{ color: "rgba(35,41,67,0.62)" }}>
            {getDistanceLabel(race)}
          </p>
        )}
        <AeButton href={race.registrationUrl || race.infoUrl} to={race.registrationUrl || race.infoUrl ? undefined : "/races"} variant="secondary" className="min-h-[38px] min-w-[172px] px-6 py-2 text-[15px]">
          Register
        </AeButton>
      </div>
    </article>
  );
}

function UpcomingRaces() {
  const upcomingRaces = useMemo(() => races.filter((race) => race.date >= TODAY), []);
  const options = useMemo(() => getFilterOptions(upcomingRaces), [upcomingRaces]);
  const [filters, setFilters] = useState(defaultFilters);
  const filteredRaces = useMemo(() => applyRaceFilters(upcomingRaces, filters), [upcomingRaces, filters]);

  return (
    <PageBand className="races-results-upcoming-band relative overflow-hidden">
      <style>{`
        .races-results-upcoming-topography {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%, #000 100%);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%, #000 100%);
        }
        @media (min-width: 1921px) {
          .races-results-upcoming-topography {
            inset: 0 auto 0 50%;
            width: 1920px;
            max-width: 1920px;
            transform: translateX(-50%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%, #000 100%);
            mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%, #000 100%);
            -webkit-mask-composite: source-in;
            mask-composite: intersect;
          }
        }
      `}</style>
      <img src={topographyBg} alt="" className="races-results-upcoming-topography" />
      <section id="upcoming-races" className="relative z-10 mx-auto max-w-[1180px] scroll-mt-20">
        <h2 className="mb-9 flex items-center gap-3 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          <span>Upcoming Races</span>
          <img src={outlineChevron} alt="" className="h-[clamp(24px,3.2vw,42px)] w-auto" />
        </h2>
        <FilterBar filters={filters} onChange={setFilters} options={options} />
        <div className="mt-10 grid gap-8 @md:grid-cols-2 @xl:grid-cols-3">
          {filteredRaces.length > 0 ? filteredRaces.map((race) => (
            <UpcomingRaceCard key={race.id} race={race} />
          )) : <EmptyState />}
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