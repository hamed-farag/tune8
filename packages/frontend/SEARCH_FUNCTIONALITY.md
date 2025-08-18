# Search Functionality

This document explains how the search functionality works in the Tune8 frontend application.

## Overview

The search functionality allows users to search for content across different media types (podcasts, music, artists, albums, movies, TV shows) with real-time API calls and debounced input to optimize performance. The system includes intelligent fallback mechanisms and comprehensive error handling.

## Key Features

### 1. Debounced Search Input

- **Debounce Delay**: 500ms
- **Purpose**: Prevents excessive API calls while the user is typing
- **Implementation**: Uses a custom `useDebounce` hook that returns both the debounced value and debouncing state
- **Visual Feedback**: Shows different loading indicators for debouncing vs. API loading states

### 2. Real-time Search

- Search queries are automatically sent to the iTunes API
- Results update based on the selected content type
- Intelligent fallback to curated search terms when no query is provided
- Automatic refresh functionality for retrying failed requests

### 3. Enhanced Visual Feedback

- **Loading States**:
  - Pulsing loader during debouncing (gray)
  - Spinning loader during API calls (blue)
  - Disabled input field during loading
- **Error Handling**: Comprehensive error display with retry functionality
- **Content Indicators**: Clear visual distinction between different content types

### 4. Intelligent Fallback System

When no search query is provided, the system uses curated search terms for each content type:

- **Podcasts**: technology, business, health, education, entertainment
- **Music**: pop, rock, jazz, classical, hip hop, electronic
- **Artists**: ed sheeran, taylor swift, beyonce, drake, bts
- **Albums**: folklore, midnights, renaissance, scorpion, map of the soul
- **Movies**: inception, avatar, marvel, disney, netflix
- **TV Shows**: breaking bad, game of thrones, stranger things, friends, the office

## Implementation Details

### Components Involved

1. **HomePage** (`src/app/[locale]/page.tsx`)
   - Manages search query state and content type selection
   - Implements debouncing with visual feedback
   - Coordinates between search input and data fetching
   - Handles sidebar toggle functionality
   - Manages episodes grid for "all" content type

2. **Header** (`src/components/Header.tsx`)
   - Contains the search input field with enhanced visual feedback
   - Shows different loading states (debouncing vs. API loading)
   - Integrates content type selector
   - Responsive design with mobile menu toggle

3. **useItunesData** (`src/hooks/useItunesData.ts`)
   - Fetches data from iTunes API with intelligent fallback
   - Handles different content types with specific search terms
   - Manages loading and error states
   - Provides refresh functionality
   - Optimized result limits (12 items for specific types, 6+6 for "all")

4. **useDebounce** (`src/hooks/useDebounce.ts`)
   - Custom hook for debouncing values
   - Returns both debounced value and debouncing state
   - Enables different visual feedback for debouncing vs. loading

5. **ContentGrid** (`src/components/ContentGrid.tsx`)
   - Displays content based on selected type
   - Shows appropriate skeleton loaders
   - Handles RTL language support
   - Provides horizontal scrolling with scroll indicators
   - Includes refresh button for manual retry

6. **EpisodesGrid** (`src/components/EpisodesGrid.tsx`)
   - Specialized grid for episodes in "all" content type
   - Grid layout with responsive columns
   - RTL language support

### API Integration

The search functionality integrates with the following iTunes API endpoints:

- `/api/itunes/search` - Generic search across all media types
- `/api/itunes/search/podcast` - Podcast search
- `/api/itunes/search/music` - Music track search
- `/api/itunes/search/artist` - Artist search
- `/api/itunes/search/album` - Album search
- `/api/itunes/search/movie` - Movie search
- `/api/itunes/search/tvshow` - TV show search

**Advanced Search Functions** (available but not currently used in main UI):

- `searchMusicAdvanced()` - Music search with country, language, explicit content options
- `searchPodcastAdvanced()` - Podcast search with advanced parameters
- `searchMovieAdvanced()` - Movie search with advanced parameters
- `searchTvShowAdvanced()` - TV show search with advanced parameters

### Search Flow

1. User types in the search input field
2. Input value is debounced (500ms delay) with visual feedback
3. Debounced value triggers API call via `useItunesData` hook
4. If no search query, intelligent fallback terms are used
5. API call is made with search query and content type
6. Results are displayed in the appropriate grid component
7. Loading states are shown during the process
8. Error handling provides retry functionality

### Content Type Support

The search works with all supported content types:

- `all` - Mixed content (podcasts + music tracks, 6 each)
- `podcast` - Podcasts only (12 results)
- `artist` - Artists only (12 results)
- `album` - Albums only (12 results)
- `movie` - Movies only (12 results)
- `tvShow` - TV shows only (12 results)
- `music track` - Music tracks only (12 results)

### Internationalization Support

- Full RTL language support (Arabic)
- Translated content type labels
- Responsive design for different screen sizes
- Direction-aware scroll indicators

## Usage

1. Type in the search input field
2. Wait for the debounce delay (500ms) - indicated by pulsing loader
3. Results will automatically update based on your search query
4. Use the content type selector to filter by specific media types
5. The search input will show a spinning loader during API calls
6. Use the refresh button to retry failed requests
7. For "all" content type, episodes are displayed in a separate grid below

## Performance Considerations

- **Debouncing**: Prevents excessive API calls (500ms delay)
- **Loading States**: Provides clear user feedback for different states
- **Error Handling**: Graceful fallback with retry functionality
- **Fallback Content**: Shows curated content when no search query is provided
- **Optimized Limits**: Reasonable result limits to prevent performance issues
- **Responsive Design**: Optimized for mobile and desktop usage
- **RTL Support**: Full support for right-to-left languages

## Error Handling

- **Network Errors**: Displayed with retry button
- **API Errors**: Graceful fallback with user-friendly messages
- **Empty Results**: Fallback to curated search terms
- **Loading Failures**: Automatic retry mechanism available

## Configuration

The search functionality uses environment-based configuration:

- **API Base URL**: Configurable via `API_URL` environment variable
- **Default API**: `http://localhost:4009` (development)
- **App Name**: Configurable via `NEXT_PUBLIC_APP_NAME`
- **App Version**: Configurable via `NEXT_PUBLIC_APP_VERSION`
