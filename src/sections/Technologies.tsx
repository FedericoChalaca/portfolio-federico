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
                    title="Stack"
                    highlight="Tecnológico"
                    subtitle="Tecnologías que domino para crear soluciones innovadoras"
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
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .tech-card {
          padding: 24px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition-base), border-color var(--transition-base);
          cursor: default;
        }
        .tech-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--color-border-hover);
        }
        .tech-icon-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .tech-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tech-icon-text {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .tech-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 2px;
        }
        .tech-category-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tech-progress { margin-bottom: 14px; }
        .tech-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .tech-related-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }
        .tech-related-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tech-related-tag {
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
        }
      `}</style>
        </section>
    );
};
