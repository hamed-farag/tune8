import { ApiProperty } from "@nestjs/swagger";

export class ItunesArtistDto {
  @ApiProperty({
    description: "The type of wrapper for this result",
    example: "artist",
  })
  wrapperType: string;

  @ApiProperty({
    description: "The type of artist",
    example: "Artist",
  })
  artistType: string;

  @ApiProperty({
    description: "The name of the artist",
    example: "Jack Johnson",
  })
  artistName: string;

  @ApiProperty({
    description: "The URL link to the artist on iTunes",
    example: "https://music.apple.com/us/artist/jack-johnson/909253?uo=4",
  })
  artistLinkUrl: string;

  @ApiProperty({
    description: "The unique iTunes artist ID",
    example: 909253,
  })
  artistId: number;

  @ApiProperty({
    description: "The AllMusic artist ID",
    example: 468749,
    required: false,
  })
  amgArtistId?: number;

  @ApiProperty({
    description: "The primary genre name",
    example: "Rock",
  })
  primaryGenreName: string;

  @ApiProperty({
    description: "The primary genre ID",
    example: 21,
  })
  primaryGenreId: number;
}
