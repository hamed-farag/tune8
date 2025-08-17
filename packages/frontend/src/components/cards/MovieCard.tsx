"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, DollarSign, Calendar, Film, Star, Video } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesMovie } from "@/services/types/itunes.types";

interface MovieCardProps {
  movie: ItunesMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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
      {/* Cinema background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-indigo-900/10 to-purple-900/10 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Film Strip Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Film strip background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                {/* Film perforations */}
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-between py-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-indigo-400/50 rounded-full"></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-between py-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-indigo-400/50 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Movie poster overlay */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: movie.artworkUrl100 ? `url(${movie.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!movie.artworkUrl100 && <Video className="w-8 h-8 text-indigo-400" />}
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <div className="flex items-center gap-1">
                  <Star className="w-2 h-2 text-white fill-current" />
                  <span className="text-xs font-bold text-white">PG</span>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors duration-300"
                  )}
                >
                  {movie.trackName}
                </h3>
                {movie.artistName && (
                  <p className={cn("text-indigo-400/80 text-sm font-medium line-clamp-1")}>
                    {movie.artistName}
                  </p>
                )}
                {movie.shortDescription && (
                  <p className={cn("text-gray-500 text-xs line-clamp-1")}>
                    {movie.shortDescription}
                  </p>
                )}

                {/* Movie badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-indigo-500/30 w-fit">
                  <Film className="w-3 h-3 text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-300">Movie</span>
                </div>
              </div>

              {/* Enhanced Metadata with cinema theme */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {movie.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span className="font-medium">{formatDuration(movie.trackTimeMillis)}</span>
                  </div>
                )}
                {movie.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-purple-400" />
                    <span className="font-medium">
                      {formatPrice(movie.trackPrice, movie.currency)}
                    </span>
                  </div>
                )}
                {movie.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-pink-400" />
                    <span className="font-medium">{formatDate(movie.releaseDate)}</span>
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
