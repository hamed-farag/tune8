import { ApiProperty } from "@nestjs/swagger";

export class ItunesTvShowDto {
  @ApiProperty({ description: "The type of wrapper for this result", example: "track" })
  wrapperType: string;

  @ApiProperty({ description: "The type of track", example: "tv-episode" })
  kind: string;

  @ApiProperty({ description: "The unique iTunes track ID", example: 1440813765 })
  trackId: number;

  @ApiProperty({ description: "The name of the TV show", example: "Breaking Bad" })
  trackName: string;

  @ApiProperty({ description: "The name of the artist/creator", example: "Vince Gilligan" })
  artistName: string;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253 })
  artistId: number;

  @ApiProperty({ description: "The name of the collection/series", example: "Breaking Bad" })
  collectionName: string;

  @ApiProperty({ description: "The unique iTunes collection ID", example: 1440813764 })
  collectionId: number;

  @ApiProperty({ description: "The URL link to the TV show on iTunes" })
  trackViewUrl: string;

  @ApiProperty({ description: "The URL link to the artist on iTunes" })
  artistViewUrl: string;

  @ApiProperty({ description: "The URL link to the collection on iTunes" })
  collectionViewUrl: string;

  @ApiProperty({ description: "The preview URL for the TV show" })
  previewUrl: string;

  @ApiProperty({ description: "The artwork URL for the TV show", required: false })
  artworkUrl30?: string;

  @ApiProperty({ description: "The artwork URL for the TV show", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL for the TV show", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The release date of the TV show" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Drama" })
  primaryGenreName: string;

  @ApiProperty({ description: "The track price", example: 2.99 })
  trackPrice: number;

  @ApiProperty({ description: "The collection price", example: 29.99 })
  collectionPrice: number;

  @ApiProperty({ description: "The track time in milliseconds", example: 2700000 })
  trackTimeMillis: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  @ApiProperty({ description: "Whether the TV show is explicit", example: "No" })
  trackExplicitness: string;

  @ApiProperty({ description: "The content advisory rating", example: "TV-MA" })
  contentAdvisoryRating: string;

  @ApiProperty({
    description: "The short description",
    example: "A high school chemistry teacher turned methamphetamine manufacturer.",
  })
  shortDescription: string;

  @ApiProperty({ description: "The long description", required: false })
  longDescription?: string;

  @ApiProperty({ description: "The episode number", example: 1 })
  episodeNumber: number;

  @ApiProperty({ description: "The season number", example: 1 })
  seasonNumber: number;
}
