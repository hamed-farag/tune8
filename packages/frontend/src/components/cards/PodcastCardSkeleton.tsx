"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function PodcastCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group p-1">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-orange-900/20 to-red-900/20 border border-orange-500/30 w-full overflow-hidden rounded-xl animate-pulse shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Microphone Studio Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"
              )}
            >
              {/* Studio background with sound waves skeleton */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg flex items-center justify-center">
                {/* Sound wave circles skeleton */}
                <div className="relative w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16">
                  <div className="absolute inset-0 border-2 border-gray-600 rounded-full animate-pulse"></div>
                  <div
                    className="absolute inset-2 border-2 border-gray-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute inset-4 border-2 border-gray-600 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Podcast artwork overlay skeleton */}
              <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-600/30 to-red-600/30 flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Microphone indicator skeleton */}
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

                  {/* Podcast badge skeleton */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-orange-500/30 w-fit">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-10 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with studio theme */}
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
