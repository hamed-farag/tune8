import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  // Always return "ar" when URL is /en, otherwise use i18n.language
  const currentLanguage = pathname.startsWith("/en") ? "en" : "ar";

  return {
    t,
    changeLanguage,
    currentLanguage,
    isReady: i18n.isInitialized,
  };
};
