import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import BlurText from '../components/ui/BlurText';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { personalInfo } from '../data/portfolio';
// three.js is ~1 MB: load it after the text so the hero paints first
const InteractiveMonitor = lazy(() =>
  import('../components/InteractiveMonitor').then((m) => ({ default: m.InteractiveMonitor })),
);

/**
 * Hero - Entry section with gradient name, typing animation, and CTA buttons.
 */
export const Hero: React.FC = () => {
  const role = useTypingEffect(personalInfo.roles);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />

      <div className="hero-content">
        <div className="hero-grid">
          <motion.div
            className="hero-text-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="hero-name">
              <span className="hero-first" style={{ color: 'var(--color-primary)' }}>{personalInfo.firstName}</span>
              <span className="hero-last" style={{ color: 'var(--color-text)' }}>{personalInfo.lastName}</span>
            </h1>

            <div className="hero-role-wrapper">
              <span className="hero-role">{role}</span>
              <span className="hero-cursor">|</span>
            </div>

            <BlurText text={personalInfo.tagline} className="hero-bio" delay={45} direction="bottom" />

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
          </motion.div>

          {/* 3D Interactive graphic col */}
          <motion.div
            className="hero-graphic-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <Suspense fallback={null}>
              <InteractiveMonitor />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 80px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .hero-orb-1 {
          width: 50vw; height: 50vh;
          background: radial-gradient(circle, rgba(196, 138, 113, 0.1), transparent 70%);
          top: -20%; left: -10%;
        }
        .hero-orb-2 {
          width: 60vw; height: 60vh;
          background: radial-gradient(circle, rgba(62, 90, 71, 0.08), transparent 70%);
          bottom: -20%; right: -10%;
        }
        .hero-content {
          position: relative; 
          z-index: 1; 
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        .hero-text-col {
          text-align: left;
        }
        .hero-name {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }
        .hero-first { color: var(--color-text); font-style: italic; }
        .hero-last { display: block; color: var(--color-primary); }
        .hero-role-wrapper {
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--color-text-secondary);
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          height: 2em;
          margin-bottom: 32px;
        }
        .hero-cursor {
          margin-left: 4px;
          color: var(--color-accent);
          animation: blink 1s infinite;
          font-weight: 300;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-bio {
          font-size: clamp(1.05rem, 1.8vw, 1.2rem);
          color: var(--color-text-secondary);
          max-width: 540px;
          margin-bottom: 48px;
          line-height: 1.7;
          font-weight: 300;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .hero-location {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          color: var(--color-text-muted);
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
        }
        .hero-loc-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .hero-available {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
          margin-right: 4px;
        }
        .hero-graphic-col {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 700px;
        }
        @media (max-width: 968px) {
          .hero-section {
            padding: 100px 20px 60px;
            height: auto;
            min-height: 100vh;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
          }
          .hero-text-col {
             text-align: center;
             display: flex;
             flex-direction: column;
             align-items: center;
             order: 1;
          }
          .hero-location, .hero-actions { justify-content: center; }
          .hero-bio {
            justify-content: center;
            text-align: center;
            margin-bottom: 32px;
          }
          .hero-graphic-col {
            width: 100%;
            height: auto;
            min-height: 320px; /* Override 700px min-height to reduce vertical space */
            justify-content: center;
            order: 2; /* Name and CTAs first on small screens */
            margin-bottom: 0;
          }
          .hero-name {
            font-size: clamp(2.5rem, 10vw, 4rem);
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
};
