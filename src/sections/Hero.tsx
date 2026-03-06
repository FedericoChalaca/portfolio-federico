import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { personalInfo } from '../data/portfolio';

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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <h1 className="hero-name">
                        <span className="hero-first">{personalInfo.firstName}</span>
                        <span className="hero-last gradient-text">{personalInfo.lastName}</span>
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .hero-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%);
          top: -100px; left: -150px;
        }
        .hero-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%);
          bottom: -80px; right: -100px;
        }
        .hero-content { position: relative; z-index: 1; max-width: 800px; }
        .hero-name {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }
        .hero-first { color: var(--color-text); }
        .hero-last { display: block; }
        .hero-role-wrapper {
          display: inline-flex;
          align-items: center;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--color-text-secondary);
          font-weight: 400;
          height: 2em;
          margin-bottom: 28px;
        }
        .hero-cursor {
          margin-left: 2px;
          color: var(--color-primary);
          animation: blink 1s infinite;
          font-weight: 300;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-bio {
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto 36px;
          line-height: 1.8;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .hero-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color var(--transition-base);
        }
        .hero-scroll-hint:hover { color: var(--color-primary); }
      `}</style>
        </section>
    );
};
