import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        // Organic luxurious loading increments
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + inc, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-[99999] bg-[#3A070F] text-[#F6F3EB] flex flex-col items-center justify-center p-6 select-none"
      >
        {/* Subtle background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(110,29,42,0.6)_0%,_rgba(35,5,9,0.95)_100%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-8 relative"
          >
            <div className="absolute inset-1 rounded-full border border-[#D4AF37]/20" />
            <span className="font-serif text-2xl text-[#E8C59A] tracking-wider italic">
              A &amp; S
            </span>
          </motion.div>

          {/* Script Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-script text-4xl sm:text-5xl text-[#E8C59A] mb-2"
          >
            The Wedding Day
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-caps-clean text-[11px] tracking-[0.25em] text-[#F6F3EB]/80 mb-10 uppercase"
          >
            Ajithkumar &amp; Sneha — November 15
          </motion.p>

          {/* Progress Bar & Percentage */}
          <div className="w-48 flex flex-col items-center gap-2">
            <div className="w-full h-[1px] bg-[#681622] overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C5A059] to-[#F3DE9A]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <span className="font-sans text-xs text-[#E8C59A]/80 tracking-widest">
              {progress}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
