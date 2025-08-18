"use client";

import { Disc, Music, DollarSign, Calendar, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesAlbum } from "@/services/types/itunes.types";

interface AlbumCardProps {
  album: ItunesAlbum;
}

export default function AlbumCard({ album }: AlbumCardProps) {
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
      {/* Enhanced vinyl record background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-xl opacity-0 hover:opacity-100 transition-all duration-700 scale-110 hover:scale-100 blur-sm"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-600 hover:border-yellow-500/50 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-28 sm:h-32 md:h-36", isRTL && "flex-row-reverse")}>
            {/* Enhanced Vinyl Record Image Section */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Record grooves with enhanced depth */}
              <div className="absolute inset-2 sm:inset-3 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black ring-4 ring-gray-600 hover:ring-yellow-500/50 transition-all duration-500 shadow-2xl">
                {/* Enhanced inner grooves */}
                <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black ring-2 ring-gray-500 shadow-inner"></div>
                <div className="absolute inset-6 sm:inset-8 rounded-full bg-gradient-to-br from-gray-900 to-black ring-1 ring-gray-400 shadow-inner"></div>
                <div className="absolute inset-8 sm:inset-10 rounded-full bg-gradient-to-br from-black to-gray-900 ring-1 ring-gray-300"></div>

                {/* Enhanced center label */}
                <div className="absolute inset-10 sm:inset-12 rounded-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 flex items-center justify-center shadow-inner">
                  <div
                    className={cn(
                      "rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center shadow-lg border-2 border-yellow-500/20",
                      "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20"
                    )}
                    style={{
                      backgroundImage: album.artworkUrl100 ? `url(${album.artworkUrl100})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!album.artworkUrl100 && (
                      <Disc className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400" />
                    )}
                  </div>
                </div>

                {/* Enhanced center hole */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-black rounded-full shadow-inner"></div>
              </div>

              {/* Enhanced spinning animation on hover */}
              <div className="absolute inset-2 sm:inset-3 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                <div className="w-full h-full border-2 border-yellow-500/30 rounded-full"></div>
              </div>

              {/* Enhanced play button overlay */}
              <div className="absolute inset-2 sm:inset-3 bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-full backdrop-blur-sm">
                <div
                  className={cn(
                    "bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50",
                    "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  )}
                >
                  <Play
                    className={cn(
                      "text-black",
                      "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
                      isRTL ? "mr-0.5" : "ml-0.5"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div
              className={cn(
                "flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h3
                        className={cn(
                          "font-bold text-gray-100 leading-tight hover:text-yellow-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={album.collectionName || t("common.notAvailable")}
                      >
                        {album.collectionName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Album Name</h4>
                        <p className="text-sm text-gray-600">
                          {album.collectionName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <p
                        className={cn(
                          "text-yellow-400/90 font-medium hover:text-yellow-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-xs sm:text-sm",
                          "line-clamp-1"
                        )}
                        title={album.artistName || t("common.notAvailable")}
                      >
                        {album.artistName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Artist</h4>
                        <p className="text-sm text-gray-600">
                          {album.artistName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>

              {/* Enhanced Metadata with vinyl theme */}
              <div
                className={cn(
                  "flex items-center justify-between gap-2 sm:gap-3 text-gray-400 mt-3 sm:mt-4",
                  isRTL && "flex-row-reverse"
                )}
              >
                {album.trackCount && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-yellow-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-yellow-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={`${album.trackCount} tracks`}
                        >
                          {album.trackCount}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Track Count</h4>
                          <p className="text-xs text-gray-600">{album.trackCount} tracks</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {album.trackCount === undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {album.collectionPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-green-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatPrice(album.collectionPrice, album.currency)}
                        >
                          {formatPrice(album.collectionPrice, album.currency)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Price</h4>
                          <p className="text-xs text-gray-600">
                            {formatPrice(album.collectionPrice, album.currency)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {album.collectionPrice === undefined && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                      "flex-1 min-w-0"
                    )}
                  >
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-500 italic text-xs sm:text-xs md:text-xs truncate">
                      {t("common.notAvailable")}
                    </span>
                  </div>
                )}
                {album.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-orange-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
                      "flex-1 min-w-0"
                    )}
                  >
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-orange-400 flex-shrink-0" />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={formatDate(album.releaseDate)}
                        >
                          {formatDate(album.releaseDate)}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Release Date</h4>
                          <p className="text-xs text-gray-600">{formatDate(album.releaseDate)}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!album.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2",
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

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
