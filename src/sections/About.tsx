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
          title="Sobre"
          highlight="Mí"
          subtitle="Conoce mi trayectoria y pasión por el desarrollo"
        />

        <div ref={ref} className="about-grid">
          {/* Left column: Bio */}
          <motion.div
            className="about-bio"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
          >
            <div className="about-bio-header">
              <Code2 size={22} className="about-icon" />
              <h3>Mi Historia</h3>
            </div>
            {personalInfo.bio.map((paragraph, i) => (
              <p key={i} className="about-bio-text">{paragraph}</p>
            ))}

            <div className="about-tags">
              {['JavaScript', 'React', 'TypeScript', 'C', 'Node.js'].map((tag) => (
                <span key={tag} className="about-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Right column: Values */}
          <div className="about-values">
            <div className="about-bio-header">
              <Cpu size={22} className="about-icon" />
              <h3>Mis Valores</h3>
            </div>
            {personalInfo.values.map((val, i) => (
              <motion.div
                key={val.title}
                className="value-card"
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

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .about-bio-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .about-bio-header h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .about-icon { color: var(--color-primary); }
        .about-bio-text {
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 16px;
          font-size: 0.97rem;
        }
        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }
        .about-tag {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          background: rgba(124,58,237,0.08);
          color: var(--color-primary);
          font-size: 0.82rem;
          font-weight: 600;
          border: 1px solid rgba(124,58,237,0.15);
        }
        .about-values { display: flex; flex-direction: column; gap: 0; }
        .value-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          margin-bottom: 16px;
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
        }
        .value-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .value-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(124,58,237,0.1);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .value-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 4px;
        }
        .value-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
};
