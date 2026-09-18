import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface RsvpSectionProps {
  onOpenRsvp: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onOpenRsvp }) => {
  return (
    <section id="rsvp" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 bg-[#4A0E17] paper-texture-burgundy text-[#F6F3EB] flex flex-col items-center text-center select-none overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 sm:mb-6"
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F6F3EB] font-normal tracking-wide">
          Dear Guests &amp; Family
        </h2>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#E8C59A]/80 mt-1 block">
          Kindly RSVP by November 5, 2026
        </span>
      </motion.div>

      {/* Description in Natural English */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-md sm:max-w-xl mb-10"
      >
        <p className="font-serif text-sm sm:text-base md:text-lg text-[#F6F3EB]/90 leading-relaxed font-light">
          It is essential for us to know a little more about your preferences so that this day is joyful, comfortable, and memorable for everyone. Please complete the form below.
        </p>
      </motion.div>

      {/* Button: White with burgundy text, matching template style */}
      <motion.button
        whileHover={{ scale: 1.04, backgroundColor: '#FFFFFF' }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpenRsvp}
        className="w-full max-w-xs sm:max-w-sm py-3.5 sm:py-4 bg-[#FAF7F0] text-[#4A0E17] rounded-sm font-caps-clean text-xs sm:text-sm tracking-widest font-semibold hover:shadow-2xl transition-all shadow-lg flex items-center justify-center gap-2.5"
      >
        <Sparkles className="w-4 h-4 text-[#C5A059]" />
        <span>Complete RSVP Questionnaire</span>
      </motion.button>
    </section>
  );
};
