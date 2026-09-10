import { useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router";
import { Nav, Footer } from "./shared";
import HomePage from "./HomePage";
import ForRaceDirectorsPage from "./ForRaceDirectorsPage";
import RacesResultsPage from "./RacesResultsPage";
import AboutPage from "./AboutPage";
import ResourcesPage from "./ResourcesPage";
import ResourceSinglePage from "./ResourceSinglePage";
import ContactPage from "./ContactPage";
import { AeButton, SHARED_PATTERN_CSS } from "./sitePatterns";

function Root() {
  return (
    <div className="@container min-h-screen bg-background font-[Inter,sans-serif]">
      <style>{SHARED_PATTERN_CSS}</style>
      <ScrollToLocation />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

function Placeholder() {
  return (
    <main
      className="homepage-built-mobile-padding px-6 py-16 text-center @sm:py-24"
      style={{ background: "var(--surface-subtle)", color: "var(--text-default)" }}
    >
      <div className="mx-auto max-w-[1245px]">
        <p
          className="text-[clamp(170px,22vw,360px)] font-bold leading-none"
          style={{ color: "var(--action-tertiary-default)", WebkitTextStroke: "8px #005a56" }}
        >
          404
        </p>
        <h1
          className="mx-auto mb-7 max-w-[1100px] text-[clamp(48px,7vw,92px)] font-bold italic leading-none"
          style={{ color: "var(--text-headlines)" }}
        >
          Looks Like You Went Off Course...
        </h1>
        <p className="mx-auto mb-12 max-w-[940px] text-[clamp(22px,2.4vw,36px)] font-medium leading-snug">
          This page isn't on the race route. Let's get you pointed towards the finish line.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 @sm:flex-row">
          <AeButton to="/">Go Home</AeButton>
          <AeButton to="/races-results">Find a Race</AeButton>
        </div>
      </div>
    </main>
  );
}

function ScrollToLocation() {
  const location = useLocation();

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (location.hash) {
          const targetId = decodeURIComponent(location.hash.slice(1));
          document.getElementById(targetId)?.scrollIntoView();
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function LegacyRaceDirectorsRedirect() {
  const location = useLocation();
  return <Navigate to={{ pathname: "/race-director-services", search: location.search, hash: location.hash }} replace />;
}

function LegacyRacesRedirect() {
  const location = useLocation();
  return <Navigate to={{ pathname: "/races-results", search: location.search, hash: location.hash }} replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "race-director-services", Component: ForRaceDirectorsPage },
      { path: "for-race-directors", Component: LegacyRaceDirectorsRedirect },
      { path: "races-results", Component: RacesResultsPage },
      { path: "races", Component: LegacyRacesRedirect },
      { path: "about", Component: AboutPage },
      { path: "resources", Component: ResourcesPage },
      { path: "resources/understanding-your-race-results", Component: ResourceSinglePage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: Placeholder },
    ],
  },
]);


