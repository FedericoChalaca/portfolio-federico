import { useState, useEffect } from 'react';

/**
 * Hook that tracks which nav section is currently in the viewport.
 * Observer Pattern: subscribes to intersection events.
 */
export function useScrollSpy(sectionIds: string[], offset = 100) {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.3, rootMargin: `-${offset}px 0px -40% 0px` }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds, offset]);

    return activeSection;
}
