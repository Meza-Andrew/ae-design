import imgHero from "@/imports/image-2.png";
import imgStory from "@/imports/image-3.png";
import imgTeam1 from "@/imports/image-4.png";
import imgTeam2 from "@/imports/image-5.png";
import imgTeam3 from "@/imports/image-6.png";
import imgTeam4 from "@/imports/image-8.png";
import imgTeam5 from "@/imports/image-9.png";
import imgTeam6 from "@/imports/image-10.png";
import {
  AeButton,
  PageBand,
  PageCTA,
  RaceCard,
  SectionIntro,
  SHARED_RACES,
  SITE_BODY_COPY_STYLE,
  StatsBand,
} from "./sitePatterns";

const team = [
  { bib: "001", role: "Owners/Running Nerds", name: "Ken & Kristen", image: imgTeam1 },
  { bib: "002", role: "Timing Crew / Ultra Runner", name: "Tammy", image: imgTeam2 },
  { bib: "041", role: "Timing Crew / Ultra Runner", name: "Gabi", image: imgTeam3 },
  { bib: "026", role: "Timing Crew / Ultra Runner", name: "Lynne", image: imgTeam4 },
  { bib: "035", role: "Timing Crew / Triathlete", name: "Kristen", image: imgTeam5 },
  { bib: "101", role: "Timing Crew", name: "Aideen", image: imgTeam6 },
];

function Hero() {
  return (
    <section className="grid overflow-hidden @lg:grid-cols-[0.78fr_1.22fr]" style={{ background: "var(--surface-dark)" }}>
      <div className="homepage-built-mobile-padding flex items-center px-5 py-16 @sm:px-10 @lg:min-h-[620px]" style={{ color: "var(--text-inverse)" }}>
        <div className="max-w-[560px]">
          <h1 className="mb-7 text-[clamp(52px,7vw,92px)] font-bold italic leading-none">Get to Know Arsenal Events</h1>
          <p className="mb-9" style={SITE_BODY_COPY_STYLE}>
            Placeholder supporting copy - two sentences about who Arsenal Events is and what drives the team to show up on race day.
          </p>
          <AeButton href="#community">See Our Community Impact</AeButton>
        </div>
      </div>
      <div className="relative min-h-[420px] @lg:min-h-[620px]">
        <img src={imgHero} alt="Arsenal Events team" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}

function Mission() {
  return (
    <PageBand tone="subtle">
      <div className="mx-auto grid max-w-[1120px] gap-8 @lg:grid-cols-[0.9fr_1.1fr] @lg:items-center">
        <h2 className="text-[clamp(34px,4vw,52px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>Our Mission</h2>
        <div className="grid grid-cols-[110px_1fr] items-center gap-7">
          <div className="text-[150px] font-bold leading-none" style={{ color: "var(--action-tertiary-default)" }}>“</div>
          <p style={SITE_BODY_COPY_STYLE}>To meet and exceed every race director's and athlete's expectations by providing outstanding customer service and excellent product delivery.</p>
        </div>
      </div>
    </PageBand>
  );
}

function CommunityImpact() {
  return (
    <section id="community" className="homepage-built-mobile-padding scroll-mt-20 px-5 py-16 @sm:px-10 @sm:py-24" style={{ background: "var(--surface-dark)", color: "var(--text-inverse)" }}>
      <div className="mx-auto max-w-[1245px]">
        <div className="mb-14 grid gap-8 @lg:grid-cols-[1fr_auto] @lg:items-start">
          <div>
            <h2 className="mb-4 text-[clamp(34px,4vw,52px)] font-bold italic leading-none">Community Impact</h2>
            <p className="max-w-[760px]" style={SITE_BODY_COPY_STYLE}>Placeholder - a sentence or two about Arsenal's footprint in the running community and what these numbers represent.</p>
          </div>
          <AeButton to="/contact">See Our Full Service Area</AeButton>
        </div>
        <div className="mb-16 grid gap-8 @md:grid-cols-3">
          {["200+ Timed Races", "50k+ Finishers Tracked", "100% Race Director Satisfaction"].map((stat) => (
            <p key={stat} className="text-[20px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>{stat}</p>
          ))}
        </div>
        <h3 className="mb-8 text-[30px] font-bold italic" style={{ color: "var(--decorative-highlight)" }}>Upcoming Arsenal Races</h3>
        <div className="grid gap-8 @md:grid-cols-3">
          {SHARED_RACES.map((race, index) => <RaceCard key={`${race.title}-${index}`} race={race} />)}
        </div>
        <div className="mt-10 flex justify-center"><AeButton to="/races">See All Upcoming Races</AeButton></div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <PageBand>
      <div className="mx-auto grid max-w-[1160px] gap-12 @lg:grid-cols-[0.9fr_1fr] @lg:items-center">
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
    </PageBand>
  );
}

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <article className="relative rounded-[4px] bg-white p-4 shadow-[0_4px_12px_rgba(35,41,67,0.16)]">
      <div className="mb-4 rounded-[4px] px-4 py-2 text-center text-[14px] font-bold italic" style={{ background: "var(--action-tertiary-default)", color: "var(--text-inverse)" }}>{member.role}</div>
      <div className="grid grid-cols-[0.85fr_1fr] items-center gap-4">
        <div>
          <p className="text-[52px] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>{member.bib}</p>
          <p className="mt-3 text-[18px] font-bold italic" style={{ color: "var(--action-tertiary-default)" }}>{member.name}</p>
        </div>
        <img src={member.image} alt={member.name} className="aspect-square w-full rounded-[4px] object-cover" />
      </div>
    </article>
  );
}

function Team() {
  return (
    <PageBand>
      <SectionIntro title="Meet the Team" copy="Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition. Placeholder supporting headline copy - one or two sentences describing the runner-facing value proposition." align="left" />
      <div className="mx-auto grid max-w-[1180px] gap-6 @md:grid-cols-2 @xl:grid-cols-3">
        {team.map((member) => <TeamCard key={member.bib} member={member} />)}
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
