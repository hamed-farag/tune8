import axios, { AxiosResponse } from "axios";
import {
  ItunesMusicSearchResult,
  ItunesArtistSearchResult,
  ItunesAlbumSearchResult,
  ItunesPodcastSearchResult,
  ItunesMovieSearchResult,
  ItunesTvShowSearchResult,
  ItunesApiError,
} from "../types/itunes.types";

import config from "../../config/env";

const API_BASE_URL = `${config.api.baseUrl}/api`;

/**
 * Handle API errors consistently
 */
function handleError(error: any): ItunesApiError {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || "An error occurred";
    const status = error.response?.status || 500;
    return { message, status };
  }
  return {
    message: error.message || "An unexpected error occurred",
    status: 500,
  };
}

/**
 * Search specifically for music tracks
 */
export async function searchMusic(term: string, limit = 25): Promise<ItunesMusicSearchResult> {
  try {
    const response: AxiosResponse<ItunesMusicSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/music`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Search specifically for music artists
 */
export async function searchArtist(term: string, limit = 25): Promise<ItunesArtistSearchResult> {
  try {
    const response: AxiosResponse<ItunesArtistSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/artist`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Search specifically for music albums
 */
export async function searchAlbum(term: string, limit = 25): Promise<ItunesAlbumSearchResult> {
  try {
    const response: AxiosResponse<ItunesAlbumSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/album`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Search specifically for podcasts
 */
export async function searchPodcast(term: string, limit = 25): Promise<ItunesPodcastSearchResult> {
  try {
    const response: AxiosResponse<ItunesPodcastSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/podcast`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Search specifically for movies
 */
export async function searchMovie(term: string, limit = 25): Promise<ItunesMovieSearchResult> {
  try {
    const response: AxiosResponse<ItunesMovieSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/movie`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Search specifically for TV shows
 */
export async function searchTvShow(term: string, limit = 25): Promise<ItunesTvShowSearchResult> {
  try {
    const response: AxiosResponse<ItunesTvShowSearchResult> = await axios.get(
      `${API_BASE_URL}/itunes/search/tvshow`,
      { params: { term, limit } }
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
