"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Quote, Share2, Heart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { language } = useLanguage();

  const content = {
    en: {
      darshanTitle: "Daily Darshan",
      darshanSubtitle: "Sri Dattatreya Swamy",
      postTitle: "The Essence of Guru",
      postText: "A true Guru is one who dispels the darkness of ignorance and lights the lamp of knowledge within.",
      quote: "Peace comes from within. Do not seek it without.",
    },
    te: {
      darshanTitle: "నిత్య దర్శనం",
      darshanSubtitle: "శ్రీ దత్తాత్రేయ స్వామి",
      postTitle: "గురు తత్వం",
      postText: "అజ్ఞాన అంధకారాన్ని పారద్రోలి, జ్ఞాన జ్యోతిని వెలిగించేవాడే నిజమైన గురువు.",
      quote: "శాంతి నీ లోపలి నుండే వస్తుంది. దానిని బయట వెతకవద్దు.",
    },
    hi: {
      darshanTitle: "नित्य दर्शन",
      darshanSubtitle: "श्री दत्तात्रेय स्वामी",
      postTitle: "गुरु तत्व",
      postText: "सच्चा गुरु वह है जो अज्ञान के अंधकार को दूर करता है और भीतर ज्ञान का दीपक जलाता है।",
      quote: "शांति भीतर से आती है। इसे बाहर मत खोजो।",
    },
  }[language || "en"];

  return (
    <div className="flex flex-col min-h-screen pb-6">
      {/* Daily Darshan (Full screen-ish vertical image) */}
      <div className="relative w-full h-[60vh] bg-zinc-900 rounded-b-3xl overflow-hidden shadow-lg">
        <Image 
          src="https://images.unsplash.com/photo-1604085443317-06eb8d2894db?q=80&w=1000&auto=format&fit=crop" 
          alt="Daily Darshan"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-1">
              {content?.darshanTitle}
            </h1>
            <p className="text-saffron-100 font-medium">
              {content?.darshanSubtitle}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Daily Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
        >
          <div className="inline-block px-3 py-1 bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-400 rounded-full text-xs font-semibold mb-4">
            Daily Wisdom
          </div>
          <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white mb-3">
            {content?.postTitle}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {content?.postText}
          </p>
          <button className="mt-4 text-saffron-600 font-medium text-sm flex items-center group">
            Read more 
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        {/* End-of-Day Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-saffron-500 to-saffron-700 rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-md"
        >
          <Quote className="absolute top-4 left-4 w-12 h-12 text-white/10" />
          <p className="text-lg font-serif font-medium relative z-10 leading-relaxed italic">
            "{content?.quote}"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
