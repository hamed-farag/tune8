"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

export default function EpisodeCardSkeleton() {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <Card
      compact
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 w-full overflow-hidden"
    >
      <CardContent>
        <div className={cn("flex h-24", isRTL && "flex-row-reverse")}>
          {/* Image skeleton */}
          <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-600 animate-pulse" />

          {/* Content skeleton */}
          <div className={cn("flex-1 p-4 flex flex-col justify-between", isRTL && "text-right")}>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>

            {/* Metadata skeleton */}
            <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-700 rounded animate-pulse" />
                <div className="w-8 h-3 bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-700 rounded animate-pulse" />
                <div className="w-12 h-3 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
