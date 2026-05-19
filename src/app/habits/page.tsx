"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Calendar, Sun, Moon, Clock } from "lucide-react";

export default function Habits() {
  const [count, setCount] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    // Haptic feedback if available
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    setCount((prev) => prev + 1);

    // Clean up ripples after animation
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center pt-4">
        <h1 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">Daily Practices</h1>
        <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full font-bold shadow-sm">
          <Flame className="w-5 h-5 fill-current" />
          <span>14-Day Streak</span>
        </div>
      </div>

      {/* Live Panchang */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700">
        <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 dark:border-zinc-700 pb-4">
          <Calendar className="w-6 h-6 text-saffron-600" />
          <h2 className="text-xl font-serif font-semibold text-zinc-900 dark:text-white">Today's Panchang</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Tithi</span>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-zinc-400" />
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Shukla Ekadashi</p>
            </div>
            <p className="text-xs text-zinc-500">Ends at 04:30 PM</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Nakshatra</span>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-zinc-400" />
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Rohini</p>
            </div>
            <p className="text-xs text-zinc-500">Ends at 09:15 AM</p>
          </div>
          
          <div className="col-span-2 bg-saffron-50 dark:bg-saffron-900/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-saffron-800 dark:text-saffron-300 font-medium uppercase tracking-wider">Rahukaalam</span>
              <p className="font-semibold text-saffron-900 dark:text-saffron-400 mt-1">10:30 AM - 12:00 PM</p>
            </div>
            <Clock className="w-8 h-8 text-saffron-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Digital Japa Counter */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <h2 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">Japa Mala</h2>
          <div className="text-6xl font-bold text-saffron-600 mt-2 font-serif">{count}</div>
          <p className="text-sm text-zinc-500 mt-1">Chants today</p>
        </div>

        <button
          onMouseDown={handleTap}
          onTouchStart={handleTap}
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] flex items-center justify-center overflow-hidden outline-none active:scale-95 transition-transform duration-100 touch-none"
        >
          <div className="absolute inset-2 rounded-full border-2 border-white/20" />
          <span className="text-white font-serif text-2xl font-bold z-10">TAP</span>
          
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bg-white rounded-full pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 20,
                  height: 20,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </AnimatePresence>
        </button>

        <button 
          onClick={() => setCount(0)}
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          Reset Counter
        </button>
      </div>
    </div>
  );
}
