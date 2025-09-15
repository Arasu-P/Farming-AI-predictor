// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState } from "react";
import { translations } from "@/i18n/translations";

type Language = "en" | "kn";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations["en"];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "kn" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
