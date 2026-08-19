import { RouterProvider } from "react-router";
import { router } from "./routes";
import "@fontsource/cooper-hewitt/400.css";
import "@fontsource/cooper-hewitt/400-italic.css";
import "@fontsource/cooper-hewitt/500.css";
import "@fontsource/cooper-hewitt/500-italic.css";
import "@fontsource/cooper-hewitt/600.css";
import "@fontsource/cooper-hewitt/600-italic.css";
import "@fontsource/cooper-hewitt/700.css";
import "@fontsource/cooper-hewitt/700-italic.css";

export default function App() {
  return <RouterProvider router={router} />;
}
