"use client";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Play, Clock, DollarSign, Calendar, Film, Star, Video } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesMovie } from "@/services/types/itunes.types";

interface MovieCardProps {
  movie: ItunesMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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
      {/* Cinema background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-indigo-900/20 to-purple-900/20 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300 shadow-lg"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Film Strip Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Film strip background */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                {/* Film perforations */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400/50 rounded-full"
                    ></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1.5 sm:w-2 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400/50 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Movie poster overlay */}
              <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: movie.artworkUrl100 ? `url(${movie.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!movie.artworkUrl100 && (
                    <Video className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-400" />
                  )}
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 opacity-0 hover:opacity-100 transition-all duration-500 transform scale-75 hover:scale-100">
                <div className="flex items-center gap-1">
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white fill-current" />
                  <span className="text-xs font-bold text-white">PG</span>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-2 sm:inset-3 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-300 shadow-lg">
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
                          "font-bold text-gray-100 leading-tight hover:text-indigo-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={movie.trackName || t("common.notAvailable")}
                      >
                        {movie.trackName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Movie Title</h4>
                        <p className="text-sm text-gray-600">
                          {movie.trackName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {movie.artistName && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-indigo-400/80 font-medium hover:text-indigo-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={movie.artistName}
                        >
                          {movie.artistName}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Director</h4>
                          <p className="text-sm text-gray-600">{movie.artistName}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!movie.artistName && (
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
                  {movie.shortDescription && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-gray-500 font-medium hover:text-gray-400 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={movie.shortDescription}
                        >
                          {movie.shortDescription}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Description</h4>
                          <p className="text-sm text-gray-600">{movie.shortDescription}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!movie.shortDescription && (
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

                  {/* Movie badge */}
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-indigo-500/30 w-fit">
                    <Film className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-300">Movie</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Metadata with cinema theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400 mt-1.5 sm:mt-2",
                  isRTL && "flex-row-reverse"
                )}
              >
                {movie.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-indigo-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-indigo-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDuration(movie.trackTimeMillis)}
                        >
                          {formatDuration(movie.trackTimeMillis)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Duration</h4>
                          <p className="text-xs text-gray-600">
                            {formatDuration(movie.trackTimeMillis)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!movie.trackTimeMillis && (
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
                {movie.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-purple-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatPrice(movie.trackPrice, movie.currency)}
                        >
                          {formatPrice(movie.trackPrice, movie.currency)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Price</h4>
                          <p className="text-xs text-gray-600">
                            {formatPrice(movie.trackPrice, movie.currency)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {movie.trackPrice === undefined && (
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
                {movie.releaseDate && (
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
                          title={formatDate(movie.releaseDate)}
                        >
                          {formatDate(movie.releaseDate)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Release Date</h4>
                          <p className="text-xs text-gray-600">{formatDate(movie.releaseDate)}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!movie.releaseDate && (
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
