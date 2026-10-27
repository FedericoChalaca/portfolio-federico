import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Same condition in JS and CSS: a real mouse on a wide screen
const FINE_POINTER = '(hover: hover) and (pointer: fine) and (min-width: 969px)';

export const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [clickEffect, setClickEffect] = useState(false);
    const [visible, setVisible] = useState(false);
    const [activeColor, setActiveColor] = useState('var(--color-primary)');
    const dotRef = useRef<HTMLDivElement>(null);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // The ring trails the dot just a little: fast, no overshoot
    const springConfig = { stiffness: 700, damping: 40, mass: 0.4 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (!window.matchMedia(FINE_POINTER).matches) return;
        // The dot IS the mouse: hide the system arrow (only while this component is alive)
        document.documentElement.classList.add('custom-cursor-on');

        const moveCursor = (e: MouseEvent) => {
            // Written straight to the element, not on the next animation frame, so the dot never lags the mouse
            if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setVisible(true);
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
        const handleLeave = () => setVisible(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mouseout', handleHoverEnd);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleLeave);

        return () => {
            document.documentElement.classList.remove('custom-cursor-on');
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mouseout', handleHoverEnd);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
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
                    opacity: visible ? 1 : 0,
                    borderWidth: isHovering ? '1px' : '2px',
                }}
            />

            {/* Inner Dot: the outer div follows the mouse, the inner one shrinks on click */}
            <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: visible ? 1 : 0 }}>
                <motion.div
                    className="custom-cursor-dot-inner"
                    style={{ backgroundColor: activeColor }}
                    // Never hidden over links: with the system arrow gone, the dot is where the click lands
                    animate={{ scale: clickEffect ? 0.5 : 1 }}
                />
            </div>

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
          left: -4px;
          top: -4px;
          width: 8px;
          height: 8px;
          pointer-events: none;
          z-index: 10000;
          transform: translate3d(-100px, -100px, 0);
          will-change: transform;
        }
        .custom-cursor-dot-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--color-primary);
        }

        html.custom-cursor-on, html.custom-cursor-on * { cursor: none !important; }

        @media not all and ${FINE_POINTER} {
          .custom-cursor-ring, .custom-cursor-dot {
            display: none;
          }
        }
      `}</style>
        </>
    );
};
