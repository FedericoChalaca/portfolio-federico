import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
    value: number; // 0–100
    color?: string;
    label?: string;
    animate?: boolean;
}

/**
 * ProgressBar - Single Responsibility: renders an animated progress bar.
 * Uses IntersectionObserver to trigger animation only when visible.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    color = '#7c3aed',
    label,
    animate = true,
}) => {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (!animate) {
            timeout = setTimeout(() => setWidth(value), 0);
            return () => clearTimeout(timeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timeout = setTimeout(() => setWidth(value), 150);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, [value, animate]);

    return (
        <div ref={ref} style={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color,
                }}
            >
                {label && <span>{label}</span>}
                <span>{value}%</span>
            </div>
            <div
                style={{
                    height: 6,
                    borderRadius: 999,
                    background: 'var(--color-bg-secondary)',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${width}%`,
                        borderRadius: 999,
                        background: color,
                        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
            </div>
        </div>
    );
};
