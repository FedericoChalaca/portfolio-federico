// ============================================================
// TYPES - Single source of truth for all data shapes
// ============================================================

export type ProjectStatus = 'Completado' | 'En Progreso';

export type ProjectCategory = 'Todos' | 'E-commerce' | 'Web Apps' | 'Arquitectura' | 'Herramientas';

// Kinds of work a client can hire; 'Todos' is the unfiltered view
export type WorkType = 'Todos' | 'Sitios y landings' | 'Apps web' | 'Apps móviles' | 'Tiendas y pagos' | 'Backend y datos';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    status: ProjectStatus;
    category: ProjectCategory;
    tags: string[];
    githubUrl: string;
    demoUrl?: string;
    previews?: { desktop: string; mobile: string }; // WebP captures in /public/previews (960x600 and 390x844)
    imageColor: string; // gradient color for the card image placeholder
}

export interface TechProof {
    project: string;
    built: string; // what was built with this technology in that project
    url?: string;
    note?: string; // e.g. 'En desarrollo', 'Proyecto universitario'
}

export interface Technology {
    id: string;
    name: string;
    logo?: string; // file name in /public/logos; capabilities (SEO, tests...) use `icon` instead
    icon?: 'search' | 'shield' | 'bell';
    work: Exclude<WorkType, 'Todos'>[]; // the first one is the group it is listed under
    benefit: string; // what the client gets out of it
    proofs: TechProof[];
}

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export interface SocialLink {
    id: string;
    label: string;
    url: string;
    icon: 'github' | 'linkedin' | 'mail';
}

export interface PersonalInfo {
    name: string;
    firstName: string;
    lastName: string;
    roles: string[];
    bio: string[];
    tagline: string;
    location: string;
    email: string;
    phone?: string;
    githubUrl: string;
    linkedinUrl?: string;
    values: { icon: string; title: string; description: string }[];
}

export interface FilterOption<T extends string> {
    id: T;
    label: string;
    count: number;
}
