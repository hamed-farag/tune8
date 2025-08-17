"use client";

import { Disc, Music, DollarSign, Calendar, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesAlbum } from "@/services/types/itunes.types";

interface AlbumCardProps {
  album: ItunesAlbum;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { currentLanguage } = useI18n();
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
    <div className="relative group">
      {/* Vinyl record background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110 group-hover:scale-100"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-600 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Vinyl Record Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Record grooves */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-black ring-4 ring-gray-600 group-hover:ring-yellow-500/50 transition-all duration-500">
                {/* Inner grooves */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black ring-2 ring-gray-500"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-900 to-black ring-1 ring-gray-400"></div>

                {/* Center label */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center"
                    style={{
                      backgroundImage: album.artworkUrl100 ? `url(${album.artworkUrl100})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!album.artworkUrl100 && <Disc className="w-6 h-6 text-yellow-400" />}
                  </div>
                </div>

                {/* Center hole */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
              </div>

              {/* Spinning animation on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                <div className="w-full h-full border-2 border-yellow-500/30 rounded-full"></div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                <div className="w-12 h-12 bg-yellow-500/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <ExternalLink className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-yellow-300 transition-colors duration-300"
                  )}
                >
                  {album.collectionName}
                </h3>
                <p className={cn("text-yellow-400/80 text-sm font-medium line-clamp-1")}>
                  {album.artistName}
                </p>
              </div>

              {/* Enhanced Metadata with vinyl theme */}
              <div
                className={cn(
                  "flex items-center gap-4 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {album.trackCount && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Music className="w-3 h-3 text-yellow-400" />
                    <span className="font-medium">{album.trackCount} tracks</span>
                  </div>
                )}
                {album.collectionPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-green-400" />
                    <span className="font-medium">
                      {formatPrice(album.collectionPrice, album.currency)}
                    </span>
                  </div>
                )}
                {album.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-orange-400" />
                    <span className="font-medium">{formatDate(album.releaseDate)}</span>
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
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
