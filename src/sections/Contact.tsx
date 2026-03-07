import { useRef, useState } from 'react';
import { Github, Linkedin, Mail, Code2, Phone, Check, Copy } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
};

/**
 * Contact - Footer section with social links, bio card, and footer stats.
 */
export const Contact: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <div className="contact-grid" ref={ref}>
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar */}
            <div className="contact-avatar">
              <Code2 size={28} />
            </div>

            <h2 className="contact-name">
              <span>{personalInfo.firstName} </span>
              <span>{personalInfo.lastName}</span>
            </h2>
            <p className="contact-role">Desarrollador Web & Ingeniero de Procesos</p>
            <p className="contact-tagline">
              Creando experiencias web excepcionales con pasión y dedicación
            </p>
          </motion.div>

          {/* Social Links Right side */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-right-title">Encuéntrame en</h3>
            <div className="contact-socials-grid">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                if (link.id === 'email') {
                  return (
                    <motion.button
                      key={link.id}
                      onClick={handleCopyEmail}
                      className="social-link-large"
                      aria-label="Copiar Email"
                      whileHover={{ scale: 1.03, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
                    >
                      <div className="social-link-icon">
                        {copied ? <Check size={24} color="var(--color-primary)" /> : <Mail size={24} />}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>{copied ? '¡Email Copiado!' : link.label}</span>
                        {!copied && <span className="copy-hint" style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: 400 }}>Clic para copiar</span>}
                      </div>
                    </motion.button>
                  );
                }
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-large"
                    aria-label={link.label}
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="social-link-icon">
                      <Icon size={24} />
                    </div>
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}

              {personalInfo.phone && (
                <motion.a
                  href={`https://wa.me/57${personalInfo.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-large"
                  aria-label="WhatsApp"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <div className="social-link-icon">
                    <Phone size={24} />
                  </div>
                  <span>{personalInfo.phone}</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="contact-made-wrapper"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="contact-made-with">
            Hecho con ☕ &nbsp;·&nbsp; Desarrollado con{' '}
            <span style={{ fontWeight: 600 }}>React</span> &{' '}
            <span style={{ fontWeight: 600 }}>TypeScript</span>
          </p>
        </motion.div>

        {/* Copyright bar */}
        <div className="contact-footer-bar">
          <span>© 2026 Federico Martinez. Todos los derechos reservados.</span>
        </div>

        {/* Stats */}
        <div className="footer-stats">
          {personalInfo.stats.map((stat) => (
            <div key={stat.label} className="footer-stat">
              <span className="footer-stat-value">{stat.value}</span>
              <span className="footer-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--color-bg);
          position: relative;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, var(--color-bg-secondary));
          pointer-events: none;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 64px;
          margin: 0 auto 40px;
          box-shadow: var(--shadow-sm);
          position: relative;
          z-index: 1;
        }
        .contact-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .contact-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid var(--color-border);
          padding-left: 64px;
        }
        .contact-right-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .contact-socials-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .social-link-large {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          border-radius: var(--radius-md);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          text-decoration: none;
          font-family: inherit;
          font-weight: 500;
          font-size: 1.05rem;
          transition: all var(--transition-base);
        }
        .social-link-large:hover {
          border-color: var(--color-primary);
          background: var(--color-bg-hover);
          color: var(--color-primary);
        }
        .social-link-icon {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-avatar {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          background: rgba(62, 90, 71, 0.08); /* Soft forest green bg */
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }
        .contact-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .contact-role {
          font-family: 'Inter', sans-serif;
          color: var(--color-accent); /* Terracotta */
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .contact-tagline {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
          font-weight: 300;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .contact-made-with {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          font-weight: 300;
        }
        .contact-made-with span {
           color: var(--color-text);
        }
        .contact-made-wrapper {
          display: flex;
          justify-content: center;
        }
        .contact-footer-bar {
          display: flex;
          justify-content: center;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          padding: 24px 0;
          border-top: 1px dashed var(--color-border);
          border-bottom: 1px dashed var(--color-border);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }
        .footer-stats {
          display: flex;
          justify-content: center;
          gap: 56px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .footer-stat {
          text-align: center;
        }
        .footer-stat-value {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .footer-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @media (max-width: 968px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 48px 32px;
          }
          .contact-right {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--color-border);
            padding-top: 48px;
          }
        }
        @media (max-width: 480px) {
          .contact-grid { padding: 40px 24px; }
          .footer-stats { gap: 32px; }
          .footer-stat-value { font-size: 1.8rem; }
        }
      `}</style>
    </section >
  );
};
