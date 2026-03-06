import React from 'react';
import type { ProjectStatus } from '../../types';

interface BadgeProps {
    status: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
    Completado: { label: 'Completado', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
    'En Progreso': { label: 'En Progreso', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
};

/**
 * Badge - Single Responsibility: displays project status.
 * Closed for modification: new statuses only need statusConfig entries.
 */
export const Badge: React.FC<BadgeProps> = ({ status }) => {
    const config = statusConfig[status];
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: config.color,
                backgroundColor: config.bg,
                border: `1px solid ${config.color}30`,
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: config.color,
                    display: 'inline-block',
                }}
            />
            {config.label}
        </span>
    );
};
