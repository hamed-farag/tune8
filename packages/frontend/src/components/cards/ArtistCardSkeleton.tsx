"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function ArtistCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group p-1">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border border-purple-500/30 w-full overflow-hidden rounded-xl animate-pulse"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Portrait Image Section with spotlight */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Portrait frame skeleton */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50">
                <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={cn(
                "flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 sm:h-4 md:h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>

                {/* Artist badge skeleton */}
                <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-purple-500/30 w-fit">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with stage theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3",
                  isRTL && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-12 sm:w-14 md:w-16 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-12 sm:w-14 md:w-16 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
