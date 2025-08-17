"use client";

import { Play, Clock, Music, DollarSign, Volume2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesMusicTrack } from "@/services/types/itunes.types";

interface MusicTrackCardProps {
  track: ItunesMusicTrack;
}

export default function MusicTrackCard({ track }: MusicTrackCardProps) {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  return (
    <div className="relative group">
      {/* Audio wave background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-green-900/10 to-blue-900/10 border border-green-500/30 hover:border-green-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Waveform Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Audio waveform background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                {/* Waveform bars */}
                <div className="flex items-end gap-1 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  {[2, 4, 6, 8, 6, 4, 2, 3, 5, 7, 5, 3].map((height, index) => (
                    <div
                      key={index}
                      className="w-1 bg-gradient-to-t from-green-400 to-blue-400 rounded-full animate-pulse"
                      style={{ height: `${height * 4}px`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Album artwork overlay */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-green-600/30 to-blue-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: track.artworkUrl100 ? `url(${track.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!track.artworkUrl100 && <Music className="w-8 h-8 text-green-400" />}
                </div>
              </div>

              {/* Volume indicator */}
              <div className="absolute top-2 right-2 bg-green-500/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Volume2 className="w-3 h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-green-300 transition-colors duration-300"
                  )}
                >
                  {track.trackName}
                </h3>
                <p className={cn("text-green-400/80 text-sm font-medium line-clamp-1")}>
                  {track.artistName}
                </p>
                {track.collectionName && (
                  <p className={cn("text-gray-500 text-xs line-clamp-1")}>{track.collectionName}</p>
                )}
              </div>

              {/* Enhanced Metadata with audio theme */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {track.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Clock className="w-3 h-3 text-green-400" />
                    <span className="font-medium">{formatDuration(track.trackTimeMillis)}</span>
                  </div>
                )}
                {track.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-blue-400" />
                    <span className="font-medium">
                      {formatPrice(track.trackPrice, track.currency)}
                    </span>
                  </div>
                )}
                {track.primaryGenreName && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Music className="w-3 h-3 text-purple-400" />
                    <span className="font-medium">{track.primaryGenreName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
