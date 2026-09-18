import React from 'react';
import { motion } from 'framer-motion';
import { OrnateBorderFrame } from '../common/VintageEtchings';

export const InvitationQuote: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#F6F3EB] paper-texture flex justify-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-lg sm:max-w-xl md:max-w-2xl"
      >
        <OrnateBorderFrame className="text-center py-10 px-6 sm:px-12">
          <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#2B1113] font-normal tracking-wide">
            Together with their beloved parents &amp; families,
            <br />
            <span className="font-serif text-2xl sm:text-3xl text-[#4A0E17] font-semibold block my-2">
              Ajithkumar &amp; Sneha
            </span>
            cordially invite you and your family to grace their auspicious wedding ceremony and reception feast.
            <br />
            <span className="block mt-3 sm:mt-4 font-normal text-[#4A0E17] italic text-sm sm:text-base">
              With the blessings of our elders, we invite you to share this sacred moment.
            </span>
          </p>
        </OrnateBorderFrame>
      </motion.div>
    </section>
  );
};
