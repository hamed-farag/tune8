"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { getDirection } from "@/lib/utils";

import {
  PodcastCard,
  PodcastCardSkeleton,
  MusicTrackCard,
  ArtistCard,
  AlbumCard,
  MovieCard,
  TvShowCard,
  GenericCard,
  MusicTrackCardSkeleton,
  ArtistCardSkeleton,
  AlbumCardSkeleton,
  MovieCardSkeleton,
  TvShowCardSkeleton,
  GenericCardSkeleton,
} from "@/components";
import {
  ItunesPodcast,
  ItunesMusicTrack,
  ItunesArtist,
  ItunesAlbum,
  ItunesMovie,
  ItunesTvShow,
} from "@/services/types/itunes.types";

interface ContentGridProps {
  contentType: string | undefined;
  isLoading: boolean;
  podcasts: ItunesPodcast[];
  episodes: ItunesMusicTrack[];
  artists: ItunesArtist[];
  albums: ItunesAlbum[];
  movies: ItunesMovie[];
  tvShows: ItunesTvShow[];
  onRefresh: () => void;
}

export default function ContentGrid({
  contentType,
  isLoading,
  podcasts,
  episodes,
  artists,
  albums,
  movies,
  tvShows,
  onRefresh,
}: ContentGridProps) {
  console.log("ContentGrid received contentType:", contentType);
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  // Get the appropriate skeleton component based on content type
  const getSkeletonComponent = () => {
    const type = contentType || "all";

    switch (type) {
      case "podcast":
        return PodcastCardSkeleton;
      case "artist":
        return ArtistCardSkeleton;
      case "album":
        return AlbumCardSkeleton;
      case "movie":
        return MovieCardSkeleton;
      case "tvShow":
        return TvShowCardSkeleton;
      case "music track":
        return MusicTrackCardSkeleton;
      default:
        return GenericCardSkeleton;
    }
  };

  // Get the appropriate card component and data based on content type
  const getCardComponentAndData = () => {
    console.log("getCardComponentAndData called with contentType:", contentType);
    const type = contentType || "all";

    switch (type) {
      case "podcast":
        return {
          Component: PodcastCard,
          data: podcasts,
          propName: "podcast",
        };
      case "artist":
        return {
          Component: ArtistCard,
          data: artists,
          propName: "artist",
        };
      case "album":
        return {
          Component: AlbumCard,
          data: albums,
          propName: "album",
        };
      case "movie":
        return {
          Component: MovieCard,
          data: movies,
          propName: "movie",
        };
      case "tvShow":
        return {
          Component: TvShowCard,
          data: tvShows,
          propName: "tvShow",
        };
      case "music track":
        return {
          Component: MusicTrackCard,
          data: episodes,
          propName: "track",
        };
      default:
        return {
          Component: GenericCard,
          data: [...podcasts, ...episodes, ...artists, ...albums, ...movies, ...tvShows],
          propName: "item",
        };
    }
  };

  const { Component: CardComponent, data, propName } = getCardComponentAndData();
  const SkeletonComponent = getSkeletonComponent();

  // Helper function to get the correct translation key for content types
  const getContentTypeTranslationKey = (contentType: string | undefined) => {
    const type = contentType || "all";
    const translationMap: Record<string, string> = {
      all: "common.contentTypes.all",
      album: "common.contentTypes.album",
      artist: "common.contentTypes.artist",
      movie: "common.contentTypes.movie",
      "music track": "common.contentTypes.musicTrack",
      podcast: "common.contentTypes.podcast",
      tvShow: "common.contentTypes.tvShow",
    };
    return translationMap[type] || "common.contentTypes.all";
  };

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          {t(getContentTypeTranslationKey(contentType))}
        </h2>
        {!isLoading && data.length > 0 && (
          <Button
            onClick={onRefresh}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            Refresh
          </Button>
        )}
      </div>

      <div className="relative w-full group">
        {/* Scroll indicator */}
        <div
          className={`absolute top-0 bottom-0 z-10 w-8 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity ${
            isRTL
              ? "left-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"
              : "right-0 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent"
          }`}
        >
          {isRTL ? (
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>

        <div
          className="flex space-x-3 sm:space-x-6 overflow-x-auto pb-4 scrollbar-hide w-full scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading
            ? // Show skeleton loading
              Array.from({ length: 6 }).map((_, index) => <SkeletonComponent key={index} />)
            : // Show actual content
              data.map((item, index) => {
                const itemId =
                  (item as ItunesMusicTrack).trackId ||
                  (item as ItunesMusicTrack | ItunesTvShow | ItunesAlbum | ItunesMovie)
                    .collectionId ||
                  (item as ItunesArtist | ItunesMovie).artistId ||
                  index;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const props = { [propName]: item } as any;
                return <CardComponent key={`${itemId}-${index}`} {...props} />;
              })}
        </div>
      </div>
    </section>
  );
}
