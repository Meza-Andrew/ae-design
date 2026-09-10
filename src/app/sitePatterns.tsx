import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, A11y, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-fade";
import imgHalloweenBg from "@/imports/race_86385_294977_e12aa008-9a13-459f-a326-cf9bb249dadd_1.png";
import imgHalloweenLogo from "@/imports/24_Oct_2026_Halloween_5K_Monster_Mile_1.png";
import imgFrostyBg from "@/imports/race_86385_294977_e12aa008-9a13-459f-a326-cf9bb249dadd_2.png";
import imgFrostyLogo from "@/imports/12_Dec_2026_Frosty_5K_Reindeer_Run_1.png";
import imgResourceRunner from "@/imports/race-results-guide.jpg";
import imgResourceDirector from "@/imports/image_2.png";
import imgResourceGear from "@/imports/image_1.png";
import blockQuoteSvg from "@/imports/block_quote.svg";
import timerSvg from "@/imports/timer.svg";
import medalSvg from "@/imports/medal.svg";
import smileSvg from "@/imports/smile.svg";
import personRunSvg from "@/imports/PersonSimpleRun.svg";
import raceDirectorIconSvg from "@/imports/for_race_directors_icon.svg";
import topographyBg from "@/imports/topography-bg-1.svg";
import whatWeOfferAccent from "@/imports/what-we-offer-accent.svg";

type ButtonVariant = "primary" | "secondary" | "teal";

export const SITE_BODY_COPY_STYLE = {
  fontSize: "clamp(18px, 1.55vw, 24px)",
  lineHeight: "clamp(26px, 2.1vw, 32px)",
  fontWeight: 500,
} as const;


function useRevealOnce<T extends HTMLElement>(threshold = 0.2, rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, visible] as const;
}

