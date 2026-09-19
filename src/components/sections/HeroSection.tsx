import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 flex flex-col items-center text-center bg-[#F6F3EB] paper-texture select-none overflow-hidden">
      {/* 1. Header Typography */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mb-8 sm:mb-10 w-full"
      >
        {/* Script "The" */}
        <span className="font-script text-5xl sm:text-7xl md:text-8xl text-[#4A0E17] leading-none mb-[-12px] sm:mb-[-18px] md:mb-[-24px] drop-shadow-sm">
          The
        </span>

        {/* Razor-sharp Condensed Serif "WEDDING" */}
        <h1 className="font-editorial-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] sm:tracking-[0.25em] text-[#2B1113] font-normal leading-[0.9] uppercase max-w-full">
          WEDDING
        </h1>

        {/* Script "day" */}
        <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#4A0E17] leading-none mt-[-6px] sm:mt-[-12px] md:mt-[-16px] drop-shadow-sm">
          day
        </span>
      </motion.div>

      {/* 2. Hero Couple Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] aspect-square rounded-sm overflow-hidden shadow-2xl mb-8 group"
      >
        <img
          src="/images/couple.png"
          alt="Ajithkumar and Sneha Wedding Celebration"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 border border-black/10 pointer-events-none" />
      </motion.div>

      {/* 3. Couple Names in Calligraphic Script */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 flex-wrap"
      >
        <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#3A0A10] tracking-wide">
          Ajithkumar
        </span>
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#681622] fill-[#681622]" />
        </motion.div>
        <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#3A0A10] tracking-wide">
          Sneha
        </span>
      </motion.div>

      {/* 4. Editorial Love Quote in Natural English */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="max-w-xl sm:max-w-2xl px-4"
      >
        <p className="font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] leading-relaxed text-[#4A0E17]/90 font-medium">
          Love is a choice we make every single day. And on this special evening, we will say «I do» in the presence of those we cherish most.
        </p>
      </motion.div>
    </section>
  );
};
