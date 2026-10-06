import type {
    PersonalInfo,
    Project,
    Technology,
    NavItem,
    SocialLink,
    ProjectCategory,
    WorkType,
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
        'Ingeniero de Procesos',
        'Sistemas de gestión a medida',
    ],
    bio: [
        '¡Hola! Soy Federico Martinez. Combino mi formación en ingeniería de procesos con mi pasión por el desarrollo de software para construir sistemas eficientes, escalables y visualmente atractivos.',
        'Mi trayectoria técnica me ha llevado desde las bases de la programación en C hasta el dominio de ecosistemas modernos como React y Node.js. Me especializo en traducir lógicas de negocio complejas en arquitecturas limpias y aplicaciones web intuitivas.',
        'Más allá de escribir código, mi objetivo es crear herramientas que optimicen el día a día. Creo en el diseño centrado en el usuario y en la mejora continua como pilares fundamentales para cualquier producto digital exitoso.',
    ],
    tagline: 'Convierto procesos de negocio en software que funciona: sistemas de gestión, apps web y landings listas para vender.',
    location: 'Medellín, Colombia',
    email: 'federicoml2004@gmail.com',
    phone: '3016935489',
    githubUrl: 'https://github.com/FedericoChalaca',
    linkedinUrl: 'https://www.linkedin.com/in/federico-martinez-10b58931a/',
    values: [
        {
            icon: 'code',
            title: 'Entiendo tu operación',
            description: 'Antes de programar mapeo cómo funciona tu negocio: quién hace qué, dónde se pierde tiempo y qué vale la pena automatizar.',
        },
        {
            icon: 'process',
            title: 'Construyo por entregas',
            description: 'Avances funcionales que puedes probar desde el primer ciclo, para ajustar el rumbo antes de que cueste caro.',
        },
        {
            icon: 'innovation',
            title: 'Entrego algo que crece',
            description: 'Código ordenado con TypeScript y principios SOLID, desplegado en la nube y listo para evolucionar con tu empresa.',
        },
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
        url: 'https://www.linkedin.com/in/federico-martinez-10b58931a/',
        icon: 'linkedin',
    },
    {
        id: 'email',
        label: 'Email',
        url: 'mailto:federicoml2004@gmail.com',
        icon: 'mail',
    },
];

