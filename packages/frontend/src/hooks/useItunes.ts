import { useState, useCallback } from "react";
import {
  searchMusic as searchMusicApi,
  searchArtist as searchArtistApi,
  searchAlbum as searchAlbumApi,
  searchPodcast as searchPodcastApi,
  searchMovie as searchMovieApi,
  searchTvShow as searchTvShowApi,
  ItunesMusicSearchResult,
  ItunesArtistSearchResult,
  ItunesAlbumSearchResult,
  ItunesPodcastSearchResult,
  ItunesMovieSearchResult,
  ItunesTvShowSearchResult,
  ItunesApiError,
} from "../services";

interface UseItunesState<T> {
  data: T | null;
  loading: boolean;
  error: ItunesApiError | null;
}

interface UseItunesReturn<T> extends UseItunesState<T> {
  searchMusic: (term: string, limit?: number) => Promise<void>;
  searchArtist: (term: string, limit?: number) => Promise<void>;
  searchAlbum: (term: string, limit?: number) => Promise<void>;
  searchPodcast: (term: string, limit?: number) => Promise<void>;
  searchMovie: (term: string, limit?: number) => Promise<void>;
  searchTvShow: (term: string, limit?: number) => Promise<void>;
  clearError: () => void;
  clearData: () => void;
}

export function useItunes<T = ItunesMusicSearchResult>(): UseItunesReturn<T> {
  const [state, setState] = useState<UseItunesState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: ItunesApiError) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data, loading: false, error: null }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearData = useCallback(() => {
    setState(prev => ({ ...prev, data: null }));
  }, []);

  const searchMusic = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchMusicApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  const searchArtist = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchArtistApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  const searchAlbum = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchAlbumApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  const searchPodcast = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchPodcastApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  const searchMovie = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchMovieApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  const searchTvShow = useCallback(
    async (term: string, limit = 25) => {
      setLoading(true);
      try {
        const result = (await searchTvShowApi(term, limit)) as T;
        setData(result);
      } catch (error) {
        setError(error as ItunesApiError);
      }
    },
    [setLoading, setData, setError]
  );

  return {
    ...state,
    searchMusic,
    searchArtist,
    searchAlbum,
    searchPodcast,
    searchMovie,
    searchTvShow,
    clearError,
    clearData,
  };
}

// Specialized hooks for specific search types
export function useItunesMusic() {
  return useItunes<ItunesMusicSearchResult>();
}

export function useItunesArtist() {
  return useItunes<ItunesArtistSearchResult>();
}

export function useItunesAlbum() {
  return useItunes<ItunesAlbumSearchResult>();
}

export function useItunesPodcast() {
  return useItunes<ItunesPodcastSearchResult>();
}

export function useItunesMovie() {
  return useItunes<ItunesMovieSearchResult>();
}

export function useItunesTvShow() {
  return useItunes<ItunesTvShowSearchResult>();
}
