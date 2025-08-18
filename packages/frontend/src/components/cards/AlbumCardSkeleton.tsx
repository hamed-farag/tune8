"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function AlbumCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-600 w-full overflow-hidden rounded-xl animate-pulse"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-28 sm:h-32 md:h-36", isRTL && "flex-row-reverse")}>
            {/* Enhanced Vinyl Record Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Enhanced record grooves skeleton */}
              <div className="absolute inset-2 sm:inset-3 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black ring-4 ring-gray-600 shadow-2xl">
                {/* Enhanced inner grooves skeleton */}
                <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black ring-2 ring-gray-500 shadow-inner"></div>
                <div className="absolute inset-6 sm:inset-8 rounded-full bg-gradient-to-br from-gray-900 to-black ring-1 ring-gray-400 shadow-inner"></div>
                <div className="absolute inset-8 sm:inset-10 rounded-full bg-gradient-to-br from-black to-gray-900 ring-1 ring-gray-300"></div>

                {/* Enhanced center label skeleton */}
                <div className="absolute inset-10 sm:inset-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-inner">
                  <div
                    className={cn(
                      "rounded-full bg-gray-700 flex items-center justify-center shadow-lg border-2 border-gray-600",
                      "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20"
                    )}
                  ></div>
                </div>

                {/* Enhanced center hole skeleton */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-black rounded-full shadow-inner"></div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div
              className={cn(
                "flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 sm:h-4 md:h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with vinyl theme */}
              <div
                className={cn(
                  "flex items-center justify-between gap-2 sm:gap-3 mt-3 sm:mt-4",
                  isRTL && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-8 sm:w-10 md:w-12 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-8 sm:w-10 md:w-12 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-8 sm:w-10 md:w-12 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
