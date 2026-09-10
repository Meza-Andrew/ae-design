import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import imgHero from "@/imports/races-results-hero.png";
import filledChevron from "@/imports/race-day-chevron.svg";
import outlineChevron from "@/imports/results-upcoming-chevron-outline.svg";
import topographyBg from "@/imports/topography-bg-1.svg";
import grandSlamrock2026 from "@/imports/race-logos/race-logo-2026-03-13-grand-slamrock-5k-1-mile-half-mile.png";
import fawnLakeTriathlons2026 from "@/imports/race-logos/race-logo-2026-08-30-fawn-lake-triathlons.png";
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
  fawnLakeTriathlons2026,
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
  photosUrl?: string;
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

function ArsenalEventBadgeSvg() {
  return (
    <svg width="270" height="40" viewBox="0 0 270 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AN ARSENAL EVENTS RACE">
      <path d="M0 4C0 1.79086 1.79086 0 4 0H270L249.236 19.5477L270 39.0955H0V10Z" fill="#035A58" />
      <path d="M22.8285 17.0689V19.6236C23.8076 19.845 24.678 20.2088 25.5896 20.4602V17.9017C24.6142 17.6841 23.7364 17.3202 22.8285 17.0689ZM31.2055 12.4546C29.9187 13.0511 28.3356 13.6513 26.8163 13.6513C24.8093 13.6513 23.1474 12.3458 20.6189 12.3458C19.6811 12.3458 18.8445 12.5109 18.0679 12.796C18.173 12.5221 18.2217 12.2258 18.203 11.9107C18.1355 10.8452 17.2614 9.98991 16.1922 9.94489C14.9918 9.89613 14.0051 10.8565 14.0051 12.0457C14.0051 12.7585 14.3615 13.3887 14.9055 13.7676V28.2519C14.9055 28.7509 15.3069 29.1523 15.8058 29.1523H16.4061C16.905 29.1523 17.3064 28.7509 17.3064 28.2519V24.7106C18.3681 24.2566 19.6923 23.8815 21.598 23.8815C23.6088 23.8815 25.267 25.187 27.7954 25.187C29.6036 25.187 31.0479 24.5755 32.391 23.6527C32.7173 23.4276 32.9086 23.0599 32.9086 22.6623V13.5425C32.9124 12.6684 32.0008 12.087 31.2055 12.4546ZM20.0675 22.1558C19.0996 22.2571 18.1917 22.4635 17.3064 22.7786V20.1338C18.2893 19.7849 19.0883 19.5711 20.0675 19.4811V22.1558ZM31.1117 17.1101C30.2264 17.4778 29.3748 17.8417 28.3506 18.0067V20.674C29.281 20.5465 30.2789 20.2314 31.1117 19.6986V22.3434C30.1701 22.9474 29.2923 23.27 28.3506 23.3601V20.674C27.3378 20.8128 26.5537 20.7303 25.5896 20.4639V22.9924C24.693 22.7148 23.8152 22.3659 22.8285 22.1934V19.6236C22.0895 19.4586 21.2979 19.3685 20.0675 19.4811V16.8551C19.2271 16.9713 18.3943 17.2377 17.3064 17.6391V14.9943C18.5519 14.5367 19.1859 14.2516 20.0675 14.169V16.8551C21.0803 16.7162 21.8832 16.8063 22.8285 17.0689V14.5404C23.7176 14.818 24.5992 15.1669 25.5896 15.3395V17.9055C26.4787 18.1043 27.3753 18.1643 28.3506 18.0067V15.3095C29.3635 15.1294 30.3127 14.7993 31.1117 14.4654V17.1101Z" fill="#FCF3ED" />
      <text x="47" y="24.5" fill="#FCF3ED" fontFamily="Cooper Hewitt, Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.4" fontStyle="italic">AN ARSENAL EVENTS RACE</text>
    </svg>
  );
}

