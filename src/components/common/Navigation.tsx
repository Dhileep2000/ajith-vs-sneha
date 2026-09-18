import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenRsvp: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenRsvp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Couple', href: '#hero' },
    { label: 'The Date', href: '#calendar' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Venue', href: '#venue' },
    { label: 'Our Story', href: '#story' },
    { label: 'Contacts', href: '#contacts' },
  ];

  return (
    <>
      {/* Floating Full-Width Top Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 ${
          isScrolled
            ? 'bg-[#1C0509]/90 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-xl'
            : 'bg-transparent'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group py-1"
        >
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#3B0A12]/80 shadow-md">
            <span className="font-serif italic text-sm text-[#E8C59A]">A&amp;S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-widest text-[#F6F3EB] uppercase group-hover:text-[#E8C59A] transition-colors leading-none">
              Ajithkumar &amp; Sneha
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#E8C59A]/80 uppercase mt-0.5">
              November 15, 2026
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-5 py-1.5 rounded-full bg-[#2A060C]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#F6F3EB] shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 text-xs font-sans tracking-widest uppercase text-[#F6F3EB]/80 hover:text-[#E8C59A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: RSVP Call to Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRsvp}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C988] to-[#C5A059] text-[#2B080E] font-caps-clean text-xs font-semibold tracking-widest hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            RSVP
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden rounded-full bg-[#3B0A12]/90 text-[#F6F3EB] border border-[#D4AF37]/40 shadow-md"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#E8C59A]" /> : <Menu className="w-5 h-5 text-[#E8C59A]" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-16 z-40 p-6 rounded-2xl bg-[#25050A]/95 backdrop-blur-xl border border-[#D4AF37]/40 text-[#F6F3EB] shadow-2xl flex flex-col gap-4 text-center md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 text-base font-serif tracking-widest uppercase text-[#F6F3EB]/90 hover:text-[#E8C59A] border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenRsvp();
              }}
              className="mt-2 w-full py-3 rounded-full bg-[#C5A059] text-[#2B080E] font-caps-clean text-xs font-semibold tracking-widest uppercase shadow-lg"
            >
              Complete RSVP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
