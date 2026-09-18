import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { VinayagarEtching } from '../common/VintageEtchings';

export const CalendarSection: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  // Generate .ics calendar invite in English
  const handleAddToCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Wedding Day//Ajithkumar and Sneha//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-ajithkumar-sneha-20261115@wedding.day',
      'SUMMARY:Wedding of Ajithkumar & Sneha ❤️',
      'DESCRIPTION:Wedding celebration of Ajithkumar and Sneha. Muhurtham at Arulmigu Sri Baladhandayuthapani Swamy Temple (6:45 AM – 7:45 AM). Reception & Wedding Feast at Reddiyar Marriage Hall from 9:00 AM onwards. Map: https://share.google/4dapqJEOyQJ9FMrgH. Contact: 6382979174.',
      'LOCATION:Reddiyar Marriage Hall',
      'DTSTART:20261115T011500Z',
      'DTEND:20261115T093000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Wedding_Ajithkumar_and_Sneha.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="relative w-full pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 flex flex-col items-center bg-[#F6F3EB] paper-texture select-none overflow-hidden">
      {/* Script Heading "November" */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center"
      >
        <span className="font-script text-6xl sm:text-7xl md:text-8xl text-[#3A0A10] tracking-wide block">
          November
        </span>
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#4A0E17]/70 font-medium">
          Sunday, 2026
        </span>
      </motion.div>

      {/* Calendar Grid for November 2026 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] mb-10"
      >
        {/* Days of week */}
        <div className="grid grid-cols-7 text-center font-sans text-xs sm:text-sm tracking-widest text-[#4A0E17]/80 font-medium mb-4">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Days numbers */}
        <div className="grid grid-cols-7 text-center font-serif text-base sm:text-lg md:text-xl text-[#2B1113] gap-y-3">
          {/* Row 1: Nov 1 (Sun) - Nov 7 (Sat) */}
          <span className="py-1">1</span>
          <span className="py-1">2</span>
          <span className="py-1">3</span>
          <span className="py-1">4</span>
          <span className="py-1">5</span>
          <span className="py-1">6</span>
          <span className="py-1">7</span>

          {/* Row 2: Nov 8 (Sun) - Nov 14 (Sat) */}
          <span className="py-1">8</span>
          <span className="py-1">9</span>
          <span className="py-1">10</span>
          <span className="py-1">11</span>
          <span className="py-1">12</span>
          <span className="py-1">13</span>
          <span className="py-1">14</span>

          {/* Row 3: Nov 15 (Sun - Wedding Day!) - Nov 21 (Sat) */}
          <div className="relative flex items-center justify-center py-1">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="relative flex items-center justify-center cursor-pointer group"
              onClick={handleAddToCalendar}
              title="Our Wedding Day! Click to save to calendar"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 text-[#5A121D] fill-current drop-shadow-md">
                <path d="M16 28.5 C16 28.5 2.5 19.5 2.5 10.5 C2.5 5.5 6.5 2 11 2 C13.5 2 15.2 3.2 16 4.3 C16.8 3.2 18.5 2 21 2 C25.5 2 29.5 5.5 29.5 10.5 C29.5 19.5 16 28.5 16 28.5 Z" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-serif text-xs sm:text-sm font-semibold text-[#F6F3EB] pt-0.5">
                15
              </span>
            </motion.div>
          </div>
          <span className="py-1">16</span>
          <span className="py-1">17</span>
          <span className="py-1">18</span>
          <span className="py-1">19</span>
          <span className="py-1">20</span>
          <span className="py-1">21</span>

          {/* Row 4: Nov 22 (Sun) - Nov 28 (Sat) */}
          <span className="py-1">22</span>
          <span className="py-1">23</span>
          <span className="py-1">24</span>
          <span className="py-1">25</span>
          <span className="py-1">26</span>
          <span className="py-1">27</span>
          <span className="py-1">28</span>

          {/* Row 5: Nov 29 (Sun) - Nov 30 (Mon) */}
          <span className="py-1">29</span>
          <span className="py-1">30</span>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
        </div>
      </motion.div>

      {/* Add to calendar button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleAddToCalendar}
        className="mb-12 px-6 py-2.5 rounded-full border border-[#4A0E17]/40 text-[#4A0E17] text-xs font-sans tracking-widest uppercase hover:bg-[#4A0E17] hover:text-[#F6F3EB] transition-colors flex items-center gap-2 shadow-sm"
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Event Saved to Calendar!</span>
          </>
        ) : (
          <>
            <CalendarIcon className="w-4 h-4" />
            <span>Save November 15 to Calendar</span>
          </>
        )}
      </motion.button>

      {/* Vintage Lord Vinayagar Etching */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full flex justify-center"
      >
        <VinayagarEtching className="w-64 sm:w-80 md:w-96 h-auto" />
      </motion.div>
    </section>
  );
};
