"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fr }                   from "./translations/fr";
import { en }                   from "./translations/en";
import type { Translations }    from "./translations/types";

export type Lang = "fr" | "en";

const translations: Record<Lang, Translations> = { fr, en };

const STORAGE_KEY = "cpdi_lang";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang:    "fr",
  setLang: () => {},
  t:       fr,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  /* Restore the saved language on mount (client only). Initial render stays
     "fr" to match the server-rendered HTML (no hydration mismatch); if the
     visitor previously chose another language we swap right after hydration. */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* localStorage unavailable (private mode, etc.) — ignore */
    }
  }, []);

  /* Persist every change so the choice survives reloads and full navigations. */
  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      /* ignore persistence failures */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
