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

    // Smooth transition into the next page step
    setTimeout(() => {
      onOpenComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cover-letter-entrance"
        initial={{ opacity: 1 }}
        animate={
          isOpening
            ? {
                opacity: 0,
                scale: 1.04,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }
            : { opacity: 1 }
        }
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="fixed inset-0 z-[999999] w-screen h-screen overflow-hidden flex items-center justify-center select-none cursor-pointer bg-[#5B0822]"
        onClick={handleOpen}
      >
        {/* Full-width responsive container, perfectly centering the cover letter */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-auto h-auto max-w-[480px] max-h-[85vh] aspect-[736/1308] flex items-center justify-center cursor-pointer"
          >
            <img
              src="/images/cover-pocket.png"
              alt="Wedding Invitation Cover Letter"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
