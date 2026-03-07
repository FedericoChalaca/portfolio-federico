import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { personalInfo } from '../data/portfolio';
import { InteractiveMonitor } from '../components/InteractiveMonitor';

/**
 * Hero - Entry section with gradient name, typing animation, and CTA buttons.
 */
export const Hero: React.FC = () => {
  const role = useTypingEffect(personalInfo.roles);

  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
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

            <p className="hero-bio">{personalInfo.bio[0]}</p>

            <div className="hero-actions">
              <Button variant="primary" size="lg" onClick={scrollToProjects}>
                &lt;/&gt; Ver Proyectos
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            <div className="hero-location">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
            </div>
          </motion.div>

          {/* 3D Interactive graphic col */}
          <motion.div
            className="hero-graphic-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <InteractiveMonitor />
          </motion.div>
        </div>
      </div>

      <div className="hero-scroll-hint" onClick={scrollToProjects}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-muted);
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
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
        .hero-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color var(--transition-base), transform var(--transition-base);
        }
        .hero-scroll-hint:hover { 
          color: var(--color-primary); 
          transform: translate(-50%, 4px);
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
             order: 2;
          }
          .hero-bio {
            text-align: center;
            margin-bottom: 32px;
          }
          .hero-graphic-col {
            width: 100%;
            height: 450px; /* Increased height to prevent clipping */
            justify-content: center;
            order: 1; /* Keep 3D element above text for visual impact */
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
