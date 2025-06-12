import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import { LanguageProvider } from "./context/language-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <NextUIProvider>
        <main className="text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
