import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { FloatingPetalsCanvas } from './components/3d/FloatingPetalsCanvas';
import { CustomCursor } from './components/common/CustomCursor';
import { AudioPlayer } from './components/common/AudioPlayer';
import { Preloader } from './components/common/Preloader';
import { Navigation } from './components/common/Navigation';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { DoorSection } from './components/sections/DoorSection';
import { InvitationQuote } from './components/sections/InvitationQuote';
import { CalendarSection } from './components/sections/CalendarSection';
import { TimingSection } from './components/sections/TimingSection';
import { VenueSection } from './components/sections/VenueSection';
import { BrideGroomSection } from './components/sections/BrideGroomSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { ContactsSection } from './components/sections/ContactsSection';
import { FooterSection } from './components/sections/FooterSection';

// Modals
import { RsvpModal } from './components/modals/RsvpModal';
import { MapModal } from './components/modals/MapModal';

export const App: React.FC = () => {
  useLenis();

  // Entrance flow: 'loading' -> 'main'
  const [flowStep, setFlowStep] = useState<'loading' | 'main'>('loading');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#F6F3EB] text-[#2B1113] relative overflow-x-hidden selection:bg-[#5A121D] selection:text-[#F6F3EB]">
      {/* 1. Haute-Couture Monogram Preloader */}
      {flowStep === 'loading' && (
        <Preloader onComplete={() => setFlowStep('main')} />
      )}

      {/* 2. Luxury Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* 3. Three.js Floating Gold Dust and Velvet Petals */}
      <FloatingPetalsCanvas />

      {/* 4. Romantic Audio Experience */}
      <AudioPlayer />

      {/* 5. Responsive Full-Width Top Navigation */}
      <Navigation onOpenRsvp={() => setIsRsvpOpen(true)} />

      {/* 6. Interactive Modals */}
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

      {/* 7. Full-Width Responsive Sections */}
      <main className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <section id="hero" className="w-full">
          <HeroSection />
        </section>

        {/* Antique Mahogany Doors Transition */}
        <section id="doors" className="w-full">
          <DoorSection />
        </section>

        {/* Framed Invitation Quote */}
        <section id="quote" className="w-full">
          <InvitationQuote />
        </section>

        {/* November Calendar & Lord Vinayagar Etching */}
        <section id="calendar" className="w-full">
          <CalendarSection />
        </section>

        {/* Event Timing & Schedule (Burgundy) */}
        <section id="timing" className="w-full">
          <TimingSection />
        </section>

        {/* Venue Section (Reddiyar Marriage Hall & Temple) */}
        <section id="venue" className="w-full">
          <VenueSection onOpenMap={() => setIsMapOpen(true)} />
        </section>

        {/* Meet the Bride & Groom Section */}
        <section id="story" className="w-full">
          <BrideGroomSection />
        </section>

        {/* RSVP Invitation Section (Burgundy) */}
        <section id="rsvp" className="w-full">
          <RsvpSection onOpenRsvp={() => setIsRsvpOpen(true)} />
        </section>

        {/* Contacts Section with 3D Burgundy Envelope */}
        <section id="contacts" className="w-full">
          <ContactsSection />
        </section>

        {/* Live Countdown & Footer */}
        <footer className="w-full">
          <FooterSection />
        </footer>
      </main>
    </div>
  );
};

export default App;
