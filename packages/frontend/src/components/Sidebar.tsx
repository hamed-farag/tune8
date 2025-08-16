"use client";

import { Home, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getDirection, cn } from "@/lib/utils";
import { useI18n } from "@/hooks/useI18n";

import LanguageSwitcher from "./LanguageSwitcher";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  locale: string;
}

export default function Sidebar({ isOpen = true, onToggle, locale }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const direction = getDirection(locale);
  const isRTL = direction === "rtl";
  const { t } = useI18n();

  const handleHomeClick = () => {
    router.push(`/${locale}`);
    // Close sidebar on mobile after navigation
    if (onToggle) {
      onToggle();
    }
  };

  const isHomeActive = pathname === `/${locale}`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 z-50",
          "w-64 bg-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out",
          isRTL ? "right-0" : "left-0",
          isOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full lg:translate-x-0"
              : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile header with close button */}
        <div
          className={cn(
            "flex items-center justify-between p-4 lg:hidden",
            isRTL && "flex-row-reverse"
          )}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            T8
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-300 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Desktop Logo */}
        <div className="p-6 hidden lg:block">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            T8
          </div>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 px-6")}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={cn(
                  "w-full transition-colors cursor-pointer",
                  isHomeActive
                    ? "text-white bg-gray-700 border-l-4 border-blue-500"
                    : "text-gray-300 hover:text-white hover:bg-gray-700",
                  isRTL ? "justify-start" : "justify-start"
                )}
                onClick={handleHomeClick}
              >
                <Home size={20} />
                <span className={cn(isRTL ? "mr-3" : "ml-3")}>{t("sidebar.home")}</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <p className={cn("text-xs text-gray-400 mb-2", isRTL ? "text-right" : "text-left")}>
            {t("sidebar.footer")}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
