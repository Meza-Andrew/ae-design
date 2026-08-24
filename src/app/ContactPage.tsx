import { Mail, Phone } from "lucide-react";
import imgMap from "@/imports/image-13.png";
import { AeButton, FormWithFAQ, PageBand, SectionIntro, SITE_BODY_COPY_STYLE } from "./sitePatterns";

function Hero() {
  return (
    <section className="homepage-built-mobile-padding px-5 py-16 text-center @sm:px-10 @sm:py-24" style={{ background: "var(--surface-subtle)", color: "var(--text-default)" }}>
      <div className="mx-auto max-w-[1245px]">
        <h1 className="mb-8 text-[clamp(52px,8vw,104px)] font-bold italic leading-none" style={{ color: "var(--text-headlines)" }}>
          We'd Love to Hear From You
        </h1>
        <p className="mx-auto mb-12 max-w-[1000px]" style={SITE_BODY_COPY_STYLE}>
          Placeholder supporting copy - one or two sentences inviting race directors and runners to reach out with questions, bookings, or general inquiries.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 @sm:flex-row">
          <AeButton href="#contact-form"><span className="inline-flex items-center gap-3"><Mail size={22} /> Message Us</span></AeButton>
          <AeButton href="tel:5400000000"><span className="inline-flex items-center gap-3"><Phone size={22} /> Call Us</span></AeButton>
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <PageBand tone="subtle">
      <SectionIntro
        title="Service Area"
        copy="Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits."
      />
      <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[4px] bg-white shadow-[0_6px_18px_rgba(35,41,67,0.16)]">
        <img src={imgMap} alt="Arsenal Events service area map" className="aspect-[2.1/1] w-full object-cover" />
      </div>
    </PageBand>
  );
}

function PreferToTalk() {
  return (
    <PageBand>
      <div className="mx-auto max-w-[620px] rounded-[6px] px-8 py-8 text-center" style={{ background: "var(--surface-dark)", color: "var(--text-inverse)" }}>
        <p className="text-[clamp(28px,3vw,38px)] font-bold leading-tight"><Phone className="mr-3 inline" size={34} /> Prefer to Talk?<br />Call us at 540 - XXX - XXXX.</p>
      </div>
    </PageBand>
  );
}

export default function ContactPage() {
  return (
    <main style={{ background: "var(--surface-default)" }}>
      <Hero />
      <ServiceArea />
      <div id="contact-form" className="scroll-mt-20">
        <FormWithFAQ title="Contact Form" copy="Placeholder - a short line inviting the user to fill out the form and setting expectations for response time." />
      </div>
      <PreferToTalk />
    </main>
  );
}
