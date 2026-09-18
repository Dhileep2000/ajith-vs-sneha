import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Synthesize a dreamy, romantic piano / celesta chord progression using Web Audio API
  // Chords: Eb maj7 -> C min9 -> Ab maj9 -> Bb sus4 -> Eb
  const playRomanticChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Low pass filter for warm romantic vintage tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.connect(masterGain);

      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm sine + subtle triangle overtone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        noteGain.gain.setValueAtTime(0.0001, startTime);
        noteGain.gain.linearRampToValueAtTime(0.25, startTime + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      };

      const chords = [
        [311.13, 392.00, 466.16, 587.33], // Eb maj7 (Eb4, G4, Bb4, D5)
        [261.63, 311.13, 392.00, 587.33], // C min9 (C4, Eb4, G4, D5)
        [207.65, 261.63, 311.13, 392.00], // Ab maj7 (Ab3, C4, Eb4, G4)
        [233.08, 349.23, 392.00, 466.16], // Bb sus4 (Bb3, F4, G4, Bb4)
      ];

      let step = 0;
      const scheduleProgression = () => {
        if (!isPlaying && hasInteracted) return;
        const now = ctx.currentTime;
        const currentChord = chords[step % chords.length];

        // Arpeggiate notes gracefully
        currentChord.forEach((freq, idx) => {
          playNote(freq, now + idx * 0.45, 3.8);
        });

        step++;
        timerRef.current = window.setTimeout(scheduleProgression, 3800);
      };

      scheduleProgression();
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
    } else {
      setIsPlaying(true);
      playRomanticChords();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Waveform indicator when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="px-3 py-1.5 rounded-full bg-[#4A0E17]/90 text-[#F6F3EB] backdrop-blur-md border border-[#8C2A3A]/40 flex items-center gap-2 shadow-lg"
          >
            <div className="flex items-end gap-1 h-3">
              <span className="w-1 bg-[#E8C59A] rounded-full animate-bounce [animation-delay:0s] h-3" />
              <span className="w-1 bg-[#E8C59A] rounded-full animate-bounce [animation-delay:0.2s] h-2" />
              <span className="w-1 bg-[#E8C59A] rounded-full animate-bounce [animation-delay:0.4s] h-3.5" />
            </div>
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#F6F3EB]/90">
              Chopin Nocturne
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={togglePlay}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#4A0E17] text-[#F6F3EB] flex items-center justify-center shadow-xl border border-[#D4AF37]/50 hover:bg-[#5E131E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
        title={isPlaying ? 'Mute Music' : 'Play Romantic Ambience'}
        aria-label="Toggle Romantic Music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#E8C59A]" />
        ) : (
          <div className="relative">
            <VolumeX className="w-5 h-5 text-[#E8C59A]/80" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
