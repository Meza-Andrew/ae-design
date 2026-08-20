import { createBrowserRouter, Outlet } from "react-router";
import { Nav, Footer } from "./shared";
import HomePage from "./HomePage";
import ForRaceDirectorsPage from "./ForRaceDirectorsPage";
import RacesResultsPage from "./RacesResultsPage";
import AboutPage from "./AboutPage";
import ResourcesPage from "./ResourcesPage";
import ContactPage from "./ContactPage";

function Root() {
  return (
    <div className="@container min-h-screen bg-background font-[Inter,sans-serif]">
      <Nav />
      <Outlet />
      <Footer />
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
