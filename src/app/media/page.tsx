"use client";

import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Image as ImageIcon, Video, Music } from "lucide-react";
import Image from "next/image";

export default function Media() {
  const [activeTab, setActiveTab] = useState<"audio" | "video" | "gallery">("audio");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col min-h-screen p-6 pb-24 space-y-6">
      <h1 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white pt-4">Digital Prasad</h1>

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <button
          onClick={() => setActiveTab("audio")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "audio" 
              ? "bg-white dark:bg-zinc-700 shadow-sm text-saffron-600 dark:text-saffron-400" 
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <Music className="w-4 h-4" />
          Slokas
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "video" 
              ? "bg-white dark:bg-zinc-700 shadow-sm text-saffron-600 dark:text-saffron-400" 
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <Video className="w-4 h-4" />
          Videos
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "gallery" 
              ? "bg-white dark:bg-zinc-700 shadow-sm text-saffron-600 dark:text-saffron-400" 
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Gallery
        </button>
      </div>

      {/* Audio Player UI */}
      {activeTab === "audio" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md mb-6 relative">
              <Image 
                src="https://images.unsplash.com/photo-1588894178385-e10c732c5243?w=500&auto=format&fit=crop" 
                alt="Album Cover"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Sri Datta Stavam</h2>
            <p className="text-sm text-zinc-500 mb-6 mt-1">Vasudevananda Saraswati</p>
            
            {/* Scrubber Mockup */}
            <div className="w-full space-y-2 mb-6">
              <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-saffron-500 w-1/3 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-zinc-400 font-medium">
                <span>01:24</span>
                <span>04:56</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
              <button className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                <SkipBack className="w-8 h-8 fill-current" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-saffron-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-saffron-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
              <button className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                <SkipForward className="w-8 h-8 fill-current" />
              </button>
            </div>
          </div>

          {/* Synced Text Mockup */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 text-center h-48 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-zinc-50 dark:from-zinc-900 to-transparent z-10" />
            <div className="space-y-4 text-lg font-serif">
              <p className="text-zinc-400">Dattatreyam mahatmanam</p>
              <p className="text-saffron-600 dark:text-saffron-500 font-bold scale-110 transition-transform">Varadam bhakta vatsalam</p>
              <p className="text-zinc-400">Prapannarti haram devam</p>
              <p className="text-zinc-300">Vande smarana gaminam</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent z-10" />
          </div>
        </div>
      )}

      {/* Video Vault UI */}
      {activeTab === "video" && (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2 group">
              <div className="relative aspect-video rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <Image 
                  src={`https://images.unsplash.com/photo-1604085443317-06eb8d2894db?w=300&auto=format&fit=crop&q=60&random=${i}`}
                  alt={`Video ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  12:45
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 line-clamp-2">
                Satsang Highlights - Week {i}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Gallery UI */}
      {activeTab === "gallery" && (
        <div className="columns-2 gap-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative rounded-xl overflow-hidden group">
              <Image 
                src={`https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=400&auto=format&fit=crop&q=60&random=${i}`}
                alt={`Wallpaper ${i}`}
                width={200}
                height={i % 2 === 0 ? 300 : 200}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <button className="text-xs font-medium bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full w-full">
                  Download HD
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
