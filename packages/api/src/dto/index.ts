import { ItunesSearchResultDto } from "./itunes-search.dto";
import { ItunesArtistDto } from "./itunes-artist.dto";
import { ItunesMusicTrackDto } from "./itunes-music-track.dto";
import { ItunesAlbumDto } from "./itunes-album.dto";
import { ItunesPodcastDto } from "./itunes-podcast.dto";
import { ItunesMovieDto } from "./itunes-movie.dto";
import { ItunesTvShowDto } from "./itunes-tv-show.dto";
import { ItunesGenericResultDto } from "./itunes-generic-result.dto";

// Search DTOs
export { ItunesSearchDto, ItunesSearchResultDto } from "./itunes-search.dto";

// Artist DTOs
export { ItunesArtistDto } from "./itunes-artist.dto";

// Result DTOs
export { ItunesMusicTrackDto } from "./itunes-music-track.dto";
export { ItunesAlbumDto } from "./itunes-album.dto";
export { ItunesPodcastDto } from "./itunes-podcast.dto";
export { ItunesMovieDto } from "./itunes-movie.dto";
export { ItunesTvShowDto } from "./itunes-tv-show.dto";
export { ItunesGenericResultDto } from "./itunes-generic-result.dto";

// Type aliases for easier use
export type ItunesMusicSearchResult = ItunesSearchResultDto<ItunesMusicTrackDto>;
export type ItunesArtistSearchResult = ItunesSearchResultDto<ItunesArtistDto>;
export type ItunesAlbumSearchResult = ItunesSearchResultDto<ItunesAlbumDto>;
export type ItunesPodcastSearchResult = ItunesSearchResultDto<ItunesPodcastDto>;
export type ItunesMovieSearchResult = ItunesSearchResultDto<ItunesMovieDto>;
export type ItunesTvShowSearchResult = ItunesSearchResultDto<ItunesTvShowDto>;
export type ItunesGenericSearchResult = ItunesSearchResultDto<ItunesGenericResultDto>;
