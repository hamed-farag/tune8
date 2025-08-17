"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function EpisodeCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-emerald-900/10 to-teal-900/10 border border-emerald-500/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Episode Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Podcast wave background skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg flex items-center justify-center">
                {/* Audio wave visualization skeleton */}
                <div className="flex items-end gap-0.5 h-12">
                  {[3, 5, 7, 9, 7, 5, 3, 4, 6, 8, 6, 4, 2, 5, 7, 5].map((height, index) => (
                    <div
                      key={index}
                      className="w-0.5 bg-gray-700 rounded-full animate-pulse"
                      style={{ height: `${height * 2}px`, animationDelay: `${index * 0.05}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Episode artwork overlay skeleton */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-emerald-600/30 to-teal-600/30 flex items-center justify-center">
                  <div className="text-emerald-400 text-xs font-medium bg-gray-700 px-2 py-1 rounded animate-pulse">
                    EP
                  </div>
                </div>
              </div>

              {/* Episode number badge skeleton */}
              <div className="absolute top-2 left-2 bg-gray-600 rounded-full px-2 py-1">
                <div className="w-4 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>

              {/* Download indicator skeleton */}
              <div className="absolute top-2 right-2 bg-gray-600 rounded-full p-1">
                <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>

                {/* Episode badge skeleton */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Progress bar and metadata skeleton */}
              <div className="space-y-2">
                {/* Progress bar skeleton */}
                <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                  <div className="bg-gray-700 h-1.5 rounded-full w-1/3 animate-pulse"></div>
                </div>

                {/* Enhanced Metadata skeleton with episode theme */}
                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                  <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                    <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-10 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                    <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                    <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
