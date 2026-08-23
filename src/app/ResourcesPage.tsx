import imgFeatured from "@/imports/DSC07982-2_1.png";
import {
  AeButton,
  PageCTA,
  ResourceCardGallery,
  RESOURCE_CARDS,
  SectionIntro,
} from "./sitePatterns";

function Hero() {
  return (
    <section className="grid min-h-[620px] overflow-hidden @lg:grid-cols-[1.15fr_0.85fr]" style={{ background: "var(--surface-dark)" }}>
      <div className="relative min-h-[360px] @lg:min-h-[620px]">
        <img src={imgFeatured} alt="Runner reviewing race results at the finish" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="homepage-built-mobile-padding flex items-center px-5 py-16 @sm:px-10" style={{ color: "var(--text-inverse)" }}>
        <div className="max-w-[650px]">
          <p className="mb-8 text-[24px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>For Runners</p>
          <p className="mb-5 text-[clamp(32px,4.2vw,52px)] font-bold italic leading-none" style={{ color: "var(--decorative-highlight)" }}>
            Featured Article
          </p>
          <h1 className="mb-10 text-[clamp(42px,5.6vw,76px)] font-medium italic leading-none">
            Understanding Your Race Results: A Runner's Guide
          </h1>
          <AeButton to="/resources/understanding-your-race-results" className="min-h-[72px] min-w-[244px] text-[26px]">Read the Guide</AeButton>
        </div>
      </div>
    </section>
  );
}

function LatestArticles() {
  return (
    <section className="homepage-built-mobile-padding px-5 py-20 @sm:px-10 @sm:py-28" style={{ background: "var(--surface-default)" }}>
      <div className="mx-auto max-w-[1260px]">
        <SectionIntro
          title="Latest Articles"
          copy="Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits."
        >
          <AeButton to="/resources" className="min-h-[60px] min-w-[250px]">For Race Directors</AeButton>
          <AeButton to="/resources" className="min-h-[60px] min-w-[250px]">For Runners</AeButton>
        </SectionIntro>
        <ResourceCardGallery cards={[...RESOURCE_CARDS, ...RESOURCE_CARDS]} />
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main style={{ background: "var(--surface-default)", color: "var(--text-default)" }}>
      <Hero />
      <LatestArticles />
      <PageCTA title="Ready to Run?" />
    </main>
  );
}


