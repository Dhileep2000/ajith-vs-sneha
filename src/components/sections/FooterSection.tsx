import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Share2, Heart, Check, Camera } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Countdown timer to November 15, 2026, 06:45 AM IST
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-15T06:45:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Wedding Day — Ajithkumar & Sneha',
        text: 'Wedding invitation of Ajithkumar and Sneha — November 15, 2026',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="relative w-full py-16 sm:py-20 px-4 sm:px-8 bg-[#141212] text-[#F6F3EB] flex flex-col items-center text-center select-none border-t border-[#3A0A10]">
      {/* 1. Countdown to November 15 */}
      <div className="mb-12 w-full max-w-md">
        <span className="text-[11px] font-caps-clean tracking-[0.25em] text-[#E8C59A]/80 uppercase block mb-4">
          Until Our Wedding Celebration
        </span>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {[
            { value: timeLeft.days, label: 'days' },
            { value: timeLeft.hours, label: 'hours' },
            { value: timeLeft.minutes, label: 'minutes' },
            { value: timeLeft.seconds, label: 'seconds' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 sm:p-4 rounded bg-[#1F1B1C] border border-[#D4AF37]/25 flex flex-col items-center shadow-inner"
            >
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#E8C59A] font-light">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#F6F3EB]/60 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Invitation Tagline in English */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        className="font-sans text-xs sm:text-sm text-[#F6F3EB]/85 tracking-wide max-w-md mb-6"
      >
        We look forward to celebrating this extraordinary moment with you
      </motion.p>

      {/* 3. Quick Actions */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8 text-xs sm:text-sm font-sans text-[#E8C59A]">
        <a
          href="https://wa.me/916382979174"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Send className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp: 6382979174</span>
        </a>

        <a
          href="https://share.google/4dapqJEOyQJ9FMrgH"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Camera className="w-4 h-4" />
          <span>Venue Map Location</span>
        </a>
      </div>

      {/* 4. Share button */}
      <button
        onClick={handleShare}
        className="mb-10 px-5 py-2 rounded-full border border-[#D4AF37]/35 text-[#E8C59A] text-xs font-sans tracking-widest uppercase hover:bg-[#D4AF37]/15 transition-colors flex items-center gap-2 shadow-sm"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>Share Invitation</span>
          </>
        )}
      </button>

      {/* Monogram Footer */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-[#F6F3EB]/40 font-serif mb-8">
        <span>Ajithkumar</span>
        <Heart className="w-3.5 h-3.5 text-[#681622] fill-current" />
        <span>Sneha</span>
        <span>•</span>
        <span>November 15, 2026</span>
        <span>•</span>
        <span>Reddiyar Marriage Hall</span>
      </div>

      {/* 5. Final Groom & Bride Drawing & Names */}
      <div className="flex flex-col items-center justify-center text-center mt-2">
        <img
          src="/images/bride-groom.png"
          alt="Ajith Kumar & Sneha - Groom & Bride"
          className="w-24 sm:w-28 md:w-32 h-auto object-contain mb-2.5 drop-shadow-md select-none"
        />
        <div className="font-serif text-xs sm:text-sm text-[#E8C59A] tracking-widest flex items-center justify-center gap-1.5">
          <span>Ajith Kumar</span>
          <span className="text-[#C5A059] text-[10px] font-sans">&amp;</span>
          <span>Sneha</span>
        </div>
      </div>
    </footer>
  );
};
