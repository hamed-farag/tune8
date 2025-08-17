"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function MovieCardSkeleton() {
  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-indigo-900/10 to-purple-900/10 border border-indigo-500/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-32">
            {/* Film Strip Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Film strip background skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                {/* Film perforations skeleton */}
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-between py-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-between py-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Movie poster overlay skeleton */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Rating badge skeleton */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full px-2 py-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-4 h-2 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>

                {/* Movie badge skeleton */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-indigo-500/30 w-fit">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Metadata skeleton with cinema theme */}
              <div className="flex items-center gap-3">
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
