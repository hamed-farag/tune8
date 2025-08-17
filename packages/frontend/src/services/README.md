# iTunes Service

This service provides a comprehensive interface for consuming the iTunes API endpoints from the backend controller. The service is built using a modular functional approach for better maintainability and tree-shaking.

## Architecture

The service is organized into three main modules:

- **Types** (`./types/itunes.types.ts`) - All TypeScript interfaces and type definitions
- **API** (`./api/itunes.api.ts`) - Pure functions for making API calls
- **Utils** (`./utils/itunes.utils.ts`) - Helper functions for data manipulation and formatting

## Features

- **Modular design** with separate concerns for types, API calls, and utilities
- **Functional programming** approach with pure functions
- **Type-safe API calls** with full TypeScript support
- **Comprehensive error handling** with consistent error format
- **React hooks** for easy integration with React components
- **Tree-shakable** - only import what you need
- **Backward compatibility** with legacy service object

## Quick Start

### Basic Usage

```typescript
import { searchPodcast, searchMusic, searchItunes } from "../services";

// Search for podcasts
const podcasts = await searchPodcast("serial", 10);

// Search for music
const music = await searchMusic("jack johnson", 25);

// Generic search across all media types
const results = await searchItunes({
  term: "breaking bad",
  media: "tvShow",
  limit: 20,
});
```

### Using React Hooks

```typescript
import { useItunes, useItunesPodcast } from '../hooks/useItunes';

function MyComponent() {
  const { data, loading, error, searchPodcast } = useItunesPodcast();

  const handleSearch = async () => {
    await searchPodcast('serial', 10);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.results.map(podcast => (
        <div key={podcast.trackId}>{podcast.trackName}</div>
      ))}
    </div>
  );
}
```

### Using Utility Functions

```typescript
import { getBestArtworkUrl, formatDuration, formatPrice } from "../services";

// Get the best available artwork
const artworkUrl = getBestArtworkUrl(podcast, 100);

// Format duration
const duration = formatDuration(180000); // "3:00"

// Format price
const price = formatPrice(0.99, "USD"); // "$0.99"
```

## API Reference

### Core API Functions

#### `searchItunes(params: ItunesSearchParams)`

Generic search across all media types.

```typescript
const results = await searchItunes({
  term: "search term",
  country: "US",
  media: "all",
  limit: 50,
  lang: "en_us",
  explicit: "Yes",
});
```

#### `searchMusic(term: string, limit?: number)`

Search specifically for music tracks.

#### `searchArtist(term: string, limit?: number)`

Search specifically for music artists.

#### `searchAlbum(term: string, limit?: number)`

Search specifically for music albums.

#### `searchPodcast(term: string, limit?: number)`

Search specifically for podcasts.

#### `searchMovie(term: string, limit?: number)`

Search specifically for movies.

#### `searchTvShow(term: string, limit?: number)`

Search specifically for TV shows.

### Advanced API Functions

#### `searchMusicAdvanced(term: string, options)`

Search for music with advanced parameters.

```typescript
const results = await searchMusicAdvanced("jack johnson", {
  limit: 50,
  country: "US",
  lang: "en_us",
  explicit: "Yes",
});
```

Similar advanced functions are available for:

- `searchPodcastAdvanced()`
- `searchMovieAdvanced()`
- `searchTvShowAdvanced()`

### Utility Functions

#### `getBestArtworkUrl(item, preferredSize)`

Get the best available artwork URL for a given size preference.

```typescript
const artworkUrl = getBestArtworkUrl(podcast, 100);
```

#### `formatDuration(milliseconds)`

Format track duration from milliseconds to MM:SS format.

```typescript
const duration = formatDuration(180000); // "3:00"
```

#### `formatPrice(price, currency)`

Format price with currency.

```typescript
const price = formatPrice(0.99, "USD"); // "$0.99"
```

#### `formatReleaseDate(dateString)`

Format release date to a readable format.

```typescript
const date = formatReleaseDate("2023-01-15T00:00:00Z"); // "January 15, 2023"
```

#### Data Access Functions

- `getDisplayName(item)` - Get the display name for an item
- `getArtistName(item)` - Get the artist name
- `getGenreName(item)` - Get the genre name
- `getPrice(item)` - Get the price
- `getCurrency(item)` - Get the currency
- `getDuration(item)` - Get the duration
- `getEpisodeCount(item)` - Get episode count (podcasts)
- `getTrackCount(item)` - Get track count (albums)
- `hasArtwork(item)` - Check if item has artwork

## React Hooks

### `useItunes<T>()`

Generic hook for iTunes searches. Returns loading state, error handling, and search methods.

### Specialized Hooks

- `useItunesMusic()` - For music searches
- `useItunesArtist()` - For artist searches
- `useItunesAlbum()` - For album searches
- `useItunesPodcast()` - For podcast searches
- `useItunesMovie()` - For movie searches
- `useItunesTvShow()` - For TV show searches

## Error Handling

All API calls return consistent error objects:

```typescript
interface ItunesApiError {
  message: string;
  status: number;
}
```

## Configuration

The service uses the `NEXT_PUBLIC_API_URL` environment variable for the base API URL. Defaults to `http://localhost:3000` if not set.

## Type Definitions

The service includes comprehensive TypeScript interfaces for all iTunes data types:

- `ItunesGenericResult`
- `ItunesMusicTrack`
- `ItunesArtist`
- `ItunesAlbum`
- `ItunesPodcast`
- `ItunesMovie`
- `ItunesTvShow`

## Import Strategies

### Tree-shaking (Recommended)

Import only what you need for better bundle size:

```typescript
import { searchPodcast } from "../services/api/itunes.api";
import { getBestArtworkUrl } from "../services/utils/itunes.utils";
```

### Convenience imports

Import everything from the main service file:

```typescript
import { searchPodcast, getBestArtworkUrl } from "../services";
```

### Legacy compatibility

Use the service object for backward compatibility:

```typescript
import { itunesService } from "../services";

const podcasts = await itunesService.searchPodcast("serial", 10);
const artwork = itunesService.getBestArtworkUrl(podcast, 100);
```

## Example Component

See `ItunesSearchExample.tsx` for a complete example of how to use the service in a React component.

## Migration from Class-based Approach

If you're migrating from the old class-based approach:

```typescript
// Old way
import { itunesService } from "../services";
const podcasts = await itunesService.searchPodcast("serial", 10);

// New way (recommended)
import { searchPodcast } from "../services";
const podcasts = await searchPodcast("serial", 10);

// Or keep using the service object (still supported)
import { itunesService } from "../services";
const podcasts = await itunesService.searchPodcast("serial", 10);
```
