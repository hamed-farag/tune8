"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function MusicTrackCardSkeleton() {
  return (
    <div className="relative group">
      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-green-900/10 to-blue-900/10 border border-green-500/30 w-full overflow-hidden animate-pulse"
      >
        <CardContent className="p-0">
          <div className="flex h-32">
            {/* Waveform Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Audio waveform background skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                {/* Waveform bars skeleton */}
                <div className="flex items-end gap-1 h-16">
                  {[2, 4, 6, 8, 6, 4, 2, 3, 5, 7, 5, 3].map((height, index) => (
                    <div
                      key={index}
                      className="w-1 bg-gray-700 rounded-full animate-pulse"
                      style={{ height: `${height * 4}px`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Album artwork overlay skeleton */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-600/30 to-blue-600/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Volume indicator skeleton */}
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
              </div>

              {/* Enhanced Metadata skeleton with audio theme */}
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
                  <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
