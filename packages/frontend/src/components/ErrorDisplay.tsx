"use client";

import { useState } from "react";
import { AlertTriangle, RefreshCw, XCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useI18n } from "@/hooks/useI18n";

interface ErrorDisplayProps {
  error: string | null;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const { t } = useI18n();

  if (!error) return null;

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 dark:border-red-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Animated Error Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                <XCircle className="h-8 w-8 text-red-500 animate-pulse" />
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
              </div>
            </div>

            {/* Error Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  {t("error.oops")}
                </h3>
              </div>

              <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed mb-4">{error}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20 transition-all duration-200 group"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      isRetrying
                        ? "animate-spin"
                        : "group-hover:rotate-180 transition-transform duration-300"
                    }`}
                  />
                  {isRetrying ? t("error.retrying") : t("error.tryAgain")}
                </Button>

                <Button
                  onClick={() => window.location.reload()}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {t("error.reloadPage")}
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-2 right-2 opacity-10">
            <div className="w-16 h-16 border-2 border-red-300 rounded-full animate-spin-slow" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
