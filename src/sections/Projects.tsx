import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FilterTabs } from '../components/ui/FilterTabs';
import { Badge } from '../components/ui/Badge';
import { filterProjects, getProjectFilters } from '../data/portfolio';

import type { ProjectCategory } from '../types';

const ITEMS_PER_PAGE = 6;

/**
 * Projects - Filterable, paginated project grid.
 * Uses Strategy Pattern: filterProjects() is pure and injected, not embedded.
 */
export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const [page, setPage] = useState(1);

  const filtered = filterProjects(activeCategory);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: ProjectCategory) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <section id="proyectos" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          title="Obras"
          highlight="Destacadas"
          subtitle="Una selección cuidadosa de mi trabajo reciente"
        />

        <FilterTabs
          options={getProjectFilters()}
          active={activeCategory}
          onChange={handleCategoryChange}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + page}
            className="projects-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {paginated.map((project) => (
              <div key={project.id} className="project-card">
                {/* Image */}
                <div className="project-image" style={{ background: project.imageColor }}>
                  <div className="project-image-overlay">
                    <span className="project-title-overlay">{project.title}</span>
                  </div>
                  <div className="project-badge-wrapper">
                    <Badge status={project.status} />
                  </div>
                </div>

                {/* Content */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Github size={16} /> GitHub
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-demo"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹ Anterior
            </button>
            <span className="page-info">
              Página {page} de {totalPages} &nbsp;·&nbsp; {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
            </span>
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente ›
            </button>
          </div>
        )}
      </div>

      <style>{`
        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 60px;
          margin-bottom: 56px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .project-card {
          border-radius: var(--radius-md);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-slow);
          display: flex;
          flex-direction: row;
          height: 350px;
        }
        .project-card:nth-child(even) {
          flex-direction: row-reverse;
        }
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: rgba(196, 138, 113, 0.3); /* Terracotta hover */
        }
        .project-image {
          width: 45%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        /* Soften the solid color backgrounds of the image placeholders */
        .project-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-bg-glass);
          opacity: 0.1;
          pointer-events: none;
        }
        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(47, 42, 36, 0.4); /* Espresso overlay */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          transition: background var(--transition-base);
        }
        .project-card:hover .project-image-overlay {
          background: rgba(47, 42, 36, 0.2);
        }
        .project-title-overlay {
          color: #F4F1ED;
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          font-size: 1.4rem;
          text-align: center;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }
        .project-badge-wrapper {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1;
        }
        .project-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 55%;
        }
        .project-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .project-description {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          font-weight: 300;
          flex-grow: 1;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }
        .project-tag {
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          background: rgba(94, 86, 77, 0.05); /* Muted brown bg */
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(94, 86, 77, 0.1);
        }
        .project-links {
          display: flex;
          gap: 16px;
          margin-top: auto;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid var(--color-border);
          color: var(--color-text);
          transition: all var(--transition-base);
          background: transparent;
        }
        .project-link:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: rgba(62, 90, 71, 0.05);
        }
        .project-link-demo {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .project-link-demo:hover {
          background: var(--color-accent);
          color: white;
        }
        
        @media (max-width: 768px) {
          .project-card, .project-card:nth-child(even) {
            flex-direction: column;
            height: auto;
          }
          .project-image {
            width: 100%;
            height: 220px;
          }
          .project-content {
            width: 100%;
            padding: 24px;
          }
        }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .page-btn {
          padding: 10px 24px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          background: transparent;
          color: var(--color-text);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: 'Inter', sans-serif;
        }
        .page-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
          background: rgba(62, 90, 71, 0.05);
          color: var(--color-primary);
        }
        .page-btn:disabled {
          opacity: 0.3; 
          cursor: not-allowed; 
        }
        .page-info {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};
