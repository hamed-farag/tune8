"use client";

import { Play, Clock, Music, DollarSign, Volume2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesMusicTrack } from "@/services/types/itunes.types";

interface MusicTrackCardProps {
  track: ItunesMusicTrack;
}

export default function MusicTrackCard({ track }: MusicTrackCardProps) {
  const { currentLanguage, t } = useI18n();
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
    <div className="relative group p-1">
      {/* Audio wave background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20 border border-green-500/30 hover:border-green-400/60 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300 shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Waveform Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"
              )}
            >
              {/* Audio waveform background */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                {/* Waveform bars */}
                <div className="flex items-end gap-1 h-12 sm:h-14 md:h-16 opacity-30 hover:opacity-100 transition-opacity duration-500">
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
              <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-green-600/30 to-blue-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: track.artworkUrl100 ? `url(${track.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!track.artworkUrl100 && (
                    <Music className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" />
                  )}
                </div>
              </div>

              {/* Volume indicator */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-500/80 rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-500 transform scale-75 hover:scale-100">
                <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-2 sm:inset-3 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white ml-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={cn(
                "flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-1.5">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h3
                        className={cn(
                          "font-bold text-gray-100 leading-tight hover:text-green-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={track.trackName || t("common.notAvailable")}
                      >
                        {track.trackName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Track Name</h4>
                        <p className="text-sm text-gray-600">
                          {track.trackName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <p
                        className={cn(
                          "text-green-400/80 font-medium hover:text-green-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-xs sm:text-sm",
                          "line-clamp-1"
                        )}
                        title={track.artistName || t("common.notAvailable")}
                      >
                        {track.artistName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Artist</h4>
                        <p className="text-sm text-gray-600">
                          {track.artistName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {track.collectionName && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-gray-500 font-medium hover:text-gray-400 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={track.collectionName}
                        >
                          {track.collectionName}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Album</h4>
                          <p className="text-sm text-gray-600">{track.collectionName}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!track.collectionName && (
                    <p
                      className={cn(
                        "text-gray-500 font-medium italic",
                        "text-xs sm:text-sm",
                        "line-clamp-1"
                      )}
                    >
                      {t("common.notAvailable")}
                    </p>
                  )}
                </div>
              </div>

              {/* Enhanced Metadata with audio theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400 mt-1.5 sm:mt-2",
                  isRTL && "flex-row-reverse"
                )}
              >
                {track.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-green-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDuration(track.trackTimeMillis)}
                        >
                          {formatDuration(track.trackTimeMillis)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Duration</h4>
                          <p className="text-xs text-gray-600">
                            {formatDuration(track.trackTimeMillis)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!track.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {track.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-blue-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatPrice(track.trackPrice, track.currency)}
                        >
                          {formatPrice(track.trackPrice, track.currency)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Price</h4>
                          <p className="text-xs text-gray-600">
                            {formatPrice(track.trackPrice, track.currency)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {track.trackPrice === undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {track.primaryGenreName && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-purple-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={track.primaryGenreName}
                        >
                          {track.primaryGenreName}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Genre</h4>
                          <p className="text-xs text-gray-600">{track.primaryGenreName}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!track.primaryGenreName && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
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
