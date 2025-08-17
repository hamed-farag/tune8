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
import { DynamoDBService } from "./dynamodb.service";

@Injectable()
export class ItunesService {
  private readonly baseUrl = "https://itunes.apple.com";
  private readonly searchEndpoint = "/search";

  constructor(
    private readonly httpService: HttpService,
    private readonly dynamoDBService: DynamoDBService
  ) {}

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

      // Determine search type based on the calling method
      const searchType = "generic";
      // This will be overridden by the specific search methods

      // Store results in DynamoDB
      let searchId: string | null = null;
      let storedResults = null;

      try {
        searchId = await this.dynamoDBService.storeItunesSearchResults(
          searchType,
          searchParams.term,
          searchParams,
          response.data
        );

        storedResults = await this.dynamoDBService.getItunesSearchResults(searchId);
      } catch (storageError) {
        console.warn(
          "Failed to store results in DynamoDB, continuing without storage:",
          storageError
        );
        // Continue without storage - the API should still work
      }

      // Return results with search ID (if available)
      const finalResults = storedResults || response.data;

      // If we have stored results, we need to flatten the structure
      if (
        storedResults &&
        storedResults.results &&
        typeof storedResults.results === "object" &&
        "results" in storedResults.results
      ) {
        // The stored results have a nested structure, flatten it
        return {
          resultCount: storedResults.results.resultCount || finalResults.resultCount,
          results: storedResults.results.results || finalResults.results,
          searchId: searchId || null,
          createdAt: storedResults.createdAt,
          searchTerm: storedResults.searchTerm,
          searchType: storedResults.searchType,
          timestamp: storedResults.timestamp,
          searchParams: storedResults.searchParams,
        } as any; // Type assertion to handle additional properties
      }

      return {
        ...finalResults,
        searchId: searchId || null,
      } as any; // Type assertion to handle additional properties
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
      limit,
    });
    return result as ItunesMusicSearchResult;
  }

  async searchArtist(term: string, limit = 25): Promise<ItunesArtistSearchResult> {
    const result = await this.search({
      term,
      limit,
    });
    return result as ItunesArtistSearchResult;
  }

  async searchAlbum(term: string, limit = 25): Promise<ItunesAlbumSearchResult> {
    const result = await this.search({
      term,
      limit,
    });
    return result as ItunesAlbumSearchResult;
  }

  async searchPodcast(term: string, limit = 25): Promise<ItunesPodcastSearchResult> {
    const result = await this.search({
      term,
      limit,
    });
    return result as ItunesPodcastSearchResult;
  }

  async searchMovie(term: string, limit = 25): Promise<ItunesMovieSearchResult> {
    const result = await this.search({
      term,
      limit,
    });
    return result as ItunesMovieSearchResult;
  }

  async searchTvShow(term: string, limit = 25): Promise<ItunesTvShowSearchResult> {
    const result = await this.search({
      term,
      limit,
    });
    return result as ItunesTvShowSearchResult;
  }
}
