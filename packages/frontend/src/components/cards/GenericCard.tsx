"use client";

import {
  Play,
  Clock,
  DollarSign,
  Calendar,
  Music,
  User,
  Disc,
  Film,
  Tv,
  Headphones,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesGenericResult } from "@/services/types/itunes.types";

interface GenericCardProps {
  item: ItunesGenericResult;
}

export default function GenericCard({ item }: GenericCardProps) {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  const formatDuration = (milliseconds: number) => {
    if (!milliseconds) return null;
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === undefined || price === null) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getIcon = () => {
    const wrapperType = item.wrapperType?.toLowerCase();
    const kind = item.kind?.toLowerCase();

    if (wrapperType === "track") {
      if (kind === "song" || kind === "music-track") return Music;
      if (kind === "feature-movie") return Film;
      if (kind === "tv-episode" || kind === "tv-season") return Tv;
      if (kind === "podcast") return Headphones;
    }
    if (wrapperType === "collection") {
      if (kind === "album") return Disc;
      if (kind === "tv-season") return Tv;
    }
    if (wrapperType === "artist") return User;

    return Music; // default
  };

  const getTitle = () => {
    return item.trackName || item.collectionName || item.artistName || "Unknown";
  };

  const getSubtitle = () => {
    if (item.artistName && item.trackName) return item.artistName;
    if (item.artistName && item.collectionName) return item.artistName;
    return null;
  };

  const IconComponent = getIcon();

  return (
    <div className="relative group">
      {/* Hexagonal background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="bg-gray-900 rounded-lg h-full w-full"></div>
      </div>

      <Card
        compact
        className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-28", isRTL && "flex-row-reverse")}>
            {/* Hexagonal Image Section */}
            <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 clip-path-hexagon">
                <div
                  className="w-full h-full bg-gradient-to-br from-cyan-600/30 to-purple-600/30 flex items-center justify-center clip-path-hexagon"
                  style={{
                    backgroundImage: item.artworkUrl100 ? `url(${item.artworkUrl100})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!item.artworkUrl100 && <IconComponent className="w-8 h-8 text-cyan-400" />}
                </div>
              </div>

              {/* Animated play button overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center clip-path-hexagon">
                <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-5 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-base text-gray-100 line-clamp-2 leading-tight group-hover:text-cyan-300 transition-colors duration-300"
                  )}
                >
                  {getTitle()}
                </h3>
                {getSubtitle() && (
                  <p className={cn("text-cyan-400/80 text-sm font-medium line-clamp-1")}>
                    {getSubtitle()}
                  </p>
                )}
              </div>

              {/* Enhanced Metadata with gradient icons */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {item.trackTimeMillis && (
                  <div
                    className={cn(
                      "flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full"
                    )}
                  >
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{formatDuration(item.trackTimeMillis)}</span>
                  </div>
                )}
                {item.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-green-400" />
                    <span>{formatPrice(item.trackPrice, item.currency || "USD")}</span>
                  </div>
                )}
                {item.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span>{formatDate(item.releaseDate)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}
