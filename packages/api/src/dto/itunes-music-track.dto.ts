import { ApiProperty } from "@nestjs/swagger";

export class ItunesMusicTrackDto {
  @ApiProperty({ description: "The type of wrapper for this result", example: "track" })
  wrapperType: string;

  @ApiProperty({ description: "The type of track", example: "song" })
  kind: string;

  @ApiProperty({ description: "The unique iTunes track ID", example: 1440813765 })
  trackId: number;

  @ApiProperty({ description: "The name of the track", example: "Better Together" })
  trackName: string;

  @ApiProperty({ description: "The name of the artist", example: "Jack Johnson" })
  artistName: string;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253 })
  artistId: number;

  @ApiProperty({ description: "The name of the collection/album", example: "In Between Dreams" })
  collectionName: string;

  @ApiProperty({ description: "The unique iTunes collection ID", example: 1440813764 })
  collectionId: number;

  @ApiProperty({ description: "The URL link to the track on iTunes" })
  trackViewUrl: string;

  @ApiProperty({ description: "The URL link to the artist on iTunes" })
  artistViewUrl: string;

  @ApiProperty({ description: "The URL link to the collection on iTunes" })
  collectionViewUrl: string;

  @ApiProperty({ description: "The preview URL for the track" })
  previewUrl: string;

  @ApiProperty({ description: "The artwork URL for the track", required: false })
  artworkUrl30?: string;

  @ApiProperty({ description: "The artwork URL for the track", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL for the track", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The release date of the track" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Rock" })
  primaryGenreName: string;

  @ApiProperty({ description: "The track price", example: 1.29 })
  trackPrice: number;

  @ApiProperty({ description: "The collection price", example: 9.99 })
  collectionPrice: number;

  @ApiProperty({ description: "The track time in milliseconds", example: 207679 })
  trackTimeMillis: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  @ApiProperty({ description: "Whether the track is explicit", example: "No" })
  trackExplicitness: string;

  @ApiProperty({ description: "Whether the collection is explicit", example: "NotExplicit" })
  collectionExplicitness: string;

  @ApiProperty({ description: "The track number", example: 1 })
  trackNumber: number;

  @ApiProperty({ description: "The total number of tracks", example: 15 })
  trackCount: number;

  @ApiProperty({ description: "The disc number", example: 1 })
  discNumber: number;

  @ApiProperty({ description: "The total number of discs", example: 1 })
  discCount: number;
}
