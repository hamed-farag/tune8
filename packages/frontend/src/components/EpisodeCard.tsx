"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Calendar } from "lucide-react";
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
    <Card
      compact
      className={cn(
        "group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 w-full overflow-hidden"
      )}
    >
      <CardContent>
        <div className={cn("flex h-24", isRTL && "flex-row-reverse")}>
          {/* Image Section */}
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
            <div
              className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center"
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!imageUrl && <div className="text-gray-400 text-xs font-medium">EP</div>}
            </div>
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className={cn("w-4 h-4 text-gray-900")} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={cn("flex-1 p-4 flex flex-col justify-between", isRTL && "text-right")}>
            <div className="space-y-2">
              <h3
                className={cn(
                  "font-semibold text-sm text-gray-100 line-clamp-2 leading-tight group-hover:text-white transition-colors duration-200"
                )}
              >
                {title}
              </h3>
              <p className={cn("text-gray-400 text-xs font-medium line-clamp-1")}>{podcastName}</p>
            </div>

            {/* Metadata */}
            <div
              className={cn(
                "flex items-center gap-4 text-xs text-gray-500",
                isRTL && "flex-row-reverse"
              )}
            >
              <div className={cn("flex items-center gap-1")}>
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
              <div className={cn("flex items-center gap-1")}>
                <Calendar className="w-3 h-3" />
                <span>{publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
