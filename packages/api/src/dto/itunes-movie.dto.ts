import { ApiProperty } from "@nestjs/swagger";

export class ItunesMovieDto {
  @ApiProperty({ description: "The type of wrapper for this result", example: "track" })
  wrapperType: string;

  @ApiProperty({ description: "The type of track", example: "feature-movie" })
  kind: string;

  @ApiProperty({ description: "The unique iTunes track ID", example: 1440813765 })
  trackId: number;

  @ApiProperty({ description: "The name of the movie", example: "The Matrix" })
  trackName: string;

  @ApiProperty({ description: "The name of the artist/director", example: "Lana Wachowski" })
  artistName: string;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253 })
  artistId: number;

  @ApiProperty({ description: "The URL link to the movie on iTunes" })
  trackViewUrl: string;

  @ApiProperty({ description: "The URL link to the artist on iTunes" })
  artistViewUrl: string;

  @ApiProperty({ description: "The preview URL for the movie" })
  previewUrl: string;

  @ApiProperty({ description: "The artwork URL for the movie", required: false })
  artworkUrl30?: string;

  @ApiProperty({ description: "The artwork URL for the movie", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL for the movie", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The release date of the movie" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Action & Adventure" })
  primaryGenreName: string;

  @ApiProperty({ description: "The track price", example: 14.99 })
  trackPrice: number;

  @ApiProperty({ description: "The rental price", example: 3.99 })
  trackRentalPrice: number;

  @ApiProperty({ description: "The track time in milliseconds", example: 8160000 })
  trackTimeMillis: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  @ApiProperty({ description: "Whether the movie is explicit", example: "No" })
  trackExplicitness: string;

  @ApiProperty({ description: "The content advisory rating", example: "R" })
  contentAdvisoryRating: string;

  @ApiProperty({
    description: "The short description",
    example:
      "A computer hacker learns from mysterious rebels about the true nature of his reality.",
  })
  shortDescription: string;

  @ApiProperty({ description: "The long description", required: false })
  longDescription?: string;
}
