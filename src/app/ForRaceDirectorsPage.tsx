import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, A11y, EffectCreative, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-creative";
import imgHero from "@/imports/race-directors-hero.png";
import imgGalleryCrew from "@/imports/race-day-gallery-crew.png";
import imgGalleryEquipment from "@/imports/race-day-gallery-equipment.jpg";
import imgGalleryResults from "@/imports/race-day-gallery-results.jpg";
import imgGalleryTrophies from "@/imports/race-day-gallery-trophies.png";
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
        @media (max-width: 1199px) {
          .rd-gallery-trophies img {
            object-fit: cover;
            object-position: center center;
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
        @media (max-width: 1199px) {
          .rd-gallery-trophies img {
            object-fit: cover;
            object-position: center center;
          }
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
  const [accentReveal, setAccentReveal] = useState(0);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const mobileServiceSwiperRef = useRef<SwiperClass | null>(null);
  const desktopServiceSwiperRef = useRef<SwiperClass | null>(null);
  const interactionPauseTimerRef = useRef<number | null>(null);
  const [isDesktopServices, setIsDesktopServices] = useState(false);
  const [desktopServiceOffset, setDesktopServiceOffset] = useState("42%");

  useEffect(() => {
    return () => {
      if (interactionPauseTimerRef.current !== null) {
        window.clearTimeout(interactionPauseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const updateDesktop = () => {
      setIsDesktopServices(desktopQuery.matches);
      const progress = Math.min(1, Math.max(0, (window.innerWidth - 1280) / 640));
      setDesktopServiceOffset(`${(42 + progress * 22).toFixed(2)}%`);
    };
    updateDesktop();
    desktopQuery.addEventListener?.("change", updateDesktop);
    window.addEventListener("resize", updateDesktop);

    return () => {
      desktopQuery.removeEventListener?.("change", updateDesktop);
      window.removeEventListener("resize", updateDesktop);
    };
  }, []);

  const getActiveServiceSwiper = () => isDesktopServices ? desktopServiceSwiperRef.current : mobileServiceSwiperRef.current;
  const getInactiveServiceSwiper = () => isDesktopServices ? mobileServiceSwiperRef.current : desktopServiceSwiperRef.current;

  useEffect(() => {
    mobileServiceSwiperRef.current?.update();
    desktopServiceSwiperRef.current?.update();
  }, [isDesktopServices, desktopServiceOffset]);

  useEffect(() => {
    getInactiveServiceSwiper()?.autoplay?.stop();
    getActiveServiceSwiper()?.autoplay?.start();
  }, [isDesktopServices, desktopServiceOffset]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAccentReveal(1);
      return;
    }

    let rafId = 0;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      const node = servicesSectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = Math.max(1, viewportHeight * 0.5184);
      const progress = clamp01((viewportHeight * 0.78 - rect.top) / travel);

      setAccentReveal((previous) => (
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

  const accentRevealClip = `inset(0 0 0 ${((1 - accentReveal) * 100).toFixed(3)}%)`;
  const desktopServices = [...services, ...services, ...services];
  const normalizeServiceIndex = (index: number) => ((index % services.length) + services.length) % services.length;

  const pauseForInteraction = () => {
    getActiveServiceSwiper()?.autoplay?.stop();
    if (interactionPauseTimerRef.current !== null) {
      window.clearTimeout(interactionPauseTimerRef.current);
    }
    interactionPauseTimerRef.current = window.setTimeout(() => {
      getActiveServiceSwiper()?.autoplay?.start();
      interactionPauseTimerRef.current = null;
    }, 2000);
  };

  const pauseAutoplay = () => pauseForInteraction();
  const resumeAutoplay = () => undefined;
  const prevManual = () => {
    pauseForInteraction();
    setActiveIndex((index) => normalizeServiceIndex(index - 1));
    getActiveServiceSwiper()?.slidePrev(300);
  };
  const nextManual = () => {
    pauseForInteraction();
    setActiveIndex((index) => normalizeServiceIndex(index + 1));
    getActiveServiceSwiper()?.slideNext(300);
  };
  const handleDesktopSlideChange = (swiper: SwiperClass) => {
    const normalizedIndex = normalizeServiceIndex(swiper.activeIndex);
    setActiveIndex(normalizedIndex);

    if (swiper.activeIndex < services.length || swiper.activeIndex >= services.length * 2) {
      window.requestAnimationFrame(() => {
        swiper.slideTo(normalizedIndex + services.length, 0, false);
      });
    }
  };

  const goToManual = (index: number) => {
    pauseForInteraction();
    setActiveIndex(index);
    const swiper = getActiveServiceSwiper();
    if (isDesktopServices) {
      swiper?.slideTo(index + services.length, 360);
    } else {
      swiper?.slideToLoop(index, 360);
    }
  };

  return (
    <section
      ref={servicesSectionRef}
      id="services"
      className="rd-services-section homepage-built-mobile-padding relative overflow-hidden px-5 py-16 @sm:px-10 @sm:pt-24 @sm:pb-[72px] scroll-mt-20"
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
          will-change: clip-path;
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
          display: grid;
          margin: 44px auto 0;
          width: min(560px, 100%);
          overflow: hidden;
          touch-action: pan-y;
          place-items: center;
        }
        .rd-services-stage > * {
          grid-area: 1 / 1;
          min-width: 0;
        }
        .rd-services-sizer {
          display: grid;
          visibility: hidden;
          pointer-events: none;
        }
        .rd-services-sizer > * {
          grid-area: 1 / 1;
        }
        .rd-services-swiper {
          width: 100%;
          height: 100%;
          align-self: stretch;
        }
        .rd-services-swiper-desktop {
          display: none;
        }
        .rd-services-swiper .swiper-wrapper {
          height: 100%;
          align-items: stretch;
        }
        .rd-services-swiper .swiper-slide {
          height: 100%;
          align-self: stretch;
          border-radius: 10px;
          transition: filter 320ms ease, opacity 320ms ease;
        }
        .rd-services-swiper .swiper-slide-shadow,
        .rd-services-swiper .swiper-slide-shadow-left,
        .rd-services-swiper .swiper-slide-shadow-right,
        .rd-services-swiper .swiper-slide-shadow-top,
        .rd-services-swiper .swiper-slide-shadow-bottom {
          display: none !important;
        }
        .rd-services-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: none;
          pointer-events: none;
        }
        .rd-service-card {
          width: 100%;
          height: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
          background: white;
          background-clip: padding-box;
          border-radius: 10px;
          transform: translateZ(0);
          isolation: isolate;
          position: relative;
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
          font-size: clamp(24px, 5.6vw, 32px);
          line-height: 1;
          font-weight: 700;
          font-style: italic;
        }
        .rd-service-card-body {
          display: grid;
          grid-template-columns: 1fr;
          flex: 1 1 auto;
          min-height: 0;
          overflow: hidden;
          border-bottom-left-radius: inherit;
          border-bottom-right-radius: inherit;
        }
        .rd-service-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px;
          background: inherit;
          border-bottom-left-radius: inherit;
          border-bottom-right-radius: inherit;
        }
        .rd-service-copy p {
          margin: 0 0 22px;
          font-size: 19px;
          line-height: 1.2;
          font-weight: 500;
        }
        .rd-service-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          min-height: 30px;
          text-decoration: none;
          font-size: 20px;
          line-height: 1.35;
          font-weight: 700;
          color: var(--action-tertiary-default);
          transition: color 0.15s ease;
        }
        .rd-service-link span {
          display: inline-block;
          transition: transform 0.18s ease;
        }
        .rd-service-chevron {
          position: absolute;
          left: -24px;
          opacity: 0;
          transform: translateX(6px);
          transition: opacity 0.15s ease, transform 0.18s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rd-service-link:hover {
            color: var(--text-accent);
          }
          .rd-service-link:hover span {
            transform: translateX(6px);
          }
          .rd-service-link:hover .rd-service-chevron {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .rd-service-image {
          width: 100%;
          height: 260px;
          min-height: 260px;
          object-fit: cover;
          order: -1;
        }
        .rd-services-controls {
          margin: 44px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: min(560px, 100%);
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
          justify-content: center;
          gap: 8px;
          min-width: 90px;
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
        @media (max-width: 767px) {
          .rd-services-section {
            padding-bottom: 45px !important;
          }
          .rd-gallery-section {
            padding-top: 45px !important;
          }
        }        @media (min-width: 1161px) {
          .rd-services-stage {
            width: min(560px, 100%);
          }
          .rd-services-stage + .rd-services-controls {
            margin-top: 36px;
            width: min(560px, 100%);
          }
        }
        @media (min-width: 1280px) {
          .rd-services-stage {
            width: 100%;
            max-width: min(100%, clamp(1180px, calc(1180px + (100vw - 1280px) * 0.40625), 1440px));
            min-height: clamp(560px, 39vw, 640px);
          }
          .rd-services-sizer,
          .rd-services-swiper {
            width: clamp(330px, 25.2vw, 387px);
            justify-self: center;
          }
          .rd-services-stage + .rd-services-controls {
            width: clamp(330px, 25.2vw, 387px);
          }
          .rd-services-swiper-mobile {
            display: none;
          }
          .rd-services-swiper-desktop {
            display: block;
            overflow: visible;
          }
          .rd-services-swiper .swiper-slide {
            filter: none;
            pointer-events: auto;
          }
          .rd-services-swiper .swiper-slide:not(.swiper-slide-active) {
            filter: none;
            pointer-events: none;
            opacity: 0.54;
          }
          .rd-services-swiper-desktop .swiper-slide-prev,
          .rd-services-swiper-desktop .swiper-slide-next {
            opacity: 0.76;
          }
          .rd-services-swiper-desktop .swiper-slide-active {
            opacity: 1;
          }
          .rd-services-swiper-desktop .swiper-slide:not(.swiper-slide-active) .rd-service-card {
            box-shadow: inset 0 0 0 3px var(--surface-card), 0 4px 12px rgba(35,41,67,0.16);
          }
          .rd-services-swiper-desktop .swiper-slide:not(.swiper-slide-active) .rd-service-card::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 4;
            border-radius: inherit;
            background: rgba(240, 232, 226, 0.46);
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            pointer-events: none;
            transition: opacity 260ms ease;
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-card::after {
            opacity: 0;
          }
          .rd-service-card-header h3 {
            font-size: clamp(27px, 2.25vw, 32px);
          }
          .rd-service-image {
            height: clamp(232px, 18vw, 270px);
            min-height: clamp(232px, 18vw, 270px);
          }
          .rd-service-copy {
            min-height: 203px;
          }
          .rd-services-swiper-desktop .rd-service-card {
            background: #F0E8E2;
            transition: background 260ms ease;
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-card {
            background: white;
          }
          .rd-services-swiper-desktop .rd-service-card-body {
            background: #F0E8E2;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            transition: background 260ms ease;
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-card-body {
            background: white;
          }
          .rd-services-swiper-desktop .rd-service-copy > * {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 260ms ease, transform 260ms ease;
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-copy > * {
            opacity: 1;
            transform: translateY(0);
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-copy > *:nth-child(2) {
            transition-delay: 70ms;
          }
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-copy > *:nth-child(3) {
            transition-delay: 120ms;
          }
        }
        @media (min-width: 1440px) {
          .rd-services-swiper-desktop .swiper-slide-active .rd-service-copy {
            justify-content: flex-start;
            padding-top: 15px;
          }
        }
        @media (max-width: 1160px) {
          .rd-services-accent {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rd-services-swiper .swiper-slide {
            transition: none;
          }
        }
      `}</style>
      <img
        src={whatWeOfferAccent}
        alt=""
        className="rd-services-accent"
        style={{ clipPath: accentRevealClip, WebkitClipPath: accentRevealClip }}
      />
      <div className="rd-services-inner">
        <SectionIntro
          title="What We Offer"
          copy="Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition. Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition."
        />

        <div className="rd-services-stage" aria-live="polite" onPointerDownCapture={pauseForInteraction} onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay} onFocus={pauseAutoplay} onBlur={resumeAutoplay}>
          <div className="rd-services-sizer" aria-hidden="true">
            {services.map((service) => (
              <ServiceCard key={`${service.title}-sizer`} service={service} active mobile />
            ))}
          </div>
          <Swiper
            modules={[Autoplay, A11y, EffectCreative, Keyboard]}
            className="rd-services-swiper rd-services-swiper-mobile"
            initialSlide={1}
            loop={services.length > 1}
            slidesPerView={1}
            centeredSlides
            spaceBetween={16}
            speed={300}
            threshold={35}
            grabCursor
            allowTouchMove
            keyboard={{ enabled: true }}
            effect="creative"
            creativeEffect={{
              limitProgress: 2,
              perspective: false,
              prev: { translate: [-205, 0, 0], scale: 0.93, shadow: false },
              next: { translate: [205, 0, 0], scale: 0.93, shadow: false },
            }}
            autoplay={{ delay: 1200, disableOnInteraction: false, pauseOnMouseEnter: false }}
            onSwiper={(swiper) => {
              mobileServiceSwiperRef.current = swiper;
              if (!isDesktopServices) setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              if (!isDesktopServices) setActiveIndex(swiper.realIndex);
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.title}>
                <ServiceCard service={service} active={index === activeIndex} mobile={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Autoplay, A11y, EffectCreative, Keyboard]}
            key={desktopServiceOffset}
            className="rd-services-swiper rd-services-swiper-desktop"
            initialSlide={services.length + 1}
            loop={false}
            slidesPerView={1}
            centeredSlides
            spaceBetween={0}
            speed={300}
            threshold={35}
            grabCursor
            allowTouchMove
            keyboard={{ enabled: true }}
            effect="creative"
            creativeEffect={{
              limitProgress: 2,
              perspective: false,
              prev: { translate: [`-${desktopServiceOffset}`, 0, 0], scale: 0.86, shadow: false },
              next: { translate: [desktopServiceOffset, 0, 0], scale: 0.86, shadow: false },
            }}
            autoplay={{ delay: 1200, disableOnInteraction: false, pauseOnMouseEnter: false }}
            onSwiper={(swiper) => {
              desktopServiceSwiperRef.current = swiper;
              if (isDesktopServices) handleDesktopSlideChange(swiper);
            }}
            onSlideChange={(swiper) => {
              if (isDesktopServices) handleDesktopSlideChange(swiper);
            }}
          >
            {desktopServices.map((service, index) => {
              const normalizedIndex = normalizeServiceIndex(index);
              return (
                <SwiperSlide key={`${service.title}-desktop-${index}`}>
                  <ServiceCard service={service} active={normalizedIndex === activeIndex} mobile={normalizedIndex === activeIndex} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="rd-services-controls" aria-label="Service carousel controls" onPointerDownCapture={pauseForInteraction} onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay} onFocus={pauseAutoplay} onBlur={resumeAutoplay}>
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
const galleryItems = [
  {
    className: "rd-gallery-crew",
    src: imgGalleryCrew,
    alt: "Arsenal Events crew working at a race timing station",
    caption: "Placeholder supporting gallery copy describing the moment captured in this race-day image.",
  },
  {
    className: "rd-gallery-equipment",
    src: imgGalleryEquipment,
    alt: "Race timing equipment in an orange case",
    caption: "Placeholder supporting gallery copy describing the moment captured in this race-day image.",
  },
  {
    className: "rd-gallery-results",
    src: imgGalleryResults,
    alt: "Race results displayed on a monitor",
    caption: "Placeholder supporting gallery copy describing the moment captured in this race-day image.",
  },
  {
    className: "rd-gallery-trophies",
    src: imgGalleryTrophies,
    alt: "Race awards lined up on a table",
    caption: "Placeholder supporting gallery copy describing the moment captured in this race-day image.",
  },
];

function Gallery() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const activeGalleryItem = activeGalleryIndex === null ? null : galleryItems[activeGalleryIndex];

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGalleryIndex]);

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
        @media (min-width: 1921px) {
          .rd-gallery-topography {
            inset: 0 auto 0 50%;
            width: 1920px;
            max-width: 1920px;
            transform: translateX(-50%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%);
            mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 9%, #000 24%);
            -webkit-mask-composite: source-in;
            mask-composite: intersect;
          }
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
          border: 0;
          padding: 0;
          cursor: zoom-in;
        }
        .rd-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rd-gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          background: rgba(16,18,31,0.92);
          padding: clamp(16px, 3vw, 40px);
        }
        .rd-gallery-lightbox-frame {
          position: relative;
          width: min(100%, 1500px);
          height: min(100%, 88vh);
          overflow: hidden;
          background: transparent;
        }
        .rd-gallery-lightbox-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .rd-gallery-lightbox-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 15%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: clamp(18px, 2vw, 30px);
          color: var(--text-inverse);
          text-align: center;
          background: linear-gradient(180deg, rgba(16,18,31,0) 0%, rgba(16,18,31,0.82) 58%, rgba(16,18,31,0.95) 100%);
          pointer-events: none;
        }
        .rd-gallery-lightbox-caption p {
          width: 100%;
          margin: 0;
          font-size: clamp(16px, 1.7vw, 22px);
          line-height: 1.35;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .rd-gallery-lightbox-caption p {
            text-align: left;
          }
        }
        .rd-gallery-lightbox-close {
          position: fixed;
          top: clamp(14px, 2vw, 28px);
          right: clamp(14px, 2vw, 28px);
          z-index: 1001;
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border: 0;
          border-radius: 999px;
          background: var(--surface-dark);
          color: var(--text-inverse);
          cursor: pointer;
          box-shadow: 0 8px 22px rgba(0,0,0,0.28);
        }
        .rd-gallery-lightbox-close svg {
          width: 24px;
          height: 24px;
          stroke: currentColor;
          stroke-width: 2.5;
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
          object-position: center calc(50% + 50px);
        }
        @media (max-width: 1199px) {
          .rd-gallery-trophies img {
            object-fit: cover;
            object-position: center center;
          }
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
          {galleryItems.map((item, index) => (
            <button
              key={item.alt}
              type="button"
              className={`rd-gallery-item ${item.className}`}
              onClick={() => setActiveGalleryIndex(index)}
              aria-label={`Open gallery image: ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} />
            </button>
          ))}
        </div>
      </div>
      {activeGalleryItem && (
        <div
          className="rd-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Race day gallery image"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <button
            type="button"
            className="rd-gallery-lightbox-close"
            onClick={() => setActiveGalleryIndex(null)}
            aria-label="Close gallery image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <div className="rd-gallery-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img src={activeGalleryItem.src} alt={activeGalleryItem.alt} />
            <div className="rd-gallery-lightbox-caption">
              <p>{activeGalleryItem.caption}</p>
            </div>
          </div>
        </div>
      )}      </section>
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
































































































