import { ApiProperty } from "@nestjs/swagger";

export class ItunesGenericResultDto {
  // Common fields for all result types
  @ApiProperty({ description: "The type of wrapper for this result", example: "track" })
  wrapperType: string;

  @ApiProperty({ description: "The type of track/entity", example: "song", required: false })
  kind?: string;

  @ApiProperty({ description: "The unique iTunes track ID", example: 255145362, required: false })
  trackId?: number;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253, required: false })
  artistId?: number;

  @ApiProperty({
    description: "The unique iTunes collection ID",
    example: 255144028,
    required: false,
  })
  collectionId?: number;

  @ApiProperty({ description: "The name of the artist", example: "Jack Johnson" })
  artistName: string;

  @ApiProperty({ description: "The name of the track/song", example: "Imagine", required: false })
  trackName?: string;

  @ApiProperty({
    description: "The name of the collection/album",
    example: "Instant Karma: The Amnesty International Campaign to Save Darfur",
    required: false,
  })
  collectionName?: string;

  @ApiProperty({
    description: "The censored name of the collection",
    example: "Instant Karma: The Amnesty International Campaign to Save Darfur",
    required: false,
  })
  collectionCensoredName?: string;

  @ApiProperty({
    description: "The censored name of the track",
    example: "Imagine",
    required: false,
  })
  trackCensoredName?: string;

  @ApiProperty({ description: "The collection artist ID", example: 825559, required: false })
  collectionArtistId?: number;

  @ApiProperty({
    description: "The collection artist name",
    example: "Various Artists",
    required: false,
  })
  collectionArtistName?: string;

  // URL fields
  @ApiProperty({ description: "The URL link to the artist on iTunes", required: false })
  artistViewUrl?: string;

  @ApiProperty({ description: "The URL link to the collection on iTunes", required: false })
  collectionViewUrl?: string;

  @ApiProperty({ description: "The URL link to the track on iTunes", required: false })
  trackViewUrl?: string;

  @ApiProperty({ description: "The preview URL for the track", required: false })
  previewUrl?: string;

  @ApiProperty({ description: "The feed URL for podcasts", required: false })
  feedUrl?: string;

  // Artwork URLs
  @ApiProperty({ description: "The artwork URL (30x30)", required: false })
  artworkUrl30?: string;

  @ApiProperty({ description: "The artwork URL (60x60)", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL (100x100)", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The artwork URL (600x600) for podcasts", required: false })
  artworkUrl600?: string;

  // Pricing
  @ApiProperty({ description: "The collection price", example: 19.99, required: false })
  collectionPrice?: number;

  @ApiProperty({ description: "The track price", example: 1.29, required: false })
  trackPrice?: number;

  @ApiProperty({ description: "The rental price for movies", example: 3.99, required: false })
  trackRentalPrice?: number;

  // Metadata
  @ApiProperty({ description: "The release date", example: "2007-06-11T12:00:00Z" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Rock" })
  primaryGenreName: string;

  @ApiProperty({ description: "The primary genre ID", example: 21, required: false })
  primaryGenreId?: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  // Explicitness
  @ApiProperty({
    description: "Whether the collection is explicit",
    example: "explicit",
    required: false,
  })
  collectionExplicitness?: string;

  @ApiProperty({
    description: "Whether the track is explicit",
    example: "notExplicit",
    required: false,
  })
  trackExplicitness?: string;

  // Track/Album specific fields
  @ApiProperty({ description: "The track number", example: 15, required: false })
  trackNumber?: number;

  @ApiProperty({ description: "The total number of tracks", example: 34, required: false })
  trackCount?: number;

  @ApiProperty({ description: "The disc number", example: 1, required: false })
  discNumber?: number;

  @ApiProperty({ description: "The total number of discs", example: 1, required: false })
  discCount?: number;

  @ApiProperty({ description: "The track time in milliseconds", example: 219080, required: false })
  trackTimeMillis?: number;

  // Podcast specific fields
  @ApiProperty({ description: "The episode count for podcasts", example: 12, required: false })
  episodeCount?: number;

  // Movie/TV specific fields
  @ApiProperty({ description: "The content advisory rating", example: "R", required: false })
  contentAdvisoryRating?: string;

  @ApiProperty({ description: "The short description", required: false })
  shortDescription?: string;

  @ApiProperty({ description: "The long description", required: false })
  longDescription?: string;

  @ApiProperty({ description: "The episode number for TV shows", example: 1, required: false })
  episodeNumber?: number;

  @ApiProperty({ description: "The season number for TV shows", example: 1, required: false })
  seasonNumber?: number;

  // Artist specific fields
  @ApiProperty({ description: "The type of artist", example: "Artist", required: false })
  artistType?: string;

  @ApiProperty({ description: "The URL link to the artist", required: false })
  artistLinkUrl?: string;

  @ApiProperty({ description: "The AllMusic artist ID", example: 468749, required: false })
  amgArtistId?: number;

  // Collection specific fields
  @ApiProperty({ description: "The type of collection", example: "Album", required: false })
  collectionType?: string;

  // Streaming
  @ApiProperty({ description: "Whether the track is streamable", example: true, required: false })
  isStreamable?: boolean;
}
