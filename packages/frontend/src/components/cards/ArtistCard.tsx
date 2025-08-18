"use client";

import { User, Music, ExternalLink, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesArtist } from "@/services/types/itunes.types";

interface ArtistCardProps {
  artist: ItunesArtist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group p-1">
      {/* Spotlight effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 w-full overflow-hidden rounded-xl hover:scale-[1.02] transform transition-transform duration-300"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36 sm:h-40 md:h-44", isRTL && "flex-row-reverse")}>
            {/* Portrait Image Section with spotlight */}
            <div
              className={cn(
                "relative flex-shrink-0 p-2 sm:p-3",
                "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
              )}
            >
              {/* Spotlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

              {/* Portrait frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50 hover:border-purple-400/80 transition-all duration-500">
                <div
                  className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: artist.artworkUrl100 ? `url(${artist.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!artist.artworkUrl100 && (
                    <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400" />
                  )}
                </div>

                {/* Stage lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Star rating overlay */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-500 transform scale-75 hover:scale-100">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center transform scale-75 hover:scale-100 transition-transform duration-300 shadow-lg">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={cn(
                "flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between",
                isRTL && "text-right"
              )}
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-1.5">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h3
                        className={cn(
                          "font-bold text-gray-100 leading-tight hover:text-purple-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                          "text-sm sm:text-base md:text-lg",
                          "line-clamp-1"
                        )}
                        title={artist.artistName || t("common.notAvailable")}
                      >
                        {artist.artistName || (
                          <span className="italic text-gray-500">{t("common.notAvailable")}</span>
                        )}
                      </h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Artist Name</h4>
                        <p className="text-sm text-gray-600">
                          {artist.artistName || t("common.notAvailable")}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {artist.artistType && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p
                          className={cn(
                            "text-purple-400/80 font-medium hover:text-purple-300 transition-colors duration-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-sm",
                            "line-clamp-1"
                          )}
                          title={artist.artistType}
                        >
                          {artist.artistType}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Artist Type</h4>
                          <p className="text-sm text-gray-600">{artist.artistType}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {!artist.artistType && (
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

                {/* Artist badge */}
                <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-purple-500/30 w-fit">
                  <User className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">Artist</span>
                </div>
              </div>

              {/* Enhanced Metadata with stage theme */}
              <div
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400 mt-2 sm:mt-3",
                  isRTL && "flex-row-reverse"
                )}
              >
                {artist.primaryGenreName && (
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
                          title={artist.primaryGenreName}
                        >
                          {artist.primaryGenreName}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Genre</h4>
                          <p className="text-xs text-gray-600">{artist.primaryGenreName}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!artist.primaryGenreName && (
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
                {artist.country && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-700/80",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <span className="text-xs flex-shrink-0">🌍</span>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span
                          className={cn(
                            "font-semibold text-gray-300 cursor-pointer overflow-hidden",
                            "text-xs sm:text-xs md:text-xs",
                            "truncate"
                          )}
                          title={artist.country}
                        >
                          {artist.country}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs">Country</h4>
                          <p className="text-xs text-gray-600">{artist.country}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                {!artist.country && (
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-800/80 rounded-full border border-gray-600",
                      "px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5",
                      "flex-1 min-w-0"
                    )}
                  >
                    <span className="text-xs flex-shrink-0">🌍</span>
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
