import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop - layout component.
 * Appears after scrolling 300px and smoothly returns to top.
 */
export const ScrollToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <button
                className={`scroll-top-btn ${visible ? 'visible' : ''}`}
                onClick={handleClick}
                aria-label="Volver arriba"
            >
                <ArrowUp size={20} />
                <span>Volver arriba</span>
            </button>
            <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 999;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: var(--radius-full);
          border: none;
          background: var(--gradient-primary);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          box-shadow: var(--shadow-button);
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: opacity var(--transition-base), transform var(--transition-base);
        }
        .scroll-top-btn.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .scroll-top-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-3px);
        }
        @media (max-width: 480px) {
          .scroll-top-btn span { display: none; }
          .scroll-top-btn { padding: 12px; }
        }
      `}</style>
        </>
    );
};
