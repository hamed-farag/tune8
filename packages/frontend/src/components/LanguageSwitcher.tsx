"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getDirection } from "@/lib/utils";

const languages = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (languageCode: string) => {
    // Extract the current path without the locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
    const newPath = `/${languageCode}${pathWithoutLocale || ""}`;
    router.push(newPath);
  };

  // Get current language from pathname
  const currentLanguage = pathname.startsWith("/en") ? "en" : "ar";
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className={cn("flex items-center space-x-2", isRTL && "space-x-reverse")}>
      <Globe size={16} className="text-gray-400" />
      {languages.map(language => (
        <Button
          key={language.code}
          variant={currentLanguage === language.code ? "default" : "ghost"}
          size="sm"
          onClick={() => handleLanguageChange(language.code)}
          className="text-xs"
        >
          <span className={cn(isRTL ? "ml-1" : "mr-1")}>{language.flag}</span>
          {language.name}
        </Button>
      ))}
    </div>
  );
}
