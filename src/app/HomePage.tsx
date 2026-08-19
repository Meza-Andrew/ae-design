import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { WireLabel, BtnGhost } from "./shared";
import imgHero from "@/imports/image-7.png";
import HeroImageOverlay from "@/imports/HeroImageOverlay/index";
import RaceCourseTrackLine from "@/imports/RaceCourseTrackLine/index";
import RaceCourseTrackLine2 from "@/imports/RaceCourseTrackLine2/index";
import Vector from "@/imports/Vector/index";
import trackTopSvg from "@/imports/track-top-2-1.svg";
import trackMiddleSvg from "@/imports/track-middle-1.svg";
import trackBottomSvg from "@/imports/track-bottom-1-1.svg";
import trackBottom2Svg from "@/imports/track-bottom-2.svg";
import imgEquipment from "@/imports/image-10.png";
import imgRunner from "@/imports/image-9.png";
import imgHalloweenBg from "@/imports/race_86385_294977_e12aa008-9a13-459f-a326-cf9bb249dadd_1.png";
import imgHalloweenLogo from "@/imports/24_Oct_2026_Halloween_5K_Monster_Mile_1.png";
import imgFrostyBg from "@/imports/race_86385_294977_e12aa008-9a13-459f-a326-cf9bb249dadd_2.png";
import imgFrostyLogo from "@/imports/12_Dec_2026_Frosty_5K_Reindeer_Run_1.png";
import blockQuoteSvg from "@/imports/block_quote.svg";
import timerSvg from "@/imports/timer.svg";
import medalSvg from "@/imports/medal.svg";
import smileSvg from "@/imports/smile.svg";
import imgResourceRunner from "@/imports/DSC07982-2_1.png";
import imgResourceDirector from "@/imports/image_2.png";
import imgResourceGear from "@/imports/image_1.png";
import personRunSvg from "@/imports/PersonSimpleRun.svg";
import raceDirectorIconSvg from "@/imports/for_race_directors_icon.svg";

// ─── Responsive N-up slider ───────────────────────────────────────────────────
// Mobile (@md:hidden)  → Slider unchanged.
// Desktop (hidden @md:block) → continuous N-up, slides 1 card at a time.

const DESKTOP_GAP = 24;
const TRACK_SCALE_BASE_WIDTH = 1550;
const TRACK_SCALE_MIN_WIDTH = 1280;

type TrackRevealDirection = "ltr" | "rtl" | "ttb";
type TrackRevealSet = [number, number, number, number, number, number];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const getTrackScaleForWidth = (width: number) =>
  Math.max(TRACK_SCALE_MIN_WIDTH / TRACK_SCALE_BASE_WIDTH, width / TRACK_SCALE_BASE_WIDTH);
const scalePx = (value: number) => `calc(${value}px * var(--track-scale))`;
const scalePercent = (value: number) => `calc(${value}% * var(--track-scale))`;

const getTrackRevealStyle = (direction: TrackRevealDirection, reveal: number) =>
  ({
    overflow: "hidden",
    clipPath:
      direction === "ltr"
        ? `inset(0 ${((1 - clamp01(reveal)) * 100).toFixed(4)}% 0 0)`
        : direction === "rtl"
          ? `inset(0 0 0 ${((1 - clamp01(reveal)) * 100).toFixed(4)}%)`
          : `inset(0 0 ${((1 - clamp01(reveal)) * 100).toFixed(4)}% 0)`,
    transition: "clip-path 260ms cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "clip-path",
  }) as const;

const getBuiltTrackRevealStyles = (reveal: number) => {
  const progress = clamp01(reveal);
  const handoffPoint = 0.432;
  const blendStart = 0.36;
  const blendSpan = 0.2;
  const verticalProgress = clamp01(progress / handoffPoint);
  const horizontalProgress = clamp01((progress - handoffPoint) / (1 - handoffPoint));
  const blend = clamp01((progress - blendStart) / blendSpan);

  return {
    vertical: {
      overflow: "hidden",
      clipPath: `inset(0 0 ${((1 - verticalProgress) * 100).toFixed(4)}% 0)`,
      opacity: 1 - blend * 0.9,
      transition: "clip-path 360ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease",
      willChange: "clip-path, opacity",
    } as const,
    horizontal: {
      overflow: "hidden",
      clipPath: `inset(0 ${((1 - horizontalProgress) * 100).toFixed(4)}% 0 0)`,
      opacity: blend,
      transition: "clip-path 360ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease",
      willChange: "clip-path, opacity",
    } as const,
  };
};

function useTrackScale() {
  const [trackScale, setTrackScale] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setTrackScale(getTrackScaleForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return trackScale;
}

function useTrackReveal(
  sectionRefs: [React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>],
  heroInitialReveal = 0.78,
) {
  const [heroRef, servicesRef, racesRef, builtRef, resourcesRef, ctaRef] = sectionRefs;
  const [reveal, setReveal] = useState<TrackRevealSet>([
    heroInitialReveal,
    0,
    0,
    0,
    0,
    0,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal([1, 1, 1, 1, 1, 1]);
      return;
    }

    let rafId = 0;

    const update = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const nextReveal = sectionRefs.map((sectionRef, index) => {
        const node = sectionRef.current;
        if (!node) return index === 0 ? heroInitialReveal : 0;

        const rect = node.getBoundingClientRect();
        if (index === 0) {
          const travel = Math.max(1, viewportHeight + rect.height);
          const span = Math.max(travel * 0.22, 160);
          const progress = clamp01(scrollY / span);
          return heroInitialReveal + (1 - heroInitialReveal) * progress;
        }

        const travel = Math.max(1, viewportHeight + rect.height);
        const entered = clamp01((viewportHeight - rect.top) / travel);

        switch (index) {
          case 1: {
            const eased = clamp01(entered / 0.7);
            return 1 - Math.pow(1 - eased, 2.4);
          }
          case 2: {
            return clamp01(entered / 0.75);
          }
          case 3: {
            return clamp01((entered - 0.15) / 0.58);
          }
          case 4: {
            return clamp01((entered - 0.2) / 0.68);
          }
          case 5: {
            return clamp01(entered / 0.68);
          }
          default:
            return entered;
        }
      }) as TrackRevealSet;

      setReveal(prev => {
        const same = nextReveal.every((value, index) => Math.abs(value - prev[index]) < 0.001);
        return same ? prev : nextReveal;
      });
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
  }, [heroInitialReveal, heroRef, servicesRef, racesRef, builtRef, resourcesRef, ctaRef]);

  return reveal;
}

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
      <div className="@md:hidden">
        <Slider>{children}</Slider>
      </div>
      <div className="hidden @md:block">
        <div ref={wrapRef} className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${idx * slideUnit}px)` }}
          >
            {items.map((child, i) => (
              <div key={i} className="shrink-0" style={{ width: cssW }}>{child}</div>
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


function HeroBtn({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="hero-btn inline-flex items-center shrink-0 px-9 font-semibold text-2xl whitespace-nowrap"
      style={{
        background: "var(--action-primary-default)",
        color: "var(--action-primary-text)",
        borderRadius: "10px",
        minHeight: "76px",
        transition: "transform 0.25s ease, background-color 0.2s ease",
      }}
    >
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .hero-btn:hover {
            background-color: var(--action-primary-hover) !important;
            transform: skewX(-8deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-btn { transition: background-color 0.2s ease !important; }
          .hero-btn:hover { transform: none !important; }
        }
      `}</style>
      {children}
    </Link>
  );
}

