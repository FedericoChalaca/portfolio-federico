import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';

interface ShowcaseCarouselProps {
  projects: Project[];
}

/** Signed distance from the active slide, wrapped so the ring has no ends. */
function wrapOffset(i: number, active: number, n: number) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

/**
 * ShowcaseCarousel - fanned deck of live sites. Each card shows the landing
 * page on a laptop (desktop capture) and a phone (mobile capture).
 */
export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ projects }) => {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const dragged = useRef(false);
  const n = projects.length;

  if (n === 0) return null;

  const go = (step: number) => setActive((a) => (a + step + n) % n);
  const current = projects[active];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1);
    // A drag ends with a click on the card underneath; ignore that one
    dragged.current = Math.abs(info.offset.x) > 5;
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const spring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 120, damping: 20 };

  return (
    <div
      className="showcase"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Sitios publicados"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <motion.div
        className="showcase-stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => { dragged.current = true; }}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, i) => {
          const offset = wrapOffset(i, active, n);
          const dist = Math.abs(offset);
          const isActive = offset === 0;
          return (
            <motion.div
              key={project.id}
              className={`showcase-card ${isActive ? 'is-active' : ''}`}
              role={isActive ? 'group' : 'button'}
              aria-roledescription="diapositiva"
              aria-label={`${project.title}, ${i + 1} de ${n}`}
              tabIndex={-1}
              onClick={() => {
                if (dragged.current) { dragged.current = false; return; }
                if (!isActive) setActive(i);
              }}
              initial={false}
              animate={{
                x: `${offset * 62}%`,
                y: dist * 36,
                rotate: offset * 7,
                scale: 1 - dist * 0.16,
                opacity: dist > 1 ? 0 : 1 - dist * 0.25,
              }}
              transition={spring}
              style={{ zIndex: n - dist, pointerEvents: dist > 1 ? 'none' : 'auto' }}
            >
              <div className="device-laptop">
                <div className="device-laptop-screen">
                  <img
                    src={project.previews!.desktop}
                    alt={`Vista de escritorio de ${project.title}`}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="device-laptop-base" />
              </div>
              <div className="device-phone">
                <img
                  src={project.previews!.mobile}
                  alt={`Vista en celular de ${project.title}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="showcase-controls">
        <button className="showcase-arrow" onClick={() => go(-1)} aria-label="Sitio anterior">
          <ChevronLeft size={20} />
        </button>
        <div className="showcase-dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`showcase-dot ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Ir a ${p.title}`}
              aria-current={i === active}
            />
          ))}
        </div>
        <button className="showcase-arrow" onClick={() => go(1)} aria-label="Sitio siguiente">
          <ChevronRight size={20} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="showcase-info"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="showcase-title">{current.title}</h3>
          <p className="showcase-desc">{current.description}</p>
          <div className="project-links showcase-links">
            {current.demoUrl && (
              <a href={current.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-demo">
                <ExternalLink size={15} /> Ver Demo
              </a>
            )}
            <a href={current.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={16} /> GitHub
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .showcase {
          --card-w: clamp(260px, 56vw, 600px);
          position: relative;
          max-width: 1100px;
          margin: 0 auto 88px;
          outline: none;
        }
        .showcase:focus-visible { box-shadow: 0 0 0 2px var(--color-primary); border-radius: var(--radius-lg); }
        .showcase-stage {
          position: relative;
          height: calc(var(--card-w) * 0.72);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          cursor: grab;
          touch-action: pan-y;
        }
        .showcase-stage:active { cursor: grabbing; }
        .showcase-card {
          position: absolute;
          top: 0;
          width: var(--card-w);
          transform-origin: 50% 120%;
          user-select: none;
        }
        .showcase-card:not(.is-active) { cursor: pointer; }
        .device-laptop-screen {
          aspect-ratio: 16 / 10;
          border: 10px solid #2f2a24;
          border-bottom-width: 14px;
          border-radius: 14px 14px 0 0;
          background: #2f2a24;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .device-laptop-base {
          height: 14px;
          margin: 0 -7%;
          border-radius: 0 0 14px 14px;
          background: linear-gradient(to bottom, #8b8178, #5e564d);
          box-shadow: var(--shadow-md);
        }
        .device-laptop-screen img,
        .device-phone img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          pointer-events: none;
        }
        .device-phone {
          position: absolute;
          right: -5%;
          bottom: -10%;
          width: 23%;
          aspect-ratio: 9 / 19.5;
          border: 5px solid #2f2a24;
          border-radius: 18px;
          background: #2f2a24;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          transition: opacity var(--transition-base);
        }
        .showcase-card:not(.is-active) .device-phone { opacity: 0; }
        .showcase-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 56px;
        }
        .showcase-arrow {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color var(--transition-base), color var(--transition-base), transform var(--transition-fast);
        }
        .showcase-arrow:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .showcase-arrow:active { transform: scale(0.96); }
        .showcase-dots { display: flex; gap: 8px; }
        .showcase-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: var(--radius-full);
          background: var(--color-border-hover);
          cursor: pointer;
          transition: width var(--transition-base), background var(--transition-base);
        }
        .showcase-dot.is-active { width: 24px; background: var(--color-primary); }
        .showcase-info {
          text-align: center;
          max-width: 560px;
          margin: 28px auto 0;
        }
        .showcase-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 8px;
        }
        .showcase-desc {
          color: var(--color-text-secondary);
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .showcase-links { justify-content: center; }
        @media (max-width: 768px) {
          .showcase { --card-w: 78vw; margin-bottom: 64px; }
          .device-laptop-screen { border-width: 6px; border-bottom-width: 9px; border-radius: 10px 10px 0 0; }
          .device-laptop-base { height: 9px; }
          .device-phone { border-width: 3px; border-radius: 12px; }
          .showcase-controls { margin-top: 40px; }
        }
      `}</style>
    </div>
  );
};
