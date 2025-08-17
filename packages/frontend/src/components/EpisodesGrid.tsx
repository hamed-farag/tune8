"use client";

import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import { EpisodeCard } from "@/components";
import { ItunesMusicTrack } from "@/services/types/itunes.types";

interface EpisodesGridProps {
  episodes: ItunesMusicTrack[];
}

export default function EpisodesGrid({ episodes }: EpisodesGridProps) {
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("podcasts.episodes")}</h2>
      <div className="w-full">
        <div
          className={cn(
            "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            isRTL && "justify-items-end"
          )}
        >
          {episodes.map((episode, index) => (
            <EpisodeCard
              key={`${episode.trackId || episode.collectionId || index}-${index}`}
              id={(episode.trackId || episode.collectionId || index).toString()}
              title={episode.trackName || "Unknown Track"}
              podcastName={episode.artistName || "Unknown Artist"}
              imageUrl={episode.artworkUrl100 || ""}
              duration={
                episode.trackTimeMillis
                  ? `${Math.floor(episode.trackTimeMillis / 60000)}:${String(
                      Math.floor((episode.trackTimeMillis % 60000) / 1000)
                    ).padStart(2, "0")}`
                  : undefined
              }
              publishDate={
                episode.releaseDate ? new Date(episode.releaseDate).toLocaleDateString() : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
