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
        'Desarrollador Full-Stack',
        'Arquitecto de Soluciones',
        'Ingeniero de Procesos',
        'Creador de Experiencias Digitales',
    ],
    bio: [
        '¡Hola! Soy Federico Martinez. Combino mi formación en ingeniería de procesos con mi pasión por el desarrollo de software para construir sistemas eficientes, escalables y visualmente atractivos.',
        'Mi trayectoria técnica me ha llevado desde las bases de la programación en C hasta el dominio de ecosistemas modernos como React y Node.js. Me especializo en traducir lógicas de negocio complejas en arquitecturas limpias y aplicaciones web intuitivas.',
        'Más allá de escribir código, mi objetivo es crear herramientas que optimicen el día a día. Creo en el diseño centrado en el usuario y en la mejora continua como pilares fundamentales para cualquier producto digital exitoso.',
    ],
    location: 'Medellín, Colombia',
    email: 'federicochalaca@gmail.com',
    githubUrl: 'https://github.com/FedericoChalaca',
    linkedinUrl: 'https://linkedin.com/in/federicomartinez',
    values: [
        {
            icon: 'code',
            title: 'Artesanía del Código',
            description: 'Estructuro mis aplicaciones basándome en los principios SOLID, buscando siempre un equilibrio entre elegancia y rendimiento.',
        },
        {
            icon: 'process',
            title: 'Ingeniería Operativa',
            description: 'No solo programo; analizo el panorama completo. Identifico cuellos de botella y diseño integraciones fluidas aportando mi visión como ingeniero.',
        },
        {
            icon: 'innovation',
            title: 'Evolución Digital',
            description: 'El ecosistema tech nunca se detiene, y yo tampoco. Exploro continuamente nuevas herramientas para aportar el máximo valor a cada proyecto.',
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
        id: 'tienda-ropa-erp',
        title: 'ERP Tienda de Ropa',
        description: 'Sistema integral de planificación de recursos empresariales diseñado específicamente para la gestión de tiendas de ropa.',
        longDescription: 'Aplicación ERP que permite administrar inventario, ventas, clientes y reportes financieros para una tienda de ropa de manera eficiente. Interfaz intuitiva enfocada en la productividad.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['React', 'Node.js', 'ERP', 'Gestión'],
        githubUrl: 'https://github.com/Emanuel0428/Tienda-Ropa-ERP',
        imageColor: 'linear-gradient(135deg, #3E5A47, #567b62)', /* Earthy green gradient matching the theme */
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
        imageColor: 'linear-gradient(135deg, #c48a71, #a16b54)', /* Terracotta gradient */
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
