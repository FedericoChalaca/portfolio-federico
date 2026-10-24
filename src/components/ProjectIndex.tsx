import React from 'react';
import { navItems } from '../data/portfolio';
import { PROJECT_HASH, groups } from '../lib/projectNav';

interface IndexPanelProps {
  activeSection: string;
  onSection: (href: string) => void;
  onProject: (hash: string) => void;
}

/** The site index: sections first, then every project numbered like a table of contents. */
export const IndexPanel = React.forwardRef<HTMLDivElement, IndexPanelProps>(({ activeSection, onSection, onProject }, ref) => {
  return (
    <div ref={ref} id="indice" className="site-index" role="dialog" aria-label="Índice del portafolio">
      <p className="idx-label">Secciones</p>
      <div className="idx-sections">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`idx-section ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSection(item.href); }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {groups.map((group) => (
        <div key={group.title} className="idx-group">
          <p className="idx-label">{group.title}</p>
          <ol className="idx-list">
            {group.items.map((item) => {
              const hash = `${PROJECT_HASH}${item.id}`;
              return (
                <li key={item.id}>
                  <a href={hash} className="idx-row" onClick={(e) => { e.preventDefault(); onProject(hash); }}>
                    <span className="idx-n">{item.n}</span>
                    <span className="idx-title">{item.title}</span>
                    <span className="idx-dots" aria-hidden="true" />
                    <span className="idx-note">{item.note}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ))}

      <style>{`
        .site-index {
          position: absolute;
          top: calc(100% + 8px);
          right: 24px;
          width: min(560px, calc(100vw - 32px));
          max-height: calc(100dvh - var(--navbar-height) - 24px);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 20px 22px 14px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          animation: idx-in 0.22s var(--ease-out, ease-out);
        }
        @keyframes idx-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .idx-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent-text);
          margin: 0 0 8px;
        }
        .idx-sections { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .idx-section {
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--color-text-secondary);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }
        .idx-section:hover, .idx-section.active { border-color: var(--color-primary); color: var(--color-primary); }
        .idx-group { margin-bottom: 14px; }
        .idx-list { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--color-border); }
        .idx-row {
          display: grid;
          grid-template-columns: 30px auto minmax(16px, 1fr) minmax(0, 46%);
          align-items: baseline;
          gap: 10px;
          padding: 9px 4px;
          border-bottom: 1px solid var(--color-border);
          text-decoration: none;
          color: var(--color-text);
          transition: padding-left var(--transition-base), background var(--transition-fast);
        }
        .idx-row:hover, .idx-row:focus-visible { padding-left: 10px; background: var(--color-bg-hover); }
        .idx-row:hover .idx-title { color: var(--color-primary); }
        .idx-n { font-size: 0.78rem; font-weight: 700; color: var(--color-accent-text); font-variant-numeric: tabular-nums; }
        .idx-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 600; white-space: nowrap; transition: color var(--transition-fast); }
        .idx-dots { border-bottom: 2px dotted var(--color-border-hover); transform: translateY(-4px); }
        .idx-note { font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @media (max-width: 768px) {
          .site-index { right: 16px; left: 16px; width: auto; padding: 18px 16px 10px; }
          .idx-row { grid-template-columns: 28px minmax(0, 1fr); grid-template-areas: 'n title' 'n note'; row-gap: 2px; }
          .idx-n { grid-area: n; }
          .idx-title { grid-area: title; white-space: normal; }
          .idx-dots { display: none; }
          .idx-note { grid-area: note; }
        }
        @media (prefers-reduced-motion: reduce) { .site-index { animation: none; } }
      `}</style>
    </div>
  );
});
IndexPanel.displayName = 'IndexPanel';