function Hero({
  sectionRef,
  trackReveal,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackReveal: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--surface-dark)" }}>
      {/* ── Photo ── */}
      <img
        src={imgHero}
        alt="Runner crossing the finish line at an Arsenal Events race"
        className="absolute inset-0 w-full h-full object-cover object-[center_75%]"
      />

      {/* ── Gradient overlay (left-to-right navy fade) ── */}
      <div className="absolute inset-0">
        <HeroImageOverlay />
      </div>

      {/* ── Race course track line — aspect-ratio locks 1808×546 proportions, no stretch ── */}
      <div
        className="absolute pointer-events-none hidden min-[1280px]:block"
        style={{
          top: scalePercent(-15),
          left: scalePercent(-6),
          width: scalePercent(115),
          aspectRatio: "1808.2 / 545.562",
          ...getTrackRevealStyle("ltr", trackReveal),
        }}
      >
        <RaceCourseTrackLine />
      </div>

      {/* ── Hero copy — bottom-left, inside max-width container ── */}
      <div
        className="relative max-w-[1440px] mx-auto px-6 @sm:px-10 pb-14 @md:pb-20"
        style={{
          paddingTop: "clamp(200px, 28vw, 420px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-48px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          willChange: "opacity, transform",
        }}
      >
        {/* Headline */}
        <h1
          className="text-[clamp(48px,7vw,96px)] font-bold italic leading-none mb-5"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)", color: "var(--text-inverse)" }}
        >
          Run Your Next Race
        </h1>

        {/* Subtitle */}
        <p
          className="text-[clamp(18px,2.1vw,30px)] font-semibold leading-snug mb-10 max-w-[60ch]"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)", color: "var(--text-inverse)" }}
        >
          Placeholder supporting headline copy — one or two sentences describing both race director and runner-facing value propositions.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-5 items-center">
          {/* Plan Your Event */}
          <HeroBtn to="/for-race-directors">Plan Your Event</HeroBtn>

          {/* Find Your Next Race */}
          <HeroBtn to="/races">Find Your Next Race</HeroBtn>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const DIRECTORS_SERVICES = [
  { label: "Registration", accent: true, to: "/for-race-directors#registration" },
  { label: "Timing & Results", accent: false, to: "/for-race-directors#timing" },
  { label: "Packet Pickup", accent: false, to: "/for-race-directors#packet-pickup" },
  { label: "Course Management", accent: false, to: "/for-race-directors#course-management" },
  { label: "Consulting", accent: false, to: "/for-race-directors#consulting" },
];

const RUNNERS_SERVICES = [
  { label: "Registration", to: "/races#registration" },
  { label: "Timing & Results", to: "/races#results" },
  { label: "Packet Pickup", to: "/races#packet-pickup" },
  { label: "Course Management", to: "/races#course-management" },
  { label: "Photos", to: "/races#photos" },
];

function RaceDirectorsIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 41 / 33)} viewBox="0 0 33 41" fill="none" aria-hidden>
      <path
        d="M24.0002 25.4999C24.0002 25.8977 23.8421 26.2793 23.5608 26.5606C23.2795 26.8419 22.898 26.9999 22.5002 26.9999H10.5001C10.1022 26.9999 9.72071 26.8419 9.4394 26.5606C9.1581 26.2793 9.00006 25.8977 9.00006 25.4999C9.00006 25.1021 9.1581 24.7205 9.4394 24.4392C9.72071 24.1579 10.1022 23.9999 10.5001 23.9999H22.5002C22.898 23.9999 23.2795 24.1579 23.5608 24.4392C23.8421 24.7205 24.0002 25.1021 24.0002 25.4999ZM22.5002 17.9998H10.5001C10.1022 17.9998 9.72071 18.1579 9.4394 18.4392C9.1581 18.7205 9.00006 19.102 9.00006 19.4999C9.00006 19.8977 9.1581 20.2792 9.4394 20.5605C9.72071 20.8418 10.1022 20.9999 10.5001 20.9999H22.5002C22.898 20.9999 23.2795 20.8418 23.5608 20.5605C23.8421 20.2792 24.0002 19.8977 24.0002 19.4999C24.0002 19.102 23.8421 18.7205 23.5608 18.4392C23.2795 18.1579 22.898 17.9998 22.5002 17.9998ZM33.0002 5.99977V37.5C33.0002 38.2956 32.6841 39.0587 32.1215 39.6213C31.5589 40.1839 30.7959 40.5 30.0002 40.5H3.00002C2.20437 40.5 1.4413 40.1839 0.878685 39.6213C0.316072 39.0587 0 38.2956 0 37.5V5.99977C0 5.20411 0.316072 4.44105 0.878685 3.87843C1.4413 3.31582 2.20437 2.99975 3.00002 2.99975H9.79882C10.6416 2.0561 11.6743 1.30109 12.8291 0.784155C13.9839 0.267216 15.2349 0 16.5001 0C17.7653 0 19.0163 0.267216 20.1711 0.784155C21.326 1.30109 22.3586 2.0561 23.2014 2.99975H30.0002C30.7959 2.99975 31.5589 3.31582 32.1215 3.87843C32.6841 4.44105 33.0002 5.20411 33.0002 5.99977ZM10.5001 8.99979H22.5002C22.5002 7.40848 21.868 5.88235 20.7428 4.75712C19.6176 3.63189 18.0914 2.99975 16.5001 2.99975C14.9088 2.99975 13.3827 3.63189 12.2574 4.75712C11.1322 5.88235 10.5001 7.40848 10.5001 8.99979ZM30.0002 5.99977H24.9845C25.3258 6.96318 25.5001 7.97774 25.5002 8.99979V10.4998C25.5002 10.8976 25.3421 11.2792 25.0608 11.5605C24.7795 11.8418 24.398 11.9998 24.0002 11.9998H9.00006C8.60223 11.9998 8.2207 11.8418 7.93939 11.5605C7.65809 11.2792 7.50005 10.8976 7.50005 10.4998V8.99979C7.50008 7.97774 7.67446 6.96318 8.01568 5.99977H3.00002V37.5H30.0002V5.99977Z"
        fill="var(--decorative-highlight)"
      />
    </svg>
  );
}

function RunnersIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M28.4999 16.5C29.6866 16.5 30.8466 16.1481 31.8333 15.4888C32.82 14.8295 33.5891 13.8925 34.0432 12.7961C34.4973 11.6997 34.6161 10.4933 34.3846 9.32946C34.1531 8.16557 33.5817 7.09648 32.7426 6.25736C31.9034 5.41825 30.8343 4.8468 29.6705 4.61529C28.5066 4.38378 27.3002 4.5026 26.2038 4.95673C25.1075 5.41085 24.1704 6.17989 23.5111 7.16658C22.8518 8.15328 22.4999 9.31331 22.4999 10.5C22.4999 12.0913 23.1321 13.6174 24.2573 14.7426C25.3825 15.8679 26.9086 16.5 28.4999 16.5ZM28.4999 7.5C29.0933 7.5 29.6733 7.67595 30.1666 8.00559C30.66 8.33524 31.0445 8.80377 31.2716 9.35195C31.4986 9.90013 31.558 10.5033 31.4423 11.0853C31.3265 11.6672 31.0408 12.2018 30.6212 12.6213C30.2017 13.0409 29.6671 13.3266 29.0852 13.4424C28.5032 13.5581 27.9 13.4987 27.3519 13.2716C26.8037 13.0446 26.3352 12.6601 26.0055 12.1667C25.6759 11.6734 25.4999 11.0933 25.4999 10.5C25.4999 9.70435 25.816 8.94129 26.3786 8.37868C26.9412 7.81607 27.7043 7.5 28.4999 7.5ZM41.1205 26.3775C41.0062 26.43 39.7162 26.9925 37.4324 26.9925C34.8355 26.9925 30.9543 26.265 26.053 23.2425C25.3071 25.3602 24.3385 27.3929 23.1637 29.3063C25.2739 29.9559 27.2588 30.9582 29.0343 32.2706C32.6099 34.9969 34.4999 38.8781 34.4999 43.5C34.4999 43.8978 34.3419 44.2794 34.0606 44.5607C33.7793 44.842 33.3977 45 32.9999 45C32.6021 45 32.2206 44.842 31.9393 44.5607C31.658 44.2794 31.4999 43.8978 31.4999 43.5C31.4999 35.6813 24.9955 32.8669 21.3487 31.9031C21.2455 32.0344 21.1387 32.1675 21.0318 32.2969C17.3493 36.7594 12.7349 39.0806 7.60117 39.0806C7.01643 39.0834 6.43193 39.0564 5.84992 39C5.45209 38.9602 5.08637 38.764 4.83319 38.4546C4.58002 38.1452 4.46014 37.7478 4.49992 37.35C4.5397 36.9522 4.73589 36.5865 5.04532 36.3333C5.35476 36.0801 5.75209 35.9602 6.14992 36C11.0099 36.4838 15.238 34.5956 18.7124 30.375C21.0543 27.5363 22.6499 24.0731 23.4468 21.5625C16.1493 17.3156 11.488 20.9306 11.4374 20.97C11.2846 21.1005 11.1072 21.1989 10.9156 21.2595C10.724 21.3201 10.5222 21.3415 10.3222 21.3226C10.1222 21.3037 9.92796 21.2448 9.75113 21.1494C9.5743 21.054 9.41844 20.924 9.2928 20.7672C9.16716 20.6105 9.0743 20.43 9.01974 20.2366C8.96517 20.0433 8.95001 19.8409 8.97516 19.6415C9.00031 19.4422 9.06525 19.2499 9.16613 19.0762C9.26701 18.9024 9.40177 18.7507 9.56242 18.63C9.84367 18.405 16.5412 13.1925 26.3455 19.8619C34.8712 25.6575 39.8324 23.67 39.8793 23.6475C40.059 23.5626 40.2538 23.5143 40.4523 23.5054C40.6509 23.4964 40.8492 23.527 41.0358 23.5954C41.2224 23.6637 41.3936 23.7685 41.5394 23.9036C41.6851 24.0387 41.8026 24.2014 41.885 24.3822C41.9673 24.5631 42.0129 24.7585 42.0191 24.9572C42.0253 25.1558 41.9919 25.3537 41.921 25.5394C41.85 25.725 41.7429 25.8947 41.6058 26.0386C41.4687 26.1825 41.3044 26.2977 41.1224 26.3775H41.1205Z"
        fill="var(--decorative-highlight)"
      />
    </svg>
  );
}

