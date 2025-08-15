import { Controller, Get, Query, HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";

import { ItunesService } from "../services/itunes.service";
import {
  ItunesSearchDto,
  ItunesSearchResultDto,
  ItunesMusicSearchResult,
  ItunesArtistSearchResult,
  ItunesAlbumSearchResult,
  ItunesPodcastSearchResult,
  ItunesMovieSearchResult,
  ItunesTvShowSearchResult,
  ItunesGenericSearchResult,
} from "../dto";

@ApiTags("iTunes Search")
@Controller("itunes")
export class ItunesController {
  constructor(private readonly itunesService: ItunesService) {}

  @Get("search")
  @ApiOperation({
    summary: "Search iTunes Store",
    description:
      "Search for content across all media types in the iTunes Store using the official iTunes Search API",
  })
  @ApiResponse({
    status: 200,
    description: "Search results from iTunes Store",
    type: ItunesSearchResultDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid search parameters",
  })
  @ApiResponse({
    status: 408,
    description: "iTunes API request timeout",
  })
  @ApiResponse({
    status: 503,
    description: "iTunes API service unavailable",
  })
  async search(
    @Query(new ValidationPipe({ transform: true })) searchParams: ItunesSearchDto
  ): Promise<ItunesGenericSearchResult> {
    if (!searchParams.term || searchParams.term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.itunesService.search(searchParams);
  }

  @Get("search/music")
  @ApiOperation({
    summary: "Search for music tracks",
    description: "Search specifically for music tracks in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for music tracks",
    example: "jack+johnson",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Music search results",
    type: ItunesSearchResultDto,
  })
  async searchMusic(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesMusicSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchMusic(term, limitNumber);
  }

  @Get("search/artist")
  @ApiOperation({
    summary: "Search for music artists",
    description: "Search specifically for music artists in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for music artists",
    example: "jack+johnson",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Artist search results",
    type: ItunesSearchResultDto,
  })
  async searchArtist(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesArtistSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchArtist(term, limitNumber);
  }

  @Get("search/album")
  @ApiOperation({
    summary: "Search for music albums",
    description: "Search specifically for music albums in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for music albums",
    example: "in+between+dreams",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Album search results",
    type: ItunesSearchResultDto,
  })
  async searchAlbum(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesAlbumSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchAlbum(term, limitNumber);
  }

  @Get("search/podcast")
  @ApiOperation({
    summary: "Search for podcasts",
    description: "Search specifically for podcasts in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for podcasts",
    example: "serial",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Podcast search results",
    type: ItunesSearchResultDto,
  })
  async searchPodcast(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesPodcastSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchPodcast(term, limitNumber);
  }

  @Get("search/movie")
  @ApiOperation({
    summary: "Search for movies",
    description: "Search specifically for movies in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for movies",
    example: "inception",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Movie search results",
    type: ItunesSearchResultDto,
  })
  async searchMovie(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesMovieSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchMovie(term, limitNumber);
  }

  @Get("search/tvshow")
  @ApiOperation({
    summary: "Search for TV shows",
    description: "Search specifically for TV shows in the iTunes Store",
  })
  @ApiQuery({
    name: "term",
    description: "Search term for TV shows",
    example: "breaking+bad",
    required: true,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of results to return (1-200)",
    example: 25,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "TV show search results",
    type: ItunesSearchResultDto,
  })
  async searchTvShow(
    @Query("term") term: string,
    @Query("limit") limit?: string
  ): Promise<ItunesTvShowSearchResult> {
    if (!term || term.trim().length === 0) {
      throw new HttpException(
        "Search term is required and cannot be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    const limitNumber = limit ? parseInt(limit, 10) : 25;
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 200) {
      throw new HttpException("Limit must be a number between 1 and 200", HttpStatus.BAD_REQUEST);
    }

    return this.itunesService.searchTvShow(term, limitNumber);
  }
}
