import { useState, useEffect, useRef } from 'react';

/**
 * Hook for cycling typing effect between multiple role strings.
 * Single Responsibility: only handles typing animation state.
 */
export function useTypingEffect(texts: string[], speed = 80, pause = 2000) {
    const [displayed, setDisplayed] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const current = texts[textIndex];

        if (!isDeleting && displayed === current) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && displayed === '') {
            setIsDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
        } else {
            const delta = isDeleting ? speed / 2 : speed;
            timeoutRef.current = setTimeout(() => {
                setDisplayed(
                    isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)
                );
            }, delta);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [displayed, isDeleting, textIndex, texts, speed, pause]);

    return displayed;
}
