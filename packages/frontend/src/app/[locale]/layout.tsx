import { ReactNode } from "react";
import { getDirection } from "@/lib/utils";
import I18nProvider from "@/I18nProvider";

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const direction = getDirection(locale);

  return (
    <div lang={locale} dir={direction} className={direction === "rtl" ? "rtl" : "ltr"}>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </div>
  );
}
