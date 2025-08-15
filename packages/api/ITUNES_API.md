# iTunes Search API Integration

This document describes the iTunes Search API integration for the Tune8 API.

## Overview

The iTunes Search API integration provides endpoints to search for content across all media types in the iTunes Store using the official [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html). The API includes DynamoDB integration for storing and retrieving search results.

## Configuration

The API is configurable through environment variables:

- `PORT`: Server port (default: 4009)
- `API_PREFIX`: API prefix for all endpoints (default: "api")
- `FRONTEND_URL`: Frontend URL for CORS (default: "http://localhost:4009")
- `DYNAMODB_ENDPOINT`: DynamoDB endpoint (default: "http://localhost:8000")
- `DYNAMODB_REGION`: AWS region for DynamoDB (default: "fakeRegion")
- `AWS_ACCESS_KEY_ID`: AWS access key ID (default: "fakeMyKeyId")
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key (default: "fakeSecretAccessKey")

## Endpoints

### 1. General Search

**GET** `/{api-prefix}/itunes/search`

Search for content across all media types in the iTunes Store.

**Query Parameters:**

- `term` (required): The URL-encoded text string you want to search for
- `country` (optional): Two-letter country code (default: US)
- `media` (optional): Media type to search for (default: all)
- `entity` (optional): Type of results to return
- `attribute` (optional): Attribute to search for
- `limit` (optional): Number of results (1-200, default: 50)
- `lang` (optional): Language (en_us, ja_jp, default: en_us)
- `version` (optional): Search result version (1, 2, default: 2)
- `explicit` (optional): Include explicit content (Yes, No, default: Yes)

**Example:**

```bash
GET /api/itunes/search?term=jack+johnson&media=music&limit=25
```

### 2. Music Search

**GET** `/{api-prefix}/itunes/search/music`

Search specifically for music tracks.

**Query Parameters:**

- `term` (required): Search term for music tracks
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/music?term=jack+johnson&limit=10
```

### 3. Artist Search

**GET** `/{api-prefix}/itunes/search/artist`

Search specifically for music artists.

**Query Parameters:**

- `term` (required): Search term for music artists
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/artist?term=jack+johnson&limit=10
```

### 4. Album Search

**GET** `/{api-prefix}/itunes/search/album`

Search specifically for music albums.

**Query Parameters:**

- `term` (required): Search term for music albums
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/album?term=in+between+dreams&limit=10
```

### 5. Podcast Search

**GET** `/{api-prefix}/itunes/search/podcast`

Search specifically for podcasts.

**Query Parameters:**

- `term` (required): Search term for podcasts
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/podcast?term=serial&limit=10
```

### 6. Movie Search

**GET** `/{api-prefix}/itunes/search/movie`

Search specifically for movies.

**Query Parameters:**

