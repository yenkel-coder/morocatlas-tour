import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "fr" | "en";

const STORAGE_KEY = "mat-lang";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    // ignore
  }
  return null;
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "fr";
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    if (l?.toLowerCase().startsWith("fr")) return "fr";
    if (l?.toLowerCase().startsWith("en")) return "en";
  }
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start at "fr" to match the server-rendered <html lang="fr">;
  // auto-detect happens client-side after mount to avoid a hydration mismatch.
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = getStoredLanguage();
    setLanguageState(stored ?? detectBrowserLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
