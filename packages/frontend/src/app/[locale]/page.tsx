"use client";

import { useState } from "react";

import { Sidebar, Header, ErrorDisplay, ContentGrid, SearchResultsGrid } from "@/components";
import { useItunesData, useRandomItunesData, useDebounce } from "@/hooks";

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("album");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debounce the search query to avoid too many API calls
  const [debouncedSearchQuery, isDebouncing] = useDebounce(searchQuery, 500);

  // Random data for ContentGrid (not affected by search)
  const {
    podcasts,
    musicTracks,
    artists,
    albums,
    movies,
    tvShows,
    isLoading: isRandomLoading,
    error: randomError,
    fetchData: fetchRandomData,
  } = useRandomItunesData(contentType);

  const {
    items: searchResultItems,
    isLoading: isSearchLoading,
    error: searchError,
    fetchData: fetchSearchData,
  } = useItunesData(contentType, debouncedSearchQuery);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} locale={locale} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          contentType={contentType}
          onContentTypeChange={setContentType}
          onToggleSidebar={toggleSidebar}
          isLoading={isRandomLoading}
          isDebouncing={isDebouncing}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 sm:p-6 pb-20 max-w-full">
            {/* Error Message for ContentGrid */}
            <ErrorDisplay error={randomError} onRetry={fetchRandomData} />

            {/* Content Grid */}
            <ContentGrid
              contentType={contentType}
              isLoading={isRandomLoading}
              podcasts={podcasts}
              musicTracks={musicTracks}
              artists={artists}
              albums={albums}
              movies={movies}
              tvShows={tvShows}
              onRefresh={fetchRandomData}
            />

            {/* Search Results Section */}
            {searchError && <ErrorDisplay error={searchError} onRetry={fetchSearchData} />}
            <SearchResultsGrid
              searchResultItems={searchResultItems}
              contentType={contentType}
              isLoading={isSearchLoading}
              hasSearchQuery={!!(searchQuery && searchQuery.trim())}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
