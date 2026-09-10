import { useEffect, useMemo, useState } from "react";
import personRunSvg from "@/imports/PersonSimpleRun.svg";
import imgFeatured from "@/imports/race-results-guide.jpg";
import {
  AeButton,
  PageCTA,
  ResourceCardGallery,
  RESOURCE_CARDS,
  SectionIntro,
} from "./sitePatterns";

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
    <section className="resources-hero grid overflow-hidden" style={{ background: "var(--surface-dark)" }}>
      <style>{`
        .resources-hero-image-wrap {
          background: var(--surface-dark);
        }
        .resources-hero-copy {
          display: grid !important;
          align-items: center;
          justify-items: start;
          width: 100%;
        }
        .resources-hero-copy-box {
          width: min(100%, 650px);
        }
        .resources-hero-photo-frame {
          position: absolute;
          inset: 0;
          margin: auto;
          aspect-ratio: 3097 / 2781;
          height: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .resources-hero-photo {
          object-position: center center;
        }
        .resources-hero-photo-frame::before,
        .resources-hero-photo-frame::after,
        .resources-hero-bottom-fade {
          content: "";
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }
        .resources-hero-bottom-fade {
          display: none;
        }
        @media (min-width: 751px) {
          .resources-hero {
            grid-template-columns: 1.22fr 0.78fr;
          }
          .resources-hero-copy {
            padding-left: 48px !important;
            padding-right: max(32px, calc((100vw - 1440px) / 2 + 32px)) !important;
          }
          .resources-hero-copy,
          .resources-hero-image-wrap {
            min-height: 620px;
          }
          .resources-hero-photo-frame::before {
            inset: 0 auto 0 0;
            width: min(24%, 240px);
            background: linear-gradient(90deg, var(--surface-dark) 0%, rgba(35,41,67,0.42) 44%, rgba(35,41,67,0) 100%);
          }
          .resources-hero-photo-frame::after {
            inset: 0 0 0 auto;
            width: min(34%, 320px);
            background: linear-gradient(270deg, var(--surface-dark) 0%, rgba(35,41,67,0.54) 42%, rgba(35,41,67,0) 100%);
          }
        }
        @media (max-width: 750px) {
          .resources-hero-copy-box {
            width: min(100%, 650px);
          }
          .resources-hero-photo-frame::before {
            inset: 0 auto 0 0;
            width: min(30%, 190px);
            background: linear-gradient(90deg, var(--surface-dark) 0%, rgba(35,41,67,0.42) 42%, rgba(35,41,67,0) 100%);
          }
          .resources-hero-photo-frame::after {
            inset: 0 0 0 auto;
            width: min(30%, 190px);
            background: linear-gradient(270deg, var(--surface-dark) 0%, rgba(35,41,67,0.36) 42%, rgba(35,41,67,0) 100%);
          }
          .resources-hero-bottom-fade {
            display: block;
            inset: auto 0 0 0;
            height: 58%;
            background: linear-gradient(0deg, rgba(35,41,67,0.68) 0%, rgba(35,41,67,0.36) 28%, rgba(35,41,67,0) 52%);
          }
        }
      `}</style>
      <div className="resources-hero-image-wrap relative min-h-[420px]">
        <div className="resources-hero-photo-frame">
          <img src={imgFeatured} alt="Runner reviewing race results at the finish" className="resources-hero-photo h-full w-full object-cover" />
          <span className="resources-hero-bottom-fade" aria-hidden="true" />
        </div>
      </div>
      <div className="resources-hero-copy homepage-built-mobile-padding flex items-center justify-center px-5 py-16 @sm:px-10" style={{ color: "var(--text-inverse)" }}>
        <div
          className="resources-hero-copy-box"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(48px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            willChange: "opacity, transform",
          }}
        >
          <p className="mb-5 flex items-center gap-3 text-[20px] font-bold italic" style={{ color: "var(--text-inverse)" }}>
            <img src={personRunSvg} alt="" className="h-[33px] w-[33px] object-contain brightness-0 invert" aria-hidden="true" />
            <span>For Runners</span>
          </p>
          <p className="mb-5 text-[clamp(24px,2.6vw,34px)] font-bold italic leading-tight" style={{ color: "var(--decorative-highlight)" }}>
            Featured Article
          </p>
          <h1 className="mb-8 max-w-[520px] text-[clamp(28px,3.1vw,42px)] font-medium italic leading-[1.05]">
            Understanding Your Race Results: A Runner's Guide
          </h1>
          <AeButton to="/resources/understanding-your-race-results" className="min-h-[52px] min-w-[170px] text-[17px]">Read the Guide</AeButton>
        </div>
      </div>
    </section>
  );
}

