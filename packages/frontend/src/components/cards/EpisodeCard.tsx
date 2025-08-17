"use client";

import { Play, Clock, Calendar, Headphones, Download, Wifi } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

interface EpisodeCardProps {
  id: string;
  title: string;
  podcastName: string;
  imageUrl: string;
  duration?: string;
  publishDate?: string;
}

export default function EpisodeCard({
  id: _id,
  title,
  podcastName,
  imageUrl,
  duration = "45:30",
  publishDate = "2 days ago",
}: EpisodeCardProps) {
  const { currentLanguage } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <div className="relative group">
      {/* Podcast wave background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

      <Card
        compact
        className="relative bg-gradient-to-br from-gray-900 via-emerald-900/10 to-teal-900/10 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 w-full overflow-hidden"
      >
        <CardContent className="p-0">
          <div className={cn("flex h-32", isRTL && "flex-row-reverse")}>
            {/* Episode Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Podcast wave background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg flex items-center justify-center">
                {/* Audio wave visualization */}
                <div className="flex items-end gap-0.5 h-12 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  {[3, 5, 7, 9, 7, 5, 3, 4, 6, 8, 6, 4, 2, 5, 7, 5].map((height, index) => (
                    <div
                      key={index}
                      className="w-0.5 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-full animate-pulse"
                      style={{ height: `${height * 2}px`, animationDelay: `${index * 0.05}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Episode artwork overlay */}
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-emerald-600/30 to-teal-600/30 flex items-center justify-center"
                  style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!imageUrl && <div className="text-emerald-400 text-xs font-medium">EP</div>}
                </div>
              </div>

              {/* Episode number badge */}
              <div className="absolute top-2 left-2 bg-emerald-500/90 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <span className="text-xs font-bold text-white">EP</span>
              </div>

              {/* Download indicator */}
              <div className="absolute top-2 right-2 bg-teal-500/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <Download className="w-3 h-3 text-white" />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn("flex-1 p-6 flex flex-col justify-between", isRTL && "text-right")}>
              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-bold text-lg text-gray-100 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors duration-300"
                  )}
                >
                  {title}
                </h3>
                <p className={cn("text-emerald-400/80 text-sm font-medium line-clamp-1")}>
                  {podcastName}
                </p>

                {/* Episode badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
                  <Headphones className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-300">Episode</span>
                </div>
              </div>

              {/* Progress bar and metadata */}
              <div className="space-y-2">
                {/* Progress bar */}
                <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full w-1/3 transition-all duration-500 group-hover:w-2/3"></div>
                </div>

                {/* Enhanced Metadata with episode theme */}
                <div
                  className={cn(
                    "flex items-center gap-3 text-xs text-gray-400",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span className="font-medium">{duration}</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Calendar className="w-3 h-3 text-teal-400" />
                    <span className="font-medium">{publishDate}</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-gray-800/70 px-3 py-1.5 rounded-full border border-gray-600"
                    )}
                  >
                    <Wifi className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
