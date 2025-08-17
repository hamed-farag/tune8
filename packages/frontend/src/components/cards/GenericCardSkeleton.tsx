"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function GenericCardSkeleton() {
  return (
    <div className="relative group">
      {/* Hexagonal background with gradient border skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-lg p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="bg-gray-900 rounded-lg h-full w-full"></div>
      </div>

      <Card
        compact
        className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-28">
            {/* Hexagonal Image Section */}
            <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 via-gray-700/20 to-gray-800/20 clip-path-hexagon">
                <div className="w-full h-full bg-gradient-to-br from-gray-600/30 to-gray-700/30 flex items-center justify-center clip-path-hexagon">
                  <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              </div>

              {/* Enhanced Metadata skeleton with gradient icons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-8 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}
