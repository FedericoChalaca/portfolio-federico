import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
};

/**
 * Contact - Footer section with social links, bio card, and footer stats.
 */
export const Contact: React.FC = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="contacto" className="section contact-section">
            <div className="container">
                <div className="contact-card" ref={ref}>
                    <motion.div
                        className="contact-inner"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Avatar */}
                        <div className="contact-avatar">
                            <Code2 size={28} />
                        </div>

                        <h2 className="contact-name">
                            <span>{personalInfo.firstName} </span>
                            <span className="gradient-text">{personalInfo.lastName}</span>
                        </h2>
                        <p className="contact-role">Desarrollador Web & Ingeniero de Procesos</p>
                        <p className="contact-tagline">
                            Creando experiencias web excepcionales con pasión y dedicación
                        </p>

                        {/* Social Links */}
                        <div className="contact-socials">
                            {socialLinks.map((link) => {
                                const Icon = iconMap[link.icon];
                                return (
                                    <motion.a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        aria-label={link.label}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <Icon size={22} />
                                    </motion.a>
                                );
                            })}
                        </div>

                        <p className="contact-made-with">
                            Hecho con ❤️ y mucho ☕ &nbsp;·&nbsp; Desarrollado con{' '}
                            <span className="gradient-text" style={{ fontWeight: 700 }}>React</span> &{' '}
                            <span className="gradient-text" style={{ fontWeight: 700 }}>TypeScript</span>
                        </p>
                    </motion.div>
                </div>

                {/* Copyright bar */}
                <div className="contact-footer-bar">
                    <span>© 2026 Federico Martinez. Todos los derechos reservados.</span>
                </div>

                {/* Stats */}
                <div className="footer-stats">
                    {personalInfo.stats.map((stat) => (
                        <div key={stat.label} className="footer-stat">
                            <span className="footer-stat-value gradient-text">{stat.value}</span>
                            <span className="footer-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .contact-section {
          background: var(--color-bg-secondary);
        }
        .contact-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 60px 40px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto 40px;
          box-shadow: var(--shadow-md);
        }
        .contact-avatar {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-lg);
          background: var(--gradient-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: var(--shadow-button);
        }
        .contact-name {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 6px;
          color: var(--color-text);
        }
        .contact-role {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          margin-bottom: 12px;
        }
        .contact-tagline {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .contact-socials {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .social-link {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .social-link:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: rgba(124,58,237,0.08);
        }
        .contact-made-with {
          color: var(--color-text-muted);
          font-size: 0.875rem;
        }
        .contact-footer-bar {
          display: flex;
          justify-content: center;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          padding: 20px 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 40px;
        }
        .footer-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .footer-stat {
          text-align: center;
        }
        .footer-stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .footer-stat-label {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        @media (max-width: 480px) {
          .contact-card { padding: 40px 24px; }
          .footer-stats { gap: 28px; }
          .footer-stat-value { font-size: 1.5rem; }
        }
      `}</style>
        </section>
    );
};
