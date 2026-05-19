import { useState } from "react";
import { Share2, X, Link } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

export function ShareButton({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = "https://sridattaprasaram.com"; // Placeholder

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full text-maroon-700 dark:text-gold-500 hover:scale-105 active:scale-95 transition-transform"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-black border border-gold-500/20 p-8 rounded-3xl w-full max-w-sm relative flex flex-col items-center"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-bold text-maroon-700 dark:text-gold-500 mb-6">
                Share {title}
              </h3>

              <div className="grid grid-cols-4 gap-4 w-full">
                <WhatsappShareButton url={shareUrl} title={`Check out the official Temple App: `} className="flex flex-col items-center gap-2 group">
                  <WhatsappIcon size={48} round={true} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-maroon-700 dark:text-gold-500">WhatsApp</span>
                </WhatsappShareButton>

                <FacebookShareButton url={shareUrl} className="flex flex-col items-center gap-2 group">
                  <FacebookIcon size={48} round={true} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-maroon-700 dark:text-gold-500">Facebook</span>
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={`Check out the official Temple App: `} className="flex flex-col items-center gap-2 group">
                  <TwitterIcon size={48} round={true} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-maroon-700 dark:text-gold-500">X (Twitter)</span>
                </TwitterShareButton>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Check out the official Temple App: ${shareUrl}`);
                    alert("Link copied to clipboard!");
                  }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Link className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-maroon-700 dark:text-gold-500">Copy Link</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
