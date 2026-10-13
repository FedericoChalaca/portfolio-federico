import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { ShowcaseCarousel } from '../components/ShowcaseCarousel';
import { PersonalAi } from '../components/PersonalAi';
import { projects } from '../data/portfolio';

// Live sites with captures go in the carousel; the rest get a compact list
const showcaseProjects = projects.filter((p) => p.previews);
const moreProjects = projects.filter((p) => !p.previews);

/**
 * Projects - the carousel of live sites, a compact list for everything else, and Nimbo's own space.
 */
export const Projects: React.FC = () => (
  <section id="proyectos" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
    <div className="container">
      <SectionHeader
        title="Trabajo"
        highlight="Real"
        subtitle="Sitios en producción que puedes abrir ahora mismo, y el resto de mis proyectos."
      />

      <ShowcaseCarousel projects={showcaseProjects} />

      <div className="more-projects">
        <h3 className="more-title">Más proyectos</h3>
        <p className="more-subtitle">Código abierto, proyectos académicos y trabajos sin sitio público.</p>

        <div className="more-grid">
          {moreProjects.map((project) => (
            <article key={project.id} className="more-item">
              <div className="more-head">
                <h4 className="more-name">{project.title}</h4>
                {project.status === 'En Progreso' && <Badge status={project.status} />}
              </div>
              <p className="more-desc">{project.longDescription}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink size={15} /> Ver sitio
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} /> Ver código
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <PersonalAi />
    </div>

    <style>{`
        /* The fanned showcase cards reach past the viewport edge */
        #proyectos { overflow-x: clip; }

        .more-projects {
          max-width: 900px;
          margin: 0 auto;
        }
        .more-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        .more-subtitle {
          color: var(--color-text-secondary);
          font-weight: 300;
          margin-bottom: 28px;
        }
        .more-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }
        .more-item {
          display: flex;
          flex-direction: column;
          padding: 28px;
          border-radius: var(--radius-md);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        /* The first one is the strongest piece of code: give it the full row */
        .more-item:first-child { grid-column: 1 / -1; }
        .more-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .more-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .more-desc {
          color: var(--color-text-secondary);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .more-item .project-tags { margin-bottom: 20px; }

        /* Shared by the carousel, this list and Nimbo's space */
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
          gap: 12px;
          flex-wrap: wrap;
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          color: #fff;
          background: var(--gradient-primary);
          box-shadow: var(--shadow-button);
          transition: transform var(--transition-base), filter var(--transition-base);
        }
        .project-link-demo:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }

        @media (max-width: 768px) {
          .more-grid { grid-template-columns: 1fr; }
          .more-item { padding: 22px; }
        }
    `}</style>
  </section>
);
