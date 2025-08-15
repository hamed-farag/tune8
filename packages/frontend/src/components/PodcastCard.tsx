"use client";

import { Card, CardContent } from "@/components/ui/card";

interface PodcastCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  isPlaceholder?: boolean;
}

export default function PodcastCard({
  id: _id,
  title,
  artist,
  imageUrl: _imageUrl,
  isPlaceholder = false,
}: PodcastCardProps) {
  return (
    <div className="flex-shrink-0 w-36 sm:w-40 md:w-48">
      <Card compact className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
        <CardContent className="p-3 sm:p-4">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-700 mb-2 sm:mb-3 mx-auto">
              {isPlaceholder ? (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">No Image</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-red-500 flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base md:text-lg">
                    فنجان
                  </span>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-sm text-gray-100 leading-tight group-hover:text-white transition-colors duration-200 line-clamp-2 mb-1">
                {title}
              </h3>
              <p className="text-gray-400 text-xs font-medium line-clamp-1">{artist}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
