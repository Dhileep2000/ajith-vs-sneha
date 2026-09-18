import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GuestRsvpData } from '../../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<GuestRsvpData>({
    fullName: '',
    attending: 'yes',
    guestCount: 1,
    plusOneName: '',
    alcoholPreferences: [],
    dietaryRestrictions: '',
    favoriteTrack: '',
    message: '',
  });

  const alcoholOptions = [
    'Red Wine',
    'White Wine',
    'Champagne / Prosecco',
    'Whiskey / Cognac',
    'Cocktails',
    'Non-Alcoholic Drinks',
  ];

  const handleAlcoholToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.alcoholPreferences.includes(option);
      return {
        ...prev,
        alcoholPreferences: exists
          ? prev.alcoholPreferences.filter((item) => item !== option)
          : [...prev.alcoholPreferences, option],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    // Trigger romantic gold and burgundy confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4A0E17', '#C5A059', '#F6F3EB', '#8B2635'],
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

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

          {/* Modal Dialog */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#FAF7F0] text-[#2B1113] rounded-md shadow-2xl p-6 sm:p-10 z-10 border border-[#D4AF37]/40 paper-texture max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#4A0E17]/60 hover:text-[#4A0E17] rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="text-center mb-8">
                  <span className="font-script text-4xl sm:text-5xl text-[#4A0E17] block">
                    Guest Questionnaire
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1113] mt-1">
                    Kindly Confirm Your Attendance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A0E17]/75 font-sans tracking-wide mt-2">
                    Please respond by July 15, 2026 to help us prepare your welcome
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Katherine &amp; Julian Smith"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] placeholder-[#2B1113]/40 focus:outline-none focus:ring-1 focus:ring-[#4A0E17] focus:border-[#4A0E17]"
                    />
                  </div>

                  {/* Attendance Choice */}
                  <div>
                    <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-2">
                      Will you join us for our celebration? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                        className={`px-4 py-2.5 text-xs sm:text-sm rounded border transition-all text-left flex items-center justify-between ${
                          formData.attending === 'yes'
                            ? 'bg-[#4A0E17] text-[#F6F3EB] border-[#4A0E17]'
                            : 'bg-white/60 text-[#2B1113] border-[#D4AF37]/40 hover:bg-white'
                        }`}
                      >
                        <span>Delighted to attend!</span>
                        {formData.attending === 'yes' && <Check className="w-4 h-4 text-[#E8C59A]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'no' })}
                        className={`px-4 py-2.5 text-xs sm:text-sm rounded border transition-all text-left flex items-center justify-between ${
                          formData.attending === 'no'
                            ? 'bg-[#4A0E17] text-[#F6F3EB] border-[#4A0E17]'
                            : 'bg-white/60 text-[#2B1113] border-[#D4AF37]/40 hover:bg-white'
                        }`}
                      >
                        <span>Regretfully decline</span>
                        {formData.attending === 'no' && <Check className="w-4 h-4 text-[#E8C59A]" />}
                      </button>
                    </div>
                  </div>

                  {formData.attending === 'yes' && (
                    <>
                      {/* Guest Count */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                            Number of Guests
                          </label>
                          <select
                            value={formData.guestCount}
                            onChange={(e) =>
                              setFormData({ ...formData, guestCount: Number(e.target.value) })
                            }
                            className="w-full px-3 py-2.5 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                          >
                            <option value={1}>1 Guest (Just myself)</option>
                            <option value={2}>2 Guests (With partner / spouse)</option>
                            <option value={3}>3+ Guests (Family)</option>
                          </select>
                        </div>

                        {formData.guestCount > 1 && (
                          <div>
                            <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                              Companion / Plus-One Name
                            </label>
                            <input
                              type="text"
                              placeholder="Full name of guest"
                              value={formData.plusOneName}
                              onChange={(e) =>
                                setFormData({ ...formData, plusOneName: e.target.value })
                              }
                              className="w-full px-3 py-2.5 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] placeholder-[#2B1113]/40 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                            />
                          </div>
                        )}
                      </div>

                      {/* Beverage Preferences */}
                      <div>
                        <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-2">
                          Beverage Preferences
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {alcoholOptions.map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center gap-2 p-2 rounded bg-white/60 border border-[#D4AF37]/30 hover:bg-white cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={formData.alcoholPreferences.includes(opt)}
                                onChange={() => handleAlcoholToggle(opt)}
                                className="accent-[#4A0E17] rounded"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Dietary Restrictions */}
                      <div>
                        <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                          Dietary Preferences or Allergies
                        </label>
                        <input
                          type="text"
                          placeholder="Vegetarian, vegan, nut allergy, gluten-free..."
                          value={formData.dietaryRestrictions}
                          onChange={(e) =>
                            setFormData({ ...formData, dietaryRestrictions: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] placeholder-[#2B1113]/40 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        />
                      </div>

                      {/* Favorite Track */}
                      <div>
                        <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                          Song you cannot resist dancing to
                        </label>
                        <input
                          type="text"
                          placeholder="Artist — Track Title"
                          value={formData.favoriteTrack}
                          onChange={(e) =>
                            setFormData({ ...formData, favoriteTrack: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] placeholder-[#2B1113]/40 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        />
                      </div>
                    </>
                  )}

                  {/* Wishes message */}
                  <div>
                    <label className="block text-xs font-caps-clean text-[#4A0E17] font-semibold mb-1.5">
                      Warm Wishes for the Bride &amp; Groom
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share a loving note or warm memory..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded border border-[#D4AF37]/50 bg-white/80 text-[#2B1113] placeholder-[#2B1113]/40 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#4A0E17] text-[#F6F3EB] rounded font-caps-clean text-xs sm:text-sm tracking-widest font-semibold hover:bg-[#681622] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#E8C59A]" />
                    <span>Submit RSVP Response</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Submission Success State in English */
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#4A0E17] text-[#E8C59A] flex items-center justify-center mb-5 shadow-xl">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h4 className="font-serif text-3xl text-[#2B1113] mb-3">
                  Thank you, {formData.fullName}!
                </h4>
                <p className="text-base text-[#4A0E17]/85 max-w-md font-serif leading-relaxed mb-8">
                  {formData.attending === 'yes'
                    ? 'Your confirmation has been received! We look forward to celebrating with you on November 15, 2026 at Reddiyar Marriage Hall.'
                    : 'Thank you for letting us know! We will miss your presence on this day and deeply appreciate your warm thoughts and blessings.'}
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#4A0E17] text-[#F6F3EB] rounded font-caps-clean text-xs tracking-widest uppercase hover:bg-[#681622] transition-colors shadow-md"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
