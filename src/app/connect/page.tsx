"use client";

import { useState } from "react";
import { Heart, CalendarClock, ShoppingBag, QrCode, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Connect() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col min-h-screen p-6 pb-24 space-y-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white pt-4">Temple Connect</h1>

      {/* Micro-Donations */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-md border border-saffron-100 dark:border-saffron-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-100 dark:bg-saffron-900/20 rounded-bl-full -z-10" />
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-saffron-100 dark:bg-saffron-900/50 rounded-xl">
            <Heart className="w-6 h-6 text-saffron-600" />
          </div>
          <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Annadanam Seva</h2>
        </div>
        
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
          Your small contribution can feed a devotee today. Join the sacred cause of Annadanam.
        </p>

        <div className="bg-saffron-50 dark:bg-zinc-800 rounded-2xl p-4 mb-6 flex items-center justify-between border border-saffron-100 dark:border-zinc-700">
          <div>
            <p className="text-xs font-medium text-saffron-800 dark:text-saffron-400 uppercase tracking-wide">Sponsor One Meal</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">₹50</p>
          </div>
          <button 
            onClick={() => setShowQR(true)}
            className="bg-saffron-600 hover:bg-saffron-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm shadow-saffron-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Donate via UPI</span>
          </button>
        </div>
      </section>

      {/* QR Code Modal Mockup */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl w-full max-w-sm relative flex flex-col items-center"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-saffron-600" />
              </div>
              
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Scan to Donate</h3>
              <p className="text-zinc-500 text-center mb-6 text-sm">₹50 for Annadanam Seva</p>
              
              <div className="w-48 h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                {/* Mock QR Code Pattern */}
                <div className="grid grid-cols-5 gap-1 p-2">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`w-6 h-6 ${Math.random() > 0.5 ? 'bg-black dark:bg-white' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              
              <button className="w-full py-3 border-2 border-saffron-600 text-saffron-600 dark:text-saffron-400 font-bold rounded-xl active:scale-95 transition-transform">
                Open UPI App
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Seva Updates */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <CalendarClock className="w-5 h-5 text-zinc-500" />
          <h2 className="text-lg font-serif font-bold text-zinc-800 dark:text-zinc-200">Upcoming Events</h2>
        </div>
        
        <div className="space-y-3">
          {[
            { title: "Guru Purnima Utsav", date: "Jul 21, 2024", time: "06:00 AM onwards" },
            { title: "Datta Jayanti", date: "Dec 14, 2024", time: "All day" }
          ].map((event, i) => (
            <div key={i} className="bg-white dark:bg-zinc-800 p-4 rounded-2xl flex gap-4 border border-zinc-100 dark:border-zinc-700 shadow-sm">
              <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl flex flex-col items-center justify-center min-w-[4rem]">
                <span className="text-xs font-bold text-zinc-500 uppercase">{event.date.split(' ')[0]}</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">{event.date.split(' ')[1].replace(',', '')}</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-zinc-900 dark:text-white">{event.title}</h4>
                <p className="text-sm text-zinc-500">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Merchandise Shop */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 px-2">
          <ShoppingBag className="w-5 h-5 text-zinc-500" />
          <h2 className="text-lg font-serif font-bold text-zinc-800 dark:text-zinc-200">Sacred Store</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Rudraksha Mala", price: "₹250", img: "1601140989376-7901766a0149" },
            { name: "Spiritual Books", price: "₹150", img: "1544947950-fa07a98d237f" }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-700 group">
              <div className="relative h-32 bg-zinc-200 dark:bg-zinc-700">
                <Image 
                  src={`https://images.unsplash.com/photo-${item.img}?w=200&auto=format&fit=crop`}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm text-zinc-900 dark:text-white mb-1">{item.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-saffron-600">{item.price}</span>
                  <button className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2.5 py-1 rounded-full font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
