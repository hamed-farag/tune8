"use client";

import { Search, Music, Mic, Film, Tv, Disc } from "lucide-react";

import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";
import {
  PodcastCard,
  ArtistCard,
  AlbumCard,
  MovieCard,
  TvShowCard,
  MusicTrackCard,
  PodcastCardSkeleton,
  ArtistCardSkeleton,
  AlbumCardSkeleton,
  MovieCardSkeleton,
  TvShowCardSkeleton,
  MusicTrackCardSkeleton,
  GenericCardSkeleton,
  GenericCard,
} from "@/components";
import { ItunesResultItem } from "@/services/types/itunes.types";

interface SearchResultsGridProps {
  searchResultItems: ItunesResultItem[];
  contentType?: string;
  isLoading?: boolean;
  hasSearchQuery?: boolean;
}

export default function SearchResultsGrid({
  searchResultItems,
  contentType = "album",
  isLoading = false,
  hasSearchQuery = false,
}: SearchResultsGridProps) {
  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  // Get the appropriate card component based on content type
  const getCardComponent = () => {
    switch (contentType) {
      case "podcast":
        return PodcastCard;
      case "artist":
        return ArtistCard;
      case "album":
        return AlbumCard;
      case "movie":
        return MovieCard;
      case "tvShow":
        return TvShowCard;
      case "music track":
        return MusicTrackCard;
      default:
        return GenericCard;
    }
  };

  // Get the appropriate skeleton component based on content type
  const getSkeletonComponent = () => {
    switch (contentType) {
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

  // Get the appropriate icon for the content type
  const getContentTypeIcon = () => {
    switch (contentType) {
      case "podcast":
        return Mic;
      case "artist":
        return Music;
      case "album":
        return Disc;
      case "movie":
        return Film;
      case "tvShow":
        return Tv;
      case "music track":
        return Music;
      default:
        return Search;
    }
  };

  // Get the appropriate prop name for the card component
  const getPropName = () => {
    switch (contentType) {
      case "podcast":
        return "podcast";
      case "artist":
        return "artist";
      case "album":
        return "album";
      case "movie":
        return "movie";
      case "tvShow":
        return "tvShow";
      case "music track":
        return "track";
      default:
        return "";
    }
  };

  // Get the appropriate translation key for the section title
  const getSectionTitle = () => {
    switch (contentType) {
      case "podcast":
        return "search.podcastResults";
      case "artist":
        return "search.artistResults";
      case "album":
        return "search.albumResults";
      case "movie":
        return "search.movieResults";
      case "tvShow":
        return "search.tvShowResults";
      case "music track":
        return "search.musicTrackResults";
      default:
        return "search.allResults";
    }
  };

  const CardComponent = getCardComponent();
  const SkeletonComponent = getSkeletonComponent();
  const ContentTypeIcon = getContentTypeIcon();
  const propName = getPropName();

  // Show empty state when no search query
  if (!hasSearchQuery) {
    return (
      <section className="w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t(getSectionTitle())}</h2>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <ContentTypeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              {t("search.startSearching")}
            </h3>
            <p className="text-gray-400 max-w-md">{t("search.searchDescription")}</p>
            <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
              <Search className="w-4 h-4" />
              <span>{t("search.typeToSearch")}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t(getSectionTitle())}</h2>
        <div className="w-full">
          <div
            className={cn(
              "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              isRTL && "justify-items-end"
            )}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonComponent key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show no results state
  if (searchResultItems.length === 0) {
    return (
      <section className="w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t(getSectionTitle())}</h2>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center mb-4">
              <ContentTypeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">{t("search.noResults")}</h3>
            <p className="text-gray-400 max-w-md">{t("search.noResultsDescription")}</p>
          </div>
        </div>
      </section>
    );
  }

  // Show results
  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t(getSectionTitle())}</h2>
      <div className="w-full">
        <div
          className={cn(
            "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            isRTL && "justify-items-end"
          )}
        >
          {searchResultItems.map((item, index) => {
            const itemId =
              (item as any).trackId ||
              (item as any).collectionId ||
              (item as any).artistId ||
              index;

            if (!contentType) {
              return null;
            }

            // For other card types, pass the item as a prop
            const props = { [propName]: item } as any;
            return <CardComponent key={`${itemId}-${index}`} {...props} />;
          })}
        </div>
      </div>
    </section>
  );
}
