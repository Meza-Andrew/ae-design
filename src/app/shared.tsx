import { ArrowRight, Menu, X, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import svgPaths from "@/imports/Group5/svg-55iplnspeh";
import footerSvgPaths from "@/imports/Footer/svg-8tle3sonb4";

// ─── Wireframe primitives ─────────────────────────────────────────────────────

export function WireLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
      {children}
    </span>
  );
}

export function SectionTag({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 border border-border px-2 py-0.5 mb-4">
      <WireLabel>{label}</WireLabel>
    </div>
  );
}

export function BtnPrimary({
  children,
  note,
  href,
  onClick,
}: {
  children: React.ReactNode;
  note?: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {children}
      {note && <span className="text-[10px] opacity-60 font-normal">({note})</span>}
    </>
  );
  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-muted-foreground transition-colors"
    >
      {inner}
    </button>
  );
}

export function BtnOutline({
  children,
  note,
  href,
  onClick,
}: {
  children: React.ReactNode;
  note?: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {children}
      {note && <span className="text-[10px] opacity-60 font-normal">({note})</span>}
    </>
  );
  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
    >
      {inner}
    </button>
  );
}

export function BtnGhost({
  children,
  note,
  href,
  onClick,
}: {
  children: React.ReactNode;
  note?: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {children}
      <ArrowRight size={13} />
      {note && <span className="text-[10px] opacity-50 font-normal no-underline">({note})</span>}
    </>
  );
  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
    >
      {inner}
    </button>
  );
}

export function ImageBox({
  label,
  aspect = "aspect-video",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} bg-muted border border-border flex flex-col items-center justify-center gap-1`}
    >
      <div className="w-8 h-8 border-2 border-muted-foreground/40 rounded-sm flex items-center justify-center">
        <div className="w-4 h-3 border border-muted-foreground/40" />
      </div>
      <WireLabel>{label}</WireLabel>
    </div>
  );
}

// ─── Arsenal logo (SVG wordmark from Figma import) ────────────────────────────

function ArsenalWordmark() {
  return (
    <div className="flex flex-col gap-[6px]">
      {/* ARSENAL EVENTS */}
      <svg fill="none" height="25.7716" viewBox="0 0 264.681 25.7716" width="264.681">
        <g id="ARSENAL EVENTS">
          <path d={svgPaths.p395d4180} fill="#FCF3ED" />
          <path d={svgPaths.p228816d0} fill="#FCF3ED" />
          <path d={svgPaths.p412f180} fill="#FCF3ED" />
          <path d={svgPaths.p264a1c00} fill="#FCF3ED" />
          <path d={svgPaths.p2a37780} fill="#FCF3ED" />
          <path d={svgPaths.p98e5480} fill="#FCF3ED" />
          <path d={svgPaths.p1625a580} fill="#FCF3ED" />
          <path d={svgPaths.p375a0a80} fill="#FCF3ED" />
          <path d={svgPaths.pba47d00} fill="#FCF3ED" />
          <path d={svgPaths.p35fba640} fill="#FCF3ED" />
          <path d={svgPaths.p18472400} fill="#FCF3ED" />
          <path d={svgPaths.pf99e5f1} fill="#FCF3ED" />
          <path d={svgPaths.pe09180} fill="#FCF3ED" />
        </g>
      </svg>
      {/* RACE TIMING & MANAGEMENT */}
      <svg fill="none" height="13.095" viewBox="0 0 258.929 13.095" width="258.929">
        <g id="RACE TIMING & MANAGEMENT">
          <path d={svgPaths.p1ae4c100} fill="#FCF3ED" />
          <path d={svgPaths.p385eb00} fill="#FCF3ED" />
          <path d={svgPaths.p30e5e900} fill="#FCF3ED" />
          <path d={svgPaths.p1e91d680} fill="#FCF3ED" />
          <path d={svgPaths.p2454b380} fill="#FCF3ED" />
          <path d={svgPaths.p3e1adf00} fill="#FCF3ED" />
          <path d={svgPaths.p1b458f00} fill="#FCF3ED" />
          <path d={svgPaths.pb152fb2} fill="#FCF3ED" />
          <path d={svgPaths.p2b2c4d80} fill="#FCF3ED" />
          <path d={svgPaths.p41ac0a0} fill="#FCF3ED" />
          <path d={svgPaths.p188fe700} fill="#FCF3ED" />
          <path d={svgPaths.p2d5db580} fill="#FCF3ED" />
          <path d={svgPaths.p47ded80} fill="#FCF3ED" />
          <path d={svgPaths.p2ddb9540} fill="#FCF3ED" />
          <path d={svgPaths.p13db6200} fill="#FCF3ED" />
          <path d={svgPaths.p21990380} fill="#FCF3ED" />
          <path d={svgPaths.p76cb500} fill="#FCF3ED" />
          <path d={svgPaths.p2b538780} fill="#FCF3ED" />
          <path d={svgPaths.pe6eb00} fill="#FCF3ED" />
          <path d={svgPaths.p1c480a00} fill="#FCF3ED" />
          <path d={svgPaths.p17b57600} fill="#FCF3ED" />
        </g>
      </svg>
    </div>
  );
}


function RequestTimingBtn({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/for-race-directors"
      onClick={onClick}
      className="req-timing-btn inline-flex items-center justify-center shrink-0 whitespace-nowrap"
      style={{
        background: "var(--action-primary-default)",
        color: "var(--action-primary-text)",
        borderRadius: "10px",
        width: "247px",
        height: "61px",
        padding: "0 36px",
        fontSize: "18px",
        fontWeight: 600,
        transition: "transform 0.25s ease, background-color 0.2s ease",
      }}
    >
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .req-timing-btn:hover {
            background-color: var(--action-primary-hover) !important;
            transform: skewX(-8deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .req-timing-btn { transition: background-color 0.2s ease !important; }
          .req-timing-btn:hover { transform: none !important; }
        }
      `}</style>
      Request Timing Services
    </Link>
  );
}

