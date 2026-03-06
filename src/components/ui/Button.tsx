import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    variant?: 'primary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

/**
 * Button - Single Responsibility: renders a styled interactive element.
 * Open/Closed: new variants can be added via CSS module without changing logic.
 */
export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    children,
    className = '',
    target,
    rel,
}) => {
    const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={cls} target={target} rel={rel}>
                {children}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={cls}>
            {children}
        </button>
    );
};
