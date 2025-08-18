"use client";

import { Play, Clock, DollarSign, Calendar, Tv, Signal, Monitor } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesTvShow } from "@/services/types/itunes.types";

interface TvShowCardProps {
  tvShow: ItunesTvShow;
}

export default function TvShowCard({ tvShow }: TvShowCardProps) {
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  const formatDuration = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

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
      {/* TV static background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-teal-900/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300 shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* TV Screen Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"
              )}
            >
              {/* TV frame */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-lg border-4 border-gray-600 hover:border-blue-500/50 transition-all duration-500">
                {/* TV screen bezel */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-black rounded-md">
                  {/* Screen content */}
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-sm flex items-center justify-center">
                    <div
                      className="w-full h-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center rounded-sm"
                      style={{
                        backgroundImage: tvShow.artworkUrl100
                          ? `url(${tvShow.artworkUrl100})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {!tvShow.artworkUrl100 && (
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                      )}
                    </div>
                  </div>

                  {/* TV static overlay */}
                  <div className="absolute inset-1 opacity-0 hover:opacity-20 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
                  </div>
                </div>

                {/* TV controls */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                </div>
              </div>

              {/* Signal indicator */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-500/80 rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-500 transform scale-75 hover:scale-100">
                <Signal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-2 sm:inset-3 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-300 shadow-lg">
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
                          "font-bold text-gray-100 leading-tight hover:text-blue-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={tvShow.trackName || t("common.notAvailable")}
                      >
                        {tvShow.trackName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">TV Show Name</h4>
                        <p className="text-sm text-gray-600">
                          {tvShow.trackName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {tvShow.artistName && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-blue-400/80 font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={tvShow.artistName}
                        >
                          {tvShow.artistName}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Network</h4>
                          <p className="text-sm text-gray-600">{tvShow.artistName}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!tvShow.artistName && (
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
                  {tvShow.shortDescription && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-gray-500 font-medium hover:text-gray-400 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={tvShow.shortDescription}
                        >
                          {tvShow.shortDescription}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Description</h4>
                          <p className="text-sm text-gray-600">{tvShow.shortDescription}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!tvShow.shortDescription && (
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

                  {/* TV Show badge */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-blue-500/30 w-fit">
                    <Tv className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-blue-400" />
                    <span className="text-xs font-medium text-blue-300">TV Show</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata with TV theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400 mt-1.5 sm:mt-2",
                  isRTL && "flex-row-reverse"
                )}
              >
                {tvShow.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Tv className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-blue-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={`${tvShow.episodeCount} episodes`}
                        >
                          {tvShow.episodeCount} episodes
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Episode Count</h4>
                          <p className="text-xs text-gray-600">{tvShow.episodeCount} episodes</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!tvShow.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Tv className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {tvShow.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-cyan-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDuration(tvShow.trackTimeMillis)}
                        >
                          {formatDuration(tvShow.trackTimeMillis)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Duration</h4>
                          <p className="text-xs text-gray-600">
                            {formatDuration(tvShow.trackTimeMillis)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!tvShow.trackTimeMillis && (
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
                {tvShow.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-teal-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-teal-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatPrice(tvShow.trackPrice, tvShow.currency)}
                        >
                          {formatPrice(tvShow.trackPrice, tvShow.currency)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Price</h4>
                          <p className="text-xs text-gray-600">
                            {formatPrice(tvShow.trackPrice, tvShow.currency)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {tvShow.trackPrice === undefined && (
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
                {tvShow.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-blue-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDate(tvShow.releaseDate)}
                        >
                          {formatDate(tvShow.releaseDate)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Release Date</h4>
                          <p className="text-xs text-gray-600">{formatDate(tvShow.releaseDate)}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!tvShow.releaseDate && (
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
