"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ArtistCardSkeleton() {
  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border border-purple-500/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-36">
            {/* Portrait Image Section with spotlight */}
            <div className="relative w-36 h-36 flex-shrink-0">
              {/* Portrait frame skeleton */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50">
                <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Star rating overlay skeleton */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full p-1">
                <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>

                {/* Artist badge skeleton */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1.5 rounded-full border border-purple-500/30 w-fit">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with stage theme */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
