import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoverLetterScreenProps {
  onOpenComplete: () => void;
}

export const CoverLetterScreen: React.FC<CoverLetterScreenProps> = ({ onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Smooth envelope opening transition that leads directly into the A&S Loading Page
    setTimeout(() => {
      onOpenComplete();
    }, 850);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cover-letter-entrance"
        initial={{ opacity: 1 }}
        animate={
          isOpening
            ? {
                opacity: [1, 1, 0],
                scale: [1, 1.02, 1.05],
                transition: { duration: 0.85, times: [0, 0.65, 1], ease: 'easeInOut' },
              }
            : { opacity: 1 }
        }
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="fixed inset-0 z-[999999] w-screen h-screen overflow-hidden flex items-center justify-center select-none cursor-pointer bg-[#5B0822]"
        style={{
          backgroundColor: '#5B0822',
          backgroundImage: 'url(/images/cover-pocket.jpg)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={handleOpen}
      >
        {/* Responsive Full-Width Container */}
        <div
          className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden"
          style={{ perspective: '1400px' }}
        >
          {/* Centered Small Cover Letter Frame (576 x 1024) */}
          <motion.div
            animate={
              isOpening
                ? {
                    y: 25,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  }
                : { y: 0 }
            }
            className="relative w-auto h-[70vh] sm:h-[76vh] md:h-[80vh] max-h-[640px] max-w-[85vw] sm:max-w-[380px] md:max-w-[420px] aspect-[576/1024] flex items-center justify-center overflow-hidden rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] cursor-pointer"
          >
            {/* 1. Base Cover Letter Image */}
            <img
              src="/images/cover-letter.jpg"
              alt="Wedding Invitation Cover Letter"
              className="w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 2. Physical Flap 3D Opening Animation (folds upward when opened) */}
            {isOpening && (
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{
                  rotateX: -160,
                  opacity: [1, 0.8, 0],
                  transition: {
                    duration: 0.8,
                    ease: [0.65, 0, 0.35, 1],
                  },
                }}
                style={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transformOrigin: '50% 36.5%',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute z-30 pointer-events-none"
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    clipPath: 'polygon(0% 36.5%, 100% 36.5%, 50% 60.5%)',
                    background:
                      'linear-gradient(180deg, #EBE5D3 0%, #DFD8C4 65%, #CEBE9E 100%)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                  }}
                />
              </motion.div>
            )}

            {/* 3. The Single “OPEN” Button */}
            {!isOpening && (
              <div
                className="absolute z-40 flex flex-col items-center justify-center pointer-events-auto"
                style={{
                  top: '73%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: [1, 1.04, 1],
                    transition: {
                      scale: {
                        repeat: Infinity,
                        duration: 2.4,
                        ease: 'easeInOut',
                      },
                    },
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="group relative px-9 sm:px-11 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#6B141D] to-[#4A0E17] text-[#F6F3EB] font-serif text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase shadow-[0_10px_28px_rgba(74,14,23,0.5)] border border-[#E8C59A]/80 hover:border-[#F6F3EB] transition-all cursor-pointer overflow-hidden active:scale-95"
                  title="Open the Wedding Invitation"
                  aria-label="Open Wedding Invitation"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="relative z-10 drop-shadow-sm">OPEN</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
