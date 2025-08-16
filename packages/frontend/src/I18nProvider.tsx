"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/lib/i18n";

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  useEffect(() => {
    // Initialize i18n with the current locale
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  // Always wrap with I18nextProvider to ensure proper context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
