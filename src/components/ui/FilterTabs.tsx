import React from 'react';
import type { FilterOption } from '../../types';

interface FilterTabsProps<T extends string> {
    options: FilterOption<T>[];
    active: T;
    onChange: (value: T) => void;
}

/**
 * FilterTabs - Open/Closed: accepts any FilterOption<T> without modification.
 * Single Responsibility: manages tab selection UI.
 */
export function FilterTabs<T extends string>({ options, active, onChange }: FilterTabsProps<T>) {
    return (
        <div className="filter-tabs">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    type="button"
                    className={`filter-tab ${active === opt.id ? 'active' : ''}`}
                    onClick={() => onChange(opt.id)}
                >
                    {opt.label}
                    <span className="filter-count">{opt.count}</span>
                </button>
            ))}
            <style>{`
        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 40px;
        }
        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: 'Inter', sans-serif;
        }
        .filter-tab:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-1px);
        }
        .filter-tab.active {
          background: var(--gradient-primary);
          border-color: transparent;
          color: #fff;
          box-shadow: var(--shadow-button);
        }
        .filter-count {
          background: rgba(255,255,255,0.25);
          border-radius: var(--radius-full);
          padding: 1px 8px;
          font-size: 0.78rem;
          font-weight: 700;
        }
        .filter-tab:not(.active) .filter-count {
          background: var(--color-bg-secondary);
          color: var(--color-text-muted);
        }
      `}</style>
        </div>
    );
}
