import { useState, useEffect } from 'react';

/**
 * Hook that tracks which nav section is currently in the viewport.
 * Observer Pattern: subscribes to intersection events.
 */
export function useScrollSpy(sectionIds: string[]) {
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
                // A thin band 20% down the viewport: the section crossing it is the active one.
                // (A visibility threshold never fires for sections taller than the screen.)
                { threshold: 0, rootMargin: '-20% 0px -79% 0px' }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);

    return activeSection;
}
