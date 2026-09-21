import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Discover all available images in /public/images/ajith-i/
const allImageModules = import.meta.glob(
  '/public/images/ajith-i/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: false }
);

// Clean public URLs sorted in natural numeric order
const allPaths: string[] = Object.keys(allImageModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((path) => path.replace(/^\/public/, ''));

// Select exactly 108 sequential frames spanning from frame 1 to the final frame ("Welcome to all")
const TARGET_FRAME_COUNT = 108;
const imagePaths: string[] = (() => {
  if (allPaths.length === 0) return [];
  if (allPaths.length <= TARGET_FRAME_COUNT) {
    return allPaths;
  }
  // Evenly sample exactly 108 frames preserving order from index 0 to index allPaths.length - 1
  return Array.from({ length: TARGET_FRAME_COUNT }, (_, i) => {
    const originalIndex = Math.round((i * (allPaths.length - 1)) / (TARGET_FRAME_COUNT - 1));
    return allPaths[originalIndex];
  });
})();

interface EntranceSequenceProps {
  onComplete: () => void;
}

export const EntranceSequence: React.FC<EntranceSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const isMountedRef = useRef(true);
  const hasTriggeredCompleteRef = useRef(false);

  // Smooth scroll state (0 to 1)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [showEnterPrompt, setShowEnterPrompt] = useState(false);

  // Safe completion trigger
  const triggerComplete = useCallback(() => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsTransitioningOut(true);

    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Preload frames progressively
  useEffect(() => {
    isMountedRef.current = true;
    hasTriggeredCompleteRef.current = false;
    const total = imagePaths.length;
    imagesRef.current = new Array(total).fill(null);

    if (total === 0) {
      triggerComplete();
      return;
    }

    // High-priority frame 1
    const firstImg = new Image();
    firstImg.src = imagePaths[0];
    firstImg.onload = () => {
      if (!isMountedRef.current) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
    };

    // Load remaining frames in batches
    let currentIndex = 1;
    const batchSize = 6;

    const loadNextBatch = () => {
      if (!isMountedRef.current || currentIndex >= total) return;
      const end = Math.min(currentIndex + batchSize, total);
      for (let i = currentIndex; i < end; i++) {
        const img = new Image();
        img.src = imagePaths[i];
        img.onload = () => {
          if (isMountedRef.current) {
            imagesRef.current[i] = img;
          }
        };
      }
      currentIndex = end;
      if (currentIndex < total) {
        setTimeout(loadNextBatch, 20);
      }
    };

    const timer = setTimeout(loadNextBatch, 40);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [triggerComplete]);

  // Wheel, touch, and keyboard interaction listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Sensitivity calibrated for smooth frame progression
      const delta = e.deltaY;
      const step = delta / 3500;
      targetProgressRef.current = Math.min(Math.max(targetProgressRef.current + step, 0), 1);

      if (targetProgressRef.current > 0.01 && !hasScrolled) {
        setHasScrolled(true);
      }

      // If already on the final 108th image and scrolling down further, trigger entrance
      if (currentProgressRef.current >= 0.98 && delta > 10) {
        triggerComplete();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      const step = deltaY / 2200;
      targetProgressRef.current = Math.min(Math.max(targetProgressRef.current + step, 0), 1);

      if (targetProgressRef.current > 0.01 && !hasScrolled) {
        setHasScrolled(true);
      }

      if (currentProgressRef.current >= 0.98 && deltaY > 8) {
        triggerComplete();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.05, 1);
        setHasScrolled(true);
        if (currentProgressRef.current >= 0.98) {
          triggerComplete();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.05, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasScrolled, triggerComplete]);

  // Main rendering loop with smooth interpolation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId: number;

    const render = () => {
      const totalImages = imagePaths.length;
      if (totalImages === 0) return;

      // Smooth interpolation (dampened easing towards targetProgress)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.15;

      const progress = currentProgressRef.current;

      // Show prompt or complete once 108th final frame is fully presented
      if (progress >= 0.97 && !hasTriggeredCompleteRef.current) {
        setShowEnterPrompt(true);
        // Auto-advance gracefully after user views the final frame
        if (progress >= 0.99) {
          setTimeout(() => {
            triggerComplete();
          }, 800);
        }
      }

      // High DPI display support
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Frame calculations (0 to 107)
      const exactIndex = progress * (totalImages - 1);
      const baseIndex = Math.floor(exactIndex);
      const nextIndex = Math.min(baseIndex + 1, totalImages - 1);
      const blend = exactIndex - baseIndex;

      let currentImg = imagesRef.current[baseIndex];
      if (!currentImg || !currentImg.complete) {
        for (let i = baseIndex; i >= 0; i--) {
          if (imagesRef.current[i]?.complete) {
            currentImg = imagesRef.current[i];
            break;
          }
        }
      }

      let nextImg = imagesRef.current[nextIndex];
      if (!nextImg || !nextImg.complete) {
        nextImg = currentImg;
      }

      // Background fill
      ctx.fillStyle = '#140306';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        const naturalW = currentImg.naturalWidth;
        const naturalH = currentImg.naturalHeight;

        // Adapt to 100% of the available viewport width across mobile, tablet, laptop, and desktop
        const scale = displayWidth / naturalW;
        const drawW = displayWidth;
        const drawH = naturalH * scale;
        const drawX = 0;
        const drawY = (displayHeight - drawH) / 2;

        // Ambient blurred backdrop if viewport is taller than scaled image height
        if (drawH < displayHeight) {
          ctx.save();
          ctx.filter = 'blur(28px) brightness(0.35)';
          ctx.drawImage(currentImg, -20, -20, displayWidth + 40, displayHeight + 40);
          ctx.restore();
        }

        // Draw primary frame occupying 100% full viewport width
        ctx.drawImage(currentImg, drawX, drawY, drawW, drawH);

        // Smooth crossfade to next frame
        if (blend > 0.005 && nextImg && nextImg !== currentImg && nextImg.complete && nextImg.naturalWidth > 0) {
          ctx.save();
          ctx.globalAlpha = blend;
          ctx.drawImage(nextImg, drawX, drawY, drawW, drawH);
          ctx.restore();
        }

        // Dissolve into ivory paper texture at final frame transition
        if (progress > 0.95) {
          const fadeProgress = (progress - 0.95) / 0.05;
          ctx.fillStyle = `rgba(246, 243, 235, ${fadeProgress})`;
          ctx.fillRect(0, 0, displayWidth, displayHeight);
        }
      }

      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [triggerComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen overflow-hidden select-none bg-[#140306] transition-opacity duration-700 ${
        isTransitioningOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Minimal initial scroll guide */}
      <AnimatePresence>
        {!hasScrolled && isFirstFrameLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20"
          >
            <span className="font-sans text-[10px] tracking-[0.28em] text-[#E8C59A] uppercase font-light drop-shadow-sm">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#E8C59A]/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal prompt when 108th image ('Welcome to all') is reached */}
      <AnimatePresence>
        {showEnterPrompt && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={triggerComplete}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full bg-[#3B0A12]/85 border border-[#D4AF37]/50 text-[#E8C59A] font-sans text-[11px] tracking-[0.22em] uppercase backdrop-blur-md shadow-xl hover:bg-[#5A121D] transition-all active:scale-95 cursor-pointer"
          >
            Enter Invitation ↓
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle royal vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-35" />
    </div>
  );
};