type ResourceFilter = "For Runners" | "For Race Directors";

const resourceFilters: ResourceFilter[] = ["For Race Directors", "For Runners"];

function getFilteredResourceCards(filter: ResourceFilter) {
  const filtered = RESOURCE_CARDS.filter((card) => card.category === filter);
  const source = filtered.length > 0 ? filtered : RESOURCE_CARDS;
  return Array.from({ length: Math.max(3, source.length) }, (_, index) => source[index % source.length]);
}

function LatestArticles() {
  const [activeFilter, setActiveFilter] = useState<ResourceFilter>("For Runners");
  const cards = useMemo(() => getFilteredResourceCards(activeFilter), [activeFilter]);

  return (
    <section className="homepage-built-mobile-padding px-5 py-16 @sm:px-10 @sm:py-24" style={{ background: "var(--surface-default)" }}>
      <style>{`
        .resources-filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .resources-filter-tab {
          min-height: 46px;
          border-radius: 999px;
          border: 2px solid rgba(35,41,67,0.18);
          padding: 0 22px;
          font-size: 16px;
          font-weight: 700;
          font-style: italic;
          color: var(--text-headlines);
          background: transparent;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .resources-filter-tab.is-active {
          border-color: var(--action-primary-default);
          background: var(--action-primary-default);
          color: var(--text-inverse);
        }
        @media (hover: hover) and (pointer: fine) {
          .resources-filter-tab:hover {
            border-color: var(--action-primary-default);
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1260px]">
        <SectionIntro
          title="Race Knowledge, Shared."
          copy="Practical advice for better race days. Explore guides, insights, and helpful resources for runners, race directors, and anyone working to create a great event experience."
        >
          <div className="resources-filter-tabs" role="tablist" aria-label="Filter resource articles">
            {resourceFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`resources-filter-tab ${activeFilter === filter ? "is-active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </SectionIntro>
        <ResourceCardGallery key={activeFilter} cards={cards} />
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  useEffect(() => {
    const title = "Arsenal Events | Race Resources & Guides";
    const description = "Practical race-day knowledge for runners and race directors from planning and registration to timing, results, and getting more from every event.";
    const previousTitle = document.title;
    const metadata = [
      { selector: 'meta[name="description"]', attribute: "content", value: description },
      { selector: 'meta[property="og:title"]', attribute: "content", value: title },
      { selector: 'meta[property="og:description"]', attribute: "content", value: description },
    ];
    const previousValues = metadata.map(({ selector, attribute }) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      return { element, attribute, value: element?.getAttribute(attribute) };
    });

    document.title = title;
    metadata.forEach(({ selector, attribute, value }) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute(attribute, value);
    });

    return () => {
      document.title = previousTitle;
      previousValues.forEach(({ element, attribute, value }) => {
        if (element && value !== null) element.setAttribute(attribute, value);
      });
    };
  }, []);

  return (
    <main style={{ background: "var(--surface-default)", color: "var(--text-default)" }}>
      <Hero />
      <LatestArticles />
      <PageCTA
        title="Put What You Know Into Motion."
        copy="Planning an event or looking for your next start line? Arsenal Events has the tools, experience, and race-day support to help you take the next step."
        primaryLabel="Plan Your Event"
        primaryTo="/race-director-services"
        secondaryLabel="Browse Upcoming Events"
        secondaryTo="/races-results#upcoming-races"
      />
    </main>
  );
}
