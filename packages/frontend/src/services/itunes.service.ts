// Re-export all types
export * from "./types/itunes.types";

// Re-export all API functions
export * from "./api/itunes.api";

// Re-export all utility functions
export * from "./utils/itunes.utils";

// Legacy exports for backward compatibility
import {
  searchMusic,
  searchArtist,
  searchAlbum,
  searchPodcast,
  searchMovie,
  searchTvShow,
} from "./api/itunes.api";

import {
  getBestArtworkUrl,
  formatDuration,
  formatPrice,
  formatReleaseDate,
  getDisplayName,
  getArtistName,
  hasArtwork,
  getGenreName,
  getPrice,
  getCurrency,
  getDuration,
  getEpisodeCount,
  getTrackCount,
} from "./utils/itunes.utils";

// Create a legacy service object for backward compatibility
export const itunesService = {
  // API methods
  searchMusic,
  searchArtist,
  searchAlbum,
  searchPodcast,
  searchMovie,
  searchTvShow,

  // Utility methods
  getBestArtworkUrl,
  formatDuration,
  formatPrice,
  formatReleaseDate,
  getDisplayName,
  getArtistName,
  hasArtwork,
  getGenreName,
  getPrice,
  getCurrency,
  getDuration,
  getEpisodeCount,
  getTrackCount,
};

// Default export for backward compatibility
export default itunesService;
