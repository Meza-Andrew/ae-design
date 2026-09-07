import { useEffect, useRef, useState } from "react";
import imgHero from "@/imports/about-us-hero.jpg";
import imgStory from "@/imports/about-story-team.jpg";
import blockQuoteSvg from "@/imports/block_quote.svg";
import topographyBg from "@/imports/topography-bg-1.svg";
import whatWeOfferAccent from "@/imports/what-we-offer-accent.svg";
import upcomingRacesChevronReverse from "@/imports/upcoming-races-chevron-reverse.svg";
import imgTeamKenKristen from "@/imports/team/ken-kristen-serious.avif";
import imgTeamKenKristenFun from "@/imports/team/ken-kristen-fun.avif";
import imgTeamTammy from "@/imports/team/tammy-serious.avif";
import imgTeamKate from "@/imports/team/kate.avif";
import imgTeamKayla from "@/imports/team/kayla.avif";
import imgTeamJacob from "@/imports/team/jacob-serious.avif";
import imgTeamOlivia from "@/imports/team/olivia.avif";
import imgTeamCameron from "@/imports/team/cameron-serious.avif";
import imgTeamNeil from "@/imports/team/neil.avif";
import imgTeamAideen from "@/imports/team/aideen.avif";
import imgTeamKristen from "@/imports/team/kristen.avif";
import imgTeamLynne from "@/imports/team/lynne.avif";
import imgTeamGabi from "@/imports/team/gabi-serious.avif";
import {
  AeButton,
  PageBand,
  PageCTA,
  RaceCard,
  SectionIntro,
  SHARED_RACES,
  BASE_STATS,
  SITE_BODY_COPY_STYLE,
  SliderControls,
  useLeftAlignWhenCopyExceedsLines,
} from "./sitePatterns";

type TeamMember = { bib: string; role: string; name: string; image: string; hoverImage?: string };

const team: TeamMember[] = [
  { bib: "001", role: "Owners/Running Nerds", name: "Ken & Kristen", image: imgTeamKenKristen, hoverImage: imgTeamKenKristenFun },
  { bib: "002", role: "Timing Crew / Ultra Runner", name: "Tammy", image: imgTeamTammy },
  { bib: "041", role: "Timing Crew / Ultra Runner", name: "Gabi", image: imgTeamGabi },
  { bib: "026", role: "Timing Crew / Ultra Runner", name: "Lynne", image: imgTeamLynne },
  { bib: "035", role: "Timing Crew / Triathlete", name: "Kristen", image: imgTeamKristen },
  { bib: "101", role: "Timing Crew", name: "Aideen", image: imgTeamAideen },
  { bib: "007", role: "Super-Timer / Man of Mystery", name: "Neil", image: imgTeamNeil },
  { bib: "211", role: "Timing Crew / Lynchburg XC/TF", name: "Cameron", image: imgTeamCameron },
  { bib: "004", role: "Timing Crew / Bridgewater XC/TF", name: "Olivia", image: imgTeamOlivia },
  { bib: "499", role: "Timing Crew / Riverbend XC/TF", name: "Jacob", image: imgTeamJacob },
  { bib: "371", role: "Timing Crew", name: "Kayla", image: imgTeamKayla },
  { bib: "012", role: "Timing Crew / Liberty XC/TF", name: "Kate", image: imgTeamKate },
];

