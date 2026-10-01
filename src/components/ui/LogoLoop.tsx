// Inspired by React Bits LogoLoop (https://reactbits.dev), rebuilt as a pure CSS marquee
import React from 'react';
import './LogoLoop.css';

interface LogoLoopProps {
  logos: { node: React.ReactNode; title: string }[];
  ariaLabel: string;
  className?: string;
  duration?: number; // seconds per full loop
}

export default function LogoLoop({ logos, ariaLabel, className = '', duration = 40 }: LogoLoopProps) {
  // Two identical lists; the track slides by -50% so the seam never shows
  const list = (copy: boolean) => (
    <ul className="logoloop__list" aria-hidden={copy || undefined}>
      {logos.map((logo) => (
        <li key={logo.title} className="logoloop__item">
          {logo.node}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`logoloop ${className}`} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" style={{ animationDuration: `${duration}s` }}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
