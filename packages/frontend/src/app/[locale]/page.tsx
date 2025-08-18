"use client";

import { useState } from "react";

import { Sidebar, Header, ErrorDisplay, ContentGrid, EpisodesGrid } from "@/components";
import { useItunesData, useDebounce } from "@/hooks";

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debounce the search query to avoid too many API calls
  const [debouncedSearchQuery, isDebouncing] = useDebounce(searchQuery, 500);

  const { podcasts, episodes, artists, albums, movies, tvShows, isLoading, error, fetchData } =
    useItunesData(contentType, debouncedSearchQuery);

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
          isLoading={isLoading}
          isDebouncing={isDebouncing}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 sm:p-6 pb-20 max-w-full">
            {/* Error Message */}
            <ErrorDisplay error={error} onRetry={fetchData} />

            {/* Content Grid */}
            <ContentGrid
              contentType={contentType}
              isLoading={isLoading}
              podcasts={podcasts}
              episodes={episodes}
              artists={artists}
              albums={albums}
              movies={movies}
              tvShows={tvShows}
              onRefresh={fetchData}
            />

            {/* Episodes Grid for "all" content type */}
            {contentType === "all" && !isLoading && episodes.length > 0 && (
              <EpisodesGrid episodes={episodes} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
