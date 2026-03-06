import React from 'react';

interface SectionHeaderProps {
    title: string;
    highlight: string;
    subtitle?: string;
}

/**
 * SectionHeader - Single Responsibility: displays standardized section titles
 * with consistent gradient highlight style throughout the portfolio.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, highlight, subtitle }) => (
    <div className="section-header">
        <h2 className="section-title">
            {title} <span className="gradient-text">{highlight}</span>
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <style>{`
      .section-header { text-align: center; margin-bottom: 56px; }
      .section-title {
        font-size: clamp(2rem, 4vw, 2.8rem);
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.02em;
        margin-bottom: 12px;
      }
      .section-subtitle {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        max-width: 560px;
        margin: 0 auto;
        line-height: 1.7;
      }
    `}</style>
    </div>
);
