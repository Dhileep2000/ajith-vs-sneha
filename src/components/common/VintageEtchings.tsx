import React from 'react';

// Lord Vinayagar (Ganesha) using the provided PNG image directly
export const VinayagarEtching: React.FC<{ className?: string }> = ({
  className = 'w-64 sm:w-80 md:w-96 h-auto',
}) => (
  <img
    src="/images/vinayagar.png"
    alt="Lord Vinayagar"
    className={`${className} object-contain`}
  />
);


// Nesting Lovebirds engraving matching the vintage artwork under August calendar
export const LovebirdsEtching: React.FC<{ className?: string }> = ({ className = 'w-48 h-auto' }) => (
  <svg
    viewBox="0 0 320 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#4A0E17]`}
  >
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Botanical Nest & Floral Base */}
      <path d="M 60,150 C 90,170 230,170 260,150 C 275,140 280,165 250,175 C 200,188 120,188 70,175 C 40,165 45,140 60,150 Z" />
      
      {/* Rose & Foliage details left */}
      <path d="M 50,145 C 40,135 45,120 58,125 C 68,130 65,145 50,145 Z" />
      <path d="M 45,130 C 35,125 30,115 40,110 C 50,105 55,120 45,130 Z" />
      <path d="M 55,155 C 35,160 25,145 35,138" />
      <path d="M 68,140 C 72,130 82,132 80,142" />

      {/* Rose & Foliage details right */}
      <path d="M 270,145 C 280,135 275,120 262,125 C 252,130 255,145 270,145 Z" />
      <path d="M 275,130 C 285,125 290,115 280,110 C 270,105 265,120 275,130 Z" />
      <path d="M 265,155 C 285,160 295,145 285,138" />
      <path d="M 252,140 C 248,130 238,132 240,142" />

      {/* Center Floral Garland */}
      <circle cx="160" cy="155" r="14" strokeDasharray="2 2" />
      <circle cx="160" cy="155" r="8" />
      <path d="M 140,155 C 130,150 120,160 135,165" />
      <path d="M 180,155 C 190,150 200,160 185,165" />
      <path d="M 110,160 C 130,175 190,175 210,160" strokeWidth="0.8" />

      {/* Left Dove */}
      {/* Head & Beak */}
      <path d="M 148,82 C 145,70 132,60 120,62 C 108,64 102,75 106,88 C 100,95 95,108 98,125 C 102,138 115,148 135,146 C 145,145 152,135 155,125" />
      <path d="M 145,78 L 156,80 L 146,84" /> {/* Beak touching center */}
      <circle cx="122" cy="74" r="2.5" fill="currentColor" />
      {/* Left Dove Wing feathers & texture */}
      <path d="M 106,90 C 85,95 72,112 75,135 C 85,130 95,125 108,128" />
      <path d="M 80,122 C 90,118 100,118 110,125" strokeWidth="0.8" />
      <path d="M 88,110 C 98,105 110,108 120,118" strokeWidth="0.8" />
      <path d="M 96,98 C 105,94 116,98 124,108" strokeWidth="0.8" />
      {/* Tail */}
      <path d="M 75,135 C 65,142 55,148 50,152 C 60,154 72,148 78,144" />

      {/* Right Dove */}
      {/* Head & Beak */}
      <path d="M 172,82 C 175,70 188,60 200,62 C 212,64 218,75 214,88 C 220,95 225,108 222,125 C 218,138 205,148 185,146 C 175,145 168,135 165,125" />
      <path d="M 175,78 L 164,80 L 174,84" /> {/* Beak touching center */}
      <circle cx="198" cy="74" r="2.5" fill="currentColor" />
      {/* Right Dove Wing feathers */}
      <path d="M 214,90 C 235,95 248,112 245,135 C 235,130 225,125 212,128" />
      <path d="M 240,122 C 230,118 220,118 210,125" strokeWidth="0.8" />
      <path d="M 232,110 C 222,105 210,108 200,118" strokeWidth="0.8" />
      <path d="M 224,98 C 215,94 204,98 196,108" strokeWidth="0.8" />
      {/* Tail */}
      <path d="M 245,135 C 255,142 265,148 270,152 C 260,154 248,148 242,144" />

      {/* Small love heart between beaks */}
      <path
        d="M 160,70 C 158,66 153,66 153,70 C 153,75 160,80 160,80 C 160,80 167,75 167,70 C 167,66 162,66 160,70 Z"
        fill="currentColor"
        stroke="none"
      />
    </g>
  </svg>
);

