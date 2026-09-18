import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveEnvelope } from '../3d/InteractiveEnvelope';

export const ContactsSection: React.FC = () => {
  return (
    <section id="contacts" className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 flex flex-col items-center text-center bg-[#F6F3EB] paper-texture select-none overflow-hidden">
      {/* Script Heading "Contacts" */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-3"
      >
        <span className="font-script text-6xl sm:text-7xl md:text-8xl text-[#3A0A10] tracking-wide block">
          Contacts
        </span>
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#4A0E17]/70 font-medium">
          Wedding Planning &amp; Assistance
        </span>
      </motion.div>

      {/* Description in Natural English */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-md sm:max-w-lg mb-4"
      >
        <p className="font-serif text-base sm:text-lg text-[#2B1113] leading-relaxed font-normal">
          For any questions, directions, or wedding details, please feel free to call or WhatsApp us:
        </p>
      </motion.div>

      {/* Interactive 3D Velvet Burgundy Envelope */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full flex justify-center"
      >
        <InteractiveEnvelope
          phoneNumber="+91 63829 79174"
          organizerName="Wedding Helpdesk &amp; Family"
        />
      </motion.div>
    </section>
  );
};
