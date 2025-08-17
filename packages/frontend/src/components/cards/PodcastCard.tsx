"use client";

import { Play, Calendar, DollarSign, Headphones, Mic, Radio } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { ItunesPodcast } from "@/services/types/itunes.types";

interface PodcastCardProps {
  podcast: ItunesPodcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
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
      {/* Studio background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-red-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-orange-900/10 to-red-900/10 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Microphone Studio Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Studio background with sound waves */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg flex items-center justify-center">
                {/* Sound wave circles */}
                <div className="relative w-16 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
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
              <div className="absolute inset-2 rounded-lg overflow-hidden">
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
                  {!podcast.artworkUrl100 && <Radio className="w-8 h-8 text-orange-400" />}
                </div>
              </div>

              {/* Microphone indicator */}
              <div className="absolute top-2 right-2 bg-orange-500/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Mic className="w-3 h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-orange-300 transition-colors duration-300"
                  )}
                >
                  {podcast.trackName}
                </h3>
                <p className={cn("text-orange-400/80 text-sm font-medium line-clamp-1")}>
                  {podcast.artistName}
                </p>

                {/* Podcast badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-1 rounded-full border border-orange-500/30 w-fit">
                  <Radio className="w-3 h-3 text-orange-400" />
                  <span className="text-xs font-medium text-orange-300">Podcast</span>
                </div>
              </div>

              {/* Enhanced Metadata with studio theme */}
              <div
                className={cn(
                  "flex items-center gap-3 text-xs text-gray-400",
                  isRTL && "flex-row-reverse"
                )}
              >
                {podcast.episodeCount && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Headphones className="w-3 h-3 text-orange-400" />
                    <span className="font-medium">{podcast.episodeCount} episodes</span>
                  </div>
                )}
                {podcast.trackPrice !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <DollarSign className="w-3 h-3 text-red-400" />
                    <span className="font-medium">
                      {formatPrice(podcast.trackPrice, podcast.currency)}
                    </span>
                  </div>
                )}
                {podcast.releaseDate && (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-pink-400" />
                    <span className="font-medium">{formatDate(podcast.releaseDate)}</span>
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
