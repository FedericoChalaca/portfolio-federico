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
                x: `${offset * 58}%`,
                y: dist * 28,
                rotate: offset * 5,
                scale: 1 - dist * 0.22,
                opacity: dist > 1 ? 0 : 1 - dist * 0.2,
              }}
              transition={spring}
              style={{ zIndex: n - dist, pointerEvents: dist > 1 ? 'none' : 'auto' }}
            >
              <div className="device-laptop">
                <div className="device-laptop-screen">
                  <img
                    src={project.previews!.desktop}
                    alt={`Vista de escritorio de ${project.title}`}
                    width={960}
                    height={600}
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
                  width={390}
                  height={844}
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
          <p className="showcase-desc">{current.longDescription}</p>
          <div className="project-links showcase-links">
            {current.demoUrl && (
              <a href={current.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-demo">
                <ExternalLink size={15} /> Ver Demo
              </a>
            )}
            {current.githubUrl && (
              <a href={current.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                <Github size={16} /> GitHub
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .showcase {
          --card-w: clamp(260px, 46vw, 560px);
          position: relative;
          max-width: 1100px;
          margin: 0 auto 88px;
          outline: none;
        }
        .showcase:focus-visible { box-shadow: 0 0 0 2px var(--color-primary); border-radius: var(--radius-lg); }
        .showcase-stage {
          position: relative;
          height: calc(var(--card-w) * 0.5 + 48px);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          cursor: grab;
          touch-action: pan-y;
        }
        .showcase-stage:active { cursor: grabbing; }
        /* Laptop and phone sit side by side so neither hides the other's screen */
        .showcase-card {
          position: absolute;
          top: 0;
          width: var(--card-w);
          padding-left: calc(var(--card-w) * 0.03);
          display: flex;
          align-items: flex-end;
          transform-origin: 50% 120%;
          user-select: none;
        }
        .showcase-card:not(.is-active) { cursor: pointer; }
        .device-laptop { flex: 0 0 74%; min-width: 0; }
        .device-laptop-screen {
          position: relative;
          padding: 9px 9px 10px;
          border-radius: 14px 14px 3px 3px;
          background: #26221e;
          box-shadow: var(--shadow-lg);
        }
        /* Camera */
        .device-laptop-screen::before {
          content: '';
          position: absolute;
          top: 3px;
          left: 50%;
          width: 4px;
          height: 4px;
          margin-left: -2px;
          border-radius: 50%;
          background: #5e564d;
        }
        .device-laptop-base {
          position: relative;
          height: 11px;
          margin: 0 -4%;
          border-radius: 2px 2px 12px 12px;
          background: linear-gradient(to bottom, #b5aa9e, #8b8178 45%, #6d645b);
          box-shadow: var(--shadow-md);
        }
        /* Lid notch */
        .device-laptop-base::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 14%;
          height: 4px;
          transform: translateX(-50%);
          border-radius: 0 0 6px 6px;
          background: rgba(47, 42, 36, 0.35);
        }
        .device-phone {
          position: relative;
          z-index: 1;
          flex: 0 0 23%;
          margin-left: 1%;
          margin-bottom: -3%; /* stands a little in front of the laptop */
          padding: 5px;
          border-radius: 20px;
          background: #26221e;
          box-shadow: var(--shadow-lg);
        }
        /* Frames take the exact ratio of the captures, so nothing gets cropped */
        .device-laptop-screen img,
        .device-phone img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
        }
        .device-laptop-screen img { aspect-ratio: 16 / 10; border-radius: 3px; }
        .device-phone img { aspect-ratio: 390 / 844; border-radius: 15px; }
        .showcase-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 32px;
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
        .showcase-dots { display: flex; }
        /* The button is a 24px touch target; the visible dot is its ::before */
        .showcase-dot {
          min-width: 24px;
          height: 24px;
          padding: 0 4px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .showcase-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-text-muted);
          opacity: 0.5;
          transition: width var(--transition-base), background var(--transition-base), opacity var(--transition-base);
        }
        .showcase-dot.is-active::before { width: 24px; background: var(--color-primary); opacity: 1; }
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
          .showcase { --card-w: 88vw; margin-bottom: 64px; }
          .device-laptop-screen { padding: 5px 5px 6px; border-radius: 9px 9px 2px 2px; }
          .device-laptop-base { height: 7px; }
          .device-phone { padding: 3px; border-radius: 12px; }
          .device-phone img { border-radius: 9px; }
          .showcase-controls { margin-top: 24px; }
        }
      `}</style>
    </div>
  );
};
