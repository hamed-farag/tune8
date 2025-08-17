// Base search parameters interface
export interface ItunesSearchParams {
  term: string;
  country?: string;
  media?: string;
  entity?: string;
  attribute?: string;
  limit?: number;
  lang?: string;
  version?: number;
  explicit?: string;
}

// Generic search result wrapper
export interface ItunesSearchResult<T> {
  resultCount: number;
  results: T[];
}

// Generic result interface for mixed content
export interface ItunesGenericResult {
  wrapperType: string;
  kind: string;
  trackId?: number;
  collectionId?: number;
  artistId?: number;
  trackName?: string;
  collectionName?: string;
  artistName?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
  artistViewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  primaryGenreId?: number;
  country?: string;
  trackPrice?: number;
  collectionPrice?: number;
  currency?: string;
  trackExplicitness?: string;
  collectionExplicitness?: string;
  trackTimeMillis?: number;
  trackCount?: number;
  episodeCount?: number;
  contentAdvisoryRating?: string;
  feedUrl?: string;
}

// Music track interface
export interface ItunesMusicTrack {
  wrapperType: string;
  kind: string;
  trackId: number;
  artistName: string;
  trackName: string;
  trackViewUrl: string;
  artistViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
  country: string;
  trackPrice: number;
  currency: string;
  trackExplicitness: string;
  trackTimeMillis: number;
  trackCount?: number;
  collectionName?: string;
  collectionId?: number;
  collectionViewUrl?: string;
  collectionPrice?: number;
  collectionExplicitness?: string;
}

// Artist interface
export interface ItunesArtist {
  wrapperType: string;
  artistType: string;
  artistName: string;
  artistLinkUrl: string;
  artistId: number;
  amgArtistId?: number;
  primaryGenreName: string;
  primaryGenreId: number;
  country: string;
  artistViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
}

// Album interface
export interface ItunesAlbum {
  wrapperType: string;
  collectionType: string;
  artistId: number;
  collectionId: number;
  amgArtistId?: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  country: string;
  currency: string;
  releaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
}

// Podcast interface
export interface ItunesPodcast {
  wrapperType: string;
  kind: string;
  trackId: number;
  trackName: string;
  artistName: string;
  artistId: number;
  trackViewUrl: string;
  artistViewUrl: string;
  feedUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
  country: string;
  trackPrice: number;
  currency: string;
  trackExplicitness: string;
  episodeCount: number;
  contentAdvisoryRating: string;
}

// Movie interface
export interface ItunesMovie {
  wrapperType: string;
  kind: string;
  trackId: number;
  trackName: string;
  trackCensoredName: string;
  trackViewUrl: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
  country: string;
  trackPrice: number;
  currency: string;
  trackTimeMillis: number;
  trackExplicitness: string;
  contentAdvisoryRating: string;
  shortDescription?: string;
  longDescription?: string;
  artistName?: string;
  artistId?: number;
  artistViewUrl?: string;
  collectionName?: string;
  collectionId?: number;
  collectionViewUrl?: string;
  collectionPrice?: number;
  collectionExplicitness?: string;
}

// TV Show interface
export interface ItunesTvShow {
  wrapperType: string;
  kind: string;
  trackId: number;
  trackName: string;
  trackCensoredName: string;
  trackViewUrl: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate: string;
  primaryGenreName: string;
  primaryGenreId: number;
  country: string;
  trackPrice: number;
  currency: string;
  trackTimeMillis: number;
  trackExplicitness: string;
  contentAdvisoryRating: string;
  shortDescription?: string;
  longDescription?: string;
  artistName?: string;
  artistId?: number;
  artistViewUrl?: string;
  collectionName?: string;
  collectionId?: number;
  collectionViewUrl?: string;
  collectionPrice?: number;
  collectionExplicitness?: string;
  episodeCount?: number;
}

// API Response types
export type ItunesMusicSearchResult = ItunesSearchResult<ItunesMusicTrack>;
export type ItunesArtistSearchResult = ItunesSearchResult<ItunesArtist>;
export type ItunesAlbumSearchResult = ItunesSearchResult<ItunesAlbum>;
export type ItunesPodcastSearchResult = ItunesSearchResult<ItunesPodcast>;
export type ItunesMovieSearchResult = ItunesSearchResult<ItunesMovie>;
export type ItunesTvShowSearchResult = ItunesSearchResult<ItunesTvShow>;
export type ItunesGenericSearchResult = ItunesSearchResult<ItunesGenericResult>;

// Error interface
export interface ItunesApiError {
  message: string;
  status: number;
}

// Union type for all iTunes result types
export type ItunesResultItem =
  | ItunesGenericResult
  | ItunesMusicTrack
  | ItunesArtist
  | ItunesAlbum
  | ItunesPodcast
  | ItunesMovie
  | ItunesTvShow;
