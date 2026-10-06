import React from 'react';
import { Download, Github } from 'lucide-react';
import { personalAi } from '../data/portfolio';

/**
 * PersonalAi - Nimbo gets its own space instead of a regular project card:
 * it is the one project a visitor can install and use themselves.
 */
export const PersonalAi: React.FC = () => (
  <aside className="ai-spot" aria-labelledby="ai-spot-title">
    <div className="ai-spot-text">
      <p className="ai-spot-name">{personalAi.name}</p>
      <h3 id="ai-spot-title" className="ai-spot-title">{personalAi.heading}</h3>
      <p className="ai-spot-lead">{personalAi.description}</p>

      <ul className="ai-spot-points">
        {personalAi.points.map((point) => (
          <li key={point.title}>
            <strong>{point.title}.</strong> {point.text}
          </li>
        ))}
      </ul>

      <div className="project-tags">
        {personalAi.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      <div className="project-links">
        <a href={personalAi.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link-demo">
          <Github size={15} /> Ver en GitHub
        </a>
        <a href={personalAi.downloadUrl} target="_blank" rel="noopener noreferrer" className="project-link">
          <Download size={16} /> Descargar para Windows
        </a>
      </div>
      <p className="ai-spot-note">{personalAi.requirements}</p>
    </div>

    <div className="ai-spot-visual">
      <img
        src={personalAi.image}
        alt="Nimbo mostrando un chat de Claude Code en vivo y una tarjeta para aprobar un permiso"
        width={968}
        height={1264}
        loading="lazy"
      />
    </div>

    <style>{`
        .ai-spot {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 48px;
          align-items: center;
          max-width: 900px;
          margin: 72px auto 0;
          padding: 40px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .ai-spot-name {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent-text);
          margin-bottom: 10px;
        }
        .ai-spot-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2rem);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--color-text);
          margin-bottom: 16px;
        }
        .ai-spot-lead {
          color: var(--color-text-secondary);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 20px;
        }
        .ai-spot-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .ai-spot-points li {
          padding-left: 14px;
          border-left: 2px solid var(--color-accent);
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 300;
        }
        .ai-spot-points strong { color: var(--color-text); font-weight: 600; }
        .ai-spot .project-tags { margin-bottom: 24px; }
        .ai-spot-note {
          margin-top: 14px;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        /* Nimbo's own interface is dark: frame it so it reads as a screenshot in both themes */
        .ai-spot-visual {
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #10111f;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
        }
        .ai-spot-visual img {
          display: block;
          width: 100%;
          height: auto;
        }
        @media (max-width: 768px) {
          .ai-spot {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 28px 22px;
            margin-top: 56px;
          }
          /* explicit width: with auto margins alone the box collapses until the lazy image loads */
          .ai-spot-visual { width: 100%; max-width: 360px; margin: 0 auto; }
        }
    `}</style>
  </aside>
);
