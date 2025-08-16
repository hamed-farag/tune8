"use client";

import { useI18n } from "@/hooks/useI18n";
import I18nProvider from "@/I18nProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <I18nProvider locale="ar">
      <ErrorContent error={error} reset={reset} />
    </I18nProvider>
  );
}

function ErrorContent({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useI18n();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8"
      dir="rtl"
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{t("error.title")}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t("error.subtitle")}</h2>
        <p className="text-gray-600 mb-8">{error.message || t("error.defaultMessage")}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t("error.tryAgain")}
          </button>
          <a
            href="/ar"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t("error.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}
