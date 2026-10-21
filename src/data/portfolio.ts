import type {
    PersonalInfo,
    Project,
    Technology,
    NavItem,
    SocialLink,
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
        'Desarrollador Front-End',
        'Desarrollador Full-Stack',
        'Ingeniero de Procesos',
    ],
    bio: [
        '¡Hola! Soy Federico Martinez, desarrollador front-end e ingeniero de procesos en Medellín. Diseño y construyo sitios y aplicaciones web con React y TypeScript: rápidas, accesibles y pensadas primero para el celular.',
        'He hecho landings y portafolios para marcas y creativos, apps web y herramientas que la gente usa en eventos reales, como un bingo que se juega desde el celular. Cuido los detalles que se notan: animaciones con sentido, modo oscuro, buen rendimiento y textos claros.',
        'Mi formación en ingeniería de procesos me ayuda a entender cómo funciona un negocio antes de programar. Cuando el proyecto lo pide, también hago el backend con Node.js, .NET o Supabase para que todo funcione de punta a punta.',
    ],
    tagline: 'Diseño y desarrollo sitios y apps web que se ven bien y funcionan: landings, portafolios, apps y sistemas de gestión.',
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
        tags: ['E-commerce', 'Carrito', 'Branding', 'Responsive'],
        demoUrl: 'https://silentofficial-co.vercel.app/',
        previews: { desktop: '/previews/silent-desktop.webp', mobile: '/previews/silent-mobile.webp' },
    },
    {
        id: 'tugu-landing',
        title: 'Tugu',
        description: 'Landing page para Tugu, fintech de datáfonos con lector de huella digital.',
        longDescription: 'Landing para Tugu: producto, seguridad biométrica y flujo de registro en tres pasos, con respaldo de Ruta N y la Universidad Pontificia Bolivariana. Diseño responsive con foco en conversión.',
        status: 'Completado',
        tags: ['Landing', 'Fintech', 'Responsive', 'SEO'],
        githubUrl: 'https://github.com/FedericoChalaca/Tugu-Landigpage',
        demoUrl: 'https://tugu-landing.vercel.app/',
        previews: { desktop: '/previews/tugu-desktop.webp', mobile: '/previews/tugu-mobile.webp' },
    },
    {
        id: 'sara-posso',
        title: 'Sara Posso',
        description: 'Portafolio bilingüe para una diseñadora de vestuario y modelo de Medellín.',
        longDescription: 'Sitio portafolio para Sara Posso: proyectos de diseño, modelaje y metodología, galería de fotos arrastrable e interfaz bilingüe ES/EN con SEO local.',
        status: 'Completado',
        tags: ['Portafolio', 'Bilingüe ES/EN', 'Galería interactiva', 'SEO'],
        githubUrl: 'https://github.com/FedericoChalaca/sara-posso-portafolio',
        demoUrl: 'https://sara-posso-portafolio.vercel.app/',
        previews: { desktop: '/previews/saraposso-desktop.webp', mobile: '/previews/saraposso-mobile.webp' },
    },
    {
        id: 'bionary',
        title: 'Bionary',
        description: 'Portafolio bilingüe para Dany, divulgadora e ilustradora científica.',
        longDescription: 'Portafolio para Dany (@bionary_), divulgadora e ilustradora científica: reúne sus ilustraciones, sus videos y su perfil. Incluye el libro de los animales de Colombia, una galería animada con la ficha de cada animal y sus datos con fuente. Bilingüe ES/EN y pensado primero para celular.',
        status: 'Completado',
        tags: ['React', 'TypeScript', 'Framer Motion', 'Bilingüe ES/EN'],
        demoUrl: 'https://portafolio-bionary.vercel.app/',
        previews: { desktop: '/previews/bionary-desktop.webp', mobile: '/previews/bionary-mobile.webp' },
    },
    {
        id: 'macla',
        title: 'Macla',
        description: 'Portafolio bilingüe para Maria Clara Lopera, publicista y copywriter de Medellín.',
        longDescription: 'Portafolio para Maria Clara Lopera, publicista y copywriter: nueve casos de estudio en cinco capítulos, cada uno presentado por un objeto fotografiado, y titulares que mezclan letra sans, caligrafía y letra punteada. Bilingüe ES/EN, sin backend, y las galerías se llenan solas desde una carpeta.',
        status: 'En Progreso',
        tags: ['React', 'TypeScript', 'Framer Motion', 'Bilingüe ES/EN'],
        demoUrl: 'https://portafolio-macla.vercel.app/',
        previews: { desktop: '/previews/macla-desktop.webp', mobile: '/previews/macla-mobile.webp' },
    },
    {
        id: 'parchate',
        title: 'Párchate',
        description: 'Landing de mi marca de ropa pintada a mano con cloro y pintura, donde cada pieza es 1 de 1.',
        longDescription: 'Landing de Párchate, mi marca de ropa pintada a mano: diseñé la marca, pinté las prendas e hice la página. HTML, CSS y JavaScript sin dependencias, con animaciones ligadas al scroll, galería en diálogo nativo y tema oscuro con un solo acento.',
        status: 'Completado',
        tags: ['Marca propia', 'HTML', 'CSS', 'JavaScript'],
        demoUrl: 'https://parchate-omega.vercel.app/',
        previews: { desktop: '/previews/parchate-desktop.webp', mobile: '/previews/parchate-mobile.webp' },
    },
    {
        id: 'the-good-trip',
        title: 'The Good Trip',
        description: 'Prototipo de aplicación de transporte tipo ride-hailing con flujos completos de pasajero y conductor.',
        longDescription: 'App de transporte con solicitud de viajes, mapa en vivo, pagos, historial y panel de ganancias para conductores. Interfaz bilingüe (ES/EN) enfocada en la experiencia móvil.',
        status: 'Completado',
        tags: ['JavaScript', 'Mapas', 'UX Móvil', 'i18n'],
        githubUrl: 'https://github.com/FedericoChalaca/TheGoodTrip',
        demoUrl: 'https://www.thegoodtrip.online/',
        previews: { desktop: '/previews/thegoodtrip-desktop.webp', mobile: '/previews/thegoodtrip-mobile.webp' },
    },
    {
        id: 'entre-dos',
        title: 'Entre Dos',
        description: 'App web privada para parejas: recuerdos, diario compartido y mensajes.',
        longDescription: 'Espacio privado para dos personas con recuerdos por fecha, diario compartido, notas de gratitud con racha, canción del día y cápsulas del tiempo. Instalable en el celular como app.',
        status: 'Completado',
        tags: ['PWA', 'Autenticación', 'Mobile first', 'Fotos'],
        demoUrl: 'https://entredos-psi.vercel.app/',
        previews: { desktop: '/previews/entredos-desktop.webp', mobile: '/previews/entredos-mobile.webp' },
    },
    {
        id: 'minevera',
        title: 'MiNevera',
        description: 'App híbrida para organizar la despensa del hogar, con alertas de vencimiento.',
        longDescription: 'Inventario de alimentos del hogar con categorías, alertas de productos por vencer y lista de compras. Funciona sin internet.',
        status: 'Completado',
        tags: ['App híbrida', 'Offline', 'Inventario', 'Alertas'],
        githubUrl: 'https://github.com/zteve0/AppHibridaEntrga2',
        demoUrl: 'https://zteve0.github.io/AppHibridaEntrga2/',
        previews: { desktop: '/previews/apphibrida-desktop.webp', mobile: '/previews/apphibrida-mobile.webp' },
    },
    {
        id: 'pizzeria-arquitectura',
        title: 'Pizzería: arquitectura de software',
        description: 'Sistema de gestión para una cadena de pizzerías, en .NET 9 y C#.',
        longDescription: 'Sistema en .NET 9 y C# que modela la operación de una cadena de pizzerías: pedidos en local y a domicilio, medios de pago, facturación, inventario y fidelización. Aplica DDD, principios SOLID y siete patrones de diseño. Proyecto académico hecho en equipo.',
        status: 'Completado',
        tags: ['.NET 9', 'C#', 'DDD', 'SOLID', 'Patrones de diseño'],
        githubUrl: 'https://github.com/FedericoChalaca/Pizzeria-Arquitectura',
    },
    {
        id: 'tienda-ropa-erp',
        title: 'ERP Tienda de Ropa',
        description: 'Sistema integral de planificación de recursos empresariales diseñado específicamente para la gestión de tiendas de ropa.',
        longDescription: 'Aplicación ERP que permite administrar inventario, ventas, clientes y reportes financieros para una tienda de ropa de manera eficiente. Interfaz intuitiva enfocada en la productividad.',
        status: 'Completado',
        tags: ['React', 'Node.js', 'ERP', 'Gestión'],
        githubUrl: 'https://github.com/Emanuel0428/Tienda-Ropa-ERP',
    },
    {
        id: 'bigotes-pizzeria',
        title: 'BigoteS Pizzeria',
        description: 'Aplicación web para una pizzería con catálogo, carrito de compras y gestión de pedidos.',
        longDescription: 'Aplicación web para la pizzería BigoteS: catálogo de productos, carrito de compras y panel para administrar los pedidos.',
        status: 'Completado',
        tags: ['React', 'TypeScript', 'Supabase', 'E-commerce'],
        githubUrl: 'https://github.com/FedericoChalaca/BigoteS-pizzeria',
    },
    {
        id: 'wing-house',
        title: 'Wing House',
        description: 'Sitio web para un restaurante de alitas con carta digital y promociones.',
        longDescription: 'Sitio para un restaurante de alitas, con carta digital y secciones de promociones.',
        status: 'Completado',
        tags: ['PHP', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/FedericoChalaca/wing_house',
    },
    {
        id: 'viajero-fiel',
        title: 'Viajero Fiel',
        description: 'App web privada para coordinar viajes entre conocidos.',
        longDescription: 'App web privada para coordinar viajes entre conocidos, con acceso por PIN. La hice para aprender y está en pausa.',
        status: 'En Progreso',
        tags: ['App web', 'Acceso por PIN'],
        demoUrl: 'https://viajero-fiel.vercel.app/',
    },
];

