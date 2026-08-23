import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgHero from "@/imports/race-directors-hero.png";
import imgGalleryCrew from "@/imports/race-day-gallery-crew.jpg";
import imgGalleryEquipment from "@/imports/race-day-gallery-equipment.jpg";
import imgGalleryResults from "@/imports/race-day-gallery-results.jpg";
import imgGalleryTrophies from "@/imports/race-day-gallery-trophies.jpg";
import raceDayChevron from "@/imports/race-day-chevron.svg";
import topographyBg from "@/imports/topography-bg-1.svg";
import imgServiceRegistration from "@/imports/service-race-registration.png";
import imgServiceTiming from "@/imports/service-race-timing.jpg";
import imgServiceRaceDirecting from "@/imports/service-race-directing.jpg";
import imgServiceCourseManagement from "@/imports/service-course-management.jpg";
import imgServicePacketPickup from "@/imports/service-packet-pickup.jpg";
import iconRegistration from "@/imports/service-registration.svg";
import iconTiming from "@/imports/service-timing-results.svg";
import iconRaceDirecting from "@/imports/service-race-directing.svg";
import iconCourseManagement from "@/imports/service-course-management.svg";
import iconPacketPickup from "@/imports/service-packet-pickup.svg";
import whatWeOfferAccent from "@/imports/what-we-offer-accent.svg";
import {
  AeButton,
  FormWithFAQ,
  PageBand,
  PageCTA,
  RACE_DIRECTOR_STATS_QUOTES,
  ResourceSection,
  SectionIntro,
  SITE_BODY_COPY_STYLE,
  StatsBand,
  useSwipeNavigation,
} from "./sitePatterns";

const services = [
  {
    title: "Race Registration",
    body: "Race registration should be easy for the race director, and we handle the RunSignup setup details that make your event work.",
    image: imgServiceRegistration,
    icon: iconRegistration,
  },
  {
    title: "Timing & Results",
    body: "We combine proven timing technology, experienced people, and live result monitoring so race directors can trust every finish.",
    image: imgServiceTiming,
    icon: iconTiming,
  },
  {
    title: "Race Directing",
    body: "With RRCA-certified race directors and hands-on event experience, we help plan smoother races from permitting through race day.",
    image: imgServiceRaceDirecting,
    icon: iconRaceDirecting,
  },
  {
    title: "Course Management",
    body: "We help make sure your course is safe, clearly marked, organized, and ready when the first runner arrives.",
    image: imgServiceCourseManagement,
    icon: iconCourseManagement,
  },
  {
    title: "Packet Pickup",
    body: "Our RunSignup-integrated packet pickup process keeps check-in moving quickly and gets runners to the starting line on time.",
    image: imgServicePacketPickup,
    icon: iconPacketPickup,
  },
];
function Hero() {
  return (
    <section className="relative min-h-[clamp(420px,42vw,620px)] overflow-hidden" style={{ background: "var(--surface-dark)" }}>
      <style>{`
        .race-directors-hero-photo {
          object-position: 38% top;
        }
        .race-directors-hero-content {
          min-height: clamp(420px, 42vw, 620px);
        }
        @media (max-width: 1200px) {
          .race-directors-hero-photo {
            object-position: 30% top;
          }
        }
        @media (max-width: 900px) {
          .race-directors-hero-photo {
            object-position: 22% top;
          }
        }
        @media (max-width: 640px) {
          .race-directors-hero-photo {
            object-position: 16% top;
          }
        }
        @media (max-width: 767px) {
          .race-directors-hero-actions {
            margin-left: 0 !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            width: 100%;
          }
        }
        .race-directors-hero-overlay {
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
          .race-directors-hero-actions {
            margin-left: 0 !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            width: 100%;
          }
        }
        .race-directors-hero-overlay {
            height: 78%;
          }
        }
      `}</style>
      <img
        src={imgHero}
        alt="Race director reviewing a clipboard before runners start a race"
        className="race-directors-hero-photo absolute inset-0 h-full w-full object-cover"
      />
      <div className="race-directors-hero-overlay absolute bottom-0 left-0 pointer-events-none" />
      <div className="homepage-built-mobile-padding race-directors-hero-content relative z-10 mx-auto flex max-w-[1440px] flex-col justify-end px-5 pb-8 @sm:px-10 @md:pb-10">
        <div className="grid gap-7 @lg:grid-cols-[minmax(0,760px)_auto] @lg:items-end @lg:justify-between">
          <div>
            <h1 className="mb-5 text-[clamp(46px,5.5vw,72px)] font-bold italic leading-none" style={{ color: "var(--text-inverse)", textShadow: "0 4px 4px rgba(0,0,0,0.25)" }}>
              Race Day, Handled.
            </h1>
            <p className="max-w-[650px]" style={{ ...SITE_BODY_COPY_STYLE, color: "var(--text-inverse)", textShadow: "0 4px 4px rgba(0,0,0,0.25)" }}>
              Placeholder supporting headline copy - one or two sentences describing both race director and runner-facing value propositions.
            </p>
          </div>
          <div className="race-directors-hero-actions ml-auto flex flex-col items-end gap-5 @sm:flex-row @sm:justify-end @lg:flex-col @lg:pb-2">
            <AeButton href="#services" className="min-w-[260px]">See What We Offer</AeButton>
            <AeButton href="#form" className="min-w-[302px]">Request Timing Services</AeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  active = false,
  mobile = false,
}: {
  service: (typeof services)[number];
  active?: boolean;
  mobile?: boolean;
}) {
  return (
    <article
      className={`rd-service-card ${active ? "is-active" : ""} ${mobile ? "is-mobile" : ""}`}
      aria-hidden={!active && !mobile}
    >
      <header className="rd-service-card-header">
        <img src={service.icon} alt="" className="rd-service-icon" />
        <h3>{service.title}</h3>
      </header>
      <div className="rd-service-card-body">
        <div className="rd-service-copy">
          <p>{service.body}</p>
          <a href="#form" className="rd-service-link"><ChevronRight size={16} className="rd-service-chevron" /><span>Request This Service</span></a>
          <a href="#faqs" className="rd-service-link"><ChevronRight size={16} className="rd-service-chevron" /><span>Browse FAQs</span></a>
        </div>
        <img src={service.image} alt="" className="rd-service-image" />
      </div>
    </article>
  );
}

