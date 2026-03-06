import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FilterTabs } from '../components/ui/FilterTabs';
import { ProgressBar } from '../components/ui/ProgressBar';
import { filterTechnologies, getTechFilters } from '../data/portfolio';

import type { TechCategory } from '../types';

/**
 * Technologies - Filterable tech stack grid with animated progress bars.
 */
export const Technologies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('Todos');
  const filtered = filterTechnologies(activeCategory);

  const handleCategoryChange = (cat: TechCategory) => setActiveCategory(cat);

  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <SectionHeader
          title="Caja de"
          highlight="Herramientas"
          subtitle="Las tecnologías orgánicas con las que doy vida a mis proyectos"
        />

        <FilterTabs
          options={getTechFilters()}
          active={activeCategory}
          onChange={handleCategoryChange}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="tech-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.id}
                className="tech-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Icon */}
                <div className="tech-icon-wrapper">
                  <div
                    className="tech-icon"
                    style={{ background: tech.color + '20', color: tech.color }}
                  >
                    <span className="tech-icon-text">{tech.icon}</span>
                  </div>
                  <div>
                    <h3 className="tech-name">{tech.name}</h3>
                    <span className="tech-category-badge">{tech.category}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="tech-progress">
                  <ProgressBar value={tech.level} color={tech.color} />
                </div>

                <p className="tech-desc">{tech.description}</p>

                {/* Related projects */}
                <div className="tech-related">
                  <span className="tech-related-label">PROYECTOS DESTACADOS</span>
                  <div className="tech-related-tags">
                    {tech.relatedProjects.slice(0, 2).map((p) => (
                      <span key={p} className="tech-related-tag">{p}</span>
                    ))}
                    {tech.relatedProjects.length > 2 && (
                      <span className="tech-related-tag">+{tech.relatedProjects.length - 2}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          margin-top: 32px;
        }
        .tech-card {
          flex: 1 1 calc(33.333% - 24px);
          min-width: 280px;
          padding: 28px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-slow);
          position: relative;
          overflow: hidden;
        }
        /* Soften the card with a natural 'texture' feel via a subtle background gradient */
        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(62, 90, 71, 0.02) 0%, transparent 100%);
          pointer-events: none;
        }
        .tech-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: rgba(62, 90, 71, 0.2); /* Soft forest green hover border */
        }
        .tech-icon-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        .tech-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); /* organic depth */
        }
        .tech-icon-text {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tech-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .tech-category-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent); /* Terracotta */
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tech-progress { margin-bottom: 16px; }
        .tech-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          font-weight: 300;
        }
        .tech-related-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
        }
        .tech-related-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tech-related-tag {
          padding: 4px 12px;
          border-radius: var(--radius-sm);
          background: rgba(196, 138, 113, 0.05); /* very soft terracotta bg */
          color: var(--color-text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(196, 138, 113, 0.15);
        }
      `}</style>
    </section>
  );
};
