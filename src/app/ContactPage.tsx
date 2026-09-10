import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import serviceAreaPlaceholderMap from "@/imports/service-area-placeholder-map.png";
import whatWeOfferAccent from "@/imports/what-we-offer-accent.svg";
import { AeButton, FormWithFAQ, PageBand, SectionIntro, SITE_BODY_COPY_STYLE } from "./sitePatterns";

declare global {
  interface Window {
    google?: any;
    __arsenalGoogleMapsPromise?: Promise<void>;
  }
}

type ServiceAreaPoint = {
  city: string;
  state: string;
  count: number;
  lat: number;
  lng: number;
};

const SERVICE_AREA_POINTS: ServiceAreaPoint[] = [
  { city: "Annandale", state: "VA", count: 7, lat: 38.8304, lng: -77.1964 },
  { city: "Arlington", state: "VA", count: 4, lat: 38.8816, lng: -77.091 },
  { city: "Ashland", state: "VA", count: 5, lat: 37.759, lng: -77.4797 },
  { city: "Bowling Green", state: "VA", count: 1, lat: 38.0496, lng: -77.3466 },
  { city: "Bridgeport", state: "WV", count: 1, lat: 39.2865, lng: -80.2562 },
  { city: "Bristow", state: "VA", count: 2, lat: 38.7229, lng: -77.5361 },
  { city: "Bumpass", state: "VA", count: 1, lat: 37.9635, lng: -77.7378 },
  { city: "College Park", state: "MD", count: 3, lat: 38.9897, lng: -76.9378 },
  { city: "Culpeper", state: "VA", count: 9, lat: 38.4732, lng: -77.9967 },
  { city: "Derwood", state: "MD", count: 2, lat: 39.1173, lng: -77.1611 },
  { city: "Fredericksburg", state: "VA", count: 83, lat: 38.3032, lng: -77.4605 },
  { city: "Franconia", state: "VA", count: 2, lat: 38.7821, lng: -77.1464 },
  { city: "Glenn Dale", state: "MD", count: 4, lat: 38.9876, lng: -76.8205 },
  { city: "Haymarket", state: "VA", count: 3, lat: 38.8121, lng: -77.6364 },
  { city: "Herndon", state: "VA", count: 1, lat: 38.9696, lng: -77.3861 },
  { city: "Hollywood", state: "MD", count: 1, lat: 38.3451, lng: -76.5713 },
  { city: "Hyattsville", state: "MD", count: 2, lat: 38.9559, lng: -76.9455 },
  { city: "Ijamsville", state: "MD", count: 3, lat: 39.3604, lng: -77.3225 },
  { city: "King George", state: "VA", count: 37, lat: 38.2682, lng: -77.1844 },
  { city: "Leesburg", state: "VA", count: 2, lat: 39.1157, lng: -77.5636 },
  { city: "Lorton", state: "VA", count: 12, lat: 38.7043, lng: -77.2278 },
  { city: "Manassas", state: "VA", count: 25, lat: 38.7509, lng: -77.4753 },
  { city: "McLean", state: "VA", count: 6, lat: 38.9339, lng: -77.1773 },
  { city: "Middleburg", state: "VA", count: 2, lat: 38.9687, lng: -77.7355 },
  { city: "Montclair", state: "VA", count: 5, lat: 38.6109, lng: -77.3397 },
  { city: "Montross", state: "VA", count: 3, lat: 38.0951, lng: -76.8275 },
  { city: "National Harbor", state: "MD", count: 1, lat: 38.7829, lng: -77.0156 },
  { city: "Nationals Park", state: "D.C.", count: 1, lat: 38.873, lng: -77.0074 },
  { city: "Orange", state: "VA", count: 2, lat: 38.2454, lng: -78.1108 },
  { city: "Reedville", state: "VA", count: 6, lat: 37.8421, lng: -76.2758 },
  { city: "Reston", state: "VA", count: 13, lat: 38.9586, lng: -77.357 },
  { city: "Silver Spring", state: "MD", count: 1, lat: 38.9907, lng: -77.0261 },
  { city: "South Riding", state: "VA", count: 5, lat: 38.9209, lng: -77.5039 },
  { city: "Spotsylvania", state: "VA", count: 28, lat: 38.2001, lng: -77.5894 },
  { city: "Stafford", state: "VA", count: 34, lat: 38.4221, lng: -77.4083 },
  { city: "Towson", state: "MD", count: 2, lat: 39.4015, lng: -76.6019 },
  { city: "Washington", state: "D.C.", count: 4, lat: 38.9072, lng: -77.0369 },
  { city: "Waterford", state: "VA", count: 1, lat: 39.1868, lng: -77.6097 },
  { city: "Woodbridge", state: "VA", count: 12, lat: 38.6582, lng: -77.2497 },
  { city: "Woodford", state: "VA", count: 5, lat: 38.1137, lng: -77.4097 },
];