export function useLeftAlignWhenCopyExceedsLines<T extends HTMLElement>(
  maxLines = 3,
  maxViewportWidth = 1024,
) {
  const copyRef = useRef<T | null>(null);
  const [shouldLeftAlign, setShouldLeftAlign] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${maxViewportWidth}px)`);
    let rafId = 0;

    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        const node = copyRef.current;
        if (!node || !mediaQuery.matches) {
          setShouldLeftAlign(false);
          return;
        }

        const styles = window.getComputedStyle(node);
        const lineHeight = Number.parseFloat(styles.lineHeight);
        const fontSize = Number.parseFloat(styles.fontSize);
        const resolvedLineHeight = Number.isFinite(lineHeight) ? lineHeight : fontSize * 1.2;
        const renderedLines = Math.round(node.getBoundingClientRect().height / resolvedLineHeight);

        setShouldLeftAlign(renderedLines > maxLines);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    mediaQuery.addEventListener("change", measure);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (copyRef.current) resizeObserver?.observe(copyRef.current);

    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
      mediaQuery.removeEventListener("change", measure);
      resizeObserver?.disconnect();
    };
  }, [maxLines, maxViewportWidth]);

  return [copyRef, shouldLeftAlign] as const;
}

export function AeButton({
  children,
  to,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  const colors =
    variant === "secondary"
      ? {
          background: "var(--action-secondary-default)",
          hover: "var(--action-secondary-hover)",
          color: "var(--action-secondary-text)",
        }
      : variant === "teal"
        ? {
            background: "var(--action-tertiary-default)",
            hover: "#005a56",
            color: "var(--action-tertiary-text)",
          }
        : {
            background: "var(--action-primary-default)",
            hover: "var(--action-primary-hover)",
            color: "var(--action-primary-text)",
          };

  const content = (
    <span
      className={`ae-button inline-flex min-h-[56px] min-w-[188px] items-center justify-center rounded-[10px] px-8 py-3 text-center text-[18px] font-semibold leading-[1.15] transition ${className}`}
      style={{
        background: colors.background,
        color: colors.color,
        ["--ae-button-hover" as string]: colors.hover,
      }}
    >
      {children}
    </span>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button type="button">{content}</button>;
}

export function SectionIntro({
  kicker,
  title,
  copy,
  align = "center",
  children,
}: {
  kicker?: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  const [copyRef, shouldLeftAlign] = useLeftAlignWhenCopyExceedsLines<HTMLParagraphElement>();
  const resolvedAlign = shouldLeftAlign ? "left" : align;

  return (
    <div
      className="mx-auto mb-10 max-w-[890px]"
      style={{ textAlign: resolvedAlign }}
    >
      {kicker && (
        <p className="mb-3 text-[20px] font-semibold italic" style={{ color: "var(--text-accent)" }}>
          {kicker}
        </p>
      )}
      <h2
        className="mb-4 text-[clamp(36px,4.1vw,52px)] font-bold italic leading-none"
        style={{ color: "var(--text-headlines)" }}
      >
        {title}
      </h2>
      {copy && (
        <p
          ref={copyRef}
          className="mx-auto max-w-[760px]"
          style={{
            ...SITE_BODY_COPY_STYLE,
            color: "var(--text-default)",
            marginLeft: resolvedAlign === "left" ? 0 : "auto",
            marginRight: resolvedAlign === "left" ? 0 : "auto",
          }}
        >
          {copy}
        </p>
      )}
      {children && <div className="mt-8 flex flex-wrap justify-center gap-5">{children}</div>}
    </div>
  );
}

export function PageBand({
  children,
  tone = "default",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "default" | "subtle" | "dark";
  className?: string;
}) {
  const background =
    tone === "dark"
      ? "var(--surface-dark)"
      : tone === "subtle"
        ? "var(--surface-subtle)"
        : "var(--surface-default)";

  return (
    <section className={`homepage-built-mobile-padding px-5 py-16 @sm:px-10 @sm:py-24 ${className}`} style={{ background }}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export const SHARED_RACES = [
  {
    title: "Halloween 5k & Monster Mile",
    date: "October 30, 2026",
    location: "Stafford, VA",
    background: imgHalloweenBg,
    logo: imgHalloweenLogo,
  },
  {
    title: "Frosty 5k & Reindeer Run",
    date: "December 30, 2026",
    location: "Fredericksburg, VA",
    background: imgFrostyBg,
    logo: imgFrostyLogo,
  },
  {
    title: "Frosty 5k & Reindeer Run",
    date: "December 30, 2026",
    location: "Fredericksburg, VA",
    background: imgFrostyBg,
    logo: imgFrostyLogo,
  },
];

function ArsenalEventBadge() {
  return (
    <div className="absolute left-0 top-0 z-10 h-10 w-[270px]" style={{ fontFamily: "Cooper Hewitt, Arial, sans-serif" }}>
      <svg width="270" height="40" viewBox="0 0 270 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AN ARSENAL EVENTS RACE">
        <path d="M0 4C0 1.79086 1.79086 0 4 0H270L249.236 19.5477L270 39.0955H0V10Z" fill="#035A58" />
        <path d="M22.8285 17.0689V19.6236C23.8076 19.845 24.678 20.2088 25.5896 20.4602V17.9017C24.6142 17.6841 23.7364 17.3202 22.8285 17.0689ZM31.2055 12.4546C29.9187 13.0511 28.3356 13.6513 26.8163 13.6513C24.8093 13.6513 23.1474 12.3458 20.6189 12.3458C19.6811 12.3458 18.8445 12.5109 18.0679 12.796C18.173 12.5221 18.2217 12.2258 18.203 11.9107C18.1355 10.8452 17.2614 9.98991 16.1922 9.94489C14.9918 9.89613 14.0051 10.8565 14.0051 12.0457C14.0051 12.7585 14.3615 13.3887 14.9055 13.7676V28.2519C14.9055 28.7509 15.3069 29.1523 15.8058 29.1523H16.4061C16.905 29.1523 17.3064 28.7509 17.3064 28.2519V24.7106C18.3681 24.2566 19.6923 23.8815 21.598 23.8815C23.6088 23.8815 25.267 25.187 27.7954 25.187C29.6035 25.187 31.0479 24.5755 32.391 23.6527C32.7173 23.4276 32.9086 23.0599 32.9086 22.6623V13.5425C32.9124 12.6684 32.0008 12.087 31.2055 12.4546ZM20.0675 22.1558C19.0997 22.2571 18.1917 22.4635 17.3064 22.7786V20.1338C18.2893 19.7849 19.0883 19.5711 20.0675 19.4811V22.1558ZM31.1117 17.1101C30.2264 17.4778 29.3748 17.8417 28.3506 18.0067V20.674C29.281 20.5465 30.2789 20.2314 31.1117 19.6986V22.3434C30.1701 22.9474 29.2923 23.27 28.3506 23.3601V20.674C27.3378 20.8128 26.5537 20.7303 25.5896 20.4639V22.9924C24.693 22.7148 23.8152 22.3659 22.8285 22.1934V19.6236C22.0895 19.4586 21.2979 19.3685 20.0675 19.4811V16.8551C19.2271 16.9713 18.3943 17.2377 17.3064 17.6391V14.9943C18.5519 14.5367 19.1859 14.2516 20.0675 14.169V16.8551C21.0803 16.7162 21.8836 16.8062 22.8285 17.0689V14.5404C23.7176 14.818 24.5992 15.1669 25.5896 15.3395V17.9055C26.4787 18.1043 27.3753 18.1643 28.3506 18.0067V15.3095C29.3635 15.1294 30.3127 14.7993 31.1117 14.4654V17.1101Z" fill="#FCF3ED" />
        <text x="47" y="24.5" fill="#FCF3ED" fontFamily="Cooper Hewitt, Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.4" fontStyle="italic">AN ARSENAL EVENTS RACE</text>
      </svg>
    </div>
  );
}

export function RaceCard({ race }: { race: (typeof SHARED_RACES)[number] }) {
  return (
    <article className="race-card overflow-hidden rounded-[4px] bg-white shadow-[0_4px_14px_rgba(35,41,67,0.18)]">
      <div className="relative flex aspect-[1.45/1] items-center justify-center overflow-hidden">
        <ArsenalEventBadge />
        <img src={race.background} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <img src={race.logo} alt={race.title} className="relative z-10 max-h-[70%] max-w-[78%] object-contain" />
      </div>
      <div className="px-5 pb-6 pt-5 text-center">
        <p className="mb-2 text-[13px] font-medium" style={{ color: "rgba(35,41,67,0.58)" }}>
          {race.date} | {race.location}
        </p>
        <h3 className="mx-auto mb-5 max-w-[260px] text-[20px] font-bold italic leading-[1.05]" style={{ color: "var(--text-accent)" }}>
          {race.title}
        </h3>
        <AeButton to="/races-results" variant="secondary" className="min-h-[38px] min-w-[172px] px-6 py-2 text-[15px]">
          Register
        </AeButton>
      </div>
    </article>
  );
}

export const RESOURCE_CARDS = [
  {
    title: "Understanding Your Race Results: A Runner's Guide",
    category: "For Runners" as const,
    image: imgResourceRunner,
    icon: personRunSvg,
    to: "/resources/understanding-your-race-results",
  },
  {
    title: "How To Choose A Timing Partner For Your First Charity Event",
    category: "For Race Directors" as const,
    image: imgResourceDirector,
    icon: raceDirectorIconSvg,
    to: "/resources",
  },
  {
    title: "Race Day Prep: What To Bring To The Start Line",
    category: "For Runners" as const,
    image: imgResourceGear,
    icon: personRunSvg,
    to: "/resources",
  },
];
type ResourceAudience = "For Runners" | "For Race Directors";
type ResourceCardData = (typeof RESOURCE_CARDS)[number];

function getAudienceResourceCards(audience?: ResourceAudience) {
  const filtered = audience ? RESOURCE_CARDS.filter((card) => card.category === audience) : RESOURCE_CARDS;
  if (filtered.length === 0) return RESOURCE_CARDS;

  return Array.from({ length: Math.max(3, filtered.length) }, (_, index) => filtered[index % filtered.length]);
}
export function ResourceCard({
  card,
  className = "",
  style,
}: {
  card: ResourceCardData;
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
        boxShadow: "0px 1px 4px 0px rgba(165,162,169,1)",
        ...style,
      }}
    >
      <img
        src={card.image}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(14,16,27,0.58) 0%, rgba(14,16,27,0.08) 100%)" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isRunners ? "var(--action-primary-default)" : "var(--surface-dark)",
          clipPath: "polygon(64% 100%, 100% 63%, 100% 100%)",
        }}
      />

      <p
        className="resource-card-title font-bold italic"
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

export function ResourceCardGallery({
  cards = RESOURCE_CARDS,
  visible = true,
}: {
  cards?: ResourceCardData[];
  visible?: boolean;
}) {
  const [activeResourceIndex, setActiveResourceIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const prevResource = () => swiperRef.current?.slidePrev();
  const nextResource = () => swiperRef.current?.slideNext();
  const goToResource = (index: number) => swiperRef.current?.slideToLoop(index);

  return (
    <>
      <div className="resources-card-row">
        {cards.map((card, index) => (
          <div
            key={`${card.title}-${index}`}
            className={`resource-card-shell reveal-from-bottom ${visible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${index * 140}ms` }}
          >
            <ResourceCard card={card} />
          </div>
        ))}
      </div>

      <div className="resources-card-carousel">
        <div className="resources-carousel-card">
          <Swiper
            modules={[Keyboard, A11y]}
            loop={cards.length > 1}
            slidesPerView={1}
            spaceBetween={16}
            speed={300}
            threshold={35}
            grabCursor
            allowTouchMove
            autoHeight
            keyboard={{ enabled: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveResourceIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveResourceIndex(swiper.realIndex)}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={`${card.title}-${index}`}>
                <div className={`resource-card-shell reveal-from-bottom ${visible ? "is-visible" : ""}`}>
                  <ResourceCard card={card} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {cards.length > 1 && (
          <div className="resources-carousel-controls">
            <button
              onClick={prevResource}
              aria-label="Previous resource"
              className="bg-card border border-border p-1.5 hover:bg-accent transition-colors disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="resources-carousel-dots">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToResource(index)}
                  aria-label={`Go to resource ${index + 1}`}
                  className={`transition-all duration-200 ${
                    index === activeResourceIndex ? "w-5 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextResource}
              aria-label="Next resource"
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
export function ResourceSection({
  title = "Resources",
  copy = "Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits.",
  ctaLabel = "Learn Something New",
  showTabs = false,
  audience,
}: {
  title?: string;
  copy?: string;
  ctaLabel?: string;
  showTabs?: boolean;
  audience?: ResourceAudience;
}) {
  const [sectionRef, visible] = useRevealOnce<HTMLElement>(0.18);
  const cards = getAudienceResourceCards(audience);

  return (
    <PageBand className="resource-section-band relative overflow-hidden">
      <section ref={sectionRef}>
        <SectionIntro title={title} copy={copy}>
          {showTabs ? (
            <>
              <AeButton to="/resources" className="min-h-[54px] min-w-[230px]">For Race Directors</AeButton>
              <AeButton to="/resources" className="min-h-[54px] min-w-[230px]">For Runners</AeButton>
            </>
          ) : (
            <AeButton to="/resources" className="min-h-[50px] min-w-[214px] text-[16px]">{ctaLabel}</AeButton>
          )}
        </SectionIntro>
        <ResourceCardGallery cards={cards} visible={visible} />
      </section>
    </PageBand>
  );
}
export const BASE_STATS = [
  { label: "200+ Timed Races", icon: timerSvg },
  { label: "50k+ Finishers Tracked", icon: medalSvg },
  { label: "100% Race Director Satisfaction", icon: smileSvg },
];

export const RACE_DIRECTOR_STATS = [
  { label: "200+ Timed Races", icon: timerSvg },
  { label: "50k+ Finishers Tracked", icon: medalSvg },
  { label: "[#] Years of Combined Experience", icon: smileSvg },
];

export type StatsQuote = {
  audience: string;
  quote: string;
  attribution: string;
};

export const RACE_DIRECTOR_STATS_QUOTES: StatsQuote[] = [
  {
    audience: "Race Directors say:",
    quote: "We use Arsenal Events for every single race! Kristen, Ken and their crew are kind, helpful, and ready to roll. Once you partner with them, consider the job done.",
    attribution: "Angela W.",
  },
  {
    audience: "Race Directors say:",
    quote: "Kristen and her team were wonderful partners. They were responsive, set up on time, timed our race accurately, and gave participants live results they really enjoyed.",
    attribution: "Prince Georges Running Club",
  },
  {
    audience: "Race Directors say:",
    quote: "Arsenal was great to work with. Responsive, helpful, friendly, and professional. Their race setup was fast, well laid out, and a great value.",
    attribution: "Brian L.",
  },
  {
    audience: "Race Directors say:",
    quote: "From start to a fantastic finish, Arsenal Events provided a quality fun run experience. Their support, flexibility, and communication made sure we were ready to go.",
    attribution: "SpotsyParks",
  },
  {
    audience: "Race Directors say:",
    quote: "We had a wonderful experience working with Arsenal Events. Communication was excellent, setup was easy, and the race day team was professional, timely, and efficient.",
    attribution: "Leah S.",
  },
];

export const RUNNER_STATS_QUOTES: StatsQuote[] = [
  {
    audience: "Runners say:",
    quote: "Everyone was really friendly and helpful. People went out of their way for you. It speaks to the camaraderie of running.",
    attribution: "Kristen H.",
  },
  {
    audience: "Runners say:",
    quote: "This was my first 50K and an awesome experience. Organization, staff, aid stations, and road crews were professional and friendly.",
    attribution: "Cory S.",
  },
  {
    audience: "Runners say:",
    quote: "From seamless organization to breathtaking scenery, every aspect was top-notch. Participating in the DHRT50K Ultra was an absolute delight.",
    attribution: "Rodrigo C.",
  },
  {
    audience: "Runners say:",
    quote: "It was the perfect first 50K. I loved the atmosphere, the friendly people, and the volunteers who supported us.",
    attribution: "Robert R.",
  },
  {
    audience: "Runners say:",
    quote: "Volunteers were lovely and kind, the aid stations were great, everything was well-organized, and the course was beautiful.",
    attribution: "Elizabeth B.",
  },
  {
    audience: "Runners say:",
    quote: "A great first-time trail ultra. The flat, well-marked course, well-spaced aid stations, and volunteers all went above and beyond.",
    attribution: "Deanna S.",
  },
  {
    audience: "Runners say:",
    quote: "A great race to kick off Spring. Fun for all ages, whether competing against other runners or yourself. Highly recommended.",
    attribution: "Jose R.",
  },
  {
    audience: "Runners say:",
    quote: "It was well organized, and the shirts and medals were awesome. I'm not fast, and I still felt supported and cheered on.",
    attribution: "Linda R.",
  },
  {
    audience: "Runners say:",
    quote: "One of my favorites. Great course, nice medals, nice shirts, fun stadium finish, easy parking, and a great job all around.",
    attribution: "Joyce W.",
  },
  {
    audience: "Runners say:",
    quote: "I've run this race several times. It's a friendly small-town event, simpler and more fun than the mega-races. Always a great time.",
    attribution: "Kevin B.",
  },
  {
    audience: "Runners say:",
    quote: "Thank you for a wonderful event. It was well supported, everyone was helpful and pleasant, and the trail was beautiful.",
    attribution: "Mary H.",
  },
];

export function StatsBand({
  title = "We're Built for Race Day",
  copy = "Placeholder about copy - one or two sentences about Arsenal Events, its mission, and what differentiates the service for both race directors and runners.",
  quoteAudience = "Race Directors say:",
  quote = "Arsenal made our race day seamless from start to finish. We had real-time results posted instantly.",
  quoteAttribution = "Jim C., Nonprofit Director",
  quotes,
  stats = BASE_STATS,
  ctaLabel = "See Our Race Day Tech",
  ctaTo = "/race-director-services",
  stackBelow950 = false,
  showLeftTrackAccent = false,
  trackAccentSpeed = 1,
}: {  title?: string;
  copy?: string;
  quoteAudience?: string;
  quote?: string;
  quoteAttribution?: string;
  quotes?: StatsQuote[];
  stats?: typeof BASE_STATS;
  ctaLabel?: string;
  ctaTo?: string;
  stackBelow950?: boolean;
  showLeftTrackAccent?: boolean;
  trackAccentSpeed?: number;
}) {
  const [sectionRef, visible] = useRevealOnce<HTMLElement>(0.05, "0px 0px -2% 0px");
  const [trackAccentReveal, setTrackAccentReveal] = useState(0);
  const quoteItems = quotes && quotes.length > 0 ? quotes : [{ audience: quoteAudience, quote, attribution: quoteAttribution }];
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const quoteSwipeStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const quoteSwipeMovedRef = useRef(false);
  const quoteTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const quoteLastGestureAtRef = useRef(0);
  const [activeQuoteMeasureRef, shouldLeftAlignActiveQuote] =
    useLeftAlignWhenCopyExceedsLines<HTMLParagraphElement>(2, 659);

  useEffect(() => {
    if (!visible || quoteItems.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActiveQuoteIndex((index) => (index + 1) % quoteItems.length);
    }, 4800);

    return () => window.clearInterval(id);
  }, [quoteItems.length, visible]);
  useEffect(() => {
    if (!showLeftTrackAccent || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTrackAccentReveal(1);
      return;
    }

    let rafId = 0;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      const node = sectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = Math.max(1, (viewportHeight * 0.52) / trackAccentSpeed);
      const progress = clamp01((viewportHeight * 0.78 - rect.top) / travel);

      setTrackAccentReveal((previous) => (
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
  }, [sectionRef, showLeftTrackAccent, trackAccentSpeed]);

  useEffect(() => {
    setActiveQuoteIndex(0);
  }, [quoteItems.length]);
  const progressQuote = (direction = 1) => {
    if (quoteItems.length < 2) return;
    setActiveQuoteIndex((index) => (index + direction + quoteItems.length) % quoteItems.length);
  };

  const progressQuoteFromGesture = (deltaX: number, deltaY: number) => {
    if (Math.abs(deltaX) < 28 || Math.abs(deltaX) < Math.abs(deltaY) * 1.05) return;

    const now = window.performance.now();
    if (now - quoteLastGestureAtRef.current < 220) return;

    quoteLastGestureAtRef.current = now;
    quoteSwipeMovedRef.current = true;
    progressQuote(deltaX < 0 ? 1 : -1);
  };

  const finishQuoteSwipe = (clientX: number, clientY: number, pointerId: number) => {
    const start = quoteSwipeStartRef.current;
    quoteSwipeStartRef.current = null;
    if (!start || start.pointerId !== pointerId) return;

    progressQuoteFromGesture(clientX - start.x, clientY - start.y);
  };

  const handleQuotePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (quoteItems.length < 2) return;
    quoteSwipeStartRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    quoteSwipeMovedRef.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleQuotePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = quoteSwipeStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      quoteSwipeMovedRef.current = true;
    }
  };

  const handleQuotePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishQuoteSwipe(event.clientX, event.clientY, event.pointerId);
  };

  const handleQuotePointerCancel = () => {
    quoteSwipeStartRef.current = null;
  };

  const handleQuoteTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (quoteItems.length < 2 || event.touches.length === 0) return;
    const touch = event.touches[0];
    quoteTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
    quoteSwipeMovedRef.current = false;
  };

  const handleQuoteTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = quoteTouchStartRef.current;
    quoteTouchStartRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;

    progressQuoteFromGesture(touch.clientX - start.x, touch.clientY - start.y);
  };

  const handleQuoteClick = () => {
    if (quoteSwipeMovedRef.current) {
      quoteSwipeMovedRef.current = false;
      return;
    }
    progressQuote(1);
  };

  const handleQuoteKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      progressQuote(-1);
    }
    if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      progressQuote(1);
    }
  };

  const leftTrackAccentClip = `inset(0 0 0 ${((1 - trackAccentReveal) * 100).toFixed(3)}%)`;

  return (
    <section ref={sectionRef} className={`stats-band ${showLeftTrackAccent ? "stats-band-left-track" : ""} ${stackBelow950 ? "stats-band-stack-950" : ""} homepage-built-mobile-padding relative overflow-hidden px-5 py-16 @sm:px-10 @sm:py-24`} style={{ background: "var(--surface-dark)", color: "var(--text-inverse)" }}>
      {showLeftTrackAccent ? (
        <>
          <style>{`
            .stats-band-left-track-accent {
              position: absolute;
              top: clamp(96.5px, 7.876vw, 147.8px);
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
              .stats-band-left-track-accent {
                -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
                mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
              }
            }
            @media (max-width: 1160px) {
              .stats-band-left-track-accent {
                display: none;
              }
            }
          `}</style>
          <img
            src={whatWeOfferAccent}
            alt=""
            className="stats-band-left-track-accent"
            style={{ clipPath: leftTrackAccentClip, WebkitClipPath: leftTrackAccentClip }}
          />
        </>
      ) : null}
      <div className="relative z-10 mx-auto max-w-[1245px]">
        <div className="stats-band-header mb-14 grid gap-8 @lg:grid-cols-[1fr_auto] @lg:items-start">
          <div>
            <h2 className="mb-4 text-[clamp(34px,3.8vw,52px)] font-bold italic leading-none">{title}</h2>
            <p className="max-w-[760px]" style={SITE_BODY_COPY_STYLE}>{copy}</p>
          </div>
          <AeButton to={ctaTo} className="min-h-[54px] min-w-[218px] text-[16px]">{ctaLabel}</AeButton>
        </div>
        <div className="stats-band-content grid gap-10 @lg:grid-cols-[1.1fr_0.9fr] @lg:items-center">
          <div
            className={`stats-quote-column ${shouldLeftAlignActiveQuote ? "is-left-aligned" : ""} grid items-start`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
              transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              touchAction: "pan-y",
              userSelect: "none",
              cursor: quoteItems.length > 1 ? "grab" : undefined,
            }}
            onPointerDown={handleQuotePointerDown}
            onPointerMove={handleQuotePointerMove}
            onPointerUp={handleQuotePointerUp}
            onPointerCancel={handleQuotePointerCancel}
            onTouchStart={handleQuoteTouchStart}
            onTouchEnd={handleQuoteTouchEnd}
            onDragStart={(event) => event.preventDefault()}
          >
            <img src={blockQuoteSvg} alt="" className="stats-quote-mark opacity-95" />
            <div
              className="stats-quote-rotator relative"
              role={quoteItems.length > 1 ? "button" : undefined}
              tabIndex={quoteItems.length > 1 ? 0 : undefined}
              aria-label={quoteItems.length > 1 ? "Advance quote" : undefined}
              onClick={handleQuoteClick}
              onKeyDown={handleQuoteKeyDown}
            >
              <blockquote aria-hidden="true" className="stats-quote-ghost">
                <p className="mb-2 text-[22px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>{quoteItems[activeQuoteIndex]?.audience}</p>
                <p ref={activeQuoteMeasureRef} className="stats-quote-text max-w-[420px] text-[18px] font-bold italic leading-snug">&ldquo;{quoteItems[activeQuoteIndex]?.quote}&rdquo;</p>
                <cite
                  className="mt-2 block not-italic"
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: "22px",
                    color: "var(--text-secondary-inverse)",
                  }}
                >
                  {quoteItems[activeQuoteIndex]?.attribution}
                </cite>
              </blockquote>
              {quoteItems.map((item, index) => {
                const active = visible && index === activeQuoteIndex;
                return (
                  <blockquote
                    key={`${item.attribution}-${index}`}
                    className="absolute left-0 right-0 top-0"
                    aria-hidden={!active}
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                      transition: active
                        ? "opacity 0.7s ease 180ms, transform 0.9s cubic-bezier(0.18, 0.9, 0.24, 1.28) 180ms"
                        : "opacity 0.45s ease, transform 0.5s ease",
                    }}
                  >
                    <p className="mb-2 text-[22px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>{item.audience}</p>
                    <p className="stats-quote-text max-w-[420px] text-[18px] font-bold italic leading-snug">&ldquo;{item.quote}&rdquo;</p>
                    <cite
                      className="mt-2 block not-italic"
                      style={{
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "15px",
                        lineHeight: "22px",
                        color: "var(--text-secondary-inverse)",
                      }}
                    >
                      {item.attribution}
                    </cite>
                  </blockquote>
                );
              })}
            </div>
          </div>
          <div className="stats-list grid gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-5">
                <img src={stat.icon} alt="" className="h-14 w-14 object-contain" />
                <p className="text-[20px] font-bold italic">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageCTA({
  title = "Ready To Work With Us?",
  copy = "Placeholder about copy - one or two sentences about Arsenal Events, its mission, and what differentiates the service for both race directors and runners.",
  primaryLabel = "Request Timing Services",
  secondaryLabel = "Find A Race",
  primaryTo = "/race-director-services",
  secondaryTo = "/races-results",
  accentRevealSpeed = 1,
}: {
  title?: string;
  copy?: string;
  primaryLabel?: string;
  secondaryLabel?: string | null;
  primaryTo?: string;
  secondaryTo?: string;
}) {
  const [accentReveal, setAccentReveal] = useState(0);
  const ctaAccentRef = useRef<HTMLDivElement | null>(null);
  const [ctaCopyRef, ctaLeftAlign] = useLeftAlignWhenCopyExceedsLines<HTMLParagraphElement>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAccentReveal(1);
      return;
    }

    let rafId = 0;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      const node = ctaAccentRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = Math.max(1, (viewportHeight * 0.5184) / accentRevealSpeed);
      const progress = clamp01((viewportHeight * 0.84 - rect.top) / travel);

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
  }, [accentRevealSpeed]);

  const accentRevealClip = `inset(0 0 0 ${((1 - accentReveal) * 100).toFixed(3)}%)`;

  return (
    <PageBand className="relative overflow-visible">
      <style>{`
        .page-cta-accent {
          position: absolute;
          top: calc(clamp(56px, 4vw, 64px) + clamp(17px, 2vw, 26px));
          right: -310px;
          width: min(33.12vw, 446.4px);
          max-width: none;
          pointer-events: none;
          z-index: 20;
          transform: translateY(-75%);
          will-change: clip-path;
        }
        @media (min-width: 1550px) {
          .page-cta-accent {
            -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
            mask-image: linear-gradient(90deg, #000 0%, #000 78%, transparent 100%);
          }
        }
        @media (max-width: 1160px) {
          .page-cta-accent {
            display: none;
          }
        }
        .page-cta-buttons {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 16px;
          margin-top: 8px;
          width: min(680px, 100%);
        }
        .page-cta-button {
          width: min(272px, 100%);
          min-width: 0;
          min-height: 68px;
          padding: 12px 40px;
          white-space: normal;
        }
        @media (max-width: 767px) {
          .page-cta-button {
            width: min(236px, 100%) !important;
            min-height: 54px !important;
            padding: 12px 24px !important;
            font-size: 16px !important;
            line-height: 1.12 !important;
          }
        }
        @media (min-width: 670px) {
          .page-cta-buttons {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
          }
          .page-cta-button {
            width: 272px;
          }
        }
      `}</style>
      <div ref={ctaAccentRef} className="relative mx-auto max-w-[1040px]">
        <img
          src={whatWeOfferAccent}
          alt=""
          className="page-cta-accent"
          style={{ clipPath: accentRevealClip, WebkitClipPath: accentRevealClip }}
        />
        <div
          className="relative z-10"
          style={{
            background: "var(--surface-dark)",
            color: "var(--text-inverse)",
            borderRadius: "10px",
            width: "100%",
            padding: "clamp(58px, 5.7vw, 78px) clamp(48px, 6vw, 96px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            textAlign: ctaLeftAlign ? "left" : "center",
          }}
        >
          <h2
            className="font-bold italic"
            style={{
              fontSize: "clamp(34px, 4.35vw, 56px)",
              lineHeight: "1.08",
              width: "min(680px, 100%)",
              margin: 0,
              alignSelf: ctaLeftAlign ? "stretch" : undefined,
            }}
          >
            {title}
          </h2>
          <p
            ref={ctaCopyRef}
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: 500,
              width: "min(680px, 100%)",
              maxWidth: "680px",
              margin: 0,
              alignSelf: ctaLeftAlign ? "stretch" : undefined,
            }}
          >
            {copy}
          </p>
          <div className="page-cta-buttons">
            <AeButton to={primaryTo} className="page-cta-button">{primaryLabel}</AeButton>
            {secondaryLabel ? <AeButton to={secondaryTo} className="page-cta-button">{secondaryLabel}</AeButton> : null}
          </div>
        </div>
      </div>
    </PageBand>
  );
}

