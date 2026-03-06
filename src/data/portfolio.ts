import type {
    PersonalInfo,
    Project,
    Technology,
    NavItem,
    SocialLink,
    ProjectCategory,
    TechCategory,
    FilterOption,
} from '../types';

// ============================================================
// PERSONAL INFO
// ============================================================
export const personalInfo: PersonalInfo = {
    name: 'Federico Martinez',
    firstName: 'Federico',
    lastName: 'Martinez',
    roles: [
        'Desarrollador Web',
        'Ingeniero de Procesos',
        'Entusiasta de React',
        'Emprendedor Tech',
    ],
    bio: [
        'Soy Federico Martinez, desarrollador apasionado por crear software con impacto real. Me muevo entre el mundo del desarrollo web y la ingeniería de procesos, lo que me da una perspectiva única para resolver problemas complejos.',
        'Mi viaje en la tecnología comenzó con C y JavaScript, y desde entonces he expandido mi stack hacia React y el desarrollo full-stack. Actualmente trabajo en proyectos que combinan tecnología con necesidades reales: desde apps universitarias con IA hasta menús digitales QR para restaurantes.',
        'Creo firmemente en el código limpio, los principios SOLID y en aprender constantemente para llevar la tecnología a nuevos niveles.',
    ],
    location: 'Medellín, Colombia',
    email: 'federicochalaca@gmail.com',
    githubUrl: 'https://github.com/FedericoChalaca',
    linkedinUrl: 'https://linkedin.com/in/federicomartinez',
    values: [
        {
            icon: 'code',
            title: 'Código Limpio',
            description: 'Aplico principios SOLID y patrones de diseño para escribir código mantenible y escalable.',
        },
        {
            icon: 'process',
            title: 'Visión de Procesos',
            description: 'Mi experiencia en ingeniería de procesos me permite optimizar soluciones de punta a punta.',
        },
        {
            icon: 'innovation',
            title: 'Innovación Constante',
            description: 'Siempre buscando nuevas tecnologías y enfoques para crear soluciones con impacto real.',
        },
    ],
    stats: [
        { value: '∞', label: 'Ideas creativas' },
        { value: '24/7', label: 'Disponibilidad' },
        { value: '100%', label: 'Dedicación' },
        { value: '∞', label: 'Aprendizaje' },
    ],
};

// ============================================================
// NAVIGATION
// ============================================================
export const navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'sobre-mi', label: 'Sobre Mí', href: '#sobre-mi' },
    { id: 'proyectos', label: 'Proyectos', href: '#proyectos' },
    { id: 'tecnologias', label: 'Tecnologías', href: '#tecnologias' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
];

// ============================================================
// SOCIAL LINKS
// ============================================================
export const socialLinks: SocialLink[] = [
    {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com/FedericoChalaca',
        icon: 'github',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/federicomartinez',
        icon: 'linkedin',
    },
    {
        id: 'email',
        label: 'Email',
        url: 'mailto:federicochalaca@gmail.com',
        icon: 'mail',
    },
];

