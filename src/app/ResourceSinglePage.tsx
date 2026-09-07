import { useEffect, useMemo, useRef, useState } from "react";
import imgFeatured from "@/imports/race-results-guide.jpg";
import imgGear from "@/imports/image_1.png";
import blockQuoteSvg from "@/imports/block_quote.svg";
import personRunSvg from "@/imports/PersonSimpleRun.svg";
import { PageCTA, ResourceCardGallery, RESOURCE_CARDS, SectionIntro, SITE_BODY_COPY_STYLE } from "./sitePatterns";

function ResourcePostStyles() {
  return (
    <style>{`
      .resource-post-eyebrow-icon {
        filter: brightness(0) saturate(100%) invert(31%) sepia(77%) saturate(1056%) hue-rotate(349deg) brightness(91%) contrast(89%);
      }
      .resource-post-pullquote-mark {
        width: clamp(86px, 13vw, 132px);
        flex: 0 0 auto;
        opacity: 0.95;
      }
      .resource-post-pullquote-text {
        max-width: 520px;
        color: var(--text-accent);
        font-size: clamp(16px, 2vw, 24px);
        font-weight: 700;
        font-style: italic;
        line-height: 1.12;
      }
      @media (max-width: 640px) {
        .resource-post-pullquote {
          align-items: flex-start;
          gap: 20px;
        }
        .resource-post-eyebrow-icon {
        filter: brightness(0) saturate(100%) invert(31%) sepia(77%) saturate(1056%) hue-rotate(349deg) brightness(91%) contrast(89%);
      }
      .resource-post-pullquote-mark {
          width: 72px;
        }
      }
    `}</style>
  );
}

function ArticleBody() {
  return (
    <article className="homepage-built-mobile-padding px-5 py-16 @sm:px-10 @sm:py-24" style={{ background: "var(--surface-default)", color: "var(--text-default)" }}>
      <div className="mx-auto max-w-[920px]">
        <p className="mb-5 flex items-center gap-3 text-[24px] font-bold italic" style={{ color: "var(--text-accent)" }}>
          <img src={personRunSvg} alt="" className="h-[34px] w-[34px] object-contain resource-post-eyebrow-icon" aria-hidden="true" />
          <span>For Runners</span>
        </p>
        <h1 className="mb-5 text-[clamp(48px,7vw,86px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          Understanding Your Race Results: A Runner's Guide
        </h1>
        <p className="mb-14 text-[26px] font-bold italic" style={{ color: "var(--action-tertiary-default)" }}>October 21, 2026</p>
        <img src={imgFeatured} alt="Runner checking race results" className="mb-14 aspect-[1.65/1] w-full rounded-[6px] object-cover" />
        <div className="mx-auto max-w-[640px]">
          <p className="mb-12" style={SITE_BODY_COPY_STYLE}>
            You crossed the finish line, caught your breath, and pulled up your results-but what do all those numbers actually mean? Your finish time is the total time it took you to complete the course, while your pace shows how quickly you covered each mile or kilometer on average.
          </p>
          <blockquote className="resource-post-pullquote mb-12 flex items-center gap-[clamp(24px,4vw,44px)]">
            <img src={blockQuoteSvg} alt="" className="resource-post-pullquote-mark" aria-hidden="true" />
            <p className="resource-post-pullquote-text">
              Your finish time tells you how the race went. Your progress tells you how far you've come.
            </p>
          </blockquote>
          <h2 className="mb-5 text-[clamp(34px,4vw,50px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
            More Than Just Your Finish Time
          </h2>
          <p className="mb-12" style={SITE_BODY_COPY_STYLE}>
            You'll also usually see your overall place, gender place, and age-group place. Overall place compares your finish with everyone in the race, while the other rankings give you a better idea of how you performed among similar runners.
          </p>
          <img src={imgGear} alt="Race day gear at the start line" className="mb-12 aspect-[1.65/1] w-full rounded-[6px] object-cover" />
          <h2 className="mb-5 text-[clamp(34px,4vw,50px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
            Keep Moving Forward
          </h2>
          <p style={SITE_BODY_COPY_STYLE}>
            The most useful comparison is often with yourself. Look at how your pace and finish time change across similar distances and courses, and pay attention to how you felt along the way.
          </p>
        </div>
      </div>
    </article>
  );
}

function getRelatedRunnerPosts() {
  const filtered = RESOURCE_CARDS.filter((card) => card.category === "For Runners");
  return Array.from({ length: Math.max(3, filtered.length) }, (_, index) => filtered[index % filtered.length]);
}

function RelatedPosts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cards = useMemo(() => getRelatedRunnerPosts(), []);

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
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="homepage-built-mobile-padding px-5 py-16 @sm:px-10 @sm:py-24" style={{ background: "var(--surface-default)" }}>
      <div className="mx-auto max-w-[1260px]">
        <SectionIntro
          title="Related Posts"
          copy="Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits."
        />
        <ResourceCardGallery cards={cards} visible={isVisible} />
      </div>
    </section>
  );
}

export default function ResourceSinglePage() {
  return (
    <main>
      <ResourcePostStyles />
      <ArticleBody />
      <PageCTA title="Ready to Run?" />
      <RelatedPosts />
    </main>
  );
}