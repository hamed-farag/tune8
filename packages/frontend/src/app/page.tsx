"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import config from "../config/env";

// Add dynamic import to prevent SSR issues
const dynamicConfig =
  typeof window !== "undefined"
    ? config
    : {
        app: {
          name: "Tune8",
          version: "1.0.0",
        },
      };

interface HealthResponse {
  status: string;
  timestamp: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const response = await axios.get<HealthResponse>("http://localhost:4009/api/health");
        setHealth(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch API health status");
        console.error("Error fetching health:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-primary-600">{dynamicConfig.app.name}</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your Music Platform - Built with Next.js and NestJS (v{dynamicConfig.app.version})
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">API Status</h2>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-2 text-gray-600">Checking API status...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">API Connection Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {health && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">API is Healthy</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Status: {health.status}</p>
                    <p>Last Check: {new Date(health.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Frontend (Next.js)</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• React 18 with TypeScript</li>
              <li>• Next.js 14 App Router</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Axios for API calls</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Backend (NestJS)</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• NestJS framework</li>
              <li>• TypeScript support</li>
              <li>• Swagger documentation</li>
              <li>• CORS enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
