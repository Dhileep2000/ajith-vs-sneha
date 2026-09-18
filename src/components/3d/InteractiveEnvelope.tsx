import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Copy, Check, MessageCircle, Heart } from 'lucide-react';
import { VintageRoseEtching } from '../common/VintageEtchings';

interface InteractiveEnvelopeProps {
  phoneNumber?: string;
  organizerName?: string;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  phoneNumber = '+7 999 999-99-99',
  organizerName = 'Wedding Coordinator',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto py-8 px-4 flex flex-col items-center select-none">
      {/* Interactive Helper Cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="text-xs font-caps-clean tracking-widest text-[#4A0E17]/70 mb-4 flex items-center gap-1.5"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A0E17] animate-pulse" />
        {isOpen ? 'Click to close invitation' : 'Click the envelope to reveal details'}
      </motion.p>

      {/* Main Envelope Container with 3D Perspective */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-[300px] sm:w-[350px] h-[210px] sm:h-[240px] cursor-pointer group perspective-[1000px]"
        role="button"
        tabIndex={0}
        aria-label="Wedding contact envelope"
      >
        {/* Soft Drop Shadow beneath envelope */}
        <div className="absolute -bottom-6 left-6 right-6 h-8 bg-black/35 rounded-full blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-60" />

        {/* 1. Envelope Back Interior */}
        <div className="absolute inset-0 bg-[#3A070F] rounded-b-md shadow-2xl border-t border-[#681622]/40" />

        {/* 2. Slide-out Card */}
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? -110 : 0,
            scale: isOpen ? 1.02 : 0.98,
            boxShadow: isOpen
              ? '0 20px 40px -15px rgba(0,0,0,0.5)'
              : '0 4px 10px rgba(0,0,0,0.2)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="absolute left-4 right-4 top-2 h-[175px] sm:h-[200px] bg-[#FAF7F0] rounded-sm p-4 flex flex-col items-center justify-between z-10 border border-[#d8cdb8] paper-texture"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-1.5 border border-[#4A0E17]/20 pointer-events-none rounded-[2px]" />

          <div className="text-center pt-2">
            <span className="text-[10px] tracking-widest uppercase text-[#4A0E17]/70 font-sans block mb-1">
              {organizerName}
            </span>
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="text-lg sm:text-2xl font-serif text-[#4A0E17] font-semibold tracking-wider hover:underline block"
            >
              {phoneNumber}
            </a>
          </div>

          {/* Vintage Rose Etching */}
          <div className="my-auto py-1">
            <VintageRoseEtching className="w-10 h-10 text-[#4A0E17]/85 opacity-90 transition-transform duration-300 hover:scale-110" />
          </div>

          {/* Quick Action Buttons on Card */}
          <div className="flex items-center gap-2 pb-1 z-20">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1 bg-[#4A0E17] text-[#F6F3EB] rounded-full text-[11px] font-sans hover:bg-[#681622] transition-colors shadow-sm"
              title="Copy phone number"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Phone'}</span>
            </button>

            <a
              href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-[#4A0E17]/10 text-[#4A0E17] rounded-full hover:bg-[#4A0E17]/20 transition-colors"
              title="Message on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="p-1.5 bg-[#4A0E17]/10 text-[#4A0E17] rounded-full hover:bg-[#4A0E17]/20 transition-colors"
              title="Call Coordinator"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* 3. Envelope Side Flaps */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
            background: 'linear-gradient(135deg, #4A0E17 0%, #3B0A12 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
            background: 'linear-gradient(225deg, #4A0E17 0%, #35080F 100%)',
          }}
        />

        {/* 4. Envelope Bottom Triangle with "with love" */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-4 pointer-events-none"
          style={{
            clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
            background: 'linear-gradient(0deg, #420B13 0%, #540F1A 100%)',
            boxShadow: '0 -4px 15px rgba(0,0,0,0.3)',
          }}
        >
          <span className="font-script text-2xl sm:text-3xl text-[#E8C59A]/90 tracking-wide font-normal pt-6 drop-shadow-sm select-none">
            with love
          </span>
        </div>

        {/* 5. Top Flap with Wax Seal */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top z-30 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 5 : 30,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="w-full h-full"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              background: 'linear-gradient(180deg, #58121D 0%, #440C15 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />

          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-[#986E2F] via-[#D4AF37] to-[#F3DE9A] shadow-lg flex items-center justify-center border border-[#FFE8A3]/50 pointer-events-auto"
                title="Click to open"
              >
                <div className="w-8 h-8 rounded-full border border-[#8C6023]/60 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-[#5A121D] fill-[#5A121D]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Note under envelope */}
      <div className="mt-8 text-center text-xs tracking-wider text-[#4A0E17]/80 font-serif max-w-sm">
        <p>For all inquiries regarding schedule, transportation, and accommodations, please contact our wedding team.</p>
      </div>
    </div>
  );
};