export function FormWithFAQ({
  title = "Request Timing Services",
  copy = "Planning a race? We'd love to help. Tell us a little about your race and we'll recommend the services that make the most sense for your goals.",
  mode = "timing",
}: {
  title?: string;
  copy?: string;
  mode?: "timing" | "contact";
}) {
  const faqs = [
    {
      q: "What information do you need to provide a quote?",
      a: "We'll typically need your race date, estimated number of participants, location, race distances, and which services you're interested in. If you don't have everything figured out yet, that's okay - we can help you work through the details.",
    },
    {
      q: "How far in advance should I contact Arsenal Events?",
      a: "The earlier, the better. Race dates, equipment, staffing and other resources can fill up quickly, especially during peak race season. Contact us as soon as you begin planning your event and we'll help determine what's needed.",
    },
    {
      q: "Can you handle more than just race timing?",
      a: "Absolutely. We offer registration, timing and results, race directing and consulting, course management, and packet pickup. Services can be combined or customized based on what your event needs.",
    },
    {
      q: "Can you help if I'm putting on a race for the first time?",
      a: "Yes. Our team includes RRCA-certified race directors, and we put on eight of our own events each year. We can help with everything from course planning and permitting to volunteers, logistics and race-day operations.",
    },
    {
      q: "Do you provide live results?",
      a: "Yes. Our timing systems are designed to provide results in real time, with options including online results, text and email updates, and customized results displays at the event.",
    },
    {
      q: "Can you work with our existing RunSignup registration?",
      a: "Yes. We work extensively with RunSignup and can integrate our services with your existing registration setup.",
    },
    {
      q: "What if I already have some of these services covered?",
      a: "That's no problem. We can provide individual services or build a customized package around what you already have in place.",
    },
    {
      q: "Still have questions?",
      a: "That's exactly what we're here for. Tell us about your race, and let's talk about how we can help!",
    },
  ];

  const timingServiceOptions = [
    "Race Registration",
    "Chip Timing",
    "Live Results",
    "Race Management",
    "Packet Pickup",
    "Course Setup",
    "Race Director Consulting",
    "Not Sure Yet",
  ];
  const contactTopicOptions = [
    "Race Timing Services",
    "An Upcoming Race",
    "Results",
    "Registration",
    "Sponsorship",
    "General Questions",
    "Other",
  ];
  const isContactMode = mode === "contact";
  const serviceOptions = isContactMode ? contactTopicOptions : timingServiceOptions;

  const raceTypes = ["5k", "10k", "Half Marathon", "Marathon", "Trail", "Triathlon", "Fun Run", "Other"];

  const [activeFaq, setActiveFaq] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [servicesOpen, setServicesOpen] = useState(false);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const formPanelRef = useRef<HTMLFormElement | null>(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
    phone: "",
    services: [] as string[],
    eventDate: "",
    location: "",
    participants: "",
    raceType: "",
    comments: "",
  });

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setSubmitStatus("idle");
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const updateService = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    setSubmitStatus("idle");
    setFormValues((current) => ({
      ...current,
      services: checked
        ? [...current.services, value]
        : current.services.filter((service) => service !== value),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("sending");
    window.setTimeout(() => {
      setSubmitStatus("sent");
    }, 700);
  };

  useEffect(() => {
    if (submitStatus !== "sent") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let cancelled = false;

    const runConfetti = async () => {
      const { default: confetti } = await import("canvas-confetti");
      if (cancelled) return;

      const target = formPanelRef.current ?? formSectionRef.current;
      const rect = target?.getBoundingClientRect();
      const viewportWidth = Math.max(1, window.innerWidth);
      const viewportHeight = Math.max(1, window.innerHeight);
      const originY = rect ? Math.min(0.95, Math.max(0.12, rect.bottom / viewportHeight)) : 0.86;
      const leftOriginX = rect ? Math.min(0.92, Math.max(0.08, rect.left / viewportWidth)) : 0.22;
      const rightOriginX = rect ? Math.min(0.92, Math.max(0.08, rect.right / viewportWidth)) : 0.78;
      const end = Date.now() + 500;
      const colors = ["#D96220", "#FCF3ED", "#232943", "#006C67", "#B0521F", "#F5D6C4"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 55,
          spread: 58,
          origin: { x: leftOriginX, y: originY },
          colors,
          ticks: 155,
          gravity: 1.05,
          scalar: 0.86,
          zIndex: 30,
        });
        confetti({
          particleCount: 4,
          angle: 125,
          spread: 58,
          origin: { x: rightOriginX, y: originY },
          colors,
          ticks: 155,
          gravity: 1.05,
          scalar: 0.86,
          zIndex: 30,
        });

        if (!cancelled && Date.now() < end) {
          rafId = window.requestAnimationFrame(frame);
        }
      };

      frame();
    };

    void runConfetti();

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [submitStatus]);

  const placeholderColor = "rgba(35,41,67,0.32)";
  const fieldClass = "min-h-[52px] rounded-[6px] border-0 bg-white px-5 text-[17px] font-normal text-[var(--text-default)] outline-none placeholder:text-[rgba(35,41,67,0.32)] focus:ring-2 focus:ring-[var(--decorative-highlight)]";
  const sectionLabelClass = "mb-4 block text-[19px] font-bold italic text-white";
  const submitLabel = isContactMode
    ? submitStatus === "sending"
      ? "Sending your message..."
      : submitStatus === "sent"
        ? "Message sent!"
        : "Send Message"
    : submitStatus === "sending"
      ? "Sending your request…"
      : submitStatus === "sent"
        ? "Request sent!"
        : "Request timing services";
  const selectedServicesLabel = formValues.services.length > 0 ? formValues.services.join(", ") : isContactMode ? "I'm contacting you about" : "Services Needed";

  return (
    <section ref={formSectionRef} className="homepage-built-mobile-padding relative overflow-visible px-5 pb-12 pt-16 @sm:px-10 @sm:pb-[72px] @sm:pt-24" style={{ background: "var(--surface-default)" }}>
      <style>{`
        .form-section-topography {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 76%, rgba(0,0,0,0.18) 91%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 0%, #000 76%, rgba(0,0,0,0.18) 91%, transparent 100%);
        }
        @media (min-width: 1921px) {
          .form-section-topography {
            inset: 0 auto 0 50%;
            width: 1920px;
            max-width: 1920px;
            transform: translateX(-50%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, #000 0%, #000 76%, rgba(0,0,0,0.18) 91%, transparent 100%);
            mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(180deg, #000 0%, #000 76%, rgba(0,0,0,0.18) 91%, transparent 100%);
            -webkit-mask-composite: source-in;
            mask-composite: intersect;
          }
        }
        .form-faq-layout {
          display: grid;
          gap: 56px;
          max-width: 820px;
          margin: 0 auto;
        }
        @media (min-width: 1280px) {
          .form-faq-layout {
            max-width: 1260px;
            grid-template-columns: 0.95fr 0.9fr;
            align-items: start;
          }
          .form-faq-sticky {
            position: sticky;
            top: 112px;
            align-self: start;
          }
        }
        .form-faq-button svg {
          transition: transform 0.2s ease;
        }
        .form-faq-button[aria-expanded="true"] svg {
          transform: rotate(90deg);
        }
      `}</style>
      <img src={topographyBg} alt="" className="form-section-topography" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <SectionIntro title={title} copy={copy} />
        <div className="form-faq-layout">
          <form
            ref={formPanelRef}
            className="rounded-[4px] p-8 shadow-[0_8px_22px_rgba(35,41,67,0.14)] @sm:p-12"
            style={{ background: "var(--action-primary-default)" }}
            onSubmit={handleSubmit}
          >
            <fieldset className="grid gap-6 min-[601px]:grid-cols-2">
              <legend className={sectionLabelClass}>Contact Info</legend>
              <input name="firstName" autoComplete="given-name" value={formValues.firstName} onChange={updateField} aria-label="First Name" placeholder="First Name" className={fieldClass} required />
              <input name="lastName" autoComplete="family-name" value={formValues.lastName} onChange={updateField} aria-label="Last Name" placeholder="Last Name" className={fieldClass} required />
              <input name="organization" autoComplete="organization" value={formValues.organization} onChange={updateField} aria-label="Organization/Race Name" placeholder="Organization/Race Name" className={`${fieldClass} min-[601px]:col-span-2`} />
              <input name="email" type="email" autoComplete="email" value={formValues.email} onChange={updateField} aria-label="Email" placeholder="Email" className={fieldClass} required />
              <input name="phone" type="tel" autoComplete="tel" value={formValues.phone} onChange={updateField} aria-label="Phone" placeholder="Phone" className={fieldClass} />
            </fieldset>

            <fieldset className="mt-8">
              <legend className={sectionLabelClass}>{isContactMode ? "I'm contacting you about" : "Services Needed"} <span className="font-medium not-italic">(check all that apply)</span></legend>
              <div className="relative">
                <button
                  type="button"
                  className="flex min-h-[52px] w-full items-center justify-between gap-4 rounded-[6px] border-0 bg-white px-5 text-left text-[17px] font-medium text-[var(--text-default)] outline-none focus:ring-2 focus:ring-[var(--decorative-highlight)]"
                  aria-expanded={servicesOpen}
                  aria-controls="services-needed-options"
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  <span className="line-clamp-1" style={{ color: formValues.services.length > 0 ? "var(--text-default)" : placeholderColor }}>{selectedServicesLabel}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 transition-transform" style={{ transform: servicesOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
                </button>
                {servicesOpen && (
                  <div id="services-needed-options" className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 grid max-h-[280px] gap-2 overflow-y-auto rounded-[6px] bg-white p-4 shadow-[0_10px_24px_rgba(35,41,67,0.22)]">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex min-h-[38px] items-center gap-3 rounded-[4px] px-2 text-[16px] font-semibold text-[var(--text-default)] hover:bg-[var(--surface-subtle)]">
                        <input
                          type="checkbox"
                          name={isContactMode ? "topics" : "services"}
                          value={service}
                          checked={formValues.services.includes(service)}
                          onChange={updateService}
                          className="h-5 w-5 accent-[var(--action-tertiary-default)]"
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </fieldset>
            {isContactMode ? (
              <fieldset className="mt-8">
                <legend className={sectionLabelClass}>Comments</legend>
                <textarea
                  name="comments"
                  value={formValues.comments}
                  onChange={updateField}
                  aria-label="Comments"
                  placeholder="Comments"
                  className={`${fieldClass} min-h-[170px] w-full py-4`}
                />
              </fieldset>
            ) : (
              <fieldset className="mt-8 grid gap-6 min-[601px]:grid-cols-2">
                <legend className={sectionLabelClass}>About Your Event</legend>
                <input name="eventDate" type="date" value={formValues.eventDate} onChange={updateField} aria-label="Event Date" className={fieldClass} style={{ color: formValues.eventDate ? "var(--text-default)" : placeholderColor }} />
                <input name="location" autoComplete="address-level2" value={formValues.location} onChange={updateField} aria-label="Location" placeholder="Location" className={fieldClass} />
                <input name="participants" type="number" min="0" inputMode="numeric" value={formValues.participants} onChange={updateField} aria-label="Estimated Participants" placeholder="Estimated Participants" className={fieldClass} />
                <select name="raceType" value={formValues.raceType} onChange={updateField} aria-label="Race Type" className={fieldClass} style={{ color: formValues.raceType ? "var(--text-default)" : placeholderColor }}>
                  <option value="">Race Type</option>
                  {raceTypes.map((raceType) => (
                    <option key={raceType} value={raceType}>{raceType}</option>
                  ))}
                </select>
                <textarea
                  name="comments"
                  value={formValues.comments}
                  onChange={updateField}
                  aria-label="Comments"
                  placeholder="Comments"
                  className={`${fieldClass} min-h-[170px] py-4 min-[601px]:col-span-2`}
                />
              </fieldset>
            )}

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="ae-button inline-flex min-h-[52px] min-w-[230px] items-center justify-center rounded-[8px] px-8 text-[17px] font-bold text-[var(--text-default)] transition disabled:cursor-wait disabled:opacity-70" style={{ background: "#E3E6E0", ["--ae-button-hover" as string]: "#CAD8D2" }}
              >
                {submitLabel}
              </button>
            </div>

            <div aria-live="polite" className="mt-6 text-center">
              {submitStatus === "sent" && (
                <div className="rounded-[6px] px-5 py-4 text-left text-[16px] font-medium leading-snug text-[var(--text-default)]" style={{ background: "#E3E6E0" }}>
                  <p className="mb-2 text-[20px] font-bold">{isContactMode ? "Thanks for contacting Arsenal Events!" : "Thanks for reaching out!"}</p>
                  <p>{isContactMode ? "We've received your message and will get back to you as soon as possible." : "We've received your race information and someone from Arsenal Events will review your request. We'll contact you within one business day to learn more about your event and discuss how we can help."}</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded-[6px] bg-white px-5 py-4 text-left text-[16px] font-medium leading-snug text-[var(--text-default)]">
                  <p className="mb-2 font-bold">{isContactMode ? "We couldn't send your message." : "Something went wrong while sending your request."}</p>
                  <p>{isContactMode ? "Please try again in a few minutes or contact us by phone at " : "Please try again in a few minutes or contact us directly at "}<a href="tel:540XXXXXXX" className="font-bold underline">540-XXX-XXXX</a>{isContactMode ? " if the problem continues." : " if the issue continues."}</p>
                </div>
              )}
            </div>
          </form>

          <aside id="faqs" className="form-faq-sticky">
            <div className="grid gap-5">
              {faqs.map((faq, index) => {
                const open = activeFaq === index;
                return (
                  <div key={faq.q} className="pb-5">
                    <button
                      type="button"
                      className="form-faq-button flex w-full items-start gap-3 text-left"
                      aria-expanded={open}
                      aria-controls={`form-faq-${index}`}
                      onClick={() => setActiveFaq(open ? -1 : index)}
                    >
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--action-tertiary-default)" }} />
                      <span className="text-[22px] font-bold leading-tight" style={{ color: "var(--action-tertiary-default)" }}>
                        {faq.q}
                      </span>
                    </button>
                    <div
                      id={`form-faq-${index}`}
                      className="overflow-hidden pl-8 transition-[max-height,opacity,margin-top] duration-300 ease-out"
                      style={{ maxHeight: open ? "220px" : "0px", opacity: open ? 1 : 0, marginTop: open ? "12px" : "0px" }}
                    >
                      <p className="text-[20px] font-medium leading-snug" style={{ color: "var(--text-default)" }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
export function SliderControls({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button onClick={onPrev} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-[4px]" style={{ background: "#F5D6C4", color: "var(--surface-dark)" }}>
        <ChevronLeft size={22} />
      </button>
      <span className="h-2 w-10 rounded-full" style={{ background: "var(--surface-dark)" }} />
      <button onClick={onNext} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-[4px]" style={{ background: "var(--color-orange-brand)", color: "var(--surface-dark)" }}>
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

export const SHARED_PATTERN_CSS = `
  @media (max-width: 767px) {
    .ae-button {
      min-height: 50px !important;
      min-width: 158px !important;
      padding: 10px 22px !important;
      font-size: 16px !important;
      line-height: 1.12 !important;
    }
    .page-cta-button {
      width: min(236px, 100%) !important;
      min-height: 54px !important;
      padding: 12px 24px !important;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .ae-button:hover {
      background: var(--ae-button-hover) !important;
      transform: skewX(-8deg);
    }
    .race-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .race-card:hover {
      transform: translateY(-4px);
      box-shadow: 0px 8px 18px 0px rgba(35,41,67,0.18) !important;
    }
    .resource-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .resource-card:hover {
      transform: translateY(-4px);
      box-shadow: 0px 8px 18px 0px rgba(35,41,67,0.18) !important;
    }
  }

  .resource-card-shell.reveal-from-bottom {
    opacity: 0;
    transform: translateY(42px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    will-change: opacity, transform;
  }
  .resource-card-shell.reveal-from-bottom.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (max-width: 639px) {
    .resource-section-band {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }
  }

  @media (min-width: 640px) and (max-width: 1279px) {
    .resource-section-band {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
  }
  .resources-card-row {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .resources-card-carousel {
    display: none;
  }
  .resources-carousel-card {
    width: min(390px, 100%);
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
  }  .resources-carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
  }
  .resources-carousel-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .resource-card:focus-visible {
    outline: 2px solid var(--action-primary-default);
    outline-offset: 3px;
  }

  @media (min-width: 1280px) {
    .resources-card-row {
      width: 1200px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      flex-wrap: wrap;
    }
    .resources-card-row .resource-card-shell {
      flex: 0 0 384px !important;
      max-width: 384px;
    }
    .resources-card-row .resource-card-title {
      font-size: 33px !important;
    }
  }

  @media (max-width: 1279px) {
    .resources-card-row {
      display: none;
    }
    .resources-card-carousel {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .stats-quote-column {
    grid-template-columns: clamp(112px, 10.2vw, 156px) minmax(0, 1fr);
    gap: clamp(20px, 2.8vw, 34px);
  }
  .stats-quote-mark {
    width: 100%;
    flex-shrink: 0;
    margin-top: 0;
  }
  .stats-quote-rotator {
    min-height: 190px;
    padding-top: 8px;
  }
.stats-quote-ghost {
    visibility: hidden;
    pointer-events: none;
  }

  @media (max-width: 949px) {
    .stats-band-stack-950 .stats-quote-column {
      grid-template-columns: clamp(112px, 15vw, 156px) minmax(0, 1fr);
      align-items: start;
      width: min(620px, 100%);
    }
    .stats-band-stack-950 .stats-quote-rotator {
      min-height: 0;
      width: 100%;
    }
    .stats-band-stack-950 .stats-quote-text {
      max-width: 100% !important;
    }
    .stats-band-stack-950 .stats-list {
      width: min(420px, 100%);
      margin-top: 18px;
    }
  }

  @media (max-width: 659px) {
    .stats-band-stack-950 .stats-quote-column {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 18px;
    }
    .stats-band-stack-950 .stats-quote-column.is-left-aligned {
      justify-items: start;
      text-align: left;
    }
    .stats-band-stack-950 .stats-quote-column > img {
      width: min(150px, 46vw);
    }
    .stats-band-stack-950 .stats-list {
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (min-width: 950px) {
    .stats-band-stack-950 .stats-band-header {
      grid-template-columns: 1fr auto;
      align-items: start;
    }
    .stats-band-stack-950 .stats-band-content {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
    }
  }

  @media (max-width: 949px) {
    .stats-band-stack-950 .stats-band-header,
    .stats-band-stack-950 .stats-band-content {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 660px) and (max-width: 949px) {
    .stats-band-stack-950 .stats-band-content {
      justify-items: center;
    }
    .stats-band-stack-950 .stats-quote-column {
      width: min(620px, 100%);
    }
    .stats-band-stack-950 .stats-list {
      width: min(420px, 100%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ae-button {
      transition: background-color 0.2s ease !important;
    }
    .ae-button:hover,
    .resource-card:hover {
      transform: none !important;
    }
  }
`;


















































































