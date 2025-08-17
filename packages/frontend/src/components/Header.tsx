"use client";

import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContentTypeSelector from "./ContentTypeSelector";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  contentType: string;
  onContentTypeChange: (value: string) => void;
  onToggleSidebar: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  contentType,
  onContentTypeChange,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex-shrink-0">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-300 hover:text-white flex-shrink-0"
        >
          <Menu size={20} />
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 max-w-2xl mx-auto lg:mx-0">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full bg-gray-700 text-white placeholder-gray-400 pl-10 border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <ContentTypeSelector value={contentType} onValueChange={onContentTypeChange} />
          </div>
        </div>
      </div>
    </header>
  );
}
