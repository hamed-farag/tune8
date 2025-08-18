"use client";

import { Play, Calendar, DollarSign, Headphones, Mic, Radio } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesPodcast } from "@/services/types/itunes.types";

interface PodcastCardProps {
  podcast: ItunesPodcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="relative group p-1">
      {/* Studio background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-red-900/20 to-pink-900/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-orange-900/20 to-red-900/20 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300 shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Microphone Studio Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"
              )}
            >
              {/* Studio background with sound waves */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg flex items-center justify-center">
                {/* Sound wave circles */}
                <div className="relative w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-30 hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 border-2 border-orange-400 rounded-full animate-ping"></div>
                  <div
                    className="absolute inset-2 border-2 border-red-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute inset-4 border-2 border-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Podcast artwork overlay */}
              <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-orange-600/30 to-red-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: podcast.artworkUrl100
                      ? `url(${podcast.artworkUrl100})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!podcast.artworkUrl100 && (
                    <Radio className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
                  )}
                </div>
              </div>

              {/* Microphone indicator */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-orange-500/80 rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-500 transform scale-75 hover:scale-100">
                <Mic className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-2 sm:inset-3 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-300 shadow-lg">
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
                          "font-bold text-gray-100 leading-tight hover:text-orange-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={podcast.trackName || t("common.notAvailable")}
                      >
                        {podcast.trackName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Podcast Name</h4>
                        <p className="text-sm text-gray-600">
                          {podcast.trackName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <p
                        className={cn(
                          "text-orange-400/80 font-medium hover:text-orange-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-xs sm:text-sm",
                          "line-clamp-1"
                        )}
                        title={podcast.artistName || t("common.notAvailable")}
                      >
                        {podcast.artistName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Creator</h4>
                        <p className="text-sm text-gray-600">
                          {podcast.artistName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  {/* Podcast badge */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-orange-500/30 w-fit">
                    <Radio className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-orange-400" />
                    <span className="text-xs font-medium text-orange-300">Podcast</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata with studio theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400 mt-1.5 sm:mt-2",
                  isRTL && "flex-row-reverse"
                )}
              >
                {podcast.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-orange-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Headphones className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-orange-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={`${podcast.episodeCount} episodes`}
                        >
                          {podcast.episodeCount} episodes
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Episode Count</h4>
                          <p className="text-xs text-gray-600">{podcast.episodeCount} episodes</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!podcast.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Headphones className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {podcast.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-red-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-red-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatPrice(podcast.trackPrice, podcast.currency)}
                        >
                          {formatPrice(podcast.trackPrice, podcast.currency)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Price</h4>
                          <p className="text-xs text-gray-600">
                            {formatPrice(podcast.trackPrice, podcast.currency)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {podcast.trackPrice === undefined && (
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
                {podcast.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-pink-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-pink-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDate(podcast.releaseDate)}
                        >
                          {formatDate(podcast.releaseDate)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Release Date</h4>
                          <p className="text-xs text-gray-600">{formatDate(podcast.releaseDate)}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!podcast.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
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