// ─── Shared Nav ───────────────────────────────────────────────────────────────

export function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks: { label: string; to: string }[] = [
    { label: "For Race Directors", to: "/for-race-directors" },
    { label: "Races & Results", to: "/races" },
    { label: "About Us", to: "/about" },
    { label: "Resources", to: "/resources" },
  ];

  const scrollToPageTop = () => {
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  const handlePrimaryNavClick = () => {
    setOpen(false);
    scrollToPageTop();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1280px)");
    const update = () => {
      if (media.matches) setOpen(false);
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <style>{`
        .nav-desktop {
          display: flex;
        }
        .nav-compact {
          display: none;
        }
        .nav-mobile-row {
          display: none;
        }
        .nav-drawer {
          display: none;
        }
        .nav-logo-scale {
          transform-origin: left center;
        }
        @media (max-width: 1279px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-compact {
            display: flex !important;
          }
          .nav-drawer {
            display: block !important;
          }
          .nav-logo-scale {
            transform: scale(0.82);
          }
        }
        @media (max-width: 750px) {
          .nav-compact {
            display: none !important;
          }
          .nav-compact-cta {
            display: none !important;
          }
          .nav-logo-scale {
            transform: scale(0.72);
          }
          .nav-mobile-row {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
        }
      `}</style>
      {/* ── Utility bar ── cream background, right-aligned phone + email */}
      <div className="nav-desktop" style={{ background: "var(--surface-subtle)" }}>
        <div className="max-w-[1440px] mx-auto w-full px-5 @sm:px-8 h-[50px] flex items-center justify-end gap-6">
          <Link
            to="/contact#contact-form"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-default)", fontWeight: 500 }}
          >
            {/* Mail icon matching Figma */}
            <svg width="22" height="18" viewBox="0 0 26.6667 21.3333" fill="none" aria-hidden>
              <path d={svgPaths.p237b4000} fill="var(--text-default)" />
            </svg>
            Email Us
          </Link>
          <a
            href="tel:+15400000000"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-default)", fontWeight: 500 }}
          >
            {/* Phone icon matching Figma */}
            <svg width="20" height="20" viewBox="0 0 29.0183 29.071" fill="none" aria-hidden>
              <path d={svgPaths.p6604a00} stroke="var(--text-default)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
            540-XXX-XXXX
          </a>
        </div>
      </div>

      {/* ── Main nav bar ── dark navy */}
      <div style={{ background: "var(--surface-dark)" }}>
        <div
          className="max-w-[1440px] mx-auto flex items-center px-5 @sm:px-8 nav-desktop"
          style={{ minHeight: "100px" }}
        >
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={handlePrimaryNavClick}
            aria-label="Arsenal Events — home"
          >
            <div className="nav-logo-scale">
              <ArsenalWordmark />
            </div>
          </Link>

          <nav className="flex items-center justify-center gap-10 flex-1 px-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-lg font-semibold whitespace-nowrap transition-opacity ${
                  location.pathname === l.to ? "opacity-100 underline underline-offset-4" : "opacity-90 hover:opacity-100"
                }`}
                style={{ color: "var(--text-inverse)" }}
                onClick={handlePrimaryNavClick}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="block shrink-0">
            <RequestTimingBtn />
          </div>
        </div>

        <div
          className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-5 @sm:px-8 nav-compact"
          style={{ minHeight: "84px" }}
        >
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={handlePrimaryNavClick}
            aria-label="Arsenal Events — home"
          >
            <div className="nav-logo-scale">
              <ArsenalWordmark />
            </div>
          </Link>

          <div className="flex flex-1 items-center justify-center">
            <div className="nav-compact-cta">
              <RequestTimingBtn />
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <button
              className="p-2 text-[var(--text-inverse)]"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto flex items-center px-5 @sm:px-8 nav-mobile-row" style={{ minHeight: "72px" }}>
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={handlePrimaryNavClick}
            aria-label="Arsenal Events — home"
          >
            <div className="nav-logo-scale">
              <ArsenalWordmark />
            </div>
          </Link>

          <div className="ml-auto">
            <button
              className="p-2"
              style={{ color: "var(--text-inverse)" }}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="nav-drawer" style={{ background: "var(--surface-dark)" }}>
          {/* Nav links */}
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={handlePrimaryNavClick}
              className={`flex items-center px-6 py-4 text-base border-b transition-opacity ${
                location.pathname === l.to
                  ? "font-semibold opacity-100 border-[#fcf3ed]/20"
                  : "opacity-80 hover:opacity-100 border-[#fcf3ed]/10"
              }`}
              style={{ color: "var(--text-inverse)" }}
            >
              {l.label}
            </Link>
          ))}
          {/* Request Timing Services — full-width in drawer */}
          <div className="px-6 py-5">
            <Link
              to="/for-race-directors"
              onClick={handlePrimaryNavClick}
              className="flex items-center justify-center w-full py-3.5 font-semibold text-base"
              style={{
                background: "var(--action-primary-default)",
                color: "var(--action-primary-text)",
                borderRadius: "10px",
              }}
            >
              Request Timing Services
            </Link>
          </div>
          {/* Utility contacts in drawer */}
          <div
            className="flex items-center gap-6 px-6 py-4 border-t border-[#fcf3ed]/10"
            style={{ background: "var(--surface-subtle)" }}
          >
            <Link
              to="/contact#contact-form"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--text-default)", fontWeight: 500 }}
            >
              <Mail size={14} />
              Email Us
            </Link>
            <a
              href="tel:+15400000000"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--text-default)", fontWeight: 500 }}
            >
              <Phone size={14} />
              540-XXX-XXXX
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Global Footer ─────────────────────────────────────────────────────────────

const FOOTER_NAV = [
  { label: "For Race Directors", to: "/for-race-directors", weight: 500 },
  { label: "Races & Results",    to: "/races",              weight: 500 },
  { label: "Resources",          to: "/resources",          weight: 400 },
  { label: "About",              to: "/about",              weight: 400 },
  { label: "Contact",            to: "/contact",            weight: 400 },
];

export function Footer() {
  const scrollToPageTop = () => {
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  return (
    <footer style={{ background: "var(--surface-footer)" }}>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .ftrl:hover { opacity: 0.7; }
          .ftsl:hover { opacity: 0.7; }
        }
        .ftrl { transition: opacity 0.2s ease; }
        .ftsl { transition: opacity 0.2s ease; }
        .footer-layout {
          display: grid;
          grid-template-areas:
            "brand"
            "nav"
            "info";
          gap: 32px;
          align-items: start;
          justify-items: start;
        }
        .footer-info {
          grid-area: info;
          color: var(--text-inverse);
          max-width: 360px;
        }
        .footer-nav-social {
          grid-area: nav;
          display: flex;
          align-items: flex-start;
          gap: 32px;
        }
        .footer-social {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 4px;
        }
        .footer-brand {
          grid-area: brand;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .footer-layout {
            grid-template-columns: minmax(0, 1fr) auto;
            grid-template-areas:
              "brand nav"
              "info nav";
            gap: 32px 48px;
          }
          .footer-nav-social {
            gap: 40px;
          }
        }
        @media (min-width: 1200px) {
          .footer-layout {
            grid-template-columns: minmax(280px, 1fr) auto minmax(280px, 1fr);
            grid-template-areas: "info nav brand";
            align-items: center;
            gap: clamp(48px, 6vw, 96px);
          }
          .footer-nav-social {
            gap: 64px;
          }
          .footer-social {
            flex-direction: column;
          }
          .footer-brand {
            justify-self: end;
          }
        }
        .ftrl:focus-visible,
        .ftsl:focus-visible { outline: 2px solid var(--text-inverse); outline-offset: 3px; border-radius: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .ftrl, .ftsl { transition: none; }
        }
      `}</style>

      <div
        className="max-w-[1440px] mx-auto"
        style={{ padding: "clamp(36px, 4vw, 56px) clamp(20px, 4vw, 60px)" }}
      >
        {/* ── Desktop: 3-zone horizontal / Mobile: vertical stack ── */}
        <div className="footer-layout">

          {/* Zone 1 — Info text (left on desktop) */}
          <div
            className="footer-info"
          >
            <p style={{ fontWeight: 400, fontSize: "20px", lineHeight: "28px", marginBottom: "4px" }}>
              Proudly serving the greater Mid-Atlantic region.
            </p>
            <p style={{ fontWeight: 400, fontSize: "16px", lineHeight: "20px", marginBottom: "4px" }}>
              ©2026 Arsenal Events. All rights reserved.
            </p>
            <p style={{ fontWeight: 400, fontSize: "16px", lineHeight: "20px", marginBottom: "8px" }}>
              <Link
                to="/privacy-policy"
                onClick={scrollToPageTop}
                className="ftrl"
                style={{ color: "var(--text-inverse)", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
              {" | "}
              <Link
                to="/cookie-policy"
                onClick={scrollToPageTop}
                className="ftrl"
                style={{ color: "var(--text-inverse)", textDecoration: "none" }}
              >
                Cookie Policy
              </Link>
            </p>
            <p style={{ fontWeight: 400, fontSize: "12px", lineHeight: "18px", opacity: 0.65 }}>
              This personalized WordPress theme was designed and developed with ♥ by meza.
            </p>
          </div>

          {/* Zone 2 — Nav + Social icons (center on desktop) */}
          <div className="footer-nav-social">
            <nav aria-label="Footer">
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {FOOTER_NAV.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={scrollToPageTop}
                      className="ftrl"
                      style={{
                        display: "block",
                        fontWeight: link.weight,
                        fontSize: "20px",
                        lineHeight: "32px",
                        color: "var(--text-inverse)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social icons — vertically centered with nav list */}
            <div
              className="footer-social"
            >
              <a
                href="#"
                aria-label="Arsenal Events on Facebook"
                className="ftsl"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}
              >
                <svg
                  fill="none"
                  viewBox="0 0 20.3333 35.3333"
                  width="22"
                  height="38"
                  aria-hidden="true"
                >
                  <path
                    d={footerSvgPaths.p3fb89a40}
                    stroke="var(--text-inverse)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Arsenal Events on Instagram"
                className="ftsl"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}
              >
                <svg
                  fill="none"
                  viewBox="0 0 35.3333 35.3333"
                  width="36"
                  height="36"
                  aria-hidden="true"
                >
                  <path
                    d={footerSvgPaths.p9023700}
                    stroke="var(--text-inverse)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Zone 3 — Wordmark logo (right on desktop) */}
          <Link
            to="/"
            aria-label="Arsenal Events — Home"
            className="footer-brand"
          >
            {/* ARSENAL EVENTS */}
            <svg
              fill="none"
              viewBox="0 0 315.556 30.7252"
              width="260"
              height="25"
              style={{ width: "clamp(200px, 22vw, 316px)", height: "auto" }}
              aria-hidden="true"
            >
              <path d={footerSvgPaths.p1c59ed00} fill="#F8E4D8" />
              <path d={footerSvgPaths.p166b7300} fill="#F8E4D8" />
              <path d={footerSvgPaths.p284fcf00} fill="#F8E4D8" />
              <path d={footerSvgPaths.p6623700}  fill="#F8E4D8" />
              <path d={footerSvgPaths.p1b037c80} fill="#F8E4D8" />
              <path d={footerSvgPaths.p8e74300}  fill="#F8E4D8" />
              <path d={footerSvgPaths.p2c24cf80} fill="#F8E4D8" />
              <path d={footerSvgPaths.p10f06a72} fill="#F8E4D8" />
              <path d={footerSvgPaths.p2f0e2a00} fill="#F8E4D8" />
              <path d={footerSvgPaths.p275df780} fill="#F8E4D8" />
              <path d={footerSvgPaths.p2d1a8300} fill="#F8E4D8" />
              <path d={footerSvgPaths.p362bc000} fill="#F8E4D8" />
              <path d={footerSvgPaths.pf1f7100}  fill="#F8E4D8" />
            </svg>
            {/* RACE TIMING & MANAGEMENT */}
            <svg
              fill="none"
              viewBox="0 0 308.699 15.612"
              width="254"
              height="13"
              style={{ width: "clamp(195px, 21.5vw, 309px)", height: "auto" }}
              aria-hidden="true"
            >
              <path d={footerSvgPaths.p38f93200} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p3aaf88c0} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p1996a100} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.pa71eb00}  fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p32c7d700} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p18a38b70} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p37e22300} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p2ae79000} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p47d9b40}  fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p33c25600} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.pc19aa80}  fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p12580080} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p11628600} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p3cf10080} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p1b0e00c0} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p3d56f500} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p21ce6f00} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p17720900} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p343b890}  fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p253a6400} fill="var(--text-inverse)" />
              <path d={footerSvgPaths.p23accb00} fill="var(--text-inverse)" />
            </svg>
          </Link>

        </div>
      </div>
    </footer>
  );
}

// ─── Annotation key ───────────────────────────────────────────────────────────

export function AnnotationKey() {
  return (
    null
  );
}