function ArsenalRaceFlag() {
  return (
    <div className="absolute -top-10 left-0 z-10 h-10 w-[270px] rounded-tl-[4px]" style={{ fontFamily: "Cooper Hewitt, Arial, sans-serif" }}>
      <ArsenalEventBadgeSvg />
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
        <style>{`
          .races-results-result-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          @media (hover: hover) and (pointer: fine) {
            .races-results-result-card:hover {
              transform: translateY(-4px);
              box-shadow: 0px 8px 18px 0px rgba(35,41,67,0.18);
            }
          }
          .races-results-result-actions {
            align-items: stretch;
          }
          .races-results-result-slot {
            display: grid;
          }
          .races-results-result-slot.has-arsenal-flag {
            padding-top: 40px;
          }
          @media (min-width: 900px) and (max-width: 1080px) {
            .races-results-result-list {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              align-items: start;
              row-gap: 18px;
            }
            .races-results-result-slot {
              padding-top: 40px;
            }
          }
          @media (min-width: 531px) and (max-width: 1080px) {
            .races-results-result-card {
              grid-template-columns: minmax(0, 1fr) !important;
              justify-items: start;
              gap: 18px !important;
              width: 100%;
              min-width: 0;
              margin-right: 0;
              padding: 22px 24px !important;
            }
            .races-results-result-main {
              display: grid;
              justify-items: start;
              gap: 14px;
              width: 100%;
            }
            .races-results-result-card img,
            .races-results-result-logo {
              max-width: 140px !important;
              width: 140px !important;
              height: 72px !important;
              justify-self: start;
            }
            .races-results-result-meta {
              grid-template-columns: minmax(0, 1fr) !important;
              align-items: start !important;
              justify-items: start;
              width: 100%;
              min-width: 0;
            }
            .races-results-result-actions {
              display: flex !important;
              justify-content: flex-start;
              gap: 12px;
              width: auto;
            }
            .races-results-result-actions a,
            .races-results-result-actions button {
              width: auto;
            }
          }
          @media (min-width: 531px) and (max-width: 899px) {
            .races-results-result-slot {
              width: 50%;
              min-width: 430px;
              margin-right: auto;
            }
          }
          @media (min-width: 900px) and (max-width: 1080px) {
            .races-results-result-slot {
              width: 100%;
              min-width: 0;
              margin-right: 0;
            }
            .races-results-result-card {
              width: 100%;
              min-width: 0;
              margin-right: 0;
            }
            .races-results-result-actions {
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              width: 100%;
            }
            .races-results-result-actions a,
            .races-results-result-actions button {
              min-width: 0 !important;
              width: 100%;
            }
          }
          @media (max-width: 530px) {
            .races-results-result-card {
              grid-template-columns: minmax(0, 1fr) !important;
              justify-items: stretch;
            }
            .races-results-result-main {
              display: grid;
              gap: 14px;
            }
            .races-results-result-card img,
            .races-results-result-logo {
              max-width: none !important;
            }
            .races-results-result-meta {
              grid-template-columns: minmax(0, 1fr) !important;
              align-items: start !important;
            }
            .races-results-result-actions {
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              width: 100%;
            }
            .races-results-result-actions a,
            .races-results-result-actions button {
              min-width: 0 !important;
              width: 100%;
            }
          }
          @media (max-width: 420px) {
            .races-results-result-actions {
              grid-template-columns: minmax(0, 1fr);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .races-results-result-card {
              transition: box-shadow 0.2s ease !important;
            }
            .races-results-result-card:hover {
              transform: none !important;
            }
          }
        `}</style>
        <h2 className="mb-9 flex items-center gap-3 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          <span>Results &amp; Photos</span>
          <img src={filledChevron} alt="" className="h-[clamp(24px,3.2vw,42px)] w-auto" />
        </h2>
        <FilterBar filters={filters} onChange={setFilters} options={options} showYear />
        <div className="races-results-result-list mt-10 grid gap-5">
                    {filteredRaces.length > 0 ? filteredRaces.map((race) => {
            const isArsenalEventsRace = ["devils-den-ten-miler-2026", "grand-slamrock-2026"].includes(race.id);
            return (
              <div key={race.id} className={`races-results-result-slot ${isArsenalEventsRace ? "has-arsenal-flag" : ""}`}>
                <article className="races-results-result-card relative grid items-center gap-4 rounded-[4px] bg-white p-4 shadow-[0_4px_12px_rgba(35,41,67,0.12)] @md:grid-cols-[120px_1fr_auto]">
{isArsenalEventsRace ? <ArsenalRaceFlag /> : null}
              <RaceLogo race={race} className="h-[56px] w-full object-contain @md:max-w-[120px]" />
              <div className="races-results-result-meta grid gap-1 @md:grid-cols-[1fr_auto] @md:items-center">
                <h3 className="text-[19px] font-bold italic" style={{ color: "var(--text-accent)" }}>{race.title}</h3>
                <p className="text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.6)" }}>{getMetaLine(race)}</p>
              </div>
              <div className="races-results-result-actions flex gap-3">
                <AeButton href={race.resultsUrl || race.infoUrl} to={race.resultsUrl || race.infoUrl ? undefined : "/races"} variant="secondary" className="min-h-[29px] min-w-[113px] px-4 py-1 text-[12px]">Results</AeButton>
                <AeButton href={race.photosUrl || race.infoUrl} to={race.photosUrl || race.infoUrl ? undefined : "/races"} variant="secondary" className="min-h-[29px] min-w-[113px] px-4 py-1 text-[12px]">Photos</AeButton>
              </div>
                </article>
              </div>
            );
          }) : <EmptyState />}
        </div>
        <SliderControls onPrev={() => undefined} onNext={() => undefined} />
      </section>
    </PageBand>
  );
}