- `term` (required): Search term for movies
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/movie?term=inception&limit=10
```

### 7. TV Show Search

**GET** `/{api-prefix}/itunes/search/tvshow`

Search specifically for TV shows.

**Query Parameters:**

- `term` (required): Search term for TV shows
- `limit` (optional): Number of results (1-200, default: 25)

**Example:**

```bash
GET /api/itunes/search/tvshow?term=breaking+bad&limit=10
```

## Response Format

All endpoints return a JSON response with the following structure:

```json
{
  "resultCount": 25,
  "results": [
    {
      "trackId": 123456789,
      "trackName": "Song Title",
      "artistName": "Artist Name",
      "collectionName": "Album Name",
      "trackPrice": 0.99,
      "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/...",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/...",
      "primaryGenreName": "Pop",
      "releaseDate": "2023-01-01T00:00:00Z",
      "trackTimeMillis": 180000,
      "trackNumber": 1,
      "trackCount": 12,
      "collectionPrice": 9.99,
      "collectionId": 987654321,
      "artistId": 456789123,
      "kind": "song",
      "country": "USA",
      "currency": "USD",
      "contentAdvisoryRating": "Explicit",
      "longDescription": "Long description...",
      "shortDescription": "Short description..."
    }
  ],
  "searchId": "unique-search-id-12345"
}
```

**Note:** The `searchId` field is included when DynamoDB storage is successful and can be used to retrieve cached results.

## Media Types

Available media types for the general search endpoint:

- `movie`: Movies
- `podcast`: Podcasts
- `music`: Music
- `musicVideo`: Music Videos
- `audiobook`: Audiobooks
- `shortFilm`: Short Films
- `tvShow`: TV Shows
- `software`: Software/Apps
- `ebook`: E-books
- `all`: All media types (default)

## Entities

Available entities for different media types:

### Music

- `musicArtist`: Music artists
- `musicTrack`: Music tracks
- `album`: Albums
- `musicVideo`: Music videos
- `mix`: Mixes
- `song`: Songs

### Movies

- `movieArtist`: Movie artists
- `movie`: Movies

### Podcasts

- `podcastAuthor`: Podcast authors
- `podcast`: Podcasts

### TV Shows

- `tvEpisode`: TV episodes
- `tvSeason`: TV seasons

## Error Handling

The API returns appropriate HTTP status codes with detailed error messages:

- `200`: Success
- `400`: Bad Request (invalid parameters, empty search term, invalid limit)
- `408`: Request Timeout (iTunes API timeout after 10 seconds)
- `503`: Service Unavailable (iTunes API unavailable or network errors)
- `500`: Internal Server Error (unexpected errors)

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Search term is required and cannot be empty",
  "error": "Bad Request"
}
```

## Validation

The API includes comprehensive input validation:

- **Search Term**: Required and cannot be empty
- **Limit**: Must be a number between 1 and 200
- **Country**: Two-letter country code
- **Media**: Must be one of the valid media types
- **Language**: Must be "en_us" or "ja_jp"
- **Version**: Must be 1 or 2
- **Explicit**: Must be "Yes" or "No"

## DynamoDB Integration

The API includes DynamoDB integration for storing and retrieving search results:

- **Automatic Storage**: All search results are automatically stored in DynamoDB
- **Search ID**: Each search generates a unique search ID for result retrieval
- **Graceful Degradation**: If DynamoDB is unavailable, the API continues to function without storage
- **Caching**: Stored results can be retrieved using the search ID

## Rate Limiting

The iTunes Search API has a limit of approximately 20 calls per minute. The service includes proper error handling for rate limiting scenarios.

## Timeout Handling

The API includes a 10-second timeout for iTunes API requests to prevent hanging requests.

## CORS Configuration

The API is configured with CORS support for the frontend application, allowing cross-origin requests from the configured frontend URL.

## Examples

### Search for Jack Johnson music

```bash
curl "http://localhost:3001/api/itunes/search/music?term=jack+johnson&limit=5"
```

### Search for movies with specific country

```bash
curl "http://localhost:3001/api/itunes/search?term=inception&media=movie&country=US&limit=10"
```

### Search for podcasts

```bash
curl "http://localhost:3001/api/itunes/search/podcast?term=serial&limit=5"
```

### Search with all parameters

```bash
curl "http://localhost:3001/api/itunes/search?term=jack+johnson&media=music&entity=musicTrack&country=US&limit=25&lang=en_us&version=2&explicit=Yes"
```

## Swagger Documentation

When the API is running, you can access the interactive Swagger documentation at:

```
http://localhost:3001/api
```

This provides a complete interactive interface for testing all iTunes Search API endpoints with proper parameter validation and response examples.

## Development

### Running the API

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

### Building

```bash
npm run build
```

### Code Quality

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Dependencies

The API uses the following key dependencies:

- **@nestjs/axios**: HTTP client for iTunes API requests
- **@aws-sdk/client-dynamodb**: AWS DynamoDB client
- **@aws-sdk/lib-dynamodb**: DynamoDB utilities
- **class-validator**: Input validation
- **class-transformer**: Data transformation
- **@nestjs/swagger**: API documentation

## Architecture

The API follows a modular architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and external API integration
- **DTOs**: Data transfer objects for validation and documentation
- **Configuration**: Environment-based configuration management
- **DynamoDB Service**: Database operations and caching