// Royal Indian Elephant holding lotus (traditional auspicious etching)
export const RoyalElephantEtching: React.FC<{ className?: string }> = ({
  className = 'w-48 sm:w-60 md:w-72 h-auto',
}) => (
  <img
    src="/images/elephant-gold.png"
    alt="Royal Indian Elephant holding Lotus"
    className={`${className} object-contain select-none pointer-events-none drop-shadow-md`}
  />
);

// Flying dove carrying olive twig / ribbon (matches bottom of Timing section)
export const FlyingDoveEtching: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-40 h-auto',
  color = '#F6F3EB',
}) => (
  <svg
    viewBox="0 0 240 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ color }}
  >
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Dove Body & Head */}
      <path d="M 120,80 C 130,68 145,65 156,72 C 162,76 166,82 165,90 C 160,102 148,112 135,120 C 118,130 95,135 80,140 C 90,125 95,108 100,95 C 105,85 112,80 120,80 Z" />
      <circle cx="152" cy="76" r="2" fill="currentColor" />
      {/* Beak with twig */}
      <path d="M 164,78 L 178,79 L 165,83" />
      <path d="M 174,79 C 182,75 192,76 198,82 M 176,80 C 184,85 190,84 195,90" strokeWidth="1" />
      <path d="M 185,76 C 188,73 192,74 190,78 C 188,80 186,78 185,76" fill="currentColor" />
      <path d="M 193,82 C 196,80 200,81 198,85" />

      {/* Upstretched Upper Wing */}
      <path d="M 122,80 C 130,45 155,18 190,12 C 180,25 170,42 160,60 C 152,72 145,82 135,90" />
      {/* Primary and secondary wing feathers */}
      <path d="M 182,18 C 168,32 152,55 142,75" strokeWidth="0.8" />
      <path d="M 172,26 C 158,42 145,64 136,82" strokeWidth="0.8" />
      <path d="M 160,35 C 148,52 138,72 130,90" strokeWidth="0.8" />
      <path d="M 148,46 C 138,62 130,80 125,95" strokeWidth="0.8" />

      {/* Lower / Back Wing */}
      <path d="M 105,92 C 85,82 62,80 40,88 C 55,96 70,102 88,106" />
      <path d="M 50,89 C 65,95 80,100 95,104" strokeWidth="0.8" />
      <path d="M 60,94 C 72,100 85,103 98,107" strokeWidth="0.8" />

      {/* Fan Tail Feathers */}
      <path d="M 80,140 C 65,152 48,162 30,168 C 42,158 55,148 68,138" />
      <path d="M 75,142 C 60,156 42,168 22,174 C 38,162 52,150 64,138" />
      <path d="M 70,144 C 55,160 38,172 16,180 C 34,166 48,154 60,142" />
    </g>
  </svg>
);

// Vintage Rose engraving on the envelope note
export const VintageRoseEtching: React.FC<{ className?: string }> = ({ className = 'w-12 h-auto' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#4A0E17]`}
  >
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Rosebud Petals */}
      <circle cx="50" cy="30" r="8" strokeDasharray="3 2" />
      <path d="M 46,24 C 52,20 58,24 55,30 C 52,36 44,34 46,24 Z" />
      <path d="M 40,28 C 36,36 44,42 52,42 C 60,42 66,35 62,28" />
      <path d="M 36,32 C 32,42 42,48 50,48 C 58,48 68,42 66,32" />
      {/* Stem & Leaves */}
      <path d="M 50,48 C 50,60 52,70 55,78" />
      <path d="M 49,58 C 40,54 34,58 35,64 C 40,66 46,62 49,58 Z" />
      <path d="M 52,65 C 60,62 66,66 65,72 C 60,74 54,70 52,65 Z" />
    </g>
  </svg>
);

// Ornate Victorian frame with indented scalloped corners (matches Section 3)
export const OrnateBorderFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`relative p-8 md:p-10 border border-[#4A0E17]/40 ${className}`}>
    {/* Corner Filigree Ornaments */}
    <div className="absolute -top-[5px] -left-[5px] w-3 h-3 border-t-2 border-l-2 border-[#4A0E17]" />
    <div className="absolute -top-[5px] -right-[5px] w-3 h-3 border-t-2 border-r-2 border-[#4A0E17]" />
    <div className="absolute -bottom-[5px] -left-[5px] w-3 h-3 border-b-2 border-l-2 border-[#4A0E17]" />
    <div className="absolute -bottom-[5px] -right-[5px] w-3 h-3 border-b-2 border-r-2 border-[#4A0E17]" />

    {/* Inset border */}
    <div className="absolute inset-1.5 border border-[#4A0E17]/20 pointer-events-none" />

    {/* Corner scallops / notches */}
    <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#4A0E17]/30 to-transparent" />
    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#4A0E17]/30 to-transparent" />

    {children}
  </div>
);
