"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState({
    weather: null,
    jokes: [],
    quotes: [],
    facts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data from API endpoints with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const [jokesRes, quotesRes, factsRes] = await Promise.all([
          fetch("http://localhost:3000/jokes?limit=3", { signal: controller.signal }),
          fetch("http://localhost:3000/quotes", { signal: controller.signal }),
          fetch("http://localhost:3000/facts", { signal: controller.signal }),
        ]);
        
        clearTimeout(timeoutId);

        const [jokes, quotes, facts] = await Promise.all([
          jokesRes.json(),
          quotesRes.json(),
          factsRes.json(),
        ]);

        setData({
          jokes: jokes.jokes || [],
          quotes: quotes.quotes || [],
          facts: facts.facts || [],
        });
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError("Failed to fetch data from API");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const [jokesRes, quotesRes, factsRes] = await Promise.all([
          fetch("http://localhost:3000/jokes?limit=3", { signal: controller.signal }),
          fetch("http://localhost:3000/quotes", { signal: controller.signal }),
          fetch("http://localhost:3000/facts", { signal: controller.signal }),
        ]);
        
        clearTimeout(timeoutId);

        const [jokes, quotes, facts] = await Promise.all([
          jokesRes.json(),
          quotesRes.json(),
          factsRes.json(),
        ]);

        setData({
          jokes: jokes.jokes || [],
          quotes: quotes.quotes || [],
          facts: facts.facts || [],
        });
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError("Failed to fetch data from API");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-black mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black mt-6 mb-2">
            Entering Frontend 🚀
          </h1>
          <p className="text-gray-600 animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-4">
            Oops! Something went wrong
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-black">
            <p className="text-black font-semibold mb-2">{error}</p>
            <p className="text-sm text-gray-600">
              Make sure your backend server is running on{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Entering Frontend 🚀
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Beautiful frontend powered by Next.js and connected to Express.js backend API
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="bg-white text-black rounded-full px-6 py-3 font-semibold">
                ✨ Live Data from API
              </div>
              <button 
                onClick={handleRefresh}
                className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            {lastUpdated && (
              <p className="text-sm text-gray-400 mt-2">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Jokes Section */}
          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <span className="text-2xl">😄</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Jokes</h3>
                </div>
                <div className="space-y-4">
                  {data.jokes.map((joke, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    >
                      <p className="text-black font-medium leading-relaxed">{joke}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quotes Section */}
          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <span className="text-2xl">💭</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inspirational Quotes</h3>
                </div>
                <div className="space-y-4">
                  {data.quotes.map((quote, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    >
                      <p className="text-black italic font-medium leading-relaxed">"{quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Facts Section */}
          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Fun Facts</h3>
                </div>
                <div className="space-y-4">
                  {data.facts.map((fact, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    >
                      <p className="text-black font-medium leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
