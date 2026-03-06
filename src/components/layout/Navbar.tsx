import React from 'react';
import { Code2, Sun, Moon, Menu, X } from 'lucide-react';
import { navItems } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import type { NavItem } from '../../types';

interface NavbarProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const sectionIds = navItems.map((n) => n.id);

/**
 * Navbar - layout component with glassmorphism effect.
 * Highlights the active section using the ScrollSpy Observer Pattern.
 */
export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
    const activeSection = useScrollSpy(sectionIds);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-inner container">
                    {/* Brand */}
                    <a href="#inicio" className="nav-brand" onClick={() => handleNavClick('#inicio')}>
                        <span className="nav-logo-icon">
                            <Code2 size={18} />
                        </span>
                        <span className="nav-brand-name">Federico</span>
                    </a>

                    {/* Desktop Links */}
                    <ul className="nav-links">
                        {navItems.map((item: NavItem) => (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right controls */}
                    <div className="nav-controls">
                        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button
                            className="menu-toggle"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    {navItems.map((item: NavItem) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--navbar-height);
          background: var(--color-bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-bg-glass-border);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transition: background var(--transition-slow), border-color var(--transition-slow);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 24px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 800;
          font-size: 1.1rem;
        }
        .nav-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .nav-brand-name {
          background: var(--gradient-hero-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 4px;
        }
        .nav-link {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }
        .nav-link:hover { color: var(--color-primary); }
        .nav-link.active {
          background: rgba(124, 58, 237, 0.1);
          color: var(--color-primary);
          font-weight: 600;
        }
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .theme-toggle {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-base);
        }
        .theme-toggle:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: rotate(15deg);
        }
        .menu-toggle {
          display: none;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-base);
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: var(--color-bg-glass);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--color-border);
          padding: 12px 24px 20px;
          gap: 4px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(124, 58, 237, 0.1);
          color: var(--color-primary);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .menu-toggle { display: flex; }
          .navbar { height: auto; min-height: var(--navbar-height); }
          .nav-inner { height: var(--navbar-height); }
        }
      `}</style>
        </>
    );
};
