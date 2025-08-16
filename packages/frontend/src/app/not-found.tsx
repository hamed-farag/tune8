"use client";

import { useI18n } from "@/hooks/useI18n";
import I18nProvider from "@/I18nProvider";
import { usePathname } from "next/navigation";
import { getDirection } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [locale, setLocale] = useState("ar"); // Default to Arabic
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    // Detect locale from URL path on client side
    const detectedLocale = pathname.startsWith("/en") ? "en" : "ar";
    setLocale(detectedLocale);
  }, [pathname]);

  const direction = getDirection(locale);

  // Don't render until we're on the client to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <I18nProvider locale={locale}>
      <NotFoundContent locale={locale} direction={direction} />
    </I18nProvider>
  );
}

function NotFoundContent({ locale, direction }: { locale: string; direction: string }) {
  const { t } = useI18n();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8"
      dir={direction}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{t("notFound.title")}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t("notFound.subtitle")}</h2>
        <p className="text-gray-600 mb-8">{t("notFound.description")}</p>
        <a
          href={`/${locale}`}
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t("notFound.goHome")}
        </a>
      </div>
    </div>
  );
}