function Services({
  sectionRef,
  trackReveal,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackReveal: number;
}) {
  const [activeCard, setActiveCard] = useState<"directors" | "runners">("directors");
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle every 3.5 s, stops while paused
  useEffect(() => {
    if (isPaused) return;
    cycleTimer.current = setInterval(() => {
      setActiveCard(prev => prev === "directors" ? "runners" : "directors");
    }, 3500);
    return () => { if (cycleTimer.current) clearInterval(cycleTimer.current); };
  }, [isPaused]);

  // Cleanup on unmount
  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (cycleTimer.current) clearInterval(cycleTimer.current);
  }, []);

  const scheduleSwitch = (card: "directors" | "runners") => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveCard(card), 350);
  };

  const cancelSwitch = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const handleCompositionEnter = () => {
    setIsPaused(true);
  };

  const handleCompositionLeave = () => {
    cancelSwitch();
    setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-16 @sm:pt-24 pb-11 @sm:pb-16"
      style={{ background: "linear-gradient(to bottom, var(--surface-subtle), var(--surface-default))" }}
    >
      {/* Decorative route — desktop only, behind all section content */}
        <img
          src={trackTopSvg}
          alt=""
          aria-hidden="true"
          className="hidden min-[1280px]:block"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: scalePercent(100),
            height: "auto",
            pointerEvents: "none",
            zIndex: 0,
          ...getTrackRevealStyle("rtl", trackReveal),
          }}
        />
      <div className="relative max-w-[1440px] mx-auto px-5 @sm:px-10 text-center">
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .svc-link-item:hover { color: var(--text-accent) !important; }
            .svc-link-item:hover .svc-chevron { opacity: 1 !important; }
          }
          .svc-link-item {
            display: flex; align-items: center; gap: 4px;
            color: var(--action-tertiary-default); font-weight: 600;
            text-decoration: none; transition: color 0.15s ease; min-height: 34px;
          }
          .svc-chevron { opacity: 0; flex-shrink: 0; transition: opacity 0.15s ease; }
        `}</style>

        <h2
          className="font-bold italic mb-5"
          style={{ fontSize: "48px", lineHeight: "48px", color: "var(--text-headlines)" }}
        >
          What We Offer
        </h2>

        <p
          className="mx-auto mb-10 max-w-[885px]"
          style={{ fontSize: "24px", lineHeight: "32px", color: "var(--text-default)" }}
        >
          Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition. Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition.
        </p>

        {/* ── Desktop: horizontal overlapping cards ── */}
        {/* Active card fills left at scale(1). Inactive peeks right at scale(0.7), vertically centred. */}
        <div className="hidden @md:block pb-10">
          <div
            className="relative mx-auto overflow-hidden"
            style={{ width: "840px", height: "444px" }}
            onMouseEnter={handleCompositionEnter}
            onMouseLeave={handleCompositionLeave}
          >
            {/* Race Directors card */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: 0, left: 0, width: "680px", height: "444px",
                borderRadius: "10px",
                zIndex: activeCard === "directors" ? 2 : 1,
                transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, box-shadow 0.3s ease",
                transform: activeCard === "directors"
                  ? "translate(0px, 0px) scale(1)"
                  : "translate(364px, 67px) scale(0.7)",
                transformOrigin: "top left",
                opacity: activeCard === "directors" ? 1 : 0.7,
                boxShadow: activeCard === "directors"
                  ? "0 10px 32px rgba(0,0,0,0.18)"
                  : "0 2px 12px rgba(0,0,0,0.12)",
                cursor: activeCard === "directors" ? "default" : "pointer",
              }}
              onMouseEnter={() => scheduleSwitch("directors")}
              onMouseLeave={cancelSwitch}
            >
              <Link to="/for-race-directors" className="flex items-center justify-center gap-3 px-6" style={{ background: "var(--surface-dark)", height: "88px", textDecoration: "none" }}>
                <RaceDirectorsIcon size={28} />
                <h3 className="font-bold italic" style={{ fontSize: "28px", lineHeight: "1.2", color: "var(--text-inverse)" }}>
                  For Race Directors
                </h3>
              </Link>
              <div className="flex" style={{ background: "var(--surface-card)", height: "356px" }}>
                <div className="p-6 flex-shrink-0" style={{ width: "44%" }}>
                  <p className="mb-4 text-left" style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)", paddingLeft: "20px" }}>
                    Everything you need to plan, register, and time your event from start to finish.
                  </p>
                  <div className="flex flex-col">
                    {DIRECTORS_SERVICES.map(({ label, to }) => (
                      <Link key={label} to={to} className="svc-link-item" style={{ fontSize: "20px" }}>
                        <ChevronRight size={16} className="svc-chevron" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden">
                  <img src={imgEquipment} alt="Arsenal Events race director setup" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>

            {/* Runners card */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: 0, left: 0, width: "680px", height: "444px",
                borderRadius: "10px",
                zIndex: activeCard === "runners" ? 2 : 1,
                transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, box-shadow 0.3s ease",
                transform: activeCard === "runners"
                  ? "translate(0px, 0px) scale(1)"
                  : "translate(364px, 67px) scale(0.7)",
                transformOrigin: "top left",
                opacity: activeCard === "runners" ? 1 : 0.7,
                boxShadow: activeCard === "runners"
                  ? "0 10px 32px rgba(0,0,0,0.18)"
                  : "0 2px 12px rgba(0,0,0,0.12)",
                cursor: activeCard === "runners" ? "default" : "pointer",
              }}
              onMouseEnter={() => scheduleSwitch("runners")}
              onMouseLeave={cancelSwitch}
            >
              <Link to="/races" className="flex items-center justify-center gap-3 px-6" style={{ background: "var(--surface-dark)", height: "88px", textDecoration: "none" }}>
                <RunnersIcon size={34} />
                <h3 className="font-bold italic" style={{ fontSize: "28px", lineHeight: "1.2", color: "var(--text-inverse)" }}>
                  For Runners
                </h3>
              </Link>
              <div className="flex" style={{ background: "var(--surface-card)", height: "356px" }}>
                <div className="p-6 flex-shrink-0" style={{ width: "44%" }}>
                  <p className="mb-4 text-left" style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)", paddingLeft: "20px" }}>
                    Find your next race, check your results, and relive race day with photos.
                  </p>
                  <div className="flex flex-col">
                    {RUNNERS_SERVICES.map(({ label, to }) => (
                      <Link key={label} to={to} className="svc-link-item" style={{ fontSize: "20px" }}>
                        <ChevronRight size={16} className="svc-chevron" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden">
                  {/* Blurred edge-fill — stretches the photo edges to fill the sides */}
                  <img src={imgRunner} aria-hidden className="absolute inset-0 w-full h-full" style={{ objectFit: "cover", filter: "blur(18px) brightness(0.85) saturate(0.7)", transform: "scale(1.12)" }} />
                  {/* Sharp foreground — full runner visible, medal included */}
                  <img src={imgRunner} alt="Runner with finisher medal" className="absolute inset-0 w-full h-full object-contain" style={{ position: "relative", zIndex: 1 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="@md:hidden flex flex-col gap-5 text-left">
          <div className="overflow-hidden" style={{ background: "var(--surface-card)", boxShadow: "0px 1px 4px rgba(165,162,169,0.9)", borderRadius: "10px" }}>
            <Link to="/for-race-directors" className="flex items-center gap-3 px-5 py-4" style={{ background: "var(--surface-dark)", textDecoration: "none" }}>
              <RaceDirectorsIcon size={20} />
              <h3 className="font-bold italic" style={{ fontSize: "22px", lineHeight: "32px", color: "var(--text-inverse)" }}>
                For Race Directors
              </h3>
            </Link>
            <img src={imgEquipment} alt="Arsenal Events timing equipment" className="w-full h-44 object-cover" />
            <div className="p-5">
              <p className="mb-3" style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)" }}>
                Everything you need to plan, register, and time your event from start to finish.
              </p>
              <div className="flex flex-col">
                {DIRECTORS_SERVICES.map(({ label, to }) => (
                  <Link key={label} to={to} className="svc-link-item" style={{ fontSize: "18px" }}>
                    <ChevronRight size={14} className="svc-chevron" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden" style={{ background: "var(--surface-card)", boxShadow: "0px 1px 4px rgba(165,162,169,0.9)", borderRadius: "10px" }}>
            <Link to="/races" className="flex items-center gap-3 px-5 py-4" style={{ background: "var(--surface-dark)", textDecoration: "none" }}>
              <RunnersIcon size={25} />
              <h3 className="font-bold italic" style={{ fontSize: "22px", lineHeight: "32px", color: "var(--text-inverse)" }}>
                For Runners
              </h3>
            </Link>
            <div className="relative w-full h-44 overflow-hidden">
              <img src={imgRunner} aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ filter: "blur(18px) brightness(0.85) saturate(0.7)", transform: "scale(1.12)" }} />
              <img src={imgRunner} alt="Runner with finisher medal" className="absolute inset-0 w-full h-full object-contain" style={{ zIndex: 1 }} />
            </div>
            <div className="p-5">
              <p className="mb-3" style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)" }}>
                Find your next race, check your results, and relive race day with photos.
              </p>
              <div className="flex flex-col">
                {RUNNERS_SERVICES.map(({ label, to }) => (
                  <Link key={label} to={to} className="svc-link-item" style={{ fontSize: "18px" }}>
                    <ChevronRight size={14} className="svc-chevron" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── 1-up Slider ─────────────────────────────────────────────────────────────

function Slider({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="relative">
      {/* card */}
      <div className="overflow-hidden" style={{ paddingTop: "8px", marginTop: "-8px" }}>
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

      {/* arrows */}
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

      {/* dots */}
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

// ─── Featured Races ───────────────────────────────────────────────────────────

const races = [
  {
    name: "Halloween 5k & Monster Mile",
    date: "October 30, 2026",
    location: "Stafford, VA",
    to: "/races#halloween-5k",
    isArsenalEvent: true,
    bgImg: imgHalloweenBg,
    logoImg: imgHalloweenLogo,
  },
  {
    name: "Frosty 5k & Reindeer Run",
    date: "December 30, 2026",
    location: "Fredericksburg, VA",
    to: "/races#frosty-5k",
    isArsenalEvent: false,
    bgImg: imgFrostyBg,
    logoImg: imgFrostyLogo,
  },
];

function ArsenalEventBadge() {
  return (
    <svg width="205" height="40" viewBox="0 0 205 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Arsenal Event">
      <path d="M0 10C0 4.47715 4.47715 0 10 0H204.363L183.599 19.5477L204.363 39.0955H0V10Z" fill="#035A58"/>
      <path d="M170.895 15.3083L169.465 26.1887H166.109L167.54 15.3083H164.448L164.819 12.4116H174.357L173.986 15.3083H170.895Z" fill="#FCF3ED"/>
      <path d="M163.664 12.4116L161.862 26.1887H158.329L155.521 18.5936L155.256 21.2431L154.62 26.1887H151.441L153.243 12.4116H156.775L159.584 20.0067L159.831 17.3572L160.484 12.4116H163.664Z" fill="#FCF3ED"/>
      <path d="M142.996 12.6589H151.651L151.28 15.5556H145.981L145.664 17.9578H150.079L149.691 20.8545H145.275L144.922 23.5392H150.221L149.85 26.436H141.195L142.996 12.6589Z" fill="#FCF3ED"/>
      <path d="M136.861 26.436H132.268L130.785 12.6589H134.37L135.059 22.5501L138.344 12.6589H141.948L136.861 26.436Z" fill="#FCF3ED"/>
      <path d="M121.263 12.6589H129.918L129.547 15.5556H124.248L123.93 17.9578H128.346L127.957 20.8545H123.541L123.188 23.5392H128.487L128.116 26.436H119.461L121.263 12.6589Z" fill="#FCF3ED"/>
      <path d="M114.772 26.436H106.559L108.36 12.6589H111.716L110.286 23.5392H115.143L114.772 26.436Z" fill="#FCF3ED"/>
      <path d="M99.4341 12.6589H104.026L105.51 26.436H101.925L101.713 23.6452H98.8512L97.9504 26.436H94.3472L99.4341 12.6589ZM101.218 16.5447L99.8227 20.7485H101.518L101.218 16.5447Z" fill="#FCF3ED"/>
      <path d="M95.099 12.6589L93.2974 26.436H89.7648L86.9564 18.8409L86.6914 21.4903L86.0555 26.436H82.8762L84.6778 12.6589H88.2104L91.0188 20.2539L91.2661 17.6045L91.9196 12.6589H95.099Z" fill="#FCF3ED"/>
      <path d="M74.432 12.6589H83.0868L82.7159 15.5556H77.417L77.0991 17.9578H81.5148L81.1262 20.8545H76.7105L76.3572 23.5392H81.6561L81.2852 26.436H72.6304L74.432 12.6589Z" fill="#FCF3ED"/>
      <path d="M66.2074 20.8898C63.2577 20.5012 62.0389 19.3178 62.3215 16.8274L62.3569 16.5094C62.6218 14.0719 64.4058 12.4116 67.85 12.4116C71.2943 12.4116 72.725 14.0366 72.3364 17.1806L72.2834 17.6045H68.9275C69.1394 16.0502 68.7862 15.3083 67.5498 15.3083H67.3731C66.4017 15.3083 65.8365 15.8559 65.7658 16.5447L65.7481 16.7214C65.6775 17.4632 65.9778 17.9401 67.797 18.1874C70.7467 18.5936 72.0538 19.7594 71.7535 22.3912L71.7182 22.7091C71.4356 25.3056 69.4927 26.6833 66.2427 26.6833C62.8867 26.6833 61.1558 25.1466 61.562 21.9496L61.5974 21.667H64.9533C64.759 23.186 65.2712 23.7865 66.4193 23.7865H66.596C67.7441 23.7865 68.2563 23.2213 68.3269 22.5501L68.3446 22.3735C68.4152 21.6847 68.0796 21.1371 66.2074 20.8898Z" fill="#FCF3ED"/>
      <path d="M54.4657 18.8056H56.0024C56.6559 18.8056 57.5214 18.5406 57.645 17.2689L57.6627 17.0746C57.7863 15.7676 57.0975 15.5556 56.4439 15.5556H54.9073L54.4657 18.8056ZM54.0948 21.7023L53.4766 26.436H50.1206L51.9222 12.6589H56.6736C59.0051 12.6589 61.5838 13.1534 61.0716 16.9686L61.0186 17.3572C60.7184 19.6004 59.6586 20.7132 58.3692 21.2431L59.8352 26.436H56.2143L55.0309 21.7023H54.0948Z" fill="#FCF3ED"/>
      <path d="M42.9956 12.6589H47.588L49.0717 26.436H45.4861L45.2741 23.6452H42.4127L41.5119 26.436H37.9087L42.9956 12.6589ZM44.7796 16.5447L43.3842 20.7485H45.0798L44.7796 16.5447Z" fill="#FCF3ED"/>
      <path d="M22.8285 17.0689V19.6236C23.8076 19.845 24.678 20.2088 25.5896 20.4602V17.9017C24.6142 17.6841 23.7364 17.3202 22.8285 17.0689ZM31.2055 12.4546C29.9187 13.0511 28.3356 13.6513 26.8163 13.6513C24.8093 13.6513 23.1474 12.3458 20.6189 12.3458C19.6811 12.3458 18.8445 12.5109 18.0679 12.796C18.173 12.5221 18.2217 12.2258 18.203 11.9107C18.1355 10.8452 17.2614 9.98991 16.1922 9.94489C14.9918 9.89613 14.0051 10.8565 14.0051 12.0457C14.0051 12.7585 14.3615 13.3887 14.9055 13.7676V28.2519C14.9055 28.7509 15.3069 29.1523 15.8058 29.1523H16.4061C16.905 29.1523 17.3064 28.7509 17.3064 28.2519V24.7106C18.3681 24.2566 19.6923 23.8815 21.598 23.8815C23.6088 23.8815 25.267 25.187 27.7954 25.187C29.6036 25.187 31.0479 24.5755 32.391 23.6527C32.7173 23.4276 32.9086 23.0599 32.9086 22.6623V13.5425C32.9124 12.6684 32.0008 12.087 31.2055 12.4546ZM20.0675 22.1558C19.0996 22.2571 18.1917 22.4635 17.3064 22.7786V20.1338C18.2893 19.7849 19.0883 19.5711 20.0675 19.4811V22.1558ZM31.1117 17.1101C30.2264 17.4778 29.3748 17.8417 28.3506 18.0067V20.674C29.281 20.5465 30.2789 20.2314 31.1117 19.6986V22.3434C30.1701 22.9474 29.2923 23.27 28.3506 23.3601V20.674C27.3378 20.8128 26.5537 20.7303 25.5896 20.4639V22.9924C24.693 22.7148 23.8152 22.3659 22.8285 22.1934V19.6236C22.0895 19.4586 21.2979 19.3685 20.0675 19.4811V16.8551C19.2271 16.9713 18.3943 17.2377 17.3064 17.6391V14.9943C18.5519 14.5367 19.1859 14.2516 20.0675 14.169V16.8551C21.0803 16.7162 21.8832 16.8063 22.8285 17.0689V14.5404C23.7176 14.818 24.5992 15.1669 25.5896 15.3395V17.9055C26.4787 18.1043 27.3753 18.1643 28.3506 18.0067V15.3095C29.3635 15.1294 30.3127 14.7993 31.1117 14.4654V17.1101Z" fill="#FCF3ED"/>
    </svg>
  );
}

function RaceCard({ race }: { race: (typeof races)[number] }) {
  return (
    <Link
      to={race.to}
      className="race-card"
      style={{
        background: "var(--surface-card)",
        borderRadius: "10px 10px 5px 5px",
        boxShadow: "0px 1px 4px 0px rgba(165,162,169,1)",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        outline: "2px solid transparent",
        outlineOffset: "2px",
      }}
    >
      {/* Image area: blurred race photo bg + teal tint + race logo */}
      <div className="relative overflow-hidden upcoming-race-media" style={{ height: "367.177px" }}>
        <img
          src={race.bgImg}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(151,189,183,0.2)" }} />
        <img
          src={race.logoImg}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ padding: "20px" }}
        />
        {race.isArsenalEvent && (
          <div className="absolute left-0" style={{ top: 0 }}>
            <ArsenalEventBadge />
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="upcoming-race-content flex flex-col flex-1" style={{ padding: "18px 20px 20px" }}>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            letterSpacing: "1px",
            color: "#6d6b6f",
            marginBottom: "4px",
          }}
        >
          {race.date}
          <span style={{ color: "var(--text-accent)" }}> | </span>
          {race.location}
        </p>
        <h3
          className="font-bold italic"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            color: "var(--text-accent)",
            marginBottom: "16px",
          }}
        >
          {race.name}
        </h3>
        {/* Card is the link — Register is a visual CTA div with its own hover skew */}
        <div
          className="ae-btn-register upcoming-race-register flex items-center justify-center mt-auto"
          style={{
            background: "var(--action-secondary-default)",
            color: "var(--action-secondary-text)",
            fontSize: "20px",
            fontWeight: 600,
            width: "263.668px",
            height: "42.581px",
            padding: "0 20px",
            borderRadius: "10px",
            alignSelf: "center",
          }}
        >
          Register
        </div>
      </div>
    </Link>
  );
}

function FeaturedRaces({
  sectionRef,
  trackReveal,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackReveal: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-11 @sm:pt-16 pb-16 @sm:pb-24"
      style={{ background: "var(--surface-default)", overflow: "hidden", position: "relative" }}
    >
      <style>{`
        .upcoming-race-content {
          min-height: 154px;
        }
        .upcoming-race-register {
          flex: 0 0 auto;
        }
        .upcoming-races-reveal {
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .upcoming-races-reveal.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .upcoming-races-card-reveal {
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .upcoming-races-card-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (hover: hover) and (pointer: fine) {
          .ae-btn {
            transition: transform 0.25s ease, background-color 0.25s ease;
            display: inline-flex; align-items: center; justify-content: center;
            text-decoration: none;
          }
          .ae-btn:hover { transform: skewX(-8deg); }
          .ae-btn-primary:hover { background: var(--action-primary-hover) !important; }
          .ae-btn-secondary:hover { background: var(--action-secondary-hover) !important; }

          .race-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease, outline-color 0.2s ease;
          }
          .race-card:hover {
            transform: translateY(-4px);
            box-shadow: 0px 10px 28px 0px rgba(35,41,67,0.18);
            outline-color: var(--text-accent);
          }

          .ae-btn-register {
            transition: transform 0.25s ease, background-color 0.2s ease;
          }
          .ae-btn-register:hover {
            transform: skewX(-8deg);
            background: var(--action-secondary-hover) !important;
          }
          .race-card:hover .ae-btn-register {
            background: var(--action-secondary-hover) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .race-card { transition: box-shadow 0.2s ease, outline-color 0.2s ease !important; }
          .race-card:hover { transform: none !important; }
          .ae-btn-register { transition: background-color 0.2s ease !important; }
          .ae-btn-register:hover { transform: none !important; }
        }
        @media (min-width: 768px) {
          .upcoming-race-media {
            height: 367.177px !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-[1440px] px-8 @sm:px-12">
        {/* Decorative route — desktop only, static backdrop */}
        <div
          className="hidden min-[1280px]:block"
          style={{
            position: "absolute",
            top: scalePx(-13),
            left: scalePx(-27),
            width: scalePercent(100),
            height: "auto",
            pointerEvents: "none",
            zIndex: 4,
            ...getTrackRevealStyle("ttb", trackReveal),
          }}
        >
            <img
              src={trackMiddleSvg}
              alt=""
              aria-hidden="true"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
        </div>

        <div className={`upcoming-races-reveal ${isVisible ? "is-visible" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          {/* ── Desktop: left content column + right cards overflow ── */}
          <div className="hidden @md:flex" style={{ width: "100%" }}>

        {/* Left column — 60px left section padding, navy block bleeds to edge */}
        <div
          style={{
            width: "480px",
            minWidth: "480px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            paddingLeft: "60px",
            paddingRight: "0",
          }}
        >
          {/* Navy heading: negative margin cancels section padding, bleeds to left edge */}
          <div
            className="relative inline-flex self-start rounded-l-[0px] rounded-r-[10px]"
            style={{
              marginBottom: "32px",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 rounded-l-[0px] rounded-r-[10px]"
              style={{
                left: "-400px",
                right: "0",
                background: "var(--surface-dark)",
              }}
            />
            <h2
              className="relative font-bold italic"
              style={{
                fontSize: "48px",
                lineHeight: "48px",
                color: "var(--text-inverse)",
                padding: "20px 40px 20px 0",
              }}
            >
              Upcoming Races
            </h2>
          </div>

          {/* Copy — padded away from right; lifted above decorative route */}
          <div style={{ paddingRight: "80px", position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 500, color: "var(--text-default)", marginBottom: "20px", maxWidth: "404px" }}>
              Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition.
            </p>
            <p style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 500, color: "var(--text-default)", marginBottom: "40px", maxWidth: "404px" }}>
              Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition.
            </p>

            {/* Primary button: orange, kit hover skew */}
            <Link
              to="/races"
              className="ae-btn ae-btn-primary"
              style={{
                background: "var(--action-primary-default)",
                color: "var(--action-primary-text)",
                fontSize: "20px",
                fontWeight: 600,
                width: "274.894px",
                height: "68.318px",
                padding: "0 40px",
                borderRadius: "10px",
              }}
            >
              See All Races
            </Link>
          </div>
        </div>

        {/* Right: cards — tops aligned with heading bar, clips second card */}
        <div
          className="flex-1 overflow-hidden flex items-start"
          style={{ paddingLeft: "32px", paddingTop: "8px", marginTop: "-8px", position: "relative", zIndex: 2 }}
        >
          <div className="flex" style={{ gap: "24px" }}>
            {races.map((race, index) => (
              <div
                key={race.name}
                className={`upcoming-races-card-reveal ${isVisible ? "is-visible" : ""}`}
                style={{
                  width: "390px",
                  minWidth: "390px",
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <RaceCard race={race} />
              </div>
            ))}
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="@md:hidden">
        {/* Navy heading — full bleed */}
        <div
          style={{
            background: "var(--surface-dark)",
            padding: "20px 24px",
            marginBottom: "24px",
          }}
        >
          <h2
            className="font-bold italic"
            style={{ fontSize: "36px", lineHeight: "40px", color: "var(--text-inverse)" }}
          >
            Upcoming Races
          </h2>
        </div>

        <div style={{ padding: "0 20px" }}>
          <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)", marginBottom: "16px" }}>
            Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition.
          </p>
          <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)", marginBottom: "28px" }}>
            Placeholder supporting headline copy — one or two sentences describing the runner-facing value proposition.
          </p>
          <Slider>
            {races.map((race) => (
              <RaceCard key={race.name} race={race} />
            ))}
          </Slider>
          <div className="flex justify-center" style={{ marginTop: "32px" }}>
            <Link
              to="/races"
              className="ae-btn ae-btn-primary"
              style={{
                background: "var(--action-primary-default)",
                color: "var(--action-primary-text)",
                fontSize: "18px",
                fontWeight: 600,
                padding: "16px 28px",
                borderRadius: "10px",
              }}
            >
              See All Races
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Built for Race Day ───────────────────────────────────────────────────────

// 4 testimonials grouped as 2 pairs; each pair shows 2 stacked quotes simultaneously
const BUILT_TESTIMONIALS = [
  // Pair 0
  {
    label: "Race Directors say:",
    quote: "Arsenal made our race day seamless from start to finish. We had real-time results posted instantly.",
    attribution: "Jim C., Nonprofit Director",
  },
  {
    label: "Runners say:",
    quote: "Registered, ran, and got my results within minutes. Exactly what a well-run event looks like.",
    attribution: "Taylor B., Runner",
  },
  // Pair 1
  {
    label: "Race Directors say:",
    quote: "We've worked with several timing companies over the years. Arsenal is the only one we keep coming back to.",
    attribution: "Dana R., Race Director",
  },
  {
    label: "Runners say:",
    quote: "The results were up before I even made it back to my car. Super impressive operation.",
    attribution: "Alex P., Runner",
  },
];

const BUILT_STATS = [
  { icon: timerSvg, value: "200+", label: "Timed Races" },
  { icon: medalSvg, value: "50k+", label: "Finishers Tracked" },
  { icon: smileSvg, value: "100%", label: "Race Director Satisfaction" },
];

// Renders a single testimonial's label / quote / attribution
function BuiltTestimonialItem({
  t,
  withBottomGap,
}: {
  t: (typeof BUILT_TESTIMONIALS)[number];
  withBottomGap?: boolean;
}) {
  return (
    <div
      style={{
        marginBottom: withBottomGap ? "32px" : 0,
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      {/* One blockquote mark per testimonial row */}
      <img
        src={blockQuoteSvg}
        alt=""
        aria-hidden="true"
        style={{ width: "80px", flexShrink: 0, marginTop: "4px" }}
      />
      {/* Text column */}
      <div style={{ maxWidth: "360px" }}>
        {/* Quote/Lead — Bold Italic — highlight color */}
        <p
          className="font-bold italic"
          style={{
            fontSize: "22px",
            lineHeight: "28px",
            color: "var(--decorative-highlight)",
            marginBottom: "8px",
          }}
        >
          {t.label}
        </p>
        {/* Quote/Body — Semibold Italic */}
        <p
          style={{
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "18px",
            lineHeight: "26px",
            color: "var(--text-inverse)",
            marginBottom: "10px",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        {/* Quote/Attribution — Book Italic */}
        <p
          style={{
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "15px",
            lineHeight: "22px",
            color: "var(--text-secondary-inverse)",
          }}
        >
          {t.attribution}
        </p>
      </div>
    </div>
  );
}

function BuiltForRaceDay({
  sectionRef,
  trackReveal,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackReveal: number;
}) {
  const NUM_PAIRS = Math.floor(BUILT_TESTIMONIALS.length / 2);
  const [activePair, setActivePair] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActivePair((p) => (p + 1) % NUM_PAIRS),
      4000
    );
    return () => clearInterval(id);
  }, [NUM_PAIRS]);

  return (
    <section ref={sectionRef} style={{ background: "var(--surface-dark)", position: "relative"}}>
      {/* Decorative route — desktop only, behind all section content */}
      {(() => {
        const builtTrackStyles = getBuiltTrackRevealStyles(trackReveal);
        return (
          <>
            <img
              src={trackBottomSvg}
              alt=""
              aria-hidden="true"
              className="hidden min-[1280px]:block mx-[10px] my-[0px]"
              style={{
                position: "absolute",
                top: scalePx(-25),
                left: scalePx(-92),
                width: scalePercent(1200),
                height: scalePercent(115),
                pointerEvents: "none",
                zIndex: 1,
                ...builtTrackStyles.vertical,
              }}
            />
            <img
              src={trackBottomSvg}
              alt=""
              aria-hidden="true"
              className="hidden min-[1280px]:block mx-[10px] my-[0px]"
              style={{
                position: "absolute",
                top: scalePx(-25),
                left: scalePx(-92),
                width: scalePercent(1200),
                height: scalePercent(115),
                pointerEvents: "none",
                zIndex: 1,
                ...builtTrackStyles.horizontal,
              }}
            />
          </>
        );
      })()}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .bfrd-btn {
            transition: transform 0.25s ease, background-color 0.2s ease;
          }
          .bfrd-btn:hover {
            transform: skewX(-8deg);
            background: var(--action-primary-hover) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bfrd-btn { transition: background-color 0.2s ease !important; }
          .bfrd-btn:hover { transform: none !important; }
          .bfrd-slide { transition: none !important; }
        }
      `}</style>

      <div
        className="max-w-[1550px] mx-auto"
        style={{ padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 60px)", position: "relative", zIndex: 2 }}
      >
        {/* ── Centered content block ── */}
        <div style={{ width: "fit-content", margin: "0 auto" }}>

          {/* Intro: heading left, CTA right, aligned to the same width as columns below */}
          <div
            className="flex flex-wrap items-center justify-between"
            style={{ gap: "24px", marginBottom: "32px", width: "100%" }}
          >
            <div style={{ minWidth: 0 }}>
              <h2
                className="font-bold italic"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  lineHeight: 1.05,
                  color: "var(--text-inverse)",
                  marginBottom: "8px",
                }}
              >
                We&apos;re Built for Race Day
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  fontWeight: 500,
                  color: "var(--text-inverse)",
                  maxWidth: "672px",
                }}
              >
                Placeholder about copy — one or two sentences about Arsenal Events, its
                mission, and what differentiates the service for both race directors and runners.
              </p>
            </div>
            <Link
              to="/about"
              className="bfrd-btn inline-flex items-center justify-center shrink-0"
              style={{
                background: "var(--action-primary-default)",
                color: "var(--action-primary-text)",
                fontSize: "18px",
                fontWeight: 600,
                padding: "12px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Meet The Team
            </Link>
          </div>

          {/* Two-column: quotes + stats, stats vertically centered with quotes */}
          <div
            className="flex flex-col @md:flex-row items-center"
            style={{ gap: "64px" }}
          >
          {/* ── Left: testimonial rotator — 2 quotes stacked, pairs crossfade ── */}
          <div style={{ minWidth: 0 }}>
            {/* Stable-height crossfade container — ghost pair holds layout height */}
            <div style={{ position: "relative" }}>
              {/* Ghost: pair 0 always in flow (invisible) to anchor the container height */}
              <div aria-hidden="true" style={{ visibility: "hidden", pointerEvents: "none" }}>
                <BuiltTestimonialItem t={BUILT_TESTIMONIALS[0]} withBottomGap />
                <BuiltTestimonialItem t={BUILT_TESTIMONIALS[1]} />
              </div>

              {/* Rotating pairs — staggered fade per item */}
              {Array.from({ length: NUM_PAIRS }).map((_, pairIdx) => {
                const active = pairIdx === activePair;
                return (
                  <div
                    key={pairIdx}
                    style={{ position: "absolute", top: 0, left: 0, right: 0 }}
                  >
                    <div style={{
                      opacity: active ? 1 : 0,
                      transition: "opacity 0.5s ease 0s",
                    }}>
                      <BuiltTestimonialItem
                        t={BUILT_TESTIMONIALS[pairIdx * 2]}
                        withBottomGap
                      />
                    </div>
                    <div style={{
                      opacity: active ? 1 : 0,
                      transition: "opacity 0.5s ease 0.5s",
                    }}>
                      <BuiltTestimonialItem
                        t={BUILT_TESTIMONIALS[pairIdx * 2 + 1]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: stats ── */}
          <div style={{ flexShrink: 0 }}>
            <div className="flex flex-col" style={{ gap: "32px" }}>
              {BUILT_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center" style={{ gap: "20px" }}>
                  <img
                    src={stat.icon}
                    alt=""
                    aria-hidden="true"
                    style={{ width: "60px", height: "60px", objectFit: "contain", flexShrink: 0 }}
                  />
                  <p
                    className="font-bold italic"
                    style={{ fontSize: "22px", lineHeight: "28px", color: "var(--text-inverse)" }}
                  >
                    {stat.value} {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>{/* end centered wrapper */}
      </div>
    </section>
  );
}

// ─── Resources ────────────────────────────────────────────────────────────────

const RESOURCE_CARDS = [
  {
    image: imgResourceRunner,
    title: "Understanding Your Race Results: A Runner's Guide",
    category: "For Runners" as const,
    to: "/resources/understanding-race-results",
  },
  {
    image: imgResourceDirector,
    title: "How To Choose A Timing Partner For Your First Charity Event",
    category: "For Race Directors" as const,
    to: "/resources/choosing-timing-partner",
  },
  {
    image: imgResourceGear,
    title: "Race Day Prep: What To Bring To The Start Line",
    category: "For Runners" as const,
    to: "/resources/race-day-prep",
  },
];

function ResourceCard({
  card,
  className = "",
  style,
}: {
  card: (typeof RESOURCE_CARDS)[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const isRunners = card.category === "For Runners";
  return (
    <Link
      to={card.to}
      className={`resource-card ${className}`.trim()}
      style={{
        display: "block",
        flex: "1 1 0",
        minWidth: 0,
        textDecoration: "none",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "390 / 374",
        boxShadow: "0px 1px 4px 0px rgba(165,162,169,0.8)",
        ...style,
      }}
    >
      {/* Photo */}
      <img
        src={card.image}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Scrim — top-left readable, fades toward bottom-right */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(14,16,27,0.58) 0%, rgba(14,16,27,0.08) 100%)" }} />
      {/* Triangle — orange for Runners, navy for Race Directors */}
      <div style={{ position: "absolute", inset: 0, background: isRunners ? "var(--action-primary-default)" : "var(--surface-dark)", clipPath: "polygon(64% 100%, 100% 63%, 100% 100%)" }} />

      {/* Title — vertically centered in left portion */}
      <p
        className="font-bold italic"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 24,
          right: "36%",
          color: "var(--text-inverse)",
          fontSize: "clamp(24px, 2.6vw, 34px)",
          lineHeight: 1.22,
          textShadow: "0px 4px 4px rgba(0,0,0,0.25), 0px -4px 4px rgba(0,0,0,0.25)",
        }}
      >
        {card.title}
      </p>

      {/* Category badge — inside the orange triangle */}
      <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
        <img
          src={isRunners ? personRunSvg : raceDirectorIconSvg}
          alt=""
          aria-hidden="true"
          style={{ width: 26, height: 26, objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
        <p
          className="font-bold italic"
          style={{ fontSize: "14px", lineHeight: "17px", color: "var(--text-inverse)", textAlign: "right" }}
        >
          {isRunners ? "For Runners" : <>For Race<br />Directors</>}
        </p>
      </div>
    </Link>
  );
}

function Resources({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section ref={sectionRef} style={{ background: "var(--surface-default)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .resource-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .resource-card:hover { transform: translateY(-4px); box-shadow: 0px 6px 20px rgba(0,0,0,0.13) !important; }
          .res-cta { transition: transform 0.25s ease, background-color 0.2s ease; }
          .res-cta:hover { transform: skewX(-8deg); background: var(--action-primary-hover) !important; }
        }
        .resource-card.reveal-from-bottom {
          opacity: 0;
          transform: translateY(42px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .resource-card.reveal-from-bottom.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .resource-card:focus-visible { outline: 2px solid var(--action-primary-default); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .resource-card, .res-cta { transition: none !important; }
          .resource-card:hover, .res-cta:hover { transform: none !important; }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto" style={{ padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 60px)", position: "relative", zIndex: 2 }}>

        {/* Centered intro */}
        <div className="flex flex-col items-center" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 56px)" }}>
          <h2
            className="font-bold italic"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05, color: "var(--text-headlines)", marginBottom: "16px" }}
          >
            Resources
          </h2>
          <p
            style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, color: "var(--text-default)", maxWidth: "520px", marginBottom: "28px" }}
          >
            Placeholder supporting headline copy with a sentence or two leading into
            the Runner&apos;s Arsenal blog and its benefits.
          </p>
          <Link
            to="/resources"
            className="res-cta inline-flex items-center justify-center"
            style={{ background: "var(--action-primary-default)", color: "var(--action-primary-text)", fontSize: "18px", fontWeight: 600, padding: "12px 28px", borderRadius: "10px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Learn Something New
          </Link>
        </div>

        {/* Three cards — row on desktop, stacked on mobile */}
        <div className="flex flex-col @md:flex-row" style={{ gap: "24px" }}>
          {RESOURCE_CARDS.map((card, index) => (
            <ResourceCard
              key={card.title}
              card={card}
              className={`reveal-from-bottom ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 140}ms` }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Page CTA ─────────────────────────────────────────────────────────────────

function PageCTA({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || confettiFiredRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let cancelled = false;

    const runConfetti = async () => {
      const { default: confetti } = await import("canvas-confetti");
      if (cancelled) return;

      confettiFiredRef.current = true;
      const end = Date.now() + 3 * 1e3;
      const colors = ["#D96220", "#FCF3ED", "#232943", "#006C67", "#B0521F", "#F5D6C4"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
          ticks: 180,
          gravity: 1.05,
          scalar: 0.95,
          zIndex: 15,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
          ticks: 180,
          gravity: 1.05,
          scalar: 0.95,
          zIndex: 15,
        });

        if (Date.now() < end && !cancelled) {
          rafId = window.requestAnimationFrame(frame);
        }
      };

      frame();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !confettiFiredRef.current) {
          void runConfetti();
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -25% 0px",
      },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [sectionRef]);

  return (
    <section ref={sectionRef} style={{ background: "var(--surface-default)", padding: "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 60px)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .cta-btn { transition: transform 0.25s ease, background-color 0.2s ease; }
          .cta-btn:hover { transform: skewX(-8deg); background: var(--action-primary-hover) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-btn { transition: none !important; }
          .cta-btn:hover { transform: none !important; }
        }
      `}</style>
      <div
        style={{
          background: "var(--surface-dark)",
          borderRadius: "10px",
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 72px) clamp(32px, 5vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          className="font-bold italic"
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: "1.08",
            color: "var(--text-inverse)",
            margin: 0,
          }}
        >
          Ready To Work With Us?
        </h2>
        <p
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: 500,
            color: "var(--text-inverse)",
            maxWidth: "560px",
            margin: 0,
          }}
        >
          Placeholder about copy — one or two sentences about Arsenal Events, its mission, and what differentiates the service for both race directors and runners.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "8px" }}>
          <Link
            to="/for-race-directors#form"
            className="cta-btn"
            style={{
              display: "inline-block",
              background: "var(--action-primary-default)",
              color: "var(--text-inverse)",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "28px",
              padding: "14px 32px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Request Timing Services
          </Link>
          <Link
            to="/races"
            className="cta-btn"
            style={{
              display: "inline-block",
              background: "var(--action-primary-default)",
              color: "var(--text-inverse)",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "28px",
              padding: "14px 32px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Find A Race
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const racesRef = useRef<HTMLElement | null>(null);
  const builtRef = useRef<HTMLElement | null>(null);
  const resourcesRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  const trackReveals = useTrackReveal([
    heroRef,
    servicesRef,
    racesRef,
    builtRef,
    resourcesRef,
    ctaRef,
  ], 0.761);
  const trackScale = useTrackScale();

  return (
    <main style={{ ["--track-scale" as any]: trackScale }}>
      <Hero sectionRef={heroRef} trackReveal={trackReveals[0]} />

      <Services sectionRef={servicesRef} trackReveal={trackReveals[1]} />
      <FeaturedRaces sectionRef={racesRef} trackReveal={trackReveals[2]} />

      <BuiltForRaceDay sectionRef={builtRef} trackReveal={trackReveals[3]} />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={trackBottom2Svg}
          alt=""
          aria-hidden="true"
          className="hidden min-[1280px]:block"
          style={{
            position: "absolute",
            top: scalePx(-317),
            left: scalePx(-27),
            width: scalePercent(100),
            height: "auto",
            pointerEvents: "none",
            zIndex: 1,
            ...getTrackRevealStyle("ttb", trackReveals[4]),
          }}
        />
        <Resources sectionRef={resourcesRef} />
        <PageCTA sectionRef={ctaRef} />
      </div>
    </main>
  );
}
