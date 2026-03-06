// ============================================================
// TYPES - Single source of truth for all data shapes
// ============================================================

export type ProjectStatus = 'Completado' | 'En Progreso';

export type ProjectCategory = 'Todos' | 'E-commerce' | 'Web Apps' | 'Arquitectura' | 'Herramientas';

export type TechCategory = 'Todos' | 'Frontend' | 'Backend' | 'Herramientas';

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
    imageColor: string; // gradient color for the card image placeholder
}

export interface Technology {
    id: string;
    name: string;
    category: TechCategory;
    level: number; // 0-100
    description: string;
    color: string;
    icon: string; // emoji or abbreviation for display
    relatedProjects: string[];
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
    location: string;
    email: string;
    githubUrl: string;
    linkedinUrl?: string;
    values: { icon: string; title: string; description: string }[];
    stats: { value: string; label: string }[];
}

export interface FilterOption<T extends string> {
    id: T;
    label: string;
    count: number;
}
