"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  PodcastCard,
  EpisodeCard,
  PodcastCardSkeleton,
  EpisodeCardSkeleton,
} from "@/components";
import { useI18n } from "@/hooks/useI18n";
import { cn, getDirection } from "@/lib/utils";

interface PodcastCard {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  isPlaceholder?: boolean;
}

interface EpisodeCard {
  id: string;
  title: string;
  podcastName: string;
  imageUrl: string;
}

const mockPodcasts: PodcastCard[] = [
  {
    id: "1",
    title: "بودكاست فنجان",
    artist: "بودكاست فنجان",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: "2",
    title: "فنجان قهوة",
    artist: "Omar Eldeep",
    imageUrl: "/api/placeholder/150/150",
    isPlaceholder: true,
  },
  {
    id: "3",
    title: "فنجان قهوة",
    artist: "Mashael saud",
    imageUrl: "/api/placeholder/150/150",
    isPlaceholder: true,
  },
  {
    id: "4",
    title: "بودكاست فنجان قهوة",
    artist: "OUMA Ahmed Abdelbasset",
    imageUrl: "/api/placeholder/150/150",
    isPlaceholder: true,
  },
  {
    id: "5",
    title: "فنجان مع عائشة",
    artist: "عائشة اشفيعي",
    imageUrl: "/api/placeholder/150/150",
    isPlaceholder: true,
  },
  {
    id: "6",
    title: "یک فنجان آمریکانو",
    artist: "LngLounge",
    imageUrl: "/api/placeholder/150/150",
    isPlaceholder: true,
  },
];

const mockEpisodes: EpisodeCard[] = [
  { id: "1", title: "فنجان مسموم", podcastName: "جناية", imageUrl: "/api/placeholder/60/60" },
  {
    id: "2",
    title: "فنجان قهوة",
    podcastName: "ناتالو معكن | Nataloo Talks",
    imageUrl: "/api/placeholder/60/60",
  },
  {
    id: "3",
    title: "فنجان قهوة",
    podcastName: "بودكاست النور Al Noor with Coach Maysoon",
    imageUrl: "/api/placeholder/60/60",
  },
  { id: "4", title: "فنجان قهوة", podcastName: "أخبارك ايه", imageUrl: "/api/placeholder/60/60" },
  {
    id: "5",
    title: "الدحيح - زوبعة فنجان",
    podcastName: "الدحيح",
    imageUrl: "/api/placeholder/60/60",
  },
  { id: "6", title: "فیل و فنجان", podcastName: "زمزمه ادبی", imageUrl: "/api/placeholder/60/60" },
  {
    id: "7",
    title: "أول فنجان قهوة",
    podcastName: "قهوة وخبرية مع مايا حجيج",
    imageUrl: "/api/placeholder/60/60",
  },
  {
    id: "8",
    title: "The Cup - فنجان",
    podcastName: "Black Dog Radio",
    imageUrl: "/api/placeholder/60/60",
  },
  {
    id: "9",
    title: "فنجان مع عائشة",
    podcastName: "فنجان مع عائشة",
    imageUrl: "/api/placeholder/60/60",
  },
  {
    id: "10",
    title: "همسة فنجان | الصور",
    podcastName: "Podcasts By Reham Ayam",
    imageUrl: "/api/placeholder/60/60",
  },
];

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { currentLanguage, t } = useI18n();
  const direction = getDirection(currentLanguage);
  const isRTL = direction === "rtl";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} locale={locale} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-gray-300 hover:text-white flex-shrink-0"
            >
              <Menu size={20} />
            </Button>

            <div className="flex-1 min-w-0">
              <div className="relative max-w-2xl mx-auto lg:mx-0">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder={t("common.search")}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 text-white placeholder-gray-400 pl-10 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <main className="p-4 sm:p-6 pb-20 max-w-full">
              {/* Top Podcasts Section */}
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">{t("podcasts.title")}</h2>
                  <div className="flex space-x-1 sm:space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-700 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-700 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex space-x-3 sm:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex space-x-3 sm:space-x-6">
                      {isLoading
                        ? // Show skeleton loading
                          Array.from({ length: 6 }).map((_, index) => (
                            <PodcastCardSkeleton key={index} />
                          ))
                        : // Show actual content
                          mockPodcasts.map(podcast => (
                            <PodcastCard
                              key={podcast.id}
                              id={podcast.id}
                              title={podcast.title}
                              artist={podcast.artist}
                              imageUrl={podcast.imageUrl}
                              isPlaceholder={podcast.isPlaceholder}
                            />
                          ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Top Episodes Section */}
              <section className="w-full">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  {t("podcasts.episodes")}
                </h2>
                <div className="w-full">
                  <div
                    className={cn(
                      "grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                      isRTL && "justify-items-end"
                    )}
                  >
                    {isLoading
                      ? // Show skeleton loading
                        Array.from({ length: 8 }).map((_, index) => (
                          <EpisodeCardSkeleton key={index} />
                        ))
                      : // Show actual content
                        mockEpisodes.map(episode => (
                          <EpisodeCard
                            key={episode.id}
                            id={episode.id}
                            title={episode.title}
                            podcastName={episode.podcastName}
                            imageUrl={episode.imageUrl}
                          />
                        ))}
                  </div>
                </div>
              </section>
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
