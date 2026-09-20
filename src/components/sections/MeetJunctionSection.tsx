import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const MeetJunctionSection: React.FC = () => {
  // Center image (index 1) is active by default matching existing style
  const [activeIdx, setActiveIdx] = useState<number>(1);

  const photos = [
    {
      id: 'meet-1',
      src: '/images/meet-1.jpg',
      alt: 'Ajith and Sneha Mirror Selfie',
    },
    {
      id: 'meet-2',
      src: '/images/meet-2.jpg',
      alt: 'Ajith and Sneha Outdoors',
    },
    {
      id: 'meet-3',
      src: '/images/meet-3.jpg',
      alt: 'Ajith and Sneha Journey',
    },
  ];

  return (
    <div className="relative w-full py-10 sm:py-16 px-4 sm:px-8 md:px-16 flex items-center justify-center bg-gradient-to-b from-[#F6F3EB] via-[#F6F3EB] to-[#4A0E17] select-none overflow-hidden">
      {/* 3-Image Interactive Triptych with same motion & styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-4xl flex items-center justify-center gap-3 sm:gap-6 md:gap-8 px-2 z-10"
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
    </div>
  );
};
