import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [clickEffect, setClickEffect] = useState(false);
    const [activeColor, setActiveColor] = useState('var(--color-primary)');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], .project-card, .tech-tag');

            if (isInteractive) {
                setIsHovering(true);
                // Change color based on specific elements if needed
                if (target.closest('.tech-tag')) {
                    setActiveColor('var(--color-accent)');
                } else {
                    setActiveColor('var(--color-primary)');
                }
            }
        };

        const handleHoverEnd = () => {
            setIsHovering(false);
            setActiveColor('var(--color-primary)');
        };

        const handleMouseDown = () => setClickEffect(true);
        const handleMouseUp = () => setClickEffect(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mouseout', handleHoverEnd);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mouseout', handleHoverEnd);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Outer Ring */}
            <motion.div
                className="custom-cursor-ring"
                style={{
                    translateX: smoothX,
                    translateY: smoothY,
                    left: -20,
                    top: -20,
                    borderColor: activeColor,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: 1,
                    borderWidth: isHovering ? '1px' : '2px',
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="custom-cursor-dot"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    left: -4,
                    top: -4,
                    backgroundColor: activeColor,
                }}
                animate={{
                    scale: clickEffect ? 0.5 : (isHovering ? 0 : 1),
                }}
            />

            <style>{`
        .custom-cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
          pointer-events: none;
          z-index: 9999;
          transition: border-color 0.3s ease, border-width 0.3s ease;
          mix-blend-mode: difference;
        }

        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
        }

        @media (max-width: 968px) {
          .custom-cursor-ring, .custom-cursor-dot {
            display: none;
          }
        }
      `}</style>
        </>
    );
};
