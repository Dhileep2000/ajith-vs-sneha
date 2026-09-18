import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const DoorSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden select-none bg-[#1A080B]">
      {/* Full-width panoramic container */}
      <div
        className="relative w-full h-[240px] sm:h-[340px] md:h-[440px] lg:h-[500px] cursor-pointer group"
        style={{ perspective: '1400px' }}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Click to close doors' : 'Click to open doors'}
      >
        {/* Background glow & reveal message when door is open */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#200508] via-[#FFEBB3]/25 to-[#200508] flex items-center justify-center">
          <motion.div
            animate={{
              scale: isOpen ? 1 : 0.95,
              opacity: isOpen ? 1 : 0.2,
            }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="text-center text-[#F6F3EB] px-4"
          >
            <span className="font-script text-3xl sm:text-5xl md:text-6xl text-[#E8C59A] block mb-1">
              Welcome to Our Celebration
            </span>
            <span className="text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-[#F6F3EB]/85 block">
              Ajithkumar &amp; Sneha
            </span>
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-[#E8C59A]/80 mt-1 block">
              15 November 2026
            </span>
          </motion.div>
        </div>

        {/* Left Door Leaf - starts 100% closed (0%), opens fully 100% (-100%) */}
        <motion.div
          animate={{
            x: isOpen ? '-100%' : '0%',
            rotateY: isOpen ? -45 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden shadow-2xl origin-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src="/images/doors.jpg"
            alt="Antique Mahogany Doors"
            className="absolute top-0 left-0 w-[200%] h-full object-cover object-left max-w-none"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
        </motion.div>

        {/* Right Door Leaf - starts 100% closed (0%), opens fully 100% (100%) */}
        <motion.div
          animate={{
            x: isOpen ? '100%' : '0%',
            rotateY: isOpen ? 45 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden shadow-2xl origin-right"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src="/images/doors.jpg"
            alt="Antique Mahogany Doors"
            className="absolute top-0 right-0 w-[200%] h-full object-cover object-right max-w-none"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
        </motion.div>

        {/* Golden center seam (fades out as doors open) */}
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#D4AF37]/35 pointer-events-none"
        />

        {/* Interactive Helper Cue */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-10 pointer-events-none flex items-center gap-1.5 text-xs font-sans tracking-wider text-[#E8C59A] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-[#D4AF37]/30 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Click to close' : 'Click to open doors'}</span>
        </div>
      </div>
    </section>
  );
};
