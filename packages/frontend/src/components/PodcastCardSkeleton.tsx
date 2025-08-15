"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function PodcastCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-40 md:w-48">
      <Card compact className="bg-gray-800 border-gray-700">
        <CardContent className="p-3 sm:p-4">
          <div className="relative">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-700 mb-2 sm:mb-3 mx-auto animate-pulse" />
            <div className="text-center">
              <div className="h-3 sm:h-4 bg-gray-700 rounded mb-1 sm:mb-2 animate-pulse" />
              <div className="h-2 sm:h-3 bg-gray-700 rounded w-3/4 mx-auto animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
