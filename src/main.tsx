import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import Shell from "./shell/Shell";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Research from "./pages/Research";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Shell><Home /></Shell> },
  { path: "/education", element: <Shell><Education /></Shell> },
  { path: "/experience", element: <Shell><Experience /></Shell> },
  { path: "/research", element: <Shell><Research /></Shell> },
  { path: "/skills", element: <Shell><Skills /></Shell> },
  { path: "/certificates", element: <Shell><Certificates /></Shell> },
  { path: "/contact", element: <Shell><Contact /></Shell> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