// ============================================================
// PERSONAL AI  (Nimbo: open source, shown in its own space)
// ============================================================
export const personalAi = {
    name: 'Nimbo',
    heading: 'Mi IA personal, que también puedes usar',
    description: 'Nimbo es un compañero flotante para Claude Code en Windows. Vive en el borde de arriba de la pantalla y me muestra qué está haciendo cada uno de mis chats. Lo hice para mi día a día y lo publiqué con código abierto para que cualquiera lo instale.',
    points: [
        { title: 'Tus chats en vivo', text: 'Ves qué hace cada chat de Claude Code y apruebas permisos sin ir a la terminal.' },
        { title: 'Sin API key', text: 'Usa el Claude que ya tienes instalado y con sesión iniciada.' },
        { title: 'Privado', text: 'No tiene servidores ni telemetría: nada llega a mí ni a nadie más.' },
    ],
    tags: ['Electron', 'JavaScript', 'Código abierto', 'Licencia MIT'],
    repoUrl: 'https://github.com/FedericoChalaca/nimbo',
    downloadUrl: 'https://github.com/FedericoChalaca/nimbo/releases/latest',
    requirements: 'Necesita Windows y Claude Code instalado.',
    image: '/nimbo/nimbo.webp',
    video: {
        src: '/nimbo/nimbo-intro.mp4',
        poster: '/nimbo/nimbo-intro-poster.webp',
        captions: '/nimbo/nimbo-intro.es.vtt',
        note: 'Intro de 10 segundos. Es un video conceptual; la interfaz real es la de la captura.',
    },
};

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
            { project: 'Wing House', built: 'Sitio de restaurante con carta digital y promociones.', url: 'https://github.com/FedericoChalaca/wing_house' },
        ],
    },
    {
        id: 'three',
        name: 'Three.js y Framer Motion',
        logo: 'threedotjs.svg',
        work: ['Sitios y landings'],
        benefit: 'Animaciones y 3D para que tu marca se recuerde.',
        proofs: [
            { project: 'Bionary', built: 'El libro de los animales, una galería animada, y el retrato del inicio, con Framer Motion.', url: 'https://portafolio-bionary.vercel.app/' },
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
            { project: 'Bionary', built: 'Portafolio de una divulgadora e ilustradora científica.', url: 'https://portafolio-bionary.vercel.app/' },
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
            { project: 'Bionary', built: 'Portafolio bilingüe con rutas e idiomas hechos a mano, sin librerías adicionales.', url: 'https://portafolio-bionary.vercel.app/' },
            { project: 'ERP Tienda de Ropa', built: 'Sistema de inventario, ventas, clientes y reportes.', url: 'https://github.com/Emanuel0428/Tienda-Ropa-ERP' },
            { project: 'BigoteS Pizzeria', built: 'Web de una pizzería con catálogo, carrito y gestión de pedidos.', url: 'https://github.com/FedericoChalaca/BigoteS-pizzeria' },
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
            { project: 'Bionary', built: 'Todo el sitio, incluidas sus rutas y traducciones.', url: 'https://portafolio-bionary.vercel.app/' },
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
            { project: 'BigoteS Pizzeria', built: 'Los datos de la web de la pizzería.', url: 'https://github.com/FedericoChalaca/BigoteS-pizzeria' },
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
            { project: 'Nimbo', built: 'App de escritorio en Electron que se conecta con Claude Code, GitHub y Trello.', url: 'https://github.com/FedericoChalaca/nimbo' },
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
            { project: 'Pizzería: arquitectura de software', built: 'Sistema de gestión para una cadena de pizzerías con DDD, SOLID y 7 patrones de diseño.', url: 'https://github.com/FedericoChalaca/Pizzeria-Arquitectura', note: 'Proyecto universitario' },
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
    { value: projects.length + 1, label: 'Proyectos' }, // + Nimbo, which has its own space
    { value: projects.filter((p) => p.demoUrl && p.demoUrl !== '#').length, label: 'Sitios en producción' },
    { value: technologies.filter((t) => t.logo).length, label: 'Tecnologías' },
];

// ============================================================
// FILTER HELPERS  (Strategy Pattern: filtering logic is pure)
// ============================================================
export function getTechFilters(): FilterOption<WorkType>[] {
    const kinds: WorkType[] = ['Todos', 'Sitios y landings', 'Apps web', 'Apps móviles', 'Tiendas y pagos', 'Backend y datos'];
    return kinds.map((kind) => ({
        id: kind,
        label: kind,
        count: filterTechnologies(kind).length,
    }));
}

export function filterTechnologies(kind: WorkType): Technology[] {
    if (kind === 'Todos') return technologies;
    return technologies.filter((t) => t.work.some((w) => w === kind));
}