// ============================================================
// PROJECTS  (Dependency Inversion: data separated from UI)
// ============================================================
export const projects: Project[] = [
    {
        id: 'silent',
        title: 'SILENT®',
        description: 'Tienda online de streetwear premium con catálogo por drops y carrito de compras.',
        longDescription: 'E-commerce para SILENT®, marca de streetwear: lanzamientos por drop, fichas de producto, carrito y una identidad visual tipográfica de alto contraste pensada para vender desde el celular.',
        status: 'Completado',
        category: 'E-commerce',
        tags: ['E-commerce', 'Carrito', 'Branding', 'Responsive'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: 'https://silentofficial-co.vercel.app/',
        previews: { desktop: '/previews/silent-desktop.webp', mobile: '/previews/silent-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #2f2a24, #5e564d)',
    },
    {
        id: 'tugu-landing',
        title: 'Tugu',
        description: 'Landing page para Tugu, fintech de datáfonos con lector de huella digital.',
        longDescription: 'Landing para Tugu: producto, seguridad biométrica y flujo de registro en tres pasos, con respaldo de Ruta N y la Universidad Pontificia Bolivariana. Diseño responsive con foco en conversión.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['Landing', 'Fintech', 'Responsive', 'SEO'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: 'https://tugu-landing.vercel.app/',
        previews: { desktop: '/previews/tugu-desktop.webp', mobile: '/previews/tugu-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #567b62, #c48a71)',
    },
    {
        id: 'sara-posso',
        title: 'Sara Posso',
        description: 'Portafolio bilingüe para una diseñadora de vestuario y modelo de Medellín.',
        longDescription: 'Sitio portafolio para Sara Posso: proyectos de diseño, modelaje y metodología, galería de fotos arrastrable e interfaz bilingüe ES/EN con SEO local.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['Portafolio', 'Bilingüe ES/EN', 'Galería interactiva', 'SEO'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: 'https://sara-posso-portafolio.vercel.app/',
        previews: { desktop: '/previews/saraposso-desktop.webp', mobile: '/previews/saraposso-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #c48a71, #2f2a24)',
    },
    {
        id: 'parchate',
        title: 'Párchate',
        description: 'Landing de mi marca de ropa pintada a mano con cloro y pintura, donde cada pieza es 1 de 1.',
        longDescription: 'Landing de Párchate, mi marca de ropa pintada a mano: diseñé la marca, pinté las prendas e hice la página. HTML, CSS y JavaScript sin dependencias, con animaciones ligadas al scroll, galería en diálogo nativo y tema oscuro con un solo acento.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['Marca propia', 'HTML', 'CSS', 'JavaScript'],
        demoUrl: 'https://parchate-omega.vercel.app/',
        previews: { desktop: '/previews/parchate-desktop.webp', mobile: '/previews/parchate-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #4a5240, #1c1f1d)',
    },
    {
        id: 'the-good-trip',
        title: 'The Good Trip',
        description: 'Prototipo de aplicación de transporte tipo ride-hailing con flujos completos de pasajero y conductor.',
        longDescription: 'App de transporte con solicitud de viajes, mapa en vivo, pagos, historial y panel de ganancias para conductores. Interfaz bilingüe (ES/EN) enfocada en la experiencia móvil.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['JavaScript', 'Mapas', 'UX Móvil', 'i18n'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: 'https://www.thegoodtrip.online/',
        previews: { desktop: '/previews/thegoodtrip-desktop.webp', mobile: '/previews/thegoodtrip-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #0e7f9e, #3E5A47)',
    },
    {
        id: 'entre-dos',
        title: 'Entre Dos',
        description: 'App web privada para parejas: recuerdos, diario compartido y mensajes.',
        longDescription: 'Espacio privado para dos personas con recuerdos por fecha, diario compartido, notas de gratitud con racha, canción del día y cápsulas del tiempo. Instalable en el celular como app.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['PWA', 'Autenticación', 'Mobile first', 'Fotos'],
        githubUrl: 'https://github.com/FedericoChalaca',
        demoUrl: 'https://entredos-psi.vercel.app/',
        previews: { desktop: '/previews/entredos-desktop.webp', mobile: '/previews/entredos-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #a16b54, #567b62)',
    },
    {
        id: 'minevera',
        title: 'MiNevera',
        description: 'App híbrida para organizar la despensa del hogar, con alertas de vencimiento.',
        longDescription: 'Inventario de alimentos del hogar con categorías, alertas de productos por vencer y lista de compras. Funciona sin internet.',
        status: 'Completado',
        category: 'Web Apps',
        tags: ['App híbrida', 'Offline', 'Inventario', 'Alertas'],
        githubUrl: 'https://github.com/zteve0/AppHibridaEntrga2',
        demoUrl: 'https://zteve0.github.io/AppHibridaEntrga2/',
        previews: { desktop: '/previews/apphibrida-desktop.webp', mobile: '/previews/apphibrida-mobile.webp' },
        imageColor: 'linear-gradient(135deg, #3E5A47, #8ea395)',
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
        imageColor: 'linear-gradient(135deg, #a16b54, #2f2a24)',
    },
    {
        id: 'wing-house',
        title: 'Wing House',
        description: 'Sitio web para restaurante de alitas con carta digital y promociones.',
        longDescription: 'Sitio para restaurante de alitas con carta digital, secciones de promociones y diseño enfocado en la experiencia móvil del comensal.',
        status: 'Completado',
        category: 'E-commerce',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
        githubUrl: 'https://github.com/FedericoChalaca',
        imageColor: 'linear-gradient(135deg, #c48a71, #dc2626)',
    },
    {
        id: 'portfolio',
        title: 'Portfolio Personal',
        description: 'Portafolio web personal construido con React, TypeScript y principios SOLID con animaciones fluidas.',
        longDescription: 'Este mismo portfolio, desarrollado con Vite + React + TypeScript + Framer Motion. Arquitectura limpia, componentes reutilizables y buenas prácticas.',
        status: 'En Progreso',
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
    {
        id: 'html',
        name: 'HTML, CSS y JavaScript',
        logo: 'html5.svg',
        work: ['Sitios y landings'],
        benefit: 'Sitios livianos que cargan rápido en cualquier celular, hechos a la medida de tu marca.',
        proofs: [
            { project: 'Párchate', built: 'Landing de mi marca de ropa, sin dependencias ni build: animaciones ligadas al scroll en CSS y galería en diálogo nativo.', url: 'https://parchate-omega.vercel.app/' },
            { project: 'The Good Trip', built: 'Prototipo de app de transporte con vistas de cliente y conductor, sin frameworks.', url: 'https://www.thegoodtrip.online/' },
            { project: 'BigoteS Pizzeria', built: 'Web de pizzería con menú, galería, contacto, mapa y modo oscuro.', url: 'https://github.com/FedericoChalaca/BigoteS-pizzeria' },
            { project: 'Wing House', built: 'Sitio de restaurante con carta digital y promociones.' },
        ],
    },
    {
        id: 'three',
        name: 'Three.js y Framer Motion',
        logo: 'threedotjs.svg',
        work: ['Sitios y landings'],
        benefit: 'Animaciones y 3D para que tu marca se recuerde.',
        proofs: [
            { project: 'Portfolio Personal', built: 'La laptop 3D interactiva, el carrusel de proyectos y las animaciones de este mismo sitio.' },
        ],
    },
    {
        id: 'seo',
        name: 'SEO',
        icon: 'search',
        work: ['Sitios y landings'],
        benefit: 'Una estructura que ayuda a Google a entender tu sitio y mostrarlo a quien te busca.',
        proofs: [
            { project: 'Tugu', built: 'Revisión SEO de la landing de una fintech de pagos con huella.', url: 'https://tugu-landing.vercel.app/' },
            { project: 'Sara Posso', built: 'Portafolio bilingüe con SEO local para Medellín.', url: 'https://sara-posso-portafolio.vercel.app/' },
        ],
    },
    {
        id: 'vercel',
        name: 'Vercel',
        logo: 'vercel.svg',
        work: ['Sitios y landings', 'Apps web'],
        benefit: 'Tu sitio en línea con conexión segura, y cada cambio publicado en minutos.',
        proofs: [
            { project: 'Tugu', built: 'Landing de la fintech, en producción.', url: 'https://tugu-landing.vercel.app/' },
            { project: 'SILENT®', built: 'Tienda en línea de la marca.', url: 'https://silentofficial-co.vercel.app/' },
            { project: 'Sara Posso', built: 'Portafolio de una diseñadora de vestuario.', url: 'https://sara-posso-portafolio.vercel.app/' },
            { project: 'Entre Dos', built: 'App web con tareas programadas y almacenamiento de fotos.', url: 'https://entredos-psi.vercel.app/' },
        ],
    },
    {
        id: 'react',
        name: 'React',
        logo: 'react.svg',
        work: ['Apps web', 'Sitios y landings'],
        benefit: 'Interfaces que responden al instante, como una app, sin recargar la página.',
        proofs: [
            { project: 'Vuelta', built: 'App de domicilios de barrio con tres vistas: cliente, domiciliario y administrador.' },
            { project: 'ERP Tienda de Ropa', built: 'Sistema de inventario, ventas, clientes y reportes.', url: 'https://github.com/Emanuel0428/Tienda-Ropa-ERP' },
            { project: 'Portfolio Personal', built: 'Este mismo sitio.' },
        ],
    },
    {
        id: 'next',
        name: 'Next.js',
        logo: 'nextdotjs.svg',
        work: ['Apps web'],
        benefit: 'Apps web completas, con cuentas de usuario y datos propios, en un solo proyecto fácil de mantener.',
        proofs: [
            { project: 'Entre Dos', built: 'App privada para parejas: fotos por fecha, diario compartido y recordatorios. En testeo abierto en Play Store.', url: 'https://entredos-psi.vercel.app/' },
            { project: 'Yggdrasil', built: 'App de progresión para un clan scout, con panel de dirigentes y aprobación de méritos.' },
        ],
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        logo: 'typescript.svg',
        work: ['Apps web', 'Backend y datos'],
        benefit: 'Menos errores en producción: muchos fallos se detectan antes de publicar.',
        proofs: [
            { project: 'Vuelta', built: 'Toda la app de domicilios y sus funciones de servidor.' },
            { project: 'Portfolio Personal', built: 'Los componentes y datos de este sitio.' },
        ],
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        logo: 'tailwindcss.svg',
        work: ['Apps web', 'Sitios y landings'],
        benefit: 'Un diseño consistente en toda la app, hecho a la medida y no con plantillas.',
        proofs: [
            { project: 'Entre Dos', built: 'Toda la interfaz de la app, pensada primero para celular.', url: 'https://entredos-psi.vercel.app/' },
        ],
    },
    {
        id: 'maps',
        name: 'Leaflet y OpenStreetMap',
        logo: 'leaflet.svg',
        work: ['Apps web'],
        benefit: 'Mapas interactivos dentro de tu app, con tecnología de código abierto.',
        proofs: [
            { project: 'The Good Trip', built: 'El mapa de la app de transporte.', url: 'https://www.thegoodtrip.online/' },
            { project: 'Vuelta', built: 'Los mapas de la app de domicilios.' },
        ],
    },
    {
        id: 'tests',
        name: 'Tests automatizados',
        icon: 'shield',
        work: ['Apps web', 'Backend y datos'],
        benefit: 'Cada cambio se prueba solo antes de publicarse, para no dañar lo que ya funciona.',
        proofs: [
            { project: 'Vuelta', built: 'Las reglas de seguridad de la base de datos tienen tests automáticos.' },
            { project: 'Asistente Personal', built: '78 tests: si uno falla, no se publica.' },
        ],
    },
    {
        id: 'push',
        name: 'Notificaciones y correo',
        icon: 'bell',
        work: ['Apps web', 'Apps móviles'],
        benefit: 'Tu app avisa a tus usuarios aunque no la tengan abierta.',
        proofs: [
            { project: 'Entre Dos', built: 'Recordatorios con notificaciones push, correos con Resend y tareas programadas con Vercel Cron.', url: 'https://entredos-psi.vercel.app/' },
            { project: 'Vuelta', built: 'Notificaciones con Firebase Cloud Messaging.' },
        ],
    },
    {
        id: 'pwa',
        name: 'PWA',
        logo: 'pwa.svg',
        work: ['Apps móviles', 'Apps web'],
        benefit: 'Tu app se instala en el celular desde el navegador y se actualiza sin pasar por la tienda.',
        proofs: [
            { project: 'Entre Dos', built: 'La app de Android carga el sitio web: cada despliegue actualiza funciones sin subir una versión nueva.', url: 'https://entredos-psi.vercel.app/' },
            { project: 'Vuelta', built: 'App instalable para clientes, domiciliarios y administración.' },
            { project: 'Asistente Personal', built: 'Asistente con IA publicado como PWA, instalable en iPhone.' },
        ],
    },
    {
        id: 'react-native',
        name: 'React Native y Rive',
        logo: 'rive.svg',
        work: ['Apps móviles'],
        benefit: 'Apps para celular con personajes animados que le dan vida a tu producto.',
        proofs: [
            { project: 'Valkiria', built: 'App con un perro mascota animado en Rive.', note: 'En desarrollo' },
        ],
    },
    {
        id: 'pagos',
        name: 'Mercado Pago y Wompi',
        logo: 'mercadopago.svg',
        work: ['Tiendas y pagos'],
        benefit: 'Tu cliente paga dentro de tu sitio, con medios de pago que ya usa en Colombia.',
        proofs: [
            { project: 'SILENT®', built: 'Tienda con catálogo, carrito y pago con Mercado Pago.', url: 'https://silentofficial-co.vercel.app/' },
            { project: 'Vuelta', built: 'Pagos con Wompi integrados, hoy en modo de prueba.' },
        ],
    },
    {
        id: 'firebase',
        name: 'Firebase',
        logo: 'firebase.svg',
        work: ['Backend y datos', 'Apps web'],
        benefit: 'Base de datos, sesiones y notificaciones sin montar ni mantener servidores.',
        proofs: [
            { project: 'Vuelta', built: 'Base de datos Firestore, sesiones y notificaciones, con reglas de seguridad probadas.' },
        ],
    },
    {
        id: 'supabase',
        name: 'Supabase',
        logo: 'supabase.svg',
        work: ['Backend y datos'],
        benefit: 'Cada usuario ve solo lo que le corresponde: los permisos se controlan desde la base de datos.',
        proofs: [
            { project: 'Yggdrasil', built: 'Autenticación y políticas de acceso por fila (RLS).' },
        ],
    },
    {
        id: 'postgres',
        name: 'PostgreSQL',
        logo: 'postgresql.svg',
        work: ['Backend y datos'],
        benefit: 'Una base de datos sólida para que la información de tu negocio esté ordenada y segura.',
        proofs: [
            { project: 'Entre Dos', built: 'Los datos de la app en Neon Postgres, con inicio de sesión por correo y Google.', url: 'https://entredos-psi.vercel.app/' },
        ],
    },
    {
        id: 'node',
        name: 'Node.js',
        logo: 'nodedotjs.svg',
        work: ['Backend y datos'],
        benefit: 'Un backend para que tu app guarde datos y se conecte con otros servicios.',
        proofs: [
            { project: 'ERP Tienda de Ropa', built: 'El servidor del sistema de inventario y ventas.', url: 'https://github.com/Emanuel0428/Tienda-Ropa-ERP' },
        ],
    },
    {
        id: 'dotnet',
        name: '.NET',
        logo: 'dotnet.svg',
        work: ['Backend y datos'],
        benefit: 'Sistemas empresariales ordenados, fáciles de mantener y de ampliar con el tiempo.',
        proofs: [
            { project: 'Pizzeria - Arquitectura Software', built: 'Refactorización completa a SOLID y DDD, con 7 patrones de diseño.', url: 'https://github.com/FedericoChalaca/Pizzeria-ArquitecturaSoftware', note: 'Proyecto universitario' },
        ],
    },
    {
        id: 'fastapi',
        name: 'Python y FastAPI',
        logo: 'fastapi.svg',
        work: ['Backend y datos'],
        benefit: 'Servicios que siguen respondiendo aunque una de sus máquinas falle.',
        proofs: [
            { project: 'Sistema de archivos distribuido', built: 'Un nodo coordinador y 3 nodos de datos, con replicación y tolerancia a fallos.', note: 'Proyecto universitario' },
        ],
    },
    {
        id: 'spring',
        name: 'Spring Boot y MongoDB',
        logo: 'springboot.svg',
        work: ['Backend y datos'],
        benefit: 'APIs para conectar tu sistema con otras aplicaciones.',
        proofs: [
            { project: 'API de aves colombianas', built: 'API REST con 14 endpoints, probada en Postman.', note: 'Proyecto universitario' },
        ],
    },
    {
        id: 'mysql',
        name: 'MySQL',
        logo: 'mysql.svg',
        work: ['Backend y datos'],
        benefit: 'Consultas y reportes sobre tus datos, optimizados para responder rápido.',
        proofs: [
            { project: 'Rankings de Spotify', built: 'Funciones de ventana y optimización de consultas con EXPLAIN, en MySQL sobre Docker.', note: 'Proyecto universitario' },
        ],
    },
];

// Real numbers only: derived from the data above
export const stats = [
    { value: projects.length, label: 'Proyectos' },
    { value: projects.filter((p) => p.demoUrl && p.demoUrl !== '#').length, label: 'Sitios en producción' },
    { value: technologies.filter((t) => t.logo).length, label: 'Tecnologías' },
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
    })).filter((f) => f.count > 0);
}

export function getTechFilters(): FilterOption<WorkType>[] {
    const kinds: WorkType[] = ['Todos', 'Sitios y landings', 'Apps web', 'Apps móviles', 'Tiendas y pagos', 'Backend y datos'];
    return kinds.map((kind) => ({
        id: kind,
        label: kind,
        count: filterTechnologies(kind).length,
    }));
}

export function filterProjects(category: ProjectCategory): Project[] {
    if (category === 'Todos') return projects;
    return projects.filter((p) => p.category === category);
}

export function filterTechnologies(kind: WorkType): Technology[] {
    if (kind === 'Todos') return technologies;
    return technologies.filter((t) => t.work.some((w) => w === kind));
}
