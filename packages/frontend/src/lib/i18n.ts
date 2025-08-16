import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Sidebar
      sidebar: {
        home: "Home",
        footer: "Tune8 - v1.0.0 by HF",
      },
      // Common
      common: {
        loading: "Loading...",
        error: "Error",
        notFound: "Not Found",
        search: "Search",
        close: "Close",
      },
      // Error page
      error: {
        title: "500",
        subtitle: "Something went wrong!",
        defaultMessage: "An unexpected error occurred.",
        tryAgain: "Try again",
        goHome: "Go Home",
      },
      // Home page
      home: {
        title: "Tune8",
        description: "Your Music Platform",
        welcome: "Welcome to Tune8",
        subtitle: "Discover and enjoy your favorite music",
      },
      // Podcasts
      podcasts: {
        title: "Podcasts",
        episodes: "Episodes",
        duration: "Duration",
        releaseDate: "Release Date",
        noPodcasts: "No podcasts found",
        noEpisodes: "No episodes found",
      },
      // Not Found page
      notFound: {
        title: "404",
        subtitle: "Page Not Found",
        description: "The page you're looking for doesn't exist.",
        goHome: "Go Home",
      },
    },
  },
  ar: {
    translation: {
      // Sidebar
      sidebar: {
        home: "الرئيسية",
        footer: "Tune8 - v1.0.0 بواسطة HF",
      },
      // Common
      common: {
        loading: "جاري التحميل...",
        error: "خطأ",
        notFound: "غير موجود",
        search: "بحث",
        close: "إغلاق",
      },
      // Error page
      error: {
        title: "500",
        subtitle: "حدث خطأ ما!",
        defaultMessage: "حدث خطأ غير متوقع.",
        tryAgain: "حاول مرة أخرى",
        goHome: "العودة للرئيسية",
      },
      // Home page
      home: {
        title: "Tune8",
        description: "منصة الموسيقى الخاصة بك",
        welcome: "مرحباً بك في Tune8",
        subtitle: "اكتشف واستمتع بموسيقاك المفضلة",
      },
      // Podcasts
      podcasts: {
        title: "البودكاست",
        episodes: "الحلقات",
        duration: "المدة",
        releaseDate: "تاريخ الإصدار",
        noPodcasts: "لم يتم العثور على بودكاست",
        noEpisodes: "لم يتم العثور على حلقات",
      },
      // Not Found page
      notFound: {
        title: "404",
        subtitle: "الصفحة غير موجودة",
        description: "الصفحة التي تبحث عنها غير موجودة.",
        goHome: "العودة للرئيسية",
      },
    },
  },
};

// Initialize i18n for both server and client
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "ar",
  debug: process.env.NODE_ENV === "development",
  lng: "ar", // Set default language

  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
