import Link from 'next/link';
import type { ReactNode } from 'react';

export function HeroShell({ children }: { children: ReactNode }) {
  return (
    <section className="hero-plane hero-map" aria-label="Hero">
      <div className="hero-map__art" aria-hidden="true">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(238,241,240,0.07)" strokeWidth="1" fill="none">
            <path d="M0 80 H1200 M0 160 H1200 M0 240 H1200 M0 320 H1200 M0 400 H1200 M0 480 H1200 M0 560 H1200 M0 640 H1200 M0 720 H1200" />
            <path d="M80 0 V800 M160 0 V800 M240 0 V800 M320 0 V800 M400 0 V800 M480 0 V800 M560 0 V800 M640 0 V800 M720 0 V800 M800 0 V800 M880 0 V800 M960 0 V800 M1040 0 V800 M1120 0 V800" />
          </g>
          <g fill="none" stroke="rgba(216,228,236,0.16)" strokeWidth="1.25">
            <ellipse cx="820" cy="220" rx="210" ry="140" />
            <ellipse cx="820" cy="220" rx="160" ry="105" />
            <ellipse cx="820" cy="220" rx="110" ry="70" />
            <ellipse cx="320" cy="520" rx="240" ry="160" />
            <ellipse cx="320" cy="520" rx="180" ry="120" />
            <ellipse cx="320" cy="520" rx="120" ry="80" />
            <path d="M180 180 C280 120, 420 140, 500 220 S620 340, 700 320" />
          </g>
          <g fill="none" stroke="#b87333" strokeWidth="2" strokeLinecap="round">
            <path className="route-draw" d="M180 560 C320 420, 480 380, 640 300 S880 180, 1020 240" />
            <path
              className="route-draw"
              d="M220 640 C400 580, 560 500, 720 420 S920 340, 1080 380"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          </g>
          <g fill="#b87333">
            <circle cx="180" cy="560" r="4.5" />
            <circle cx="640" cy="300" r="4" />
            <circle cx="1020" cy="240" r="5" />
          </g>
        </svg>
      </div>
      <div className="coord">CEE · routes · systems</div>
      {children}
    </section>
  );
}
