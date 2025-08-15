import { ApiProperty } from "@nestjs/swagger";

export class ItunesPodcastDto {
  @ApiProperty({ description: "The type of wrapper for this result", example: "track" })
  wrapperType: string;

  @ApiProperty({ description: "The type of track", example: "podcast" })
  kind: string;

  @ApiProperty({ description: "The unique iTunes track ID", example: 1440813765 })
  trackId: number;

  @ApiProperty({ description: "The name of the podcast", example: "Serial" })
  trackName: string;

  @ApiProperty({ description: "The name of the artist/creator", example: "This American Life" })
  artistName: string;

  @ApiProperty({ description: "The unique iTunes artist ID", example: 909253 })
  artistId: number;

  @ApiProperty({ description: "The URL link to the podcast on iTunes" })
  trackViewUrl: string;

  @ApiProperty({ description: "The URL link to the artist on iTunes" })
  artistViewUrl: string;

  @ApiProperty({ description: "The feed URL for the podcast" })
  feedUrl: string;

  @ApiProperty({ description: "The artwork URL for the podcast", required: false })
  artworkUrl30?: string;

  @ApiProperty({ description: "The artwork URL for the podcast", required: false })
  artworkUrl60?: string;

  @ApiProperty({ description: "The artwork URL for the podcast", required: false })
  artworkUrl100?: string;

  @ApiProperty({ description: "The artwork URL for the podcast", required: false })
  artworkUrl600?: string;

  @ApiProperty({ description: "The release date of the podcast" })
  releaseDate: string;

  @ApiProperty({ description: "The primary genre name", example: "Society & Culture" })
  primaryGenreName: string;

  @ApiProperty({ description: "The primary genre ID", example: 1324 })
  primaryGenreId: number;

  @ApiProperty({ description: "The country code", example: "USA" })
  country: string;

  @ApiProperty({ description: "The track price", example: 0 })
  trackPrice: number;

  @ApiProperty({ description: "The currency code", example: "USD" })
  currency: string;

  @ApiProperty({ description: "Whether the podcast is explicit", example: "No" })
  trackExplicitness: string;

  @ApiProperty({ description: "The episode count", example: 12 })
  episodeCount: number;

  @ApiProperty({ description: "The content advisory rating", example: "Clean" })
  contentAdvisoryRating: string;
}
