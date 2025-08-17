"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function AlbumCardSkeleton() {
  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-600 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-32">
            {/* Vinyl Record Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Record grooves skeleton */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black ring-4 ring-gray-600">
                {/* Inner grooves skeleton */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black ring-2 ring-gray-500"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-900 to-black ring-1 ring-gray-400"></div>

                {/* Center label skeleton */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center"></div>
                </div>

                {/* Center hole skeleton */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              </div>

              {/* Enhanced Metadata skeleton with vinyl theme */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600">
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-10 h-3 bg-gray-700 rounded animate-pulse"></div>
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
