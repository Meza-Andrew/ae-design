import imgFeatured from "@/imports/DSC07982-2_1.png";
import imgGear from "@/imports/image_1.png";
import { PageCTA, ResourceCardGallery, RESOURCE_CARDS, SectionIntro, SITE_BODY_COPY_STYLE } from "./sitePatterns";

function ArticleBody() {
  return (
    <article className="homepage-built-mobile-padding px-5 py-20 @sm:px-10 @sm:py-28" style={{ background: "var(--surface-default)", color: "var(--text-default)" }}>
      <div className="mx-auto max-w-[920px]">
        <p className="mb-5 text-[24px] font-bold italic" style={{ color: "var(--text-accent)" }}>For Runners</p>
        <h1 className="mb-5 text-[clamp(48px,7vw,86px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          Understanding Your Race Results: A Runner's Guide
        </h1>
        <p className="mb-14 text-[26px] font-bold italic" style={{ color: "var(--action-tertiary-default)" }}>October 21, 2026</p>
        <img src={imgFeatured} alt="Runner checking race results" className="mb-14 aspect-[1.65/1] w-full rounded-[6px] object-cover" />
        <div className="mx-auto max-w-[640px]">
          <p className="mb-12" style={SITE_BODY_COPY_STYLE}>
            You crossed the finish line, caught your breath, and pulled up your results-but what do all those numbers actually mean? Your finish time is the total time it took you to complete the course, while your pace shows how quickly you covered each mile or kilometer on average.
          </p>
          <blockquote className="mb-12 grid grid-cols-[110px_1fr] items-center gap-6">
            <div className="text-[150px] font-bold leading-none" style={{ color: "var(--action-tertiary-default)" }}>“</div>
            <p className="text-[25px] font-bold" style={{ color: "var(--text-accent)" }}>
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

function RelatedPosts() {
  return (
    <section className="homepage-built-mobile-padding px-5 pb-24 @sm:px-10 @sm:pb-32" style={{ background: "var(--surface-default)" }}>
      <div className="mx-auto max-w-[1260px]">
        <SectionIntro
          title="Related Posts"
          copy="Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits."
        />
        <ResourceCardGallery cards={RESOURCE_CARDS} />
      </div>
    </section>
  );
}

export default function ResourceSinglePage() {
  return (
    <main>
      <ArticleBody />
      <PageCTA title="Ready to Run?" />
      <RelatedPosts />
    </main>
  );
}