const SERVICE_AREA_MARKER_POSITIONS: Record<string, { x: number; y: number }> = {
  "Annandale, VA": { x: 53.1, y: 41.2 },
  "Arlington, VA": { x: 56.8, y: 37.8 },
  "Ashland, VA": { x: 36.8, y: 98.2 },
  "Bowling Green, VA": { x: 45.6, y: 95.2 },
  "Bridgeport, WV": { x: 8.8, y: 48.4 },
  "Bristow, VA": { x: 30.4, y: 48.2 },
  "Bumpass, VA": { x: 30.4, y: 86.5 },
  "College Park, MD": { x: 67.7, y: 26.9 },
  "Culpeper, VA": { x: 13.4, y: 67.2 },
  "Derwood, MD": { x: 58.5, y: 14.4 },
  "Fredericksburg, VA": { x: 39.8, y: 83.0 },
  "Franconia, VA": { x: 55.0, y: 45.0 },
  "Glenn Dale, MD": { x: 74.1, y: 25.7 },
  "Haymarket, VA": { x: 27.7, y: 39.5 },
  "Herndon, VA": { x: 39.6, y: 27.4 },
  "Hollywood, MD": { x: 74.7, y: 43.3 },
  "Hyattsville, MD": { x: 65.9, y: 29.6 },
  "Ijamsville, MD": { x: 54.6, y: 4.2 },
  "King George, VA": { x: 53.3, y: 86.3 },
  "Leesburg, VA": { x: 31.9, y: 13.2 },
  "Lorton, VA": { x: 49.5, y: 50.8 },
  "Manassas, VA": { x: 36.3, y: 45.5 },
  "McLean, VA": { x: 55.4, y: 33.0 },
  "Middleburg, VA": { x: 23.1, y: 25.8 },
  "Montclair, VA": { x: 70.8, y: 94.6 },
  "Montross, VA": { x: 75.7, y: 82.8 },
  "National Harbor, MD": { x: 62.9, y: 48.0 },
  "Nationals Park, D.C.": { x: 62.8, y: 39.4 },
  "Orange, VA": { x: 23.4, y: 82.5 },
  "Reedville, VA": { x: 88.2, y: 90.3 },
  "Reston, VA": { x: 42.4, y: 26.8 },
  "Silver Spring, MD": { x: 65.6, y: 24.4 },
  "South Riding, VA": { x: 36.6, y: 35.2 },
  "Spotsylvania, VA": { x: 40.0, y: 78.0 },
  "Stafford, VA": { x: 42.2, y: 73.7 },
  "Towson, MD": { x: 81.2, y: 5.0 },
  "Washington, D.C.": { x: 63.7, y: 35.9 },
  "Waterford, VA": { x: 29.2, y: 9.7 },
  "Woodbridge, VA": { x: 46.9, y: 57.8 },
  "Woodford, VA": { x: 37.0, y: 97.0 },
};
const SERVICE_AREA_MAX_COUNT = Math.max(...SERVICE_AREA_POINTS.map((point) => point.count));