const placeholderTeam = Array.from({ length: 12 }, (_, index) => ({
  ...team[index % team.length],
  bib: `placeholder-${index}`,
}));

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
    <section className="about-hero grid overflow-hidden" style={{ background: "var(--surface-dark)" }}>
      <style>{`
        .about-hero-image-wrap {
          background: var(--surface-dark);
        }
        .about-hero-copy {
          display: grid !important;
          align-items: center;
          justify-items: start;
          width: 100%;
        }
        .about-hero-copy-box {
          width: min(100%, 560px);
        }
        .about-hero-photo-frame {
          position: absolute;
          inset: 0;
          margin: auto;
          aspect-ratio: 3097 / 2781;
          height: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .about-hero-photo {
          object-position: center center;
        }
        .about-hero-photo-frame::before,
        .about-hero-photo-frame::after,
        .about-hero-bottom-fade {
          content: "";
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }
        .about-hero-bottom-fade {
          display: none;
        }
        @media (min-width: 751px) {
          .about-hero {
            grid-template-columns: 0.78fr 1.22fr;
          }
          .about-hero-copy {
            padding-left: max(32px, calc((100vw - 1440px) / 2 + 32px)) !important;
            padding-right: 48px !important;
          }
          .about-hero-copy,
          .about-hero-image-wrap {
            min-height: 620px;
          }
          .about-hero-photo-frame::before {
            inset: 0 auto 0 0;
            width: min(34%, 320px);
            background: linear-gradient(90deg, var(--surface-dark) 0%, rgba(35,41,67,0.54) 42%, rgba(35,41,67,0) 100%);
          }
          .about-hero-photo-frame::after {
            inset: 0 0 0 auto;
            width: min(24%, 240px);
            background: linear-gradient(270deg, var(--surface-dark) 0%, rgba(35,41,67,0.42) 44%, rgba(35,41,67,0) 100%);
          }
        }
        @media (max-width: 750px) {
          .about-hero-copy-box {
            width: min(100%, 560px);
          }
          .about-hero-photo-frame::before {
            inset: 0 auto 0 0;
            width: min(30%, 190px);
            background: linear-gradient(90deg, var(--surface-dark) 0%, rgba(35,41,67,0.42) 42%, rgba(35,41,67,0) 100%);
          }
          .about-hero-photo-frame::after {
            inset: 0 0 0 auto;
            width: min(30%, 190px);
            background: linear-gradient(270deg, var(--surface-dark) 0%, rgba(35,41,67,0.36) 42%, rgba(35,41,67,0) 100%);
          }
          .about-hero-bottom-fade {
            display: block;
            inset: auto 0 0 0;
            height: 58%;
            background: linear-gradient(0deg, rgba(35,41,67,0.68) 0%, rgba(35,41,67,0.36) 28%, rgba(35,41,67,0) 52%);
          }
        }
      `}</style>
      <div className="about-hero-copy homepage-built-mobile-padding flex items-center justify-center px-5 py-16 @sm:px-10" style={{ color: "var(--text-inverse)" }}>
        <div
          className="about-hero-copy-box"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-48px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            willChange: "opacity, transform",
          }}
        >
          <h1 className="mb-7 text-[clamp(52px,7vw,92px)] font-bold italic leading-none">Get to Know Arsenal Events</h1>
          <p className="mb-9" style={SITE_BODY_COPY_STYLE}>
            Placeholder supporting copy - two sentences about who Arsenal Events is and what drives the team to show up on race day.
          </p>
          <AeButton href="#community">See Our Community Impact</AeButton>
        </div>
      </div>
      <div className="about-hero-image-wrap relative min-h-[420px]">
        <div className="about-hero-photo-frame">
          <img src={imgHero} alt="Arsenal Events team" className="about-hero-photo h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
