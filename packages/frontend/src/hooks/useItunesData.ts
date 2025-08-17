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
} from "@/services/types/itunes.types";

// Search terms for different content types
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

export function useItunesData(contentType: string | undefined) {
  const [podcasts, setPodcasts] = useState<ItunesPodcast[]>([]);
  const [episodes, setEpisodes] = useState<ItunesMusicTrack[]>([]);
  const [artists, setArtists] = useState<ItunesArtist[]>([]);
  const [albums, setAlbums] = useState<ItunesAlbum[]>([]);
  const [movies, setMovies] = useState<ItunesMovie[]>([]);
  const [tvShows, setTvShows] = useState<ItunesTvShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get random search terms based on content type
  const getRandomSearchTerms = () => {
    const type = contentType || "all";
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

  // Fetch data from API based on content type
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchTerm = getRandomSearchTerms();
      const type = contentType || "all";

      switch (type) {
        case "podcast": {
          const podcastResponse = await searchPodcast(searchTerm, 12);
          setPodcasts(podcastResponse.results || []);
          setEpisodes([]);
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
          setEpisodes([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "album": {
          const albumResponse = await searchAlbum(searchTerm, 12);
          setAlbums(albumResponse.results || []);
          setPodcasts([]);
          setEpisodes([]);
          setArtists([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "movie": {
          const movieResponse = await searchMovie(searchTerm, 12);
          setMovies(movieResponse.results || []);
          setPodcasts([]);
          setEpisodes([]);
          setArtists([]);
          setAlbums([]);
          setTvShows([]);
          break;
        }

        case "tvShow": {
          const tvShowResponse = await searchTvShow(searchTerm, 12);
          setTvShows(tvShowResponse.results || []);
          setPodcasts([]);
          setEpisodes([]);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          break;
        }

        case "music track": {
          const musicResponse = await searchMusic(searchTerm, 12);
          setEpisodes(musicResponse.results || []);
          setPodcasts([]);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }

        case "all":
        default: {
          // For "all" content type, fetch mixed content
          const [allPodcastResponse, allMusicResponse] = await Promise.all([
            searchPodcast(
              PODCAST_SEARCH_TERMS[Math.floor(Math.random() * PODCAST_SEARCH_TERMS.length)],
              6
            ),
            searchMusic(
              MUSIC_SEARCH_TERMS[Math.floor(Math.random() * MUSIC_SEARCH_TERMS.length)],
              6
            ),
          ]);

          setPodcasts(allPodcastResponse.results || []);
          setEpisodes(allMusicResponse.results || []);
          setArtists([]);
          setAlbums([]);
          setMovies([]);
          setTvShows([]);
          break;
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load content. Please try again later.");
      setPodcasts([]);
      setEpisodes([]);
      setArtists([]);
      setAlbums([]);
      setMovies([]);
      setTvShows([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount and when content type changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType]);

  return {
    podcasts,
    episodes,
    artists,
    albums,
    movies,
    tvShows,
    isLoading,
    error,
    fetchData,
  };
}
