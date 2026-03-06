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
                    title="Mis"
                    highlight="Proyectos"
                    subtitle="Una colección de proyectos que demuestran mi experiencia en desarrollo"
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
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .project-card {
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--color-border-hover);
        }
        .project-image {
          height: 160px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .project-title-overlay {
          color: white;
          font-weight: 700;
          font-size: 1rem;
          text-align: center;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .project-badge-wrapper {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 1;
        }
        .project-content { padding: 20px; }
        .project-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 8px;
        }
        .project-description {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .project-tag {
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: var(--color-bg-secondary);
          color: var(--color-text-muted);
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
        }
        .project-links {
          display: flex;
          gap: 12px;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.83rem;
          font-weight: 600;
          text-decoration: none;
          border: 1.5px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }
        .project-link:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .project-link-demo {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .project-link-demo:hover {
          background: var(--gradient-primary);
          color: white;
        }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .page-btn {
          padding: 10px 22px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: 'Inter', sans-serif;
        }
        .page-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .page-info {
          color: var(--color-text-muted);
          font-size: 0.875rem;
        }
      `}</style>
        </section>
    );
};
