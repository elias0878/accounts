import React from 'react';

export const Clock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 flex-shrink-0">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

export const CheckCircle2 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 bg-blue-500/20 rounded-full p-0.5 h-6 w-6">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

export const DollarSign = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 flex-shrink-0">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

export const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform group-hover:-translate-x-1">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

export const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

export const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const ShieldIcon: React.FC<{size?: number}> = ({ size = 28 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);


export const WelcomeIllustration = () => (
    <svg width="250" height="200" viewBox="0 0 250 200" className="drop-shadow-[0_10px_15px_rgba(59,130,246,0.2)]">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'rgb(59, 130, 246)', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: 'rgb(37, 99, 235)', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'rgb(16, 185, 129)', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: 'rgb(6, 182, 212)', stopOpacity:1}} />
        </linearGradient>
      </defs>
      {/* <!-- Background shape --> */}
      <path d="M50 10 C20 10, 10 40, 10 70 S 20 190, 125 190 S 230 150, 240 100 S 220 10, 150 10 S 50 10" fill="rgba(17, 24, 39, 0.5)" />
      
      {/* <!-- Central Shield --> */}
      <g transform="translate(125, 100) scale(4)">
        <path d="M0 11s8-4 8-10V-4l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#grad1)" stroke="#c9d1d9" strokeWidth="0.5" />
        <path d="M-2 2 l4 4 l6 -8" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
      
      {/* <!-- Orbiting elements --> */}
      <circle cx="50" cy="50" r="8" fill="url(#grad2)"/>
      <circle cx="200" cy="60" r="12" fill="url(#grad1)"/>
      <rect x="30" y="140" width="20" height="20" rx="5" fill="url(#grad2)" transform="rotate(-30 40 150)"/>
      <path d="M180 150 l10 20 l-20 0 z" fill="url(#grad1)"/>
      
      {/* <!-- Connection lines --> */}
      <path d="M 60 55 Q 125 70, 190 65" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.5"/>
      <path d="M 45 135 Q 125 150, 185 145" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="5,5" opacity="0.5"/>
    </svg>
);
