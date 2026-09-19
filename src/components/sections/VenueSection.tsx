import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface VenueSectionProps {
  onOpenMap: () => void;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ onOpenMap }) => {
  return (
    <section id="venue" className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 flex flex-col items-center text-center bg-[#F6F3EB] paper-texture select-none overflow-hidden">
      {/* 1. Venue Photography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md sm:max-w-xl md:max-w-3xl aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden shadow-2xl mb-8 group cursor-pointer"
        onClick={onOpenMap}
        title="Click to view interactive map and directions"
      >
        <img
          src="/images/venue.jpg"
          alt="Reddiyar Marriage Hall Wedding Venue"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
        <div className="absolute inset-0 border border-black/10 pointer-events-none" />
      </motion.div>

      {/* 2. Venue Titles */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-6 max-w-xl"
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B1113] font-medium tracking-wide">
          Reddiyar <span className="font-semibold text-[#4A0E17]">Marriage Hall</span>
        </h2>
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#4A0E17]/80 mt-1 block font-semibold">
          Reception &amp; Wedding Feast • From 9:00 AM Onwards
        </span>

      </motion.div>

      {/* 4. Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <a
          href="https://share.google/4dapqJEOyQJ9FMrgH"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 sm:px-9 py-3 rounded-full bg-[#4A0E17] text-[#F6F3EB] font-sans text-xs sm:text-sm font-medium tracking-widest uppercase hover:bg-[#681622] transition-all shadow-lg flex items-center gap-2"
        >
          <MapPin className="w-4 h-4 text-[#E8C59A]" />
          <span>Open Google Maps</span>
        </a>

        <button
          onClick={onOpenMap}
          className="px-7 sm:px-9 py-3 rounded-full border border-[#4A0E17]/50 text-[#4A0E17] font-sans text-xs sm:text-sm font-medium tracking-widest uppercase hover:bg-[#4A0E17] hover:text-[#F6F3EB] transition-all shadow-sm"
        >
          View Venue Details
        </button>
      </div>
    </section>
  );
};