function Mission() {
  return (
    <section className="about-mission-section homepage-built-mobile-padding relative overflow-hidden px-5 py-16 @sm:px-10 @sm:py-24" style={{ background: "var(--surface-default)" }}>
      <style>{`
        .about-mission-topography {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.74;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 10%, #000 24%, #000 76%, rgba(0,0,0,0.22) 90%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 10%, #000 24%, #000 76%, rgba(0,0,0,0.22) 90%, transparent 100%);
        }
        .about-mission-quote-row {
          justify-content: center;
        }
        .about-mission-quote-mark {
          width: clamp(118px, 11vw, 168px);
          flex: 0 0 auto;
          margin-top: 2px;
        }
        .about-mission-quote-text {
          max-width: 640px;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(22px, 2.1vw, 32px);
          line-height: 1.18;
          color: var(--text-default);
        }
        @media (min-width: 1921px) {
          .about-mission-topography {
            inset: 0 auto 0 50%;
            width: 1920px;
            max-width: 1920px;
            transform: translateX(-50%);
          }
        }
        @media (max-width: 750px) {
          .about-mission-section {
            padding-top: 56px !important;
            padding-bottom: 64px !important;
          }
          .about-mission-topography {
            opacity: 0.58;
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 8%, #000 20%, #000 100%);
            mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 8%, #000 20%, #000 100%);
          }
          .about-mission-quote-row {
            gap: 18px !important;
          }
          .about-mission-quote-mark {
            width: clamp(86px, 23vw, 118px);
          }
          .about-mission-quote-text {
            font-size: clamp(20px, 5.1vw, 25px);
            line-height: 1.2;
          }
        }
        @media (max-width: 520px) {
          .about-mission-quote-row {
            align-items: flex-start !important;
          }
        }
      `}</style>
      <img src={topographyBg} alt="" className="about-mission-topography" />
      <div className="relative z-10 mx-auto max-w-[1120px]">
        <h2 className="mb-10 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>Our Mission</h2>
        <div className="about-mission-quote-row flex items-center gap-[clamp(26px,4vw,52px)]">
          <img src={blockQuoteSvg} alt="" className="about-mission-quote-mark" aria-hidden="true" />
          <p className="about-mission-quote-text">To meet and exceed every race director's and athlete's expectations by providing outstanding customer service and excellent product delivery.</p>
        </div>
      </div>
    </section>
  );
}
function CommunityImpact() {
  const racesRef = useRef<HTMLDivElement>(null);
  const [racesVisible, setRacesVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = isDesktop ? 3 : 1;
  const pageCount = Math.max(1, Math.ceil(SHARED_RACES.length / pageSize));
  const activePage = Math.min(page, pageCount - 1);
  const visibleRaces = SHARED_RACES.slice(activePage * pageSize, activePage * pageSize + pageSize);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRacesVisible(true);
      return;
    }
    const element = racesRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRacesVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  const goToPage = (nextPage: number) => setPage((nextPage + pageCount) % pageCount);
  return (
    <section id="community" className="homepage-built-mobile-padding scroll-mt-20 px-5 pt-[106px] pb-16 @sm:px-10 @sm:pt-[139px] @sm:pb-24" style={{ background: "var(--surface-dark)", color: "var(--text-inverse)" }}>
      <div className="mx-auto max-w-[1245px]">
        <div className="mb-14 grid gap-8 @lg:grid-cols-[1fr_auto] @lg:items-start">
          <div>
            <h2 className="mb-4 text-[clamp(34px,4vw,52px)] font-bold italic leading-none">Community Impact</h2>
            <p className="max-w-[760px]" style={SITE_BODY_COPY_STYLE}>Placeholder - a sentence or two about Arsenal's footprint in the running community and what these numbers represent.</p>
          </div>
          <AeButton to="/contact">See Our Full Service Area</AeButton>
        </div>
        <div className="mb-16 grid gap-8 @md:grid-cols-3">
          {BASE_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <img src={stat.icon} alt="" aria-hidden="true" className="h-12 w-12 object-contain" />
              <p className="text-[20px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <h3 className="mb-8 flex items-center gap-4 text-[30px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>
          <span>Upcoming Arsenal Races</span>
          <img src={upcomingRacesChevronReverse} alt="" aria-hidden="true" className="h-10 w-auto" />
        </h3>
        <style>{`
          .about-upcoming-races-grid {
            grid-template-columns: minmax(0, 1fr);
            grid-auto-rows: 1fr;
            align-items: stretch;
          }
          .about-upcoming-races-grid > div {
            display: flex;
            width: min(100%, 420px);
            height: 100%;
            align-self: stretch;
            justify-self: center;
          }
          .about-upcoming-races-grid .race-card {
            width: 100%;
            height: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
          .about-upcoming-races-grid .race-card > div:last-child {
            display: flex;
            flex: 0 0 206px;
            height: 206px;
            flex-direction: column;
          }
          .about-upcoming-races-grid .race-card > div:last-child > a {
            margin-top: auto;
          }
          .about-upcoming-races-controls span {
            background: var(--surface-default) !important;
          }
          @media (min-width: 1280px) {
            .about-upcoming-races-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-auto-rows: 1fr;
              align-items: stretch;
            }
            .about-upcoming-races-grid > div {
              width: 100%;
              height: 100%;
            }
          }
        `}</style>
        <div ref={racesRef} className="about-upcoming-races-grid grid gap-8">
          {visibleRaces.map((race, index) => (
            <div
              key={`${race.title}-${index}`}
              style={{
                opacity: racesVisible ? 1 : 0,
                transform: racesVisible ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: `${index * 100}ms`,
                willChange: "opacity, transform",
              }}
            >
              <RaceCard race={race} />
            </div>
          ))}
        </div>
        {pageCount > 1 ? (
          <div className="about-upcoming-races-controls">
            <SliderControls onPrev={() => goToPage(activePage - 1)} onNext={() => goToPage(activePage + 1)} />
          </div>
        ) : null}
        <div className="mt-10 flex justify-center"><AeButton to="/races">See All Upcoming Races</AeButton></div>
      </div>
    </section>
  );
}

function Story() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [storyTrackReveal, setStoryTrackReveal] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStoryTrackReveal(1);
      return;
    }

    let rafId = 0;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      const node = storyRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = Math.max(1, viewportHeight * 0.4);
      const progress = clamp01((viewportHeight * 0.78 - rect.top) / travel);
      setStoryTrackReveal((previous) => (
        Math.abs(previous - progress) < 0.001 ? previous : progress
      ));
    };
    const requestUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const storyTrackClip = `inset(0 0 0 ${((1 - storyTrackReveal) * 100).toFixed(3)}%)`;

  return (
    <PageBand className="about-story-section relative overflow-hidden pt-[125px] @sm:pt-[163px]">
      <div ref={storyRef} className="relative">
        <style>{`
          .about-story-layout {
            grid-template-columns: 0.9fr 1fr;
          }
          @media (max-width: 750px) {
            .about-story-layout {
              grid-template-columns: 1fr;
            }
          }          .about-story-track {
            position: absolute;
            top: 0;
            left: clamp(-124.5px, -5.787vw, -79.8px);
            width: min(33.12vw, 446.4px);
            max-width: none;
            pointer-events: none;
            z-index: 1;
            transform: translateY(-50%) rotate(180deg);
            transform-origin: center;
            will-change: clip-path;
          }
          @media (min-width: 1550px) {
            .about-story-track {
              -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
              mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
            }
          }
          @media (max-width: 1160px) {
            .about-story-track {
              display: none;
            }
          }
        `}</style>
        <img
          src={whatWeOfferAccent}
          alt=""
          className="about-story-track"
          style={{ clipPath: storyTrackClip, WebkitClipPath: storyTrackClip }}
        />
        <div className="about-story-layout relative z-10 mx-auto grid max-w-[1160px] gap-12 items-center">
          <div>
            <h2 className="mb-5 text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>Our Story</h2>
            <div className="grid gap-5" style={{ ...SITE_BODY_COPY_STYLE, color: "var(--text-default)" }}>
              <p>Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition.</p>
              <p>Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition.</p>
              <p>Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition.</p>
            </div>
          </div>
          <img src={imgStory} alt="Arsenal Events team members" className="aspect-[1.25/1] w-full rounded-[4px] object-cover" />
        </div>
      </div>
    </PageBand>
  );
}
function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <article className="race-card team-card group relative flex aspect-[1.37/1] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_12px_rgba(35,41,67,0.16)]">
      <div className="relative flex min-h-[68px] shrink-0 items-center justify-center bg-[#6aa6a3] px-12 text-center">
        <span className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[var(--surface-default)]" aria-hidden="true" />
        <span className="absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[var(--surface-default)]" aria-hidden="true" />
        <p className="text-[clamp(18px,1.8vw,28px)] font-medium italic leading-none text-white">{member.role}</p>
      </div>
      <div className="grid min-h-0 flex-1 items-center gap-4 p-5 @sm:gap-6 @sm:p-8" style={{ gridTemplateColumns: "44% 56%" }}>
        <p className="min-w-0 max-w-full text-center text-[24px] font-bold italic leading-[0.95]" style={{ color: "#176f6d", overflowWrap: "anywhere" }}>{member.name}</p>
        <div className="relative aspect-square h-auto min-h-0 w-full min-w-0 overflow-hidden rounded-[16px]" style={{ background: "linear-gradient(135deg, #d6e7e4 0%, #97bdb7 100%)" }}>
          <img src={member.image} alt={`${member.name} portrait`} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200" />
          {member.hoverImage ? (
            <img src={member.hoverImage} alt={`${member.name} alternate portrait`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          ) : (
            <div className="absolute inset-0 bg-[#b9b9b9] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
          )}
        </div>
      </div>
      <span className="absolute bottom-3 left-4 h-[18px] w-[18px] rounded-full bg-[var(--surface-default)]" aria-hidden="true" />
      <span className="absolute bottom-3 right-4 h-[18px] w-[18px] rounded-full bg-[var(--surface-default)]" aria-hidden="true" />
    </article>
  );
}

