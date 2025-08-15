import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

import {
  ItunesSearchDto,
  ItunesMusicSearchResult,
  ItunesArtistSearchResult,
  ItunesAlbumSearchResult,
  ItunesPodcastSearchResult,
  ItunesMovieSearchResult,
  ItunesTvShowSearchResult,
  ItunesGenericSearchResult,
} from "../dto";

@Injectable()
export class ItunesService {
  private readonly baseUrl = "https://itunes.apple.com";
  private readonly searchEndpoint = "/search";

  constructor(private readonly httpService: HttpService) {}

  async search(searchParams: ItunesSearchDto): Promise<ItunesGenericSearchResult> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      // Required parameters
      queryParams.append("term", searchParams.term);

      // Optional parameters
      if (searchParams.country) {
        queryParams.append("country", searchParams.country);
      }
      if (searchParams.media) {
        queryParams.append("media", searchParams.media);
      }
      if (searchParams.entity) {
        queryParams.append("entity", searchParams.entity);
      }
      if (searchParams.attribute) {
        queryParams.append("attribute", searchParams.attribute);
      }
      if (searchParams.limit) {
        queryParams.append("limit", searchParams.limit.toString());
      }
      if (searchParams.lang) {
        queryParams.append("lang", searchParams.lang);
      }
      if (searchParams.version) {
        queryParams.append("version", searchParams.version.toString());
      }
      if (searchParams.explicit) {
        queryParams.append("explicit", searchParams.explicit);
      }

      const url = `${this.baseUrl}${this.searchEndpoint}?${queryParams.toString()}`;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Accept: "application/json",
            "User-Agent": "Tune8-API/1.0.0",
          },
          timeout: 10000, // 10 second timeout
        })
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        // iTunes API returned an error response
        throw new HttpException(
          `iTunes API error: ${error.response.status} - ${error.response.statusText}`,
          error.response.status
        );
      } else if (error.code === "ECONNABORTED") {
        // Request timeout
        throw new HttpException("iTunes API request timeout", HttpStatus.REQUEST_TIMEOUT);
      } else if (error.code === "ENOTFOUND") {
        // Network error
        throw new HttpException("Unable to connect to iTunes API", HttpStatus.SERVICE_UNAVAILABLE);
      } else {
        // Unknown error
        throw new HttpException(
          "An unexpected error occurred while searching iTunes",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async searchMusic(term: string, limit = 25): Promise<ItunesMusicSearchResult> {
    const result = await this.search({
      term,
      media: "music",
      entity: "musicTrack",
      limit,
    });
    return result as ItunesMusicSearchResult;
  }

  async searchArtist(term: string, limit = 25): Promise<ItunesArtistSearchResult> {
    const result = await this.search({
      term,
      media: "music",
      entity: "musicArtist",
      limit,
    });
    return result as ItunesArtistSearchResult;
  }

  async searchAlbum(term: string, limit = 25): Promise<ItunesAlbumSearchResult> {
    const result = await this.search({
      term,
      media: "music",
      entity: "album",
      limit,
    });
    return result as ItunesAlbumSearchResult;
  }

  async searchPodcast(term: string, limit = 25): Promise<ItunesPodcastSearchResult> {
    const result = await this.search({
      term,
      media: "podcast",
      limit,
    });
    return result as ItunesPodcastSearchResult;
  }

  async searchMovie(term: string, limit = 25): Promise<ItunesMovieSearchResult> {
    const result = await this.search({
      term,
      media: "movie",
      limit,
    });
    return result as ItunesMovieSearchResult;
  }

  async searchTvShow(term: string, limit = 25): Promise<ItunesTvShowSearchResult> {
    const result = await this.search({
      term,
      media: "tvShow",
      limit,
    });
    return result as ItunesTvShowSearchResult;
  }
}