function getMarkerScale(count: number) {
  return Math.sqrt(count / SERVICE_AREA_MAX_COUNT);
}

function getMarkerSize(count: number) {
  return Math.round(30 + getMarkerScale(count) * 42);
}

function getMarkerFontSize(count: number) {
  return Math.round(12 + getMarkerScale(count) * 8);
}

function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps) return Promise.resolve();
  if (window.__arsenalGoogleMapsPromise) return window.__arsenalGoogleMapsPromise;

  window.__arsenalGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Google Maps."));
    document.head.appendChild(script);
  });

  return window.__arsenalGoogleMapsPromise;
}

function Hero() {
  return (
    <section className="homepage-built-mobile-padding relative overflow-hidden px-5 pb-11 pt-24 text-center @sm:px-10 @sm:pb-16 @sm:pt-32" style={{ background: "var(--surface-default)", color: "var(--text-default)" }}>
      <style>{`
        .contact-hero-track {
          position: absolute;
          top: clamp(128px, 13vw, 190px);
          width: min(27vw, 360px);
          max-width: none;
          pointer-events: none;
          z-index: 0;
        }
        .contact-hero-track-left {
          left: max(-318px, calc(50% - 993px));
          transform: translateY(-50%) rotate(180deg);
          -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 76%, transparent 100%);
          mask-image: linear-gradient(90deg, #000 0%, #000 76%, transparent 100%);
        }
        .contact-hero-track-right {
          right: max(-318px, calc(50% - 993px));
          transform: translateY(-50%);
          -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 76%, transparent 100%);
          mask-image: linear-gradient(90deg, #000 0%, #000 76%, transparent 100%);
        }
        @media (max-width: 1160px) {
          .contact-hero-track {
            display: none;
          }
        }
      `}</style>
      <img src={whatWeOfferAccent} alt="" className="contact-hero-track contact-hero-track-left" />
      <img src={whatWeOfferAccent} alt="" className="contact-hero-track contact-hero-track-right" />
      <div className="relative z-10 mx-auto max-w-[1245px]">
        <h1 className="mx-auto mb-8 max-w-none text-[clamp(48px,6vw,86px)] font-bold italic leading-none min-[1180px]:whitespace-nowrap" style={{ color: "var(--text-headlines)" }}>
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

function ServiceAreaMapFallback() {
  return (
    <div className="service-area-map-fallback" role="img" aria-label="Arsenal Events service area count map">
      {SERVICE_AREA_POINTS.map((point) => {
        const position = SERVICE_AREA_MARKER_POSITIONS[`${point.city}, ${point.state}`];
        const markerSize = getMarkerSize(point.count);
        return (
          <button
            key={`${point.city}-${point.state}`}
            className="service-area-map-marker"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${markerSize}px`,
              height: `${markerSize}px`,
              fontSize: `${getMarkerFontSize(point.count)}px`,
              zIndex: 2,
            }}
            aria-label={`${point.city}, ${point.state}: ${point.count} ${point.count === 1 ? "event" : "events"}`}
            type="button"
          >
            <span>{point.count}</span>
            <span className="service-area-map-tooltip">{point.city}, {point.state}</span>
          </button>
        );
      })}
    </div>
  );
}
function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    let cancelled = false;
    let map: any;
    let overlays: any[] = [];
    let resizeListener: any;

    setLoadState("loading");

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current || !window.google?.maps) return;

        const google = window.google;
        map = new google.maps.Map(mapRef.current, {
          center: { lat: 38.45, lng: -77.35 },
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c8d9df" }] },
            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f4eadc" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#b8a995" }] },
          ],
        });

        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        class CountMarkerOverlay extends google.maps.OverlayView {
          private div?: HTMLButtonElement;
          constructor(private point: ServiceAreaPoint) {
            super();
          }
          onAdd() {
            const div = document.createElement("button");
            const markerSize = getMarkerSize(this.point.count);
            div.type = "button";
            div.className = "service-area-map-marker";
            div.style.width = `${markerSize}px`;
            div.style.height = `${markerSize}px`;
            div.style.fontSize = `${getMarkerFontSize(this.point.count)}px`;
            div.style.zIndex = "2";
            div.innerHTML = `<span>${this.point.count}</span><span class="service-area-map-tooltip">${this.point.city}, ${this.point.state}</span>`;
            div.setAttribute("aria-label", `${this.point.city}, ${this.point.state}: ${this.point.count} ${this.point.count === 1 ? "event" : "events"}`);
            div.addEventListener("mouseenter", () => { div.style.zIndex = "12"; });
            div.addEventListener("mouseleave", () => { div.style.zIndex = "2"; });
            div.addEventListener("focus", () => { div.style.zIndex = "12"; });
            div.addEventListener("blur", () => { div.style.zIndex = "2"; });
            div.addEventListener("click", () => {
              infoWindow.setContent(`<div class="service-area-map-info"><strong>${this.point.city}, ${this.point.state}</strong><span>${this.point.count} ${this.point.count === 1 ? "event" : "events"}</span></div>`);
              infoWindow.setPosition({ lat: this.point.lat, lng: this.point.lng });
              infoWindow.open({ map });
            });
            this.div = div;
            this.getPanes()?.overlayMouseTarget.appendChild(div);
          }
          draw() {
            if (!this.div) return;
            const projection = this.getProjection();
            const position = projection.fromLatLngToDivPixel(new google.maps.LatLng(this.point.lat, this.point.lng));
            if (!position) return;
            this.div.style.left = `${position.x}px`;
            this.div.style.top = `${position.y}px`;
          }
          onRemove() {
            this.div?.remove();
            this.div = undefined;
          }
        }

        SERVICE_AREA_POINTS.forEach((point) => {
          bounds.extend({ lat: point.lat, lng: point.lng });
          const overlay = new CountMarkerOverlay(point);
          overlay.setMap(map);
          overlays.push(overlay);
        });

        map.fitBounds(bounds, 56);
        resizeListener = google.maps.event.addListenerOnce(map, "idle", () => {
          if (map.getZoom() > 8) map.setZoom(8);
        });
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });

    return () => {
      cancelled = true;
      overlays.forEach((overlay) => overlay.setMap(null));
      overlays = [];
      if (resizeListener) window.google?.maps?.event?.removeListener(resizeListener);
    };
  }, [apiKey]);

  return (
    <div className="service-area-map-shell">
      <style>{`
        .service-area-map-shell {
          position: relative;
          min-height: clamp(420px, 52vw, 620px);
          overflow: visible;
          border-radius: 4px;
          background: #f4eadc;
          box-shadow: 0 6px 18px rgba(35,41,67,0.16);
        }
        .service-area-google-map,
        .service-area-map-fallback {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .service-area-map-fallback {
          overflow: visible;
          background-image: linear-gradient(rgba(255,250,240,0.12), rgba(255,250,240,0.12)), url(${serviceAreaPlaceholderMap});
          background-size: cover;
          background-position: center;
        }
        .service-area-map-marker {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #fffaf0;
          border-radius: 999px;
          background: var(--action-tertiary-default);
          color: var(--action-tertiary-text);
          font-family: inherit;
          font-weight: 700;
          line-height: 1;
          box-shadow: 0 8px 18px rgba(35,41,67,0.22);
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
        }
        .service-area-map-marker:hover,
        .service-area-map-marker:focus-visible {
          z-index: 12 !important;
          transform: translate(-50%, -50%) scale(1.08);
          background: var(--color-orange-brand);
          box-shadow: 0 10px 20px rgba(35,41,67,0.28);
        }
        .service-area-map-marker > span:first-child { transform: translateY(1px); }
        .service-area-map-tooltip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          z-index: 13;
          width: max-content;
          max-width: 190px;
          border-radius: 4px;
          background: var(--surface-dark);
          padding: 7px 10px 6px;
          color: var(--text-inverse);
          font-size: 13px;
          font-weight: 700;
          font-style: italic;
          line-height: 1;
          letter-spacing: 0;
          box-shadow: 0 8px 18px rgba(35,41,67,0.2);
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 4px);
          transition: opacity 0.16s ease, transform 0.16s ease;
          white-space: nowrap;
        }
        .service-area-map-tooltip::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid var(--surface-dark);
          transform: translateX(-50%);
        }
        .service-area-map-marker:hover .service-area-map-tooltip,
        .service-area-map-marker:focus-visible .service-area-map-tooltip {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        .service-area-map-marker:focus-visible {
          outline: 3px solid var(--decorative-highlight);
          outline-offset: 4px;
        }
        .service-area-map-status {
          position: absolute;
          left: 16px;
          top: 16px;
          z-index: 13;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          background: rgba(255,250,240,0.92);
          padding: 8px 12px;
          color: var(--text-default);
          font-size: 13px;
          font-weight: 700;
        }
        .service-area-map-info {
          display: grid;
          gap: 4px;
          color: #232943;
          font-family: Cooper Hewitt, Arial, sans-serif;
          font-size: 14px;
        }
        .service-area-map-info strong {
          color: var(--text-accent);
          font-size: 16px;
          font-style: italic;
        }
        @media (max-width: 750px) {
          .service-area-map-shell { min-height: 520px; }
          .service-area-map-marker { border-width: 2px; }
        }
      `}</style>
      {apiKey ? <div ref={mapRef} className="service-area-google-map" aria-label="Arsenal Events service area map" /> : <ServiceAreaMapFallback />}
      {loadState === "loading" ? <div className="service-area-map-status"><MapPin size={16} /> Loading service map</div> : null}
      {loadState === "error" ? <div className="service-area-map-status"><MapPin size={16} /> Map unavailable</div> : null}
      {!apiKey ? <div className="service-area-map-status"><MapPin size={16} /> Placeholder service map</div> : null}
    </div>
  );
}

function ServiceArea() {
  return (
    <PageBand className="!pt-11 @sm:!pt-16">
      <div id="service-area" className="scroll-mt-20">
        <SectionIntro
          title="Service Area"
          copy="Placeholder supporting headline copy with a sentence or two leading into the Runner's Arsenal blog and its benefits."
        />
        <div className="mx-auto max-w-[1180px]">
          <ServiceAreaMap />
        </div>
      </div>
    </PageBand>
  );
}

function PreferToTalk() {
  return (
    <PageBand>
      <style>{`
        .prefer-talk-cta {
          background: var(--surface-dark);
          color: var(--text-inverse);
          --ae-button-hover: #191f36;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .prefer-talk-cta:hover {
            background: var(--ae-button-hover);
            transform: skewX(-8deg);
          }
          .prefer-talk-cta:hover > p {
            transform: skewX(8deg);
          }
        }
      `}</style>
      <a
        href="tel:+15400000000"
        className="prefer-talk-cta mx-auto block max-w-[465px] rounded-[10px] px-6 py-6 text-center no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--action-tertiary-default)]"
      >
        <p className="text-[clamp(21px,2.25vw,29px)] font-bold leading-tight transition-transform"><Phone className="mr-2 inline" size={26} /> Prefer to Talk?<br />Call us at 540 - XXX - XXXX.</p>
      </a>
    </PageBand>
  );
}

export default function ContactPage() {
  return (
    <main style={{ background: "var(--surface-default)" }}>
      <Hero />
      <ServiceArea />
      <div id="contact-form" className="scroll-mt-20">
        <FormWithFAQ mode="contact" title="Contact Form" copy="Placeholder - a short line inviting the user to fill out the form and setting expectations for response time." />
      </div>
      <PreferToTalk />
    </main>
  );
}