function Team() {
  const teamRef = useRef<HTMLDivElement>(null);
  const [teamVisible, setTeamVisible] = useState(false);
  const [teamCopyRef, teamCopyLeftAligned] = useLeftAlignWhenCopyExceedsLines<HTMLParagraphElement>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTeamVisible(true);
      return;
    }
    const element = teamRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTeamVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (    <PageBand className="about-team-section relative overflow-hidden">
      <style>{`
        .about-team-grid {
          grid-template-columns: minmax(0, 1fr);
        }
        @media (min-width: 1001px) {
          .about-team-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1280px) {
          .about-team-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }        .about-team-topography {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.74;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 10%, #000 24%, #000 76%, rgba(0,0,0,0.22) 90%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 10%, #000 24%, #000 76%, rgba(0,0,0,0.22) 90%, transparent 100%);
        }
        @media (min-width: 1921px) {
          .about-team-topography {
            inset: 0 auto 0 50%;
            width: 1920px;
            max-width: 1920px;
            transform: translateX(-50%);
          }
        }
        @media (max-width: 750px) {
          .about-team-topography {
            opacity: 0.58;
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 8%, #000 20%, #000 100%);
            mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 8%, #000 20%, #000 100%);
          }
        }
      `}</style>
      <img src={topographyBg} alt="" aria-hidden="true" className="about-team-topography" />
      <div className="relative z-10 mx-auto mb-10 max-w-[1180px] text-center">
        <h2 className="mb-4 text-[clamp(36px,4.1vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>Meet the Team</h2>
        <p ref={teamCopyRef} className={`mx-auto max-w-[1180px] ${teamCopyLeftAligned ? "text-left" : "text-center"}`} style={{ ...SITE_BODY_COPY_STYLE, color: "var(--text-default)" }}>
          Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition. Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition.
        </p>
      </div>
      <div ref={teamRef} className="about-team-grid relative z-10 mx-auto grid max-w-[1180px] gap-6">
        {placeholderTeam.map((member, index) => (
          <div
            key={`${member.bib}-${index}`}
            style={{
              opacity: teamVisible ? 1 : 0,
              transform: teamVisible ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              transitionDelay: `${index * 110}ms`,
              willChange: "opacity, transform",
            }}
          >
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </PageBand>
  );
}
export default function AboutPage() {
  return (
    <main style={{ background: "var(--surface-default)" }}>
      <Hero />
      <Mission />
      <CommunityImpact />
      <Story />
      <Team />
      <PageCTA title="Have a Question for Our Team?" primaryLabel="Message Us" secondaryLabel="Call Us" />
    </main>
  );
}
