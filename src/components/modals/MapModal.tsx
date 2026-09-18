import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const address = 'Reddiyar Marriage Hall';
  const venueTitle = 'Reddiyar Marriage Hall';
  const mapShareUrl = 'https://share.google/4dapqJEOyQJ9FMrgH';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#FAF7F0] text-[#2B1113] rounded-md shadow-2xl p-6 sm:p-8 z-10 border border-[#D4AF37]/40 paper-texture"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#4A0E17]/60 hover:text-[#4A0E17] rounded-full transition-colors"
              aria-label="Close location dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-script text-4xl text-[#4A0E17] block">Wedding Venues</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1113]">{venueTitle}</h3>
              <p className="text-xs sm:text-sm text-[#4A0E17]/85 font-sans mt-1.5 flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#4A0E17]" />
                {address}
              </p>
            </div>

            {/* Stylized Architectural Map Graphic */}
            <div className="relative w-full h-44 sm:h-52 rounded overflow-hidden mb-6 border border-[#D4AF37]/40 bg-[#e7e1d3]">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, #5a121d 1px, transparent 1px),
                    linear-gradient(to right, #ccc2af 1px, transparent 1px),
                    linear-gradient(to bottom, #ccc2af 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#4A0E17] text-[#E8C59A] shadow-xl flex items-center justify-center mb-2 border-2 border-[#E8C59A]">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <span className="font-serif text-white text-base font-semibold tracking-wide drop-shadow-md">
                  {venueTitle}
                </span>
                <span className="text-xs text-white/90 drop-shadow-md">
                  Wedding Feast &amp; Reception
                </span>
              </div>
            </div>

            {/* Travel & Venue Details in English */}
            <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-[#4A0E17]/85 font-serif leading-relaxed">
              <div className="flex items-start gap-3 p-2.5 rounded bg-[#4A0E17]/5 border border-[#4A0E17]/10">
                <Clock className="w-4 h-4 text-[#4A0E17] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#4A0E17]">Solemn Wedding Muhurtham (6:45 AM – 7:45 AM):</strong>
                  <span>Arulmigu Sri Baladhandayuthapani Swamy Temple</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded bg-[#4A0E17]/5 border border-[#4A0E17]/10">
                <Clock className="w-4 h-4 text-[#4A0E17] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#4A0E17]">Reception &amp; Wedding Feast (9:00 AM onwards):</strong>
                  <span>Reddiyar Marriage Hall</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-4 h-4 text-[#4A0E17] shrink-0 mt-1" />
                <p>
                  <strong>Assistance &amp; Route Guidance:</strong> Please call{' '}
                  <a href="tel:6382979174" className="font-semibold underline">
                    6382979174
                  </a>{' '}
                  for any directions or transportation assistance.
                </p>
              </div>
            </div>

            {/* Navigation Map Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#4A0E17] text-[#F6F3EB] rounded text-xs font-caps-clean tracking-wider text-center hover:bg-[#681622] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E8C59A]" />
              </a>

              <a
                href="tel:6382979174"
                className="py-3 px-4 bg-white border border-[#4A0E17]/30 text-[#4A0E17] rounded text-xs font-caps-clean tracking-wider text-center hover:bg-[#FAF7F0] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Call for Directions</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
