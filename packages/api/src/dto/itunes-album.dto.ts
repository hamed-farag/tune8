import { ApiProperty } from "@nestjs/swagger";

export class ItunesAlbumDto {
  @ApiProperty({ description: "The type of wrapper for this result", example: "collection" })
  wrapperType: string;

  @ApiProperty({ description: "The type of collection", example: "Album" })
  collectionType: string;

  @ApiProperty({ description: "The name of the collection/album", example: "In Between Dreams" })
  collectionName: string;

  @ApiProperty({ description: "The unique iTunes collection ID", example: 1440813764 })
  collectionId: number;

  @ApiProperty({ description: "The name of the artist", example: "Jack Johnson" })
  artistName: string;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253 })
  artistId: number;

  @ApiProperty({ description: "The URL link to the collection on iTunes" })
  collectionViewUrl: string;

  @ApiProperty({ description: "The URL link to the artist on iTunes" })
  artistViewUrl: string;

  @ApiProperty({ description: "The artwork URL for the collection", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL for the collection", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The release date of the collection" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Rock" })
  primaryGenreName: string;

  @ApiProperty({ description: "The collection price", example: 9.99 })
  collectionPrice: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  @ApiProperty({ description: "Whether the collection is explicit", example: "NotExplicit" })
  collectionExplicitness: string;

  @ApiProperty({ description: "The total number of tracks", example: 15 })
  trackCount: number;
}
