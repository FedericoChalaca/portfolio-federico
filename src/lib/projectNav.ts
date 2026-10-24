import { personalAi, projects } from '../data/portfolio';

/*
 * Every project has its own address: #proyecto-<id>.
 * Carousel projects become the active slide; the rest scroll into view and flash once.
 */
export const PROJECT_HASH = '#proyecto-';
const showcaseIds = projects.filter((p) => p.previews).map((p) => p.id);

/** Event the projects section fires to open the index from its own button. */
export const OPEN_INDEX_EVENT = 'abrir-indice';

export function projectIdFromHash(hash: string) {
  return hash.startsWith(PROJECT_HASH) ? decodeURIComponent(hash.slice(PROJECT_HASH.length)) : null;
}

export function scrollToProject(hash: string) {
  const id = projectIdFromHash(hash);
  if (!id) return;
  const inCarousel = showcaseIds.includes(id);
  const el = inCarousel ? document.querySelector<HTMLElement>('#proyectos .showcase') : document.getElementById(`proyecto-${id}`);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (!inCarousel) {
    el.classList.remove('is-target');
    void el.offsetWidth; // restart the flash if it was already running
    el.classList.add('is-target');
    window.setTimeout(() => el.classList.remove('is-target'), 1800);
  }
}

/** Points the address bar at a project; the carousel and the projects section react to hashchange. */
export function goToProject(hash: string) {
  if (window.location.hash !== hash) window.history.pushState(null, '', hash);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

const rawGroups = [
  { title: 'Sitios en vivo', items: projects.filter((p) => p.previews).map((p) => ({ id: p.id, title: p.title, note: p.description })) },
  { title: 'Más proyectos', items: projects.filter((p) => !p.previews).map((p) => ({ id: p.id, title: p.title, note: p.description })) },
  { title: 'Mi IA personal', items: [{ id: 'nimbo', title: personalAi.name, note: personalAi.heading }] },
];
// Numbered once, in reading order, like a table of contents
let counter = 0;
export const groups = rawGroups.map((g) => ({ ...g, items: g.items.map((it) => ({ ...it, n: String(++counter).padStart(2, '0') })) }));
export const projectCount = counter;