function UpcomingRaceCard({ race }: { race: RaceEntry & { logo?: string } }) {
  const showArsenalFlag = ["fawn-lake-triathlons-2026", "run-for-juju-2026", "halloween-5k-monster-mile-2026", "frosty-5k-reindeer-run-2026"].includes(race.id);
  return (
    <article className="race-card races-results-upcoming-card flex h-[clamp(460px,36vw,520px)] flex-col overflow-hidden bg-white shadow-[0_4px_14px_rgba(35,41,67,0.18)]" style={{ borderRadius: "10px 10px 5px 5px" }}>
      <div className="races-results-upcoming-card-image relative flex h-[64%] min-h-0 shrink-0 items-center justify-center overflow-hidden bg-white p-6">
        <div className="absolute inset-0" style={{ background: "rgba(151,189,183,0.2)" }} />
        {showArsenalFlag ? (
          <div className="absolute left-0 top-0 z-10 h-10 w-[270px]">
            <ArsenalEventBadgeSvg />
          </div>
        ) : null}
        <RaceLogo race={race} className="relative z-10 max-h-[76%] max-w-[82%] object-contain" />
      </div>
      <div className="races-results-upcoming-card-body flex min-h-0 flex-1 flex-col px-5 pb-6 pt-5 text-center">
        <p className="mb-2 text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.58)" }}>
          {getMetaLine(race)}
        </p>
        <h3 className="mx-auto mb-2 max-w-[260px] text-[20px] font-bold italic leading-[1.05]" style={{ color: "var(--text-accent)" }}>
          {race.title}
        </h3>
        <div className="mt-auto">
          <AeButton href={race.registrationUrl || race.infoUrl} to={race.registrationUrl || race.infoUrl ? undefined : "/races"} variant="secondary" className="min-h-[51px] min-w-[206px] rounded-[8px] px-8 py-0 text-[15px]">
            Register
          </AeButton>
        </div>
      </div>
    </article>
  );
}

