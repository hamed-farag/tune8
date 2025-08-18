import { useState, useEffect } from "react";
import {
  searchPodcast,
  searchMusic,
  searchArtist,
  searchAlbum,
  searchMovie,
  searchTvShow,
} from "@/services/api/itunes.api";
import {
  ItunesPodcast,
  ItunesMusicTrack,
  ItunesArtist,
  ItunesAlbum,
  ItunesMovie,
  ItunesTvShow,
  ItunesResultItem,
} from "@/services/types/itunes.types";

// Search terms for different content types (fallback when no search query)
const PODCAST_SEARCH_TERMS = ["technology", "business", "health", "education", "entertainment"];
const MUSIC_SEARCH_TERMS = ["pop", "rock", "jazz", "classical", "hip hop", "electronic"];
const ARTIST_SEARCH_TERMS = ["ed sheeran", "taylor swift", "beyonce", "drake", "bts"];
const ALBUM_SEARCH_TERMS = ["folklore", "midnights", "renaissance", "scorpion", "map of the soul"];
const MOVIE_SEARCH_TERMS = ["inception", "avatar", "marvel", "disney", "netflix"];
const TV_SHOW_SEARCH_TERMS = [
  "breaking bad",
  "game of thrones",
  "stranger things",
  "friends",
  "the office",
];

// Random search terms for ContentGrid (not affected by search input)
const RANDOM_PODCAST_TERMS = ["comedy", "news", "sports", "science", "history", "fiction"];
const RANDOM_MUSIC_TERMS = ["indie", "folk", "blues", "country", "reggae", "punk"];
const RANDOM_ARTIST_TERMS = ["coldplay", "ariana grande", "post malone", "dua lipa", "the weeknd"];
const RANDOM_ALBUM_TERMS = [
  "evermore",
  "chromatica",
  "positions",
  "after hours",
  "future nostalgia",
];
const RANDOM_MOVIE_TERMS = ["action", "comedy", "drama", "thriller", "romance", "horror"];
const RANDOM_TV_TERMS = ["drama", "comedy", "reality", "documentary", "animation", "crime"];

