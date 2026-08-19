import { createBrowserRouter, Outlet } from "react-router";
import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Nav, Footer, AnnotationKey } from "./shared";
import HomePage from "./HomePage";
import ForRaceDirectorsPage from "./ForRaceDirectorsPage";
import RacesResultsPage from "./RacesResultsPage";
import AboutPage from "./AboutPage";
import ResourcesPage from "./ResourcesPage";
import ContactPage from "./ContactPage";

function ViewToggle({
  mode,
  setMode,
}: {
  mode: "desktop" | "mobile";
  setMode: (m: "desktop" | "mobile") => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-px bg-card border border-border shadow-sm">
      <button
        onClick={() => setMode("desktop")}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
          mode === "desktop"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Monitor size={12} />
        Desktop
      </button>
      <button
        onClick={() => setMode("mobile")}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
          mode === "mobile"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Smartphone size={12} />
        Mobile
      </button>
    </div>
  );
}

function Root() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className={`@container min-h-screen bg-background font-[Inter,sans-serif] transition-all duration-300 ${mode === "mobile" ? "max-w-[390px] mx-auto border-x border-border shadow-xl" : ""}`}>
      <Nav />
      <Outlet />
      <Footer />
      {mode === "desktop" && <AnnotationKey />}
      <ViewToggle mode={mode} setMode={setMode} />
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <main className="max-w-[1440px] mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-1.5 border border-border px-2 py-0.5 mb-6">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
          Wireframe placeholder
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground text-sm">
        This page has not been wireframed yet.
      </p>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "for-race-directors", Component: ForRaceDirectorsPage },
      { path: "races", Component: RacesResultsPage },
      { path: "about", Component: AboutPage },
      { path: "resources", Component: ResourcesPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: () => <Placeholder title="Page Not Found" /> },
    ],
  },
]);
