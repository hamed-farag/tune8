"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function MovieCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group p-1">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-indigo-900/20 to-purple-900/20 border border-indigo-500/30 w-full overflow-hidden rounded-xl animate-pulse shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Film Strip Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Film strip background skeleton */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                {/* Film perforations skeleton */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-600 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1.5 sm:w-2 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-600 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Movie poster overlay skeleton */}
              <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Rating badge skeleton */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-4 h-2 bg-gray-700 rounded animate-pulse"></div>
                </div>
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

                  {/* Movie badge skeleton */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-indigo-500/30 w-fit">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with cinema theme */}
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
