"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function TvShowCardSkeleton() {
  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-blue-900/10 to-cyan-900/10 border border-blue-500/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-32">
            {/* TV Screen Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* TV frame skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-lg border-4 border-gray-600">
                {/* TV screen bezel skeleton */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-black rounded-md">
                  {/* Screen content skeleton */}
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-sm flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center rounded-sm">
                      <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
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
              <div className="absolute top-2 right-2 bg-gray-600 rounded-full p-1">
                <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>

                {/* TV Show badge skeleton */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-3 py-1 rounded-full border border-blue-500/30 w-fit">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with TV theme */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
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
