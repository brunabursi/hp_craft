import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import App from "./App.tsx";
import Character from "./Routes/Character.tsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/character/:id" element={<Character />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={routes} />
  </>
);