// ============================================================
// PROJECTS  (Dependency Inversion: data separated from UI)
// ============================================================
export const projects: Project[] = [
    {
        id: 'pizzeria-arquitectura',
        title: 'Pizzeria - Arquitectura Software',
        description: 'Sistema de gestión de pizzería construido aplicando principios de arquitectura de software y patrones de diseño.',
        longDescription: 'Aplicación que modela el flujo completo de una pizzería implementando patrones como Factory, Observer y Repository. Aplica capas de dominio, aplicación e infraestructura.',
        status: 'Completado',
        category: 'Arquitectura',
        tags: ['Arquitectura', 'Patrones', 'JavaScript', 'SOLID'],
        githubUrl: 'https://github.com/FedericoChalaca/Pizzeria-ArquitecturaSoftware',
        imageColor: 'linear-gradient(135deg, #f97316, #dc2626)',
    },
    {
        id: 'bigotes-pizzeria',
        title: 'BigoteS Pizzeria',
        description: 'Aplicación web completa para una pizzería con catálogo de productos, carrito de compras y gestión de pedidos.',
        longDescription: 'Frontend completo para pizzería BigoteS con interfaz intuitiva, carrito de compras dinámico y panel de administración de pedidos.',
        status: 'Completado',
        category: 'E-commerce',
        tags: ['JavaScript', 'HTML', 'CSS', 'E-commerce'],
        githubUrl: 'https://github.com/FedericoChalaca/BigoteS-pizzeria',
        imageColor: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    },
    {
        id: 'wing-house',
        title: 'Wing House',
        description: 'Sitio web moderno para el restaurante Wing House con menú interactivo y diseño responsive.',
        longDescription: 'Página web para Wing House con menú digital interactivo, galería de productos y sección de contacto. Diseño responsive optimizado para móviles.',
        status: 'En Progreso',
        category: 'Web Apps',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
        githubUrl: 'https://github.com/FedericoChalaca/wing_house',
        imageColor: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    },
    {
        id: 'app-notas-ia',
        title: 'App Análisis de Notas con IA',
        description: 'Aplicación universitaria que utiliza inteligencia artificial para analizar y predecir el rendimiento académico.',
        longDescription: 'App que procesa las notas universitarias y genera insights con IA para ayudar a los estudiantes a entender su rendimiento y áreas de mejora.',
        status: 'En Progreso',
        category: 'Herramientas',
        tags: ['React', 'IA', 'JavaScript', 'API'],
        githubUrl: 'https://github.com/FedericoChalaca',
        imageColor: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
        id: 'menus-qr',
        title: 'Menús Digitales QR',
        description: 'Plataforma de menús digitales con código QR para restaurantes en Medellín, sin necesidad de app.',
        longDescription: 'Solución para restaurantes que permite a los clientes acceder al menú escaneando un QR. Incluye panel de administración para actualizar precios y platos.',
        status: 'En Progreso',
        category: 'Web Apps',
        tags: ['React', 'Node.js', 'QR', 'Restaurantes'],
        githubUrl: 'https://github.com/FedericoChalaca',
        imageColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
        id: 'portfolio',
        title: 'Portfolio Personal',
        description: 'Portafolio web personal construido con React, TypeScript y principios SOLID con animaciones fluidas.',
        longDescription: 'Este mismo portfolio, desarrollado con Vite + React + TypeScript + Framer Motion. Arquitectura limpia, componentes reutilizables y buenas prácticas.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['React', 'TypeScript', 'Framer Motion', 'SOLID'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: '#',
        imageColor: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
];

// ============================================================
// TECHNOLOGIES
// ============================================================
export const technologies: Technology[] = [
    // Frontend
    {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Frontend',
        level: 80,
        description: 'Lenguaje principal para desarrollo web dinámico e interativo',
        color: '#f7df1e',
        icon: 'JS',
        relatedProjects: ['BigoteS Pizzeria', 'Wing House', 'Menús QR'],
    },
    {
        id: 'react',
        name: 'React',
        category: 'Frontend',
        level: 72,
        description: 'Librería para construir interfaces de usuario modernas y reactivas',
        color: '#61dafb',
        icon: 'Re',
        relatedProjects: ['App Notas IA', 'Menús QR', 'Portfolio'],
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Frontend',
        level: 60,
        description: 'Superset tipado de JavaScript para un código más robusto',
        color: '#3178c6',
        icon: 'TS',
        relatedProjects: ['Portfolio Personal'],
    },
    {
        id: 'html-css',
        name: 'HTML / CSS',
        category: 'Frontend',
        level: 88,
        description: 'Fundamentos de estructuración y estilado web, diseño responsive',
        color: '#e34f26',
        icon: 'H5',
        relatedProjects: ['Wing House', 'BigoteS Pizzeria'],
    },
    // Backend
    {
        id: 'c-lang',
        name: 'Lenguaje C',
        category: 'Backend',
        level: 75,
        description: 'Programación a bajo nivel, algoritmos y estructuras de datos',
        color: '#a8b9cc',
        icon: 'C',
        relatedProjects: ['Proyectos universitarios'],
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Backend',
        level: 55,
        description: 'Runtime de JavaScript del lado del servidor para APIs REST',
        color: '#339933',
        icon: 'No',
        relatedProjects: ['Menús QR'],
    },
    // Herramientas
    {
        id: 'git',
        name: 'Git',
        category: 'Herramientas',
        level: 78,
        description: 'Control de versiones y colaboración en proyectos de software',
        color: '#f05032',
        icon: 'Gt',
        relatedProjects: ['Todos los proyectos'],
    },
    {
        id: 'github',
        name: 'GitHub',
        category: 'Herramientas',
        level: 78,
        description: 'Plataforma de alojamiento de repositorios y colaboración open source',
        color: '#181717',
        icon: 'GH',
        relatedProjects: ['Todos los proyectos'],
    },
    {
        id: 'vite',
        name: 'Vite',
        category: 'Herramientas',
        level: 65,
        description: 'Build tool ultrarrápida para proyectos frontend modernos',
        color: '#646cff',
        icon: 'Vi',
        relatedProjects: ['Portfolio Personal'],
    },
];

// ============================================================
// FILTER HELPERS  (Strategy Pattern: filtering logic is pure)
// ============================================================
export function getProjectFilters(): FilterOption<ProjectCategory>[] {
    const categories: ProjectCategory[] = ['Todos', 'E-commerce', 'Web Apps', 'Arquitectura', 'Herramientas'];
    return categories.map((cat) => ({
        id: cat,
        label: cat,
        count: cat === 'Todos' ? projects.length : projects.filter((p) => p.category === cat).length,
    }));
}

export function getTechFilters(): FilterOption<TechCategory>[] {
    const categories: TechCategory[] = ['Todos', 'Frontend', 'Backend', 'Herramientas'];
    return categories.map((cat) => ({
        id: cat,
        label: cat,
        count: cat === 'Todos' ? technologies.length : technologies.filter((t) => t.category === cat).length,
    }));
}

export function filterProjects(category: ProjectCategory): Project[] {
    if (category === 'Todos') return projects;
    return projects.filter((p) => p.category === category);
}

export function filterTechnologies(category: TechCategory): Technology[] {
    if (category === 'Todos') return technologies;
    return technologies.filter((t) => t.category === category);
}
