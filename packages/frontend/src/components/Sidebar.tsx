"use client";

import { Home, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = () => {
    router.push("/");
    // Close sidebar on mobile after navigation
    if (onToggle) {
      onToggle();
    }
  };

  const isHomeActive = pathname === "/";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile header with close button */}
        <div className="flex items-center justify-between p-4 lg:hidden ">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            T8
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-300 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Desktop Logo */}
        <div className="p-6 hidden lg:block">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            T8
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start transition-colors cursor-pointer ${
                  isHomeActive
                    ? "text-white bg-gray-700 border-l-4 border-blue-500"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
                onClick={handleHomeClick}
              >
                <Home size={20} />
                <span className="ml-3">Home</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Tune8 - v1.0.0 by HF</p>
        </div>
      </div>
    </>
  );
}