function UpcomingRaces() {
  const upcomingRaces = useMemo(() => races.filter((race) => race.date >= TODAY), []);
  const options = useMemo(() => getFilterOptions(upcomingRaces), [upcomingRaces]);
  const [filters, setFilters] = useState(defaultFilters);
  const [upcomingPageSize, setUpcomingPageSize] = useState(1);
  const [page, setPage] = useState(0);
  const filteredRaces = useMemo(() => applyRaceFilters(upcomingRaces, filters), [upcomingRaces, filters]);
  const pageSize = upcomingPageSize;
  const pageCount = Math.max(1, Math.ceil(filteredRaces.length / pageSize));
  const activePage = Math.min(page, pageCount - 1);
  const visibleRaces = filteredRaces.slice(activePage * pageSize, activePage * pageSize + pageSize);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setUpcomingPageSize(6);
      } else if (window.matchMedia("(min-width: 1080px)").matches) {
        setUpcomingPageSize(4);
      } else {
        setUpcomingPageSize(1);
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const tabletQuery = window.matchMedia("(min-width: 1080px)");
    update();
    desktopQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);
    return () => {
      desktopQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filters, pageSize]);

  const goToPage = (nextPage: number) => setPage((nextPage + pageCount) % pageCount);

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
        .races-results-upcoming-grid {
          grid-template-columns: minmax(0, 1fr);
        }
        .races-results-upcoming-card-slot {
          width: min(100%, 420px);
          justify-self: center;
        }
        .races-results-upcoming-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .races-results-upcoming-card:hover {
            transform: translateY(-4px);
            box-shadow: 0px 8px 18px 0px rgba(35,41,67,0.18);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .races-results-upcoming-card {
            transition: box-shadow 0.2s ease !important;
          }
          .races-results-upcoming-card:hover {
            transform: none !important;
          }
        }
        .races-results-upcoming-controls {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .races-results-upcoming-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 72px;
        }
        .races-results-upcoming-dot {
          height: 10px;
          width: 10px;
          border-radius: 999px;
          background: rgba(35,41,67,0.22);
          transition: width 0.2s ease, background 0.2s ease;
        }
        .races-results-upcoming-dot.is-active {
          width: 38px;
          background: var(--surface-dark);
        }
        @media (min-width: 1080px) and (max-width: 1279px) {
          .races-results-upcoming-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            align-items: stretch;
          }
          .races-results-upcoming-card-slot {
            width: 100%;
            height: 100%;
          }
        }
        @media (min-width: 1280px) {
          .races-results-upcoming-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            align-items: stretch;
          }
          .races-results-upcoming-card-slot {
            width: 100%;
            height: 100%;
          }
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
        {filteredRaces.length > 0 ? (
          <>
            <div className="races-results-upcoming-grid mt-10 grid gap-8">
              {visibleRaces.map((race) => (
                <div key={race.id} className="races-results-upcoming-card-slot">
                  <UpcomingRaceCard race={race} />
                </div>
              ))}
            </div>
            {pageCount > 1 ? (
              <div className="races-results-upcoming-controls" aria-label="Upcoming races pagination">
                <button onClick={() => goToPage(activePage - 1)} aria-label="Previous upcoming races" className="flex h-10 w-10 items-center justify-center rounded-[4px]" style={{ background: "#F5D6C4", color: "var(--surface-dark)" }}>
                  <ChevronLeft size={22} />
                </button>
                <div className="races-results-upcoming-dots">
                  {Array.from({ length: pageCount }).map((_, index) => (
                    <button key={index} onClick={() => goToPage(index)} aria-label={`Go to upcoming races page ${index + 1}`} className={`races-results-upcoming-dot ${index === activePage ? "is-active" : ""}`} />
                  ))}
                </div>
                <button onClick={() => goToPage(activePage + 1)} aria-label="Next upcoming races" className="flex h-10 w-10 items-center justify-center rounded-[4px]" style={{ background: "var(--color-orange-brand)", color: "var(--surface-dark)" }}>
                  <ChevronRight size={22} />
                </button>
              </div>
            ) : null}
          </>
        ) : <div className="mt-10"><EmptyState /></div>}
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
      <StatsBand quotes={RUNNER_STATS_QUOTES} ctaLabel="See Our Race Day Tech" ctaTo="/race-director-services" stackBelow950 showLeftTrackAccent trackAccentSpeed={1.2} />
      <ResourceSection audience="For Runners" />
      <PageCTA title="Ready to Run?" accentRevealSpeed={1.6} />
    </main>
  );
}
