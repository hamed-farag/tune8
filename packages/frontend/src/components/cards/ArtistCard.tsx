"use client";

import { User, Music, ExternalLink, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesArtist } from "@/services/types/itunes.types";

interface ArtistCardProps {
  artist: ItunesArtist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group">
      {/* Spotlight effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-36", isRTL && "flex-row-reverse")}>
            {/* Portrait Image Section with spotlight */}
            <div className="relative w-36 h-36 flex-shrink-0">
              {/* Spotlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

              {/* Portrait frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50 group-hover:border-purple-400/80 transition-all duration-500">
                <div
                  className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: artist.artworkUrl100 ? `url(${artist.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!artist.artworkUrl100 && <User className="w-12 h-12 text-purple-400" />}
                </div>

                {/* Stage lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Star rating overlay */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-4">
                <div>
                  <h3
                    className={cn(
                      "font-bold text-xl text-gray-100 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors duration-300"
                    )}
                  >
                    {artist.artistName}
                  </h3>
                  {artist.artistType && (
                    <p className={cn("text-purple-400/80 text-sm font-medium line-clamp-1 mt-1")}>
                      {artist.artistType}
                    </p>
                  )}
                </div>

                {/* Artist badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1.5 rounded-full border border-purple-500/30 w-fit">
                  <User className="w-3 h-3 text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">Artist</span>
                </div>
              </div>

              {/* Enhanced Metadata with stage theme */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {artist.primaryGenreName && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Music className="w-3 h-3 text-purple-400" />
                    <span className="font-medium">{artist.primaryGenreName}</span>
                  </div>
                )}
                {artist.country && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <span className="text-xs">🌍</span>
                    <span className="font-medium">{artist.country}</span>
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
