import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsIn, Min, Max } from "class-validator";
import { Type } from "class-transformer";
export class ItunesSearchDto {
  @ApiProperty({
    description: "The URL-encoded text string you want to search for",
    example: "jack+johnson",
    required: true,
  })
  @IsString()
  term: string;

  @ApiProperty({
    description: "The two-letter country code for the store you want to search",
    example: "US",
    default: "US",
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string = "US";

  @ApiProperty({
    description: "The media type you want to search for",
    example: "music",
    enum: [
      "movie",
      "podcast",
      "music",
      "musicVideo",
      "audiobook",
      "shortFilm",
      "tvShow",
      "software",
      "ebook",
      "all",
    ],
    default: "all",
    required: false,
  })
  @IsOptional()
  @IsIn([
    "movie",
    "podcast",
    "music",
    "musicVideo",
    "audiobook",
    "shortFilm",
    "tvShow",
    "software",
    "ebook",
    "all",
  ])
  media?: string = "all";

  @ApiProperty({
    description: "The type of results you want returned, relative to the specified media type",
    example: "musicTrack",
    required: false,
  })
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiProperty({
    description: "The attribute you want to search for in the stores",
    example: "artistTerm",
    required: false,
  })
  @IsOptional()
  @IsString()
  attribute?: string;

  @ApiProperty({
    description: "The number of search results you want the iTunes Store to return",
    example: 25,
    minimum: 1,
    maximum: 200,
    default: 50,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number = 50;

  @ApiProperty({
    description: "The language you want to use when returning search results",
    example: "en_us",
    enum: ["en_us", "ja_jp"],
    default: "en_us",
    required: false,
  })
  @IsOptional()
  @IsIn(["en_us", "ja_jp"])
  lang?: string = "en_us";

  @ApiProperty({
    description: "The search result key version you want to receive back",
    example: 2,
    enum: [1, 2],
    default: 2,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2])
  version?: number = 2;

  @ApiProperty({
    description: "A flag indicating whether or not you want to include explicit content",
    example: "Yes",
    enum: ["Yes", "No"],
    default: "Yes",
    required: false,
  })
  @IsOptional()
  @IsIn(["Yes", "No"])
  explicit?: string = "Yes";
}

export class ItunesSearchResultDto<T> {
  @ApiProperty({ description: "Result count" })
  resultCount: number;

  @ApiProperty({
    description: "Array of search results",
    isArray: true,
    type: "object",
  })
  results: T[];
}
