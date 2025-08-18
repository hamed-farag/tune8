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
        contentType: "Type",
        contentTypes: {
          album: "Album",
          artist: "Artist",
          movie: "Movie",
          musicTrack: "Music Track",
          podcast: "Podcast",
          tvShow: "TV Show",
        },
        recommendedForYou: "Recommended for you",
        notAvailable: "Not Available",
      },
      // Search
      search: {
        startSearching: "Start searching to discover content",
        searchDescription:
          "Type in the search bar above to find your favorite music, podcasts, movies, TV shows, and more.",
        typeToSearch: "Type to search",
        noResults: "No results found",
        noResultsDescription:
          "We couldn't find any content matching your search. Try different keywords or browse our recommendations above.",
        allResults: "Search Results",
        podcastResults: "Podcast Results",
        artistResults: "Artist Results",
        albumResults: "Album Results",
        movieResults: "Movie Results",
        tvShowResults: "TV Show Results",
        musicTrackResults: "Music Track Results",
      },
      // Error page
      error: {
        title: "500",
        subtitle: "Something went wrong!",
        defaultMessage: "An unexpected error occurred.",
        tryAgain: "Try again",
        goHome: "Go Home",
        oops: "Oops! Something went wrong",
        retrying: "Retrying...",
        reloadPage: "Reload Page",
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
        contentType: "النوع",
        contentTypes: {
          album: "ألبوم",
          artist: "فنان",
          movie: "فيلم",
          musicTrack: "مقطع موسيقي",
          podcast: "بودكاست",
          tvShow: "مسلسل تلفزيوني",
        },
        recommendedForYou: "موصى به لك",
        notAvailable: "غير متوفر",
      },
      // Search
      search: {
        startSearching: "ابدأ البحث لاكتشاف المحتوى",
        searchDescription:
          "اكتب في شريط البحث أعلاه للعثور على موسيقاك المفضلة، البودكاست، الأفلام، المسلسلات التلفزيونية، والمزيد.",
        typeToSearch: "اكتب للبحث",
        noResults: "لم يتم العثور على نتائج",
        noResultsDescription:
          "لم نتمكن من العثور على أي محتوى يطابق بحثك. جرب كلمات مفتاحية مختلفة أو تصفح توصياتنا أعلاه.",
        allResults: "نتائج البحث",
        podcastResults: "نتائج البودكاست",
        artistResults: "نتائج الفنانين",
        albumResults: "نتائج الألبومات",
        movieResults: "نتائج الأفلام",
        tvShowResults: "نتائج المسلسلات التلفزيونية",
        musicTrackResults: "نتائج المقاطع الموسيقية",
      },
      // Error page
      error: {
        title: "500",
        subtitle: "حدث خطأ ما!",
        defaultMessage: "حدث خطأ غير متوقع.",
        tryAgain: "حاول مرة أخرى",
        goHome: "العودة للرئيسية",
        oops: "عذراً! حدث خطأ ما",
        retrying: "جاري المحاولة...",
        reloadPage: "إعادة تحميل الصفحة",
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
