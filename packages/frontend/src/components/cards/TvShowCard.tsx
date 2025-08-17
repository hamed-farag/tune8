"use client";

import { Play, Clock, DollarSign, Calendar, Tv, Signal, Monitor } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesTvShow } from "@/services/types/itunes.types";

interface TvShowCardProps {
  tvShow: ItunesTvShow;
}

export default function TvShowCard({ tvShow }: TvShowCardProps) {
  const { currentLanguage } = useI18n();
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
    <div className="relative group">
      {/* TV static background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-blue-900/10 to-cyan-900/10 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* TV Screen Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* TV frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-lg border-4 border-gray-600 group-hover:border-blue-500/50 transition-all duration-500">
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
                      {!tvShow.artworkUrl100 && <Monitor className="w-6 h-6 text-blue-400" />}
                    </div>
                  </div>

                  {/* TV static overlay */}
                  <div className="absolute inset-1 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
                  </div>
                </div>

                {/* TV controls */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                </div>
              </div>

              {/* Signal indicator */}
              <div className="absolute top-2 right-2 bg-blue-500/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Signal className="w-3 h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors duration-300"
                  )}
                >
                  {tvShow.trackName}
                </h3>
                {tvShow.artistName && (
                  <p className={cn("text-blue-400/80 text-sm font-medium line-clamp-1")}>
                    {tvShow.artistName}
                  </p>
                )}
                {tvShow.shortDescription && (
                  <p className={cn("text-gray-500 text-xs line-clamp-1")}>
                    {tvShow.shortDescription}
                  </p>
                )}

                {/* TV Show badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-3 py-1 rounded-full border border-blue-500/30 w-fit">
                  <Tv className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300">TV Show</span>
                </div>
              </div>

              {/* Enhanced Metadata with TV theme */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {tvShow.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Tv className="w-3 h-3 text-blue-400" />
                    <span className="font-medium">{tvShow.episodeCount} episodes</span>
                  </div>
                )}
                {tvShow.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium">{formatDuration(tvShow.trackTimeMillis)}</span>
                  </div>
                )}
                {tvShow.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-teal-400" />
                    <span className="font-medium">
                      {formatPrice(tvShow.trackPrice, tvShow.currency)}
                    </span>
                  </div>
                )}
                {tvShow.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-blue-400" />
                    <span className="font-medium">{formatDate(tvShow.releaseDate)}</span>
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
