import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { personalInfo } from '../data/portfolio';
import { Code2, Cpu, Lightbulb } from 'lucide-react';


const valueIcons: Record<string, React.ReactNode> = {
  code: <Code2 size={22} />,
  process: <Cpu size={22} />,
  innovation: <Lightbulb size={22} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};


/**
 * About - Two-column layout: personal biography + core values cards.
 */
export const About: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sobre-mi" className="section">
      <div className="container">
        <SectionHeader
          title="Mi"
          highlight="Viaje"
          subtitle="Una historia sobre diseño, código y aprendizajes"
        />

        <div ref={ref} className="about-wrapper">
          {/* Top part: Bio Full Width Narrative */}
          <motion.div
            className="about-bio-narrative"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
          >
            <div className="about-bio-header">
              <Code2 size={22} className="about-icon" />
              <h3>Mi Historia</h3>
            </div>

            <div className="about-bio-content">
              {personalInfo.bio.map((paragraph, i) => (
                <p key={i} className="about-bio-text">{paragraph}</p>
              ))}
            </div>

            <div className="about-tags">
              {['JavaScript', 'React', 'TypeScript', 'Node.js', 'Ingeniería'].map((tag) => (
                <span key={tag} className="about-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Bottom part: Valores Escalonados */}
          <div className="about-values">
            <div className="about-bio-header">
              <Cpu size={22} className="about-icon" />
              <h3>Mis Valores</h3>
            </div>

            <div className="values-staggered-grid">
              {personalInfo.values.map((val, i) => (
                <motion.div
                  key={val.title}
                  className={`value-card staggered-${i}`}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <div className="value-icon">{valueIcons[val.icon]}</div>
                  <div>
                    <h4 className="value-title">{val.title}</h4>
                    <p className="value-desc">{val.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-wrapper {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        .about-bio-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .about-bio-header h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .about-icon { color: var(--color-primary); }
        .about-bio-content {
          column-count: 2;
          column-gap: 40px;
        }
        .about-bio-text {
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 20px;
          font-size: 1.05rem;
          font-weight: 300;
          break-inside: avoid;
        }
        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 32px;
        }
        .about-tag {
          padding: 6px 16px;
          border-radius: var(--radius-sm);
          background: rgba(196, 138, 113, 0.1);
          color: var(--color-accent);
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(196, 138, 113, 0.2);
          transition: all var(--transition-fast);
        }
        .about-tag:hover {
          background: rgba(196, 138, 113, 0.15);
          transform: translateY(-1px);
        }
        .values-staggered-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          align-items: start;
        }
        .value-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 32px 24px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          margin-bottom: 20px;
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
        }
        .staggered-1 {
          margin-top: 40px;
        }
        .staggered-2 {
          margin-top: 80px;
        }
        .value-card:hover {
          border-color: var(--color-primary-light);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .value-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background: rgba(62, 90, 71, 0.08); /* Soft green bg */
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background var(--transition-base);
        }
        .value-card:hover .value-icon {
           background: rgba(62, 90, 71, 0.12);
        }
        .value-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 6px;
        }
        .value-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-weight: 300;
        }
        @media (max-width: 968px) {
          .about-bio-content {
            column-count: 1; 
          }
          .values-staggered-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .staggered-1, .staggered-2 {
            margin-top: 0; 
          }
        }
      `}</style>
    </section>
  );
};
