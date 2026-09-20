import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const BrideGroomSection: React.FC = () => {
  // Center image (index 1) is active by default matching the visual reference
  const [activeIdx, setActiveIdx] = useState<number>(1);

  const photos = [
    {
      id: 'left',
      src: '/images/story-left.jpg',
      alt: 'Ajith and Sneha mirror selfie',
    },
    {
      id: 'center',
      src: '/images/story-center.jpg',
      alt: 'Ajith and Sneha outdoors',
    },
    {
      id: 'right',
      src: '/images/story-right.jpg',
      alt: 'Ajith and Sneha together',
    },
  ];

  return (
    <section
      id="story"
      className="relative w-full pt-20 sm:pt-28 pb-20 sm:pb-28 px-4 sm:px-8 md:px-16 flex flex-col items-center text-center bg-[#F6F3EB] paper-texture select-none overflow-hidden"
    >
      {/* 1. Header: MEET THE BRIDE & GROOM */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.22em] text-[#2B1810] font-normal uppercase leading-tight">
          MEET THE
          <span className="block mt-2 sm:mt-3 tracking-[0.25em]">BRIDE &amp; GROOM</span>
        </h2>
      </motion.div>

      {/* 2. Story Description Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl sm:max-w-2xl px-4 mt-8 sm:mt-10 mb-12 sm:mb-16 space-y-4 text-center leading-relaxed tracking-wide"
      >
        <p className="font-serif italic text-base sm:text-lg text-[#8C6D53]">
          Some meetings are planned by families,<br />
          but some moments feel like they were meant to happen.
        </p>

        <p className="font-sans text-sm sm:text-base text-[#523E33]/90">
          In the heart of Perambalur, two families came together for a simple first meeting. He arrived to meet her at her home, expecting nothing more than a formal introduction.
        </p>

        <p className="font-sans text-sm sm:text-base text-[#523E33]/90">
          But somewhere between the first smile, a few quiet conversations, and those little moments that needed no words, something felt different.
        </p>

        <p className="font-sans text-sm sm:text-base text-[#523E33]/90">
          It wasn’t a dramatic love-at-first-sight story.<br />
          It was simply a beautiful beginning —<br />
          two strangers meeting for the first time, and leaving with the feeling that they might have just met someone special.
        </p>

        <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#4A0E17] font-medium pt-1">
          And that little meeting became the first page of their forever.
        </p>
      </motion.div>

      {/* 3. Three-Image Interactive Triptych */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.25 }}
        className="w-full max-w-4xl flex items-center justify-center gap-3 sm:gap-6 md:gap-8 px-2"
      >
        {photos.map((photo, idx) => {
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={photo.id}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              animate={{
                scale: isActive ? 1.12 : 0.88,
                opacity: isActive ? 1 : 0.72,
                y: isActive ? -8 : 6,
                zIndex: isActive ? 20 : 10,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 26,
              }}
              className={`relative cursor-pointer transition-all duration-300 ${
                idx === 1
                  ? 'w-44 sm:w-60 md:w-72 aspect-[3/4.3]'
                  : 'w-28 sm:w-40 md:w-48 aspect-[3/4.1]'
              }`}
            >
              {/* Golden Architectural Border Frame */}
              <div
                className={`relative w-full h-full p-1 sm:p-1.5 bg-[#FAF7F0] rounded-none shadow-xl transition-colors duration-300 ${
                  isActive
                    ? 'border-2 border-[#B3804D] shadow-2xl ring-2 ring-[#B3804D]/30'
                    : 'border border-[#B3804D]/60'
                }`}
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle vignette / lighting overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive ? 'bg-black/0' : 'bg-black/15'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 4. Elegant Bottom Caption in Italic Serif */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <span className="font-serif italic text-base sm:text-lg md:text-xl text-[#8C6D53] tracking-wide block">
          Marigolds and a quiet yes
        </span>
      </motion.div>
    </section>
  );
};