// Hook for random data (ContentGrid)
export function useRandomItunesData(contentType: string | undefined) {
  const [podcasts, setPodcasts] = useState<ItunesPodcast[]>([]);
  const [musicTracks, setMusicTracks] = useState<ItunesMusicTrack[]>([]);
  const [artists, setArtists] = useState<ItunesArtist[]>([]);
  const [albums, setAlbums] = useState<ItunesAlbum[]>([]);
  const [movies, setMovies] = useState<ItunesMovie[]>([]);
  const [tvShows, setTvShows] = useState<ItunesTvShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get random search term based on content type
  const getRandomSearchTerm = () => {
    const type = contentType || "album";
    const searchTermsMap = {
      podcast: RANDOM_PODCAST_TERMS,
      artist: RANDOM_ARTIST_TERMS,
      album: RANDOM_ALBUM_TERMS,
      movie: RANDOM_MOVIE_TERMS,
      tvShow: RANDOM_TV_TERMS,
      "music track": RANDOM_MUSIC_TERMS,
      all: [
        ...RANDOM_PODCAST_TERMS,
        ...RANDOM_MUSIC_TERMS,
        ...RANDOM_ARTIST_TERMS,
        ...RANDOM_ALBUM_TERMS,
        ...RANDOM_MOVIE_TERMS,
        ...RANDOM_TV_TERMS,
      ],
    };

    const terms = searchTermsMap[type as keyof typeof searchTermsMap] || searchTermsMap.all;
    return terms[Math.floor(Math.random() * terms.length)];
  };

  // Fetch random data from API based on content type
  const fetchRandomData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchTerm = getRandomSearchTerm();
      const type = contentType || "album";

      switch (type) {
        case "podcast": {
          const podcastResponse = await searchPodcast(searchTerm, 12);
          setPodcasts(podcastResponse.results || []);
          setMusicTracks([]);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "artist": {
          const artistResponse = await searchArtist(searchTerm, 12);
          setArtists(artistResponse.results || []);
          setPodcasts([]);
          setMusicTracks([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "album": {
          const albumResponse = await searchAlbum(searchTerm, 12);
          setAlbums(albumResponse.results || []);
          setPodcasts([]);
          setMusicTracks([]);
          setArtists([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "movie": {
          const movieResponse = await searchMovie(searchTerm, 12);
          setMovies(movieResponse.results || []);
          setPodcasts([]);
          setMusicTracks([]);
          setArtists([]);
          setAlbums([]);
          setTvShows([]);
          break;
        }

        case "tvShow": {
          const tvShowResponse = await searchTvShow(searchTerm, 12);
          setTvShows(tvShowResponse.results || []);
          setPodcasts([]);
          setMusicTracks([]);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          break;
        }

        case "music track": {
          const musicResponse = await searchMusic(searchTerm, 12);
          setMusicTracks(musicResponse.results || []);
          setPodcasts([]);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }
      }
    } catch (err) {
      console.error("Error fetching random data:", err);
      setError("Failed to load content. Please try again later.");
      setPodcasts([]);
      setMusicTracks([]);
      setArtists([]);
      setAlbums([]);
      setMovies([]);
      setTvShows([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load random data on component mount and when content type changes
  useEffect(() => {
    fetchRandomData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType]);

  return {
    podcasts,
    musicTracks,
    artists,
    albums,
    movies,
    tvShows,
    isLoading,
    error,
    fetchData: fetchRandomData,
  };
}

export function useItunesData(contentType: string | undefined, searchQuery?: string) {
  const [items, setItems] = useState<ItunesResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get search term based on content type and search query
  const getSearchTerm = () => {
    // If search query is provided and not empty, use it
    if (searchQuery && searchQuery.trim()) {
      return searchQuery.trim();
    }

    // Otherwise, use random search terms as fallback
    const type = contentType || "album";
    const searchTermsMap = {
      podcast: PODCAST_SEARCH_TERMS,
      artist: ARTIST_SEARCH_TERMS,
      album: ALBUM_SEARCH_TERMS,
      movie: MOVIE_SEARCH_TERMS,
      tvShow: TV_SHOW_SEARCH_TERMS,
      "music track": MUSIC_SEARCH_TERMS,
      all: [
        ...PODCAST_SEARCH_TERMS,
        ...MUSIC_SEARCH_TERMS,
        ...ARTIST_SEARCH_TERMS,
        ...ALBUM_SEARCH_TERMS,
        ...MOVIE_SEARCH_TERMS,
        ...TV_SHOW_SEARCH_TERMS,
      ],
    };

    const terms = searchTermsMap[type as keyof typeof searchTermsMap] || searchTermsMap.all;
    return terms[Math.floor(Math.random() * terms.length)];
  };

  // Fetch search-based data from API
  const fetchData = async () => {
    if (!searchQuery || !searchQuery.trim()) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchTerm = getSearchTerm();
      const type = contentType || "album";

      switch (type) {
        case "podcast": {
          const podcastResponse = await searchPodcast(searchTerm, 12);
          setItems(podcastResponse.results || []);
          break;
        }

        case "artist": {
          const artistResponse = await searchArtist(searchTerm, 12);
          setItems(artistResponse.results || []);
          break;
        }

        case "album": {
          const albumResponse = await searchAlbum(searchTerm, 12);
          setItems(albumResponse.results || []);
          break;
        }

        case "movie": {
          const movieResponse = await searchMovie(searchTerm, 12);
          setItems(movieResponse.results || []);
          break;
        }

        case "tvShow": {
          const tvShowResponse = await searchTvShow(searchTerm, 12);
          setItems(tvShowResponse.results || []);
          break;
        }

        case "music track": {
          const musicResponse = await searchMusic(searchTerm, 12);
          setItems(musicResponse.results || []);
          break;
        }

        default: {
          break;
        }
      }
    } catch (err) {
      console.error("Error fetching search data:", err);
      setError("Failed to load search results. Please try again later.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load search data when search query or content type changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, searchQuery]);

  return {
    items,
    isLoading,
    error,
    fetchData,
  };
}
