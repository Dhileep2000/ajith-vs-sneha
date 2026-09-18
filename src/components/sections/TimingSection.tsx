import React from 'react';
import { motion } from 'framer-motion';
import { RoyalElephantEtching } from '../common/VintageEtchings';

export const TimingSection: React.FC = () => {
  const schedule = [
    {
      time: '06:45',
      title: 'Auspicious Muhurtham',
      subtitle: 'Solemn wedding ceremony at Arulmigu Sri Baladhandayuthapani Swamy Temple (6:45 AM – 7:45 AM)',
    },
    {
      time: '08:30',
      title: 'Welcoming the Couple',
      subtitle: 'Arrival at Reddiyar Marriage Hall with auspicious honors',
    },
    {
      time: '09:00',
      title: 'Wedding Feast & Reception',
      subtitle: 'Grand traditional celebratory feast from 9:00 AM onwards',
    },
    {
      time: '11:30',
      title: 'Blessings & Felicitations',
      subtitle: 'Photographs, family greetings & exchanging heartfelt wishes',
    },
  ];

  return (
    <section id="timeline" className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-8 md:px-16 bg-[#4A0E17] paper-texture-burgundy text-[#F6F3EB] flex flex-col items-center select-none overflow-hidden">
      {/* Script Heading "Timing" */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 text-center"
      >
        <span className="font-script text-6xl sm:text-7xl md:text-8xl text-[#E8C59A] tracking-wider block">
          Timing
        </span>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F6F3EB]/70 font-medium">
          Order of the Auspicious Day
        </span>
      </motion.div>

      {/* 2x2 Timing Grid - Fluid & Expansive on larger viewports */}
      <div className="w-full max-w-xl md:max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 sm:gap-y-14 mb-16">
        {schedule.map((item, idx) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className="flex flex-col items-start border-l border-[#D4AF37]/30 pl-5"
          >
            {/* Elegant Italic Serif Time */}
            <span className="font-serif italic text-4xl sm:text-5xl text-[#F6F3EB] tracking-wide mb-1">
              {item.time}
            </span>
            {/* Title */}
            <span className="font-serif text-lg sm:text-xl text-[#E8C59A] font-medium tracking-wide">
              {item.title}
            </span>
            <span className="font-sans text-xs text-[#F6F3EB]/70 font-light tracking-wide mt-0.5">
              {item.subtitle}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Royal Auspicious Elephant Etching */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.95, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="w-full flex justify-center"
      >
        <RoyalElephantEtching className="w-52 sm:w-64 md:w-72 h-auto" />
      </motion.div>
    </section>
  );
};
