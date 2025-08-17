import { ItunesResultItem } from "../types/itunes.types";

/**
 * Get the best available artwork URL for a given size preference
 */
export function getBestArtworkUrl(
  item: ItunesResultItem,
  preferredSize: 30 | 60 | 100 | 600 = 100
): string | undefined {
  const sizeMap = {
    30: item.artworkUrl30,
    60: item.artworkUrl60,
    100: item.artworkUrl100,
    600: item.artworkUrl600,
  };

  // Return preferred size if available
  if (sizeMap[preferredSize]) {
    return sizeMap[preferredSize];
  }

  // Fallback to next best available size
  const sizes = [600, 100, 60, 30] as const;
  for (const size of sizes) {
    if (sizeMap[size]) {
      return sizeMap[size];
    }
  }

  return undefined;
}

/**
 * Format track duration from milliseconds to MM:SS format
 */
export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

/**
 * Format release date to a readable format
 */
export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get the display name for an iTunes item
 */
export function getDisplayName(item: ItunesResultItem): string {
  // Use optional chaining and nullish coalescing for type safety
  return (
    (item as any).trackName || (item as any).collectionName || (item as any).artistName || "Unknown"
  );
}

/**
 * Get the artist name for an iTunes item
 */
export function getArtistName(item: ItunesResultItem): string | undefined {
  return (item as any).artistName;
}

/**
 * Check if an item has artwork
 */
export function hasArtwork(item: ItunesResultItem): boolean {
  return !!(item.artworkUrl30 || item.artworkUrl60 || item.artworkUrl100 || item.artworkUrl600);
}

/**
 * Get the primary genre name for an iTunes item
 */
export function getGenreName(item: ItunesResultItem): string | undefined {
  return (item as any).primaryGenreName;
}

/**
 * Get the price for an iTunes item
 */
export function getPrice(item: ItunesResultItem): number | undefined {
  return (item as any).trackPrice || (item as any).collectionPrice;
}

/**
 * Get the currency for an iTunes item
 */
export function getCurrency(item: ItunesResultItem): string | undefined {
  return (item as any).currency;
}

/**
 * Get the duration for an iTunes item
 */
export function getDuration(item: ItunesResultItem): number | undefined {
  return (item as any).trackTimeMillis;
}

/**
 * Get the episode count for podcasts
 */
export function getEpisodeCount(item: ItunesResultItem): number | undefined {
  return (item as any).episodeCount;
}

/**
 * Get the track count for albums
 */
export function getTrackCount(item: ItunesResultItem): number | undefined {
  return (item as any).trackCount;
}

/**
 * Type guard to check if an item is a music track
 */
export function isMusicTrack(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesMusicTrack {
  return item.wrapperType === "track" && (item as any).kind === "song";
}

/**
 * Type guard to check if an item is an artist
 */
export function isArtist(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesArtist {
  return item.wrapperType === "artist";
}

/**
 * Type guard to check if an item is an album
 */
export function isAlbum(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesAlbum {
  return item.wrapperType === "collection" && (item as any).collectionType === "Album";
}

/**
 * Type guard to check if an item is a podcast
 */
export function isPodcast(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesPodcast {
  return item.wrapperType === "track" && (item as any).kind === "podcast";
}

/**
 * Type guard to check if an item is a movie
 */
export function isMovie(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesMovie {
  return item.wrapperType === "track" && (item as any).kind === "feature-movie";
}

/**
 * Type guard to check if an item is a TV show
 */
export function isTvShow(
  item: ItunesResultItem
): item is import("../types/itunes.types").ItunesTvShow {
  return item.wrapperType === "track" && (item as any).kind === "tv-episode";
}

/**
 * Get the display name for an iTunes item with type safety
 */
export function getDisplayNameSafe(item: ItunesResultItem): string {
  if (isMusicTrack(item)) {
    return item.trackName || item.artistName || "Unknown Track";
  }
  if (isArtist(item)) {
    return item.artistName;
  }
  if (isAlbum(item)) {
    return item.collectionName || item.artistName || "Unknown Album";
  }
  if (isPodcast(item)) {
    return item.trackName || item.artistName || "Unknown Podcast";
  }
  if (isMovie(item)) {
    return item.trackName || "Unknown Movie";
  }
  if (isTvShow(item)) {
    return item.trackName || "Unknown TV Show";
  }

  // Fallback for generic items
  return getDisplayName(item);
}

/**
 * Get the price for an iTunes item with type safety
 */
export function getPriceSafe(item: ItunesResultItem): number | undefined {
  if (isMusicTrack(item) || isPodcast(item) || isMovie(item) || isTvShow(item)) {
    return item.trackPrice;
  }
  if (isAlbum(item)) {
    return item.collectionPrice;
  }
  return undefined;
}

/**
 * Get the currency for an iTunes item with type safety
 */
export function getCurrencySafe(item: ItunesResultItem): string | undefined {
  if (isMusicTrack(item) || isPodcast(item) || isMovie(item) || isTvShow(item)) {
    return item.currency;
  }
  if (isAlbum(item)) {
    return item.currency;
  }
  return undefined;
}

/**
 * Get the duration for an iTunes item with type safety
 */
export function getDurationSafe(item: ItunesResultItem): number | undefined {
  if (isMusicTrack(item) || isMovie(item) || isTvShow(item)) {
    return item.trackTimeMillis;
  }
  return undefined;
}