function Services() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const interactionPauseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (interactionPauseTimerRef.current !== null) {
        window.clearTimeout(interactionPauseTimerRef.current);
      }
    };
  }, []);

  const pauseForInteraction = () => {
    setIsPaused(true);
    if (interactionPauseTimerRef.current !== null) {
      window.clearTimeout(interactionPauseTimerRef.current);
    }
    interactionPauseTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
      interactionPauseTimerRef.current = null;
    }, 5000);
  };

  const goTo = (index: number) => setActiveIndex((index + services.length) % services.length);
  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);
  const prevManual = () => {
    pauseForInteraction();
    prev();
  };
  const nextManual = () => {
    pauseForInteraction();
    next();
  };
  const goToManual = (index: number) => {
    pauseForInteraction();
    goTo(index);
  };
  const serviceSwipeHandlers = useSwipeNavigation(prevManual, nextManual);
  const activeService = services[activeIndex];
  const previousService = services[(activeIndex - 1 + services.length) % services.length];
  const followingService = services[(activeIndex + 1) % services.length];

  return (
    <section
      id="services"
      className="rd-services-section homepage-built-mobile-padding relative overflow-hidden px-5 py-16 @sm:px-10 @sm:py-24 scroll-mt-20"
      style={{ background: "linear-gradient(to bottom, var(--surface-subtle), var(--surface-default))" }}
    >
      <style>{`
        .rd-services-accent {
          position: absolute;
          top: clamp(10px, 3.42vw, 55px);
          left: calc(50% + 210px);
          width: min(33.12vw, 446.4px);
          max-width: none;
          pointer-events: none;
          z-index: 1;
          transform: translateY(-15%);
        }
        @media (min-width: 1550px) {
          .rd-services-accent {
            -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
            mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
          }
        }
        .rd-services-inner {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          margin: 0 auto;
        }
        .rd-services-stage {
          position: relative;
          height: 360px;
          margin: 54px auto 0;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .rd-service-card-shell {
          position: absolute;
          width: 668px;
          transform: translateX(calc(var(--x) + var(--swipe-drag-x, 0px))) scale(var(--scale));
          opacity: var(--opacity);
          z-index: var(--z);
          transition: transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease, filter 320ms ease;
          filter: grayscale(var(--gray));
          pointer-events: var(--events);
        }
        .rd-service-card {
          width: 100%;
          overflow: hidden;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(35,41,67,0.22);
          color: var(--text-default);
        }
        .rd-service-card-header {
          min-height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          padding: 14px 22px;
          background: #262626;
          color: var(--text-inverse);
        }
        .rd-service-card.is-active .rd-service-card-header,
        .rd-service-card.is-mobile .rd-service-card-header {
          background: var(--surface-dark);
        }
        .rd-service-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          object-fit: contain;
        }
        .rd-service-card-header h3 {
          margin: 0;
          font-size: 32px;
          line-height: 1;
          font-weight: 700;
          font-style: italic;
        }
        .rd-service-card-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 318px;
          min-height: 218px;
        }
        .rd-service-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px 40px;
        }
        .rd-service-copy p {
          margin: 0 0 22px;
          font-size: 19px;
          line-height: 1.2;
          font-weight: 500;
        }
        .rd-service-link {
          display: grid;
          grid-template-columns: 16px minmax(0, 1fr);
          align-items: center;
          column-gap: 4px;
          min-height: 30px;
          text-decoration: none;
          font-size: 20px;
          line-height: 1.35;
          font-weight: 700;
          color: var(--action-tertiary-default);
          transition: color 0.15s ease;
        }
        .rd-service-chevron {
          opacity: 0;
          justify-self: center;
          transition: opacity 0.15s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-service-link:hover {
            color: var(--text-accent);
          }
          .rd-service-link:hover .rd-service-chevron {
            opacity: 1;
          }
        }
        .rd-service-image {
          width: 100%;
          height: 100%;
          min-height: 218px;
          object-fit: cover;
        }
        .rd-services-mobile-card {
          margin: 44px auto 0;
          width: min(680px, 100%);
          overflow: hidden;
          touch-action: pan-y;
        }
        .swipe-peek-track {
          display: grid;
          grid-template-columns: repeat(3, 100%);
          gap: 16px;
          transform: translate3d(calc((-100% - 16px) + var(--swipe-drag-x, 0px)), 0, 0);
          transition: var(--swipe-transition, transform 180ms ease);
        }
        .swipe-peek-item {
          min-width: 0;
        }
        .rd-services-controls {
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .rd-services-control-btn {
          display: flex;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          border: 0;
          background: #F5D6C4;
          color: var(--surface-dark);
        }
        .rd-services-control-btn.next {
          background: var(--color-orange-brand);
        }
        .rd-services-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rd-services-dot {
          height: 8px;
          width: 8px;
          border: 0;
          border-radius: 999px;
          background: rgba(35,41,67,0.24);
          transition: width 200ms ease, background 200ms ease;
        }
        .rd-services-dot.is-active {
          width: 34px;
          background: var(--surface-dark);
        }
        @media (min-width: 1161px) {
          .rd-services-stage {
            display: flex;
          }
          .rd-services-mobile-card {
            display: none;
          }
          .rd-services-stage + .rd-services-controls {
            margin-top: 16px;
          }
        }
        @media (max-width: 1160px) {
          .rd-services-accent {
            display: none;
          }
          .rd-service-card-body {
            grid-template-columns: 1fr;
          }
          .rd-service-image {
            min-height: 260px;
            order: -1;
          }
          .rd-service-copy {
            padding: 28px;
          }
          .rd-service-card-header h3 {
            font-size: clamp(24px, 5.6vw, 32px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-service-card-shell {
            transition: none;
          }
        }
      `}</style>
      <img src={whatWeOfferAccent} alt="" className="rd-services-accent" />
      <div className="rd-services-inner">
        <SectionIntro
          title="What We Offer"
          copy="Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition. Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition."
        />

        <div className="rd-services-stage" {...serviceSwipeHandlers} aria-live="polite" onPointerDownCapture={pauseForInteraction} onMouseEnter={() => setIsPaused(true)} onMouseLeave={pauseForInteraction} onFocus={() => setIsPaused(true)} onBlur={pauseForInteraction}>
          {services.map((service, index) => {
            const offset = ((index - activeIndex + services.length + 2) % services.length) - 2;
            const active = offset === 0;
            const abs = Math.abs(offset);
            const style = {
              "--x": `${offset * 205}px`,
              "--scale": active ? 1 : abs === 1 ? 0.93 : 0.84,
              "--opacity": active ? 1 : abs === 1 ? 0.92 : 0.62,
              "--z": active ? 5 : abs === 1 ? 3 : 1,
              "--gray": active ? 0 : 1,
              "--events": active ? "auto" : "none",
            } as React.CSSProperties & Record<`--${string}`, string | number>;

            return (
              <div key={service.title} className="rd-service-card-shell" style={style}>
                <ServiceCard service={service} active={active} />
              </div>
            );
          })}
        </div>

        <div className="rd-services-mobile-card" {...serviceSwipeHandlers} onPointerDownCapture={pauseForInteraction} onTouchStartCapture={pauseForInteraction} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}>
          <div className="swipe-peek-track" aria-live="polite">
            {[previousService, activeService, followingService].map((service, index) => (
              <div key={`${service.title}-${index}`} className="swipe-peek-item" aria-hidden={index !== 1}>
                <ServiceCard service={service} mobile />
              </div>
            ))}
          </div>
        </div>

        <div className="rd-services-controls" aria-label="Service carousel controls" onPointerDownCapture={pauseForInteraction} onMouseEnter={() => setIsPaused(true)} onMouseLeave={pauseForInteraction} onFocus={() => setIsPaused(true)} onBlur={pauseForInteraction}>
          <button type="button" className="rd-services-control-btn" onClick={prevManual} aria-label="Previous service">
            <ChevronLeft size={22} />
          </button>
          <div className="rd-services-dots">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                className={`rd-services-dot ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => goToManual(index)}
                aria-label={`Show ${service.title}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
          <button type="button" className="rd-services-control-btn next" onClick={nextManual} aria-label="Next service">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
function Gallery() {
  return (
    <section className="rd-gallery-section homepage-built-mobile-padding relative overflow-hidden px-5 py-16 @sm:px-10 @sm:py-24">
      <style>{`
        .rd-gallery-topography {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%);
        }
        .rd-gallery-inner {
          position: relative;
          z-index: 1;
          max-width: 1120px;
          margin: 0 auto;
        }
        .rd-gallery-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }
        .rd-gallery-heading h2 {
          margin: 0;
          color: var(--text-headlines);
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 700;
          font-style: italic;
          line-height: 1;
        }
        .rd-gallery-chevron {
          width: clamp(62px, 7vw, 96px);
          height: auto;
          flex: 0 0 auto;
        }
        .rd-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 232px 232px 250px;
          gap: 16px;
        }
        .rd-gallery-item {
          overflow: hidden;
          background: var(--surface-dark);
        }
        .rd-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rd-gallery-equipment {
          grid-column: 2;
          grid-row: 1 / span 2;
        }
        .rd-gallery-trophies {
          grid-column: 1 / -1;
        }
        .rd-gallery-crew img {
          object-position: center center;
        }
        .rd-gallery-equipment img {
          object-position: center center;
        }
        .rd-gallery-results img {
          object-position: center center;
        }
        .rd-gallery-trophies img {
          object-position: center center;
        }
        @media (max-width: 900px) {
          .rd-gallery-heading {
            justify-content: center;
            text-align: center;
          }
          .rd-gallery-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
          }
          .rd-gallery-item,
          .rd-gallery-equipment,
          .rd-gallery-trophies {
            grid-column: auto;
            grid-row: auto;
            aspect-ratio: 16 / 9;
          }
          .rd-gallery-equipment {
            aspect-ratio: 4 / 5;
          }
        }
      `}</style>
      <img src={topographyBg} alt="" className="rd-gallery-topography" />
      <div className="rd-gallery-inner">
        <div className="rd-gallery-heading">
          <h2>Arsenal on Race Day</h2>
          <img src={raceDayChevron} alt="" className="rd-gallery-chevron" />
        </div>
        <div className="rd-gallery-grid">
          <figure className="rd-gallery-item rd-gallery-crew">
            <img src={imgGalleryCrew} alt="Arsenal Events crew working at a race timing station" />
          </figure>
          <figure className="rd-gallery-item rd-gallery-equipment">
            <img src={imgGalleryEquipment} alt="Race timing equipment in an orange case" />
          </figure>
          <figure className="rd-gallery-item rd-gallery-results">
            <img src={imgGalleryResults} alt="Race results displayed on a monitor" />
          </figure>
          <figure className="rd-gallery-item rd-gallery-trophies">
            <img src={imgGalleryTrophies} alt="Race awards lined up on a table" />
          </figure>
        </div>
      </div>
    </section>
  );
}
export default function ForRaceDirectorsPage() {
  return (
    <main style={{ background: "var(--surface-default)" }}>
      <Hero />
      <Services />
      <Gallery />
      <StatsBand quotes={RACE_DIRECTOR_STATS_QUOTES} ctaLabel="See Our Race Day Tech" ctaTo="/for-race-directors" stackBelow950 />
      <div id="form" className="scroll-mt-20">
        <FormWithFAQ />
      </div>
      <ResourceSection />
      <PageCTA />
    </main>
  );
}







































