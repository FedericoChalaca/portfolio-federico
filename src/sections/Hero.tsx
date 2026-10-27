import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { personalInfo } from '../data/portfolio';
import { HeroLaptop } from '../components/HeroLaptop';

/** Own component so each typed character re-renders only this line, not the whole hero. */
const TypedRole: React.FC = () => {
  const role = useTypingEffect(personalInfo.roles);
  return <span className="hero-role">{role}</span>;
};

/**
 * Hero - Entry section with gradient name, typing animation, and CTA buttons.
 */
export const Hero: React.FC = () => {
  // Don't download or run three.js until its column has been on screen
  const graphicRef = useRef<HTMLDivElement>(null);
  const graphicNear = useInView(graphicRef, { once: true });

  // A section link (#proyectos, #contacto) followed before the app loaded, or shared: go there once it exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length < 2 || hash.startsWith('#proyecto-')) return; // project links are handled by Projects
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 400);
    return () => window.clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />

      <div className="hero-content">
        <div className="hero-grid">
          {/* No entrance animation: the static first view in index.html is this same column, so it must not move */}
          <div className="hero-text-col">
            <h1 className="hero-name">
              <span className="hero-first" style={{ color: 'var(--color-primary)' }}>{personalInfo.firstName}</span>
              <span className="hero-last" style={{ color: 'var(--color-text)' }}>{personalInfo.lastName}</span>
            </h1>

            <div className="hero-role-wrapper">
              <TypedRole />
              <span className="hero-cursor">|</span>
            </div>

            <p className="hero-bio">{personalInfo.tagline}</p>

            <div className="hero-actions">
              <Button variant="primary" size="lg" onClick={() => scrollTo('proyectos')}>
                &lt;/&gt; Ver proyectos
              </Button>
              <Button variant="ghost" size="lg" onClick={() => scrollTo('contacto')}>
                <MessageCircle size={18} /> Hablemos
              </Button>
            </div>

            <div className="hero-location">
              <span className="hero-loc-item">
                <span className="hero-available" aria-hidden="true" /> Disponible para proyectos
              </span>
              <span className="hero-loc-item">
                <MapPin size={16} /> {personalInfo.location}
              </span>
            </div>
          </div>

          {/* 3D Interactive graphic col */}
          <motion.div
            ref={graphicRef}
            className="hero-graphic-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <HeroLaptop near={graphicNear} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
