"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function TvShowCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group p-1">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 border border-blue-500/30 w-full overflow-hidden rounded-xl animate-pulse shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* TV Screen Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"
              )}
            >
              {/* TV frame skeleton */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-lg border-4 border-gray-600">
                {/* TV screen bezel skeleton */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-black rounded-md">
                  {/* Screen content skeleton */}
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-sm flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center rounded-sm">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* TV controls skeleton */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Signal indicator skeleton */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gray-600 rounded-full p-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={cn(
                "flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="h-4 sm:h-5 md:h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 sm:h-4 md:h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  <div className="h-3 sm:h-4 md:h-5 bg-gray-700 rounded w-2/3 animate-pulse"></div>

                  {/* TV Show badge skeleton */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-blue-500/30 w-fit">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with TV theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2",
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
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-10 sm:w-12 md:w-14 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-10 sm:w-12 md:w-12 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                    "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                    "flex-1 min-w-0"
                  )}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                  <div className="w-10 sm:w-12 md:w-14 h-3 sm:h-3.5 md:h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
