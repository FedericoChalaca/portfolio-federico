import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ExternalLink, Search, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FilterTabs } from '../components/ui/FilterTabs';
import { filterTechnologies, getTechFilters } from '../data/portfolio';

import type { Technology, WorkType } from '../types';

const capabilityIcons = { search: Search, shield: ShieldCheck, bell: Bell };

const TechMark: React.FC<{ tech: Technology; size: number }> = ({ tech, size }) => {
  if (tech.logo) return <img src={`/logos/${tech.logo}`} alt="" width={size} height={size} />;
  const Icon = capabilityIcons[tech.icon ?? 'search'];
  return <Icon size={size} aria-hidden="true" />;
};

/** What the client gets from one technology, and the real projects that prove it. */
const TechPanel: React.FC<{ tech: Technology; className: string; panelRef?: React.Ref<HTMLDivElement> }> = ({
  tech,
  className,
  panelRef,
}) => (
  <div ref={panelRef} className={`tech-panel ${className}`} aria-live="polite">
    <AnimatePresence mode="wait">
      <motion.div
        key={tech.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="tech-panel-head">
          <span className="tech-panel-mark">
            <TechMark tech={tech} size={28} />
          </span>
          <h3 className="tech-panel-name">{tech.name}</h3>
        </div>
        <p className="tech-panel-benefit">{tech.benefit}</p>
        <h4 className="tech-panel-label">Dónde lo he usado</h4>
        <ul className="tech-proofs">
          {tech.proofs.map((proof) => (
            <li key={proof.project} className="tech-proof">
              <div className="tech-proof-head">
                {proof.url ? (
                  <a href={proof.url} target="_blank" rel="noopener noreferrer" className="tech-proof-project">
                    {proof.project} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="tech-proof-project">{proof.project}</span>
                )}
                {proof.note && <span className="tech-proof-note">{proof.note}</span>}
              </div>
              <p className="tech-proof-built">{proof.built}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  </div>
);

/**
 * Technologies - pick a technology to see what it does for the client and
 * which real project proves it. Filterable by kind of work.
 */
export const Technologies: React.FC = () => {
  const [work, setWork] = useState<WorkType>('Todos');
  const [selectedId, setSelectedId] = useState('');
  const inlinePanel = useRef<HTMLDivElement>(null);

  const filtered = filterTechnologies(work);
  // Falls back to the first one when nothing is picked or a filter hides the pick
  const selected = filtered.find((t) => t.id === selectedId) ?? filtered[0];

  // Unfiltered: one group per kind of work. Filtered: a single flat group.
  const groups =
    work === 'Todos'
      ? getTechFilters()
          .filter((f) => f.id !== 'Todos')
          .map((f) => ({ label: f.label, techs: filtered.filter((t) => t.work[0] === f.id) }))
          .filter((g) => g.techs.length > 0)
      : [{ label: work, techs: filtered }];

  const select = (id: string) => {
    setSelectedId(id);
    // On small screens the panel opens right under the group: bring it below the navbar
    // unless it is already fully in view (on desktop it is hidden, so its height is 0)
    requestAnimationFrame(() => {
      const panel = inlinePanel.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(panel).scrollMarginTop);
      if (rect.height > 0 && (rect.top < top || rect.bottom > window.innerHeight)) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <SectionHeader
          title="Qué puedo"
          highlight="Construirte"
          subtitle="Elige una tecnología y mira para qué te sirve y en qué proyecto real la usé."
        />

        <FilterTabs options={getTechFilters()} active={work} onChange={setWork} />

        <div className="tech-layout">
          <div className="tech-groups">
            {groups.map((group) => (
              <div key={group.label} className="tech-group" role="group" aria-label={group.label}>
                {work === 'Todos' && <h3 className="tech-group-label">{group.label}</h3>}
                <div className="tech-chips">
                  {group.techs.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      className="tech-chip"
                      aria-pressed={tech.id === selected.id}
                      onClick={() => select(tech.id)}
                    >
                      <TechMark tech={tech} size={18} />
                      {tech.name}
                    </button>
                  ))}
                </div>
                {group.techs.some((t) => t.id === selected.id) && (
                  <TechPanel tech={selected} className="tech-panel--inline" panelRef={inlinePanel} />
                )}
              </div>
            ))}
          </div>

          <TechPanel tech={selected} className="tech-panel--side" />
        </div>
      </div>

      <style>{`
        .tech-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: 40px;
          align-items: start;
        }
        .tech-groups {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .tech-group-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 12px;
        }
        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tech-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color var(--transition-fast), color var(--transition-fast),
            background var(--transition-fast), transform var(--transition-fast);
        }
        .tech-chip img { width: 18px; height: 18px; }
        .tech-chip:hover {
          border-color: var(--color-primary);
          color: var(--color-text);
          transform: translateY(-1px);
        }
        .tech-chip:active { transform: scale(0.98); }
        .tech-chip:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        .tech-chip[aria-pressed='true'] {
          border-color: var(--color-primary);
          background: var(--color-bg-hover);
          color: var(--color-text);
          font-weight: 600;
          box-shadow: var(--shadow-sm);
        }
        .tech-panel {
          padding: 32px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .tech-panel--side {
          position: sticky;
          top: calc(var(--navbar-height) + 24px);
        }
        .tech-panel--inline {
          display: none;
          margin-top: 16px;
          padding: 24px;
          scroll-margin-top: calc(var(--navbar-height) + 16px); /* clear the fixed navbar */
        }
        .tech-panel-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .tech-panel-mark {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--color-bg-hover);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tech-panel-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .tech-panel-benefit {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 28px;
        }
        .tech-panel-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 12px;
        }
        .tech-proofs {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .tech-proof {
          padding-left: 14px;
          border-left: 2px solid var(--color-accent);
        }
        .tech-proof-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .tech-proof-project {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          color: var(--color-text);
          text-decoration: none;
        }
        a.tech-proof-project:hover { color: var(--color-primary); text-decoration: underline; }
        .tech-proof-note {
          padding: 2px 10px;
          border-radius: var(--radius-full);
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          font-weight: 500;
        }
        .tech-proof-built {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
          font-weight: 300;
        }
        @media (max-width: 900px) {
          .tech-layout { grid-template-columns: 1fr; }
          .tech-panel--side { display: none; }
          .tech-panel--inline { display: block; }
        }
      `}</style>
    </section>
  );
};
