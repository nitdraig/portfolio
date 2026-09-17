import type { DeliveryType, Industry } from "./projectTaxonomy";

export type Project = {
  slug: string;
  title: { en: string; es: string };
  shortDescription: { en: string; es: string };
  description: { en: string; es: string };
  year: number;
  color: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
  challenge?: { en: string; es: string };
  solution?: { en: string; es: string };
  results?: { en: string[]; es: string[] };
  featured?: boolean;
  homeOrder?: number;
  status?: string;
  deliveryType: DeliveryType;
  industry: Industry;
  highlightMetric?: { en: string; es: string };
};

export const projects: Project[] = [
  {
    slug: "ate",
    title: {
      en: "ATE — Membership Management Platform",
      es: "ATE — Plataforma de gestión de socios",
    },
    shortDescription: {
      en: "Full-stack web app for managing association memberships: installment payment plans, QR access control, and a complete admin panel.",
      es: "Aplicación web full-stack para la administración integral de membresías: planes de pago por cuotas, control de accesos con QR y panel administrativo completo.",
    },
    description: {
      en: "Internal system used by members, access staff, and administrators. Members manage their membership from a mobile-first personal profile; administrators review payments, manage users, and configure business rules from a desktop panel.",
      es: "Sistema interno usado por socios, personal de acceso y administradores. Los socios gestionan su membresía desde un perfil personal (mobile-first); los administradores revisan pagos, gestionan usuarios y configuran reglas de negocio desde un panel desktop.",
    },
    year: 2026,
    color: "from-emerald-600 to-teal-800",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Dropbox API",
    ],
    image: "/project-images/clubate.webp",
    demoUrl: "https://clubate.com.ar",
    challenge: {
      es: "Construir un sistema integral de gestión de membresías que sirva a tres perfiles distintos (socios, personal de acceso y administradores), con cobro por cuotas, validación de accesos en tiempo real y un panel administrativo completo.",
      en: "Build a comprehensive membership management system serving three distinct profiles (members, access staff, and administrators), with installment billing, real-time access validation, and a complete admin panel.",
    },
    solution: {
      es: "Desarrollé la solución full-stack de punta a punta: modelado de datos, API REST, interfaces de socios y administradores, y pruebas automatizadas (unitarias y de servicios). Migré el almacenamiento de comprobantes de base64-en-MongoDB a la API de Dropbox (OAuth con refresh tokens y links compartidos raw=1) para reducir el peso de los documentos y de las respuestas del servidor.",
      en: "Developed the full-stack solution end to end: data modeling, REST API, member and admin interfaces, and automated testing (unit and service). Migrated receipt storage from base64-in-MongoDB to the Dropbox API (OAuth with refresh tokens and raw=1 shared links) to reduce document size and server response weight.",
    },
    results: {
      es: [
        "Pagos y cuotas con carga de comprobantes y aprobación/rechazo fundamentado",
        "Aprobación de pago que extiende automáticamente la vigencia de la membresía",
        "Integración Dropbox para almacenamiento de comprobantes (más liviano y escalable)",
        "Credenciales QR firmadas con JWT y escáner en tiempo real para el personal de admisión",
        "Notificaciones en tiempo real con Socket.IO y push (VAPID)",
        "Auth con JWT + Google OAuth y roles granulares (socio, staff, admins, superadmin)",
        "Panel admin para gestión de socios, staff, planes, tags y configuración",
      ],
      en: [
        "Installment payments with receipt upload and justified approval/rejection",
        "Payment approval automatically extends membership validity",
        "Dropbox integration for receipt storage (lighter and scalable)",
        "JWT-signed QR credentials with real-time scanner for admission staff",
        "Real-time notifications with Socket.IO and push (VAPID)",
        "JWT + Google OAuth auth with granular roles (member, access staff, admins, superadmin)",
        "Admin panel for managing members, staff, plans, tags, and configuration",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "social",
  },
  {
    slug: "flowfolio",
    title: {
      en: "Flowfolio",
      es: "Flowfolio",
    },
    shortDescription: {
      en: "Flowfolio is the command center for freelancers. One complete platform to manage projects, clients, tasks and deliveries.",
      es: "Flowfolio es el centro de comando para freelancers. Una plataforma completa para gestionar proyectos, clientes, tareas y entregas.",
    },
    description: {
      en: "Flowfolio solves the typical chaos of freelance work: scattered emails, disorganized files, manual updates, and duplicated communication. With Flowfolio, each client has their own mini-dashboard where they can track progress, approve tasks, and communicate. The integrated AI automates repetitive tasks like summaries, frequently asked questions, and task generation from briefs.",
      es: "Flowfolio resuelve el caos típico del trabajo freelance: emails sueltos, archivos dispersos, actualizaciones manuales y comunicación duplicada. Con Flowfolio, cada cliente tiene su propio mini-dashboard donde puede seguir el progreso, aprobar tareas y comunicarse. La IA integrada automatiza tareas repetitivas como resúmenes, respuestas frecuentes y generación de tareas desde briefs.",
    },
    year: 2026,

    color: "from-blue-600 to-blue-800",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "AI",
      "Express",
      "MongoDB",
      "Excelso",
      "Freelance",
    ],
    image: "/project-images/flowfolio-image.webp",
    demoUrl: "https://flowfolio.space",
    challenge: {
      es: "Crear una plataforma completa para gestionar proyectos, clientes, tareas y entregas. La plataforma debe ser escalable, fácil de usar y debe integrar IA para automatizar tareas repetitivas.",
      en: "Create a complete platform to manage projects, clients, tasks, and deliveries. The platform must be scalable, easy to use, and must integrate AI to automate repetitive tasks.",
    },
    solution: {
      es: "Desarrollé una plataforma completa usando Next.js y TypeScript, implementando un sistema de gestión de contenido eficiente, implementando categorización especializada, y asegurando que el contenido sea fácilmente navegable tanto para profesionales como para el público general interesado en gestión de proyectos.",
      en: "Developed a complete platform using Next.js and TypeScript, implementing an efficient content management system, implementing specialized categorization, and ensuring that the content is easily navigable for both professionals and the general public interested in project management.",
    },
    results: {
      es: [
        "Plataforma completa para gestionar proyectos, clientes, tareas y entregas",
        "Sistema de gestión de contenido eficiente",
        "Categorización especializada",
        "Experiencia de usuario intuitiva",
        "Integración con IA",
        "Integración con Excelso",
        "Integración con Freelance",
        "Integración con Next.js",
        "Integración con TypeScript",
        "Plataforma operativa para comunicación, orden y revisión de hackathones",
        "Conexión organizaciones–talento global: diseñar, ejecutar y validar soluciones",
        "Autenticación JWT + OAuth (Google, GitHub) con verificación de email",
        "API REST modular (Express + MongoDB) con analíticas para administradores",
        "Despliegue preparado para producción (Docker Compose, Vercel)",
      ],
      en: [
        "Complete platform to manage projects, clients, tasks, and deliveries",
        "Efficient content management system",
        "Specialized categorization",
        "Intuitive user experience",
        "Integration with AI",
        "Integration with Excelso",
        "Integration with Freelance",
        "Integration with Next.js",
        "Integration with TypeScript",
        "Operational platform for hackathon communication, coordination, and review",
        "Organization–global talent connection: design, execute, and validate solutions",
        "6 roles with dedicated dashboards and full challenge lifecycle",
        "JWT + OAuth authentication (Google, GitHub) with email verification",
        "Modular REST API (Express + MongoDB) with admin analytics",
        "Production-ready deployment (Docker Compose, Vercel)",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "freelance",
  },
  {
    slug: "experimental-global-app-landing",
    title: {
      en: "Experimental Global App & Landing",
      es: "Experimental Global App & Landing",
    },
    shortDescription: {
      en: "Internal platform and marketing site for EXPERIMENTAL Global hackathon operations",
      es: "Plataforma interna y sitio de marketing para la operación de hackathones de EXPERIMENTAL Global",
    },
    description: {
      en: "Platform built for the EXPERIMENTAL Global team to streamline communication, coordination, direction, and review of hackathon challenges. It connects organizations with real challenges and global talent to design, execute, and validate technology solutions—validated projects can receive compensation or be spun out as startups. I delivered the bilingual marketing landing (Astro 6, Tailwind CSS v4) and the production web app (Next.js 16, Express, MongoDB) with role-based dashboards, challenge lifecycle, teams, submissions, mentor scoring, and admin analytics.",
      es: "Plataforma diseñada para el equipo de EXPERIMENTAL Global con el fin de facilitar la comunicación, el orden, la dirección y la revisión de desafíos de hackathon. Conecta organizaciones con retos reales y talento global para diseñar, ejecutar y validar soluciones tecnológicas; los proyectos validados acceden a compensación o se constituyen como startups. Desarrollé el landing bilingüe (Astro 6, Tailwind CSS v4) y la aplicación en producción (Next.js 16, Express, MongoDB) con dashboards por rol, ciclo de vida de retos, equipos, entregas, evaluación por mentores y analíticas de administración.",
    },
    year: 2026,

    color: "from-indigo-600 to-violet-800",
    tags: [
      "Astro",
      "Next.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "React Query",
      "Tailwind CSS",
      "Hackathon",
    ],
    image: "/project-images/experimental-global.webp",
    demoUrl: "https://experimental.global",

    challenge: {
      es: "Construir un producto dual para el equipo de EXPERIMENTAL Global: un landing editorial bilingüe (~25 rutas, SEO) que comunique el valor del ecosistema, y una plataforma operativa donde el equipo y las organizaciones gestionen hackathones de punta a punta—publicación de retos, formación de equipos, check-in, entregas de demos y revisión por mentores/jueces. El reto incluía seis roles con permisos distintos, autenticación multi-proveedor, flujos de scoring, archivos (PDF en Cloudinary), i18n sin duplicar URLs por idioma y despliegue listo para producción.",
      en: "Build a dual product for the EXPERIMENTAL Global team: a bilingual editorial landing (~25 routes, SEO) that communicates the ecosystem value, and an operational platform where the team and organizations run hackathons end to end—challenge publishing, team formation, check-in, demo submissions, and mentor/judge review. The challenge included six roles with distinct permissions, multi-provider auth, scoring workflows, file handling (PDF via Cloudinary), i18n without locale-prefixed URLs, and production-ready deployment.",
    },
    solution: {
      es: "Implementé el landing estático con Astro 6 y un sistema i18n propio (paneles EN/ES, localStorage, alias en español como /acerca y /verticales), con explorador de verticales, marketplace de retos con modales accesibles y páginas de servicios para SEO. Para la plataforma, desarrollé una API REST en Express por dominios (auth, users, challenges, teams, participations, demos, analytics) y frontend Next.js 16 con React Query y dashboards por rol (developer, organization, mentor, judge, admin, superadmin), equipos con códigos de invitación y entregas con estados draft→submitted→evaluating.",
      en: "Built the static landing with Astro 6 and a custom i18n system (EN/ES panels, localStorage, Spanish URL aliases such as /acerca and /verticales), a verticals explorer, an accessible challenges marketplace with modals, and SEO service pages. For the platform, developed a domain-driven Express REST API (auth, users, challenges, teams, participations, demos, analytics) and a Next.js 16 frontend with React Query and role-based dashboards (developer, organization, mentor, judge, admin, superadmin), teams with invite codes, and submissions with draft→submitted→evaluating states.",
    },
    results: {
      es: [
        "Landing bilingüe EN/ES con diseño editorial y ~25 rutas optimizadas para SEO",
        "Plataforma operativa para comunicación, orden y revisión de hackathones",
        "Conexión organizaciones–talento global: diseñar, ejecutar y validar soluciones",
        "6 roles con dashboards dedicados y ciclo completo de retos",
        "Autenticación JWT + OAuth (Google, GitHub) con verificación de email",
        "API REST modular (Express + MongoDB) con analíticas para administradores",
        "Despliegue preparado para producción (Docker Compose, Vercel)",
      ],
      en: [
        "Bilingual EN/ES landing with editorial design and ~25 SEO-optimized routes",
        "Operational platform for hackathon communication, coordination, and review",
        "Organization–global talent connection: design, execute, and validate solutions",
        "6 roles with dedicated dashboards and full challenge lifecycle",
        "JWT + OAuth authentication (Google, GitHub) with email verification",
        "Modular REST API (Express + MongoDB) with admin analytics",
        "Production-ready deployment (Docker Compose, Vercel)",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "hackathons",
  },
  {
    slug: "meet-my-race",
    title: {
      en: "MeetMyRace",
      es: "MeetMyRace",
    },
    shortDescription: {
      en: "Collaborative logistics platform for runners to share travel and accommodation expenses.",
      es: "Plataforma de logística colaborativa para corredores para compartir gastos de viaje y alojamiento.",
    },
    description: {
      en: "A strategic co-founded project designed to centralize race logistics. I lead the technical architecture and development of the MVP, creating a platform where runners can find events, coordinate shared transportation, and manage lodging in a social, community-driven environment.",
      es: "Un proyecto de co-fundación estratégica diseñado para centralizar la logística de carreras. Lidero la arquitectura técnica y el desarrollo del MVP, creando una plataforma donde los corredores pueden encontrar eventos, coordinar transporte compartido y gestionar alojamiento en un entorno social impulsado por la comunidad.",
    },
    year: 2026,

    color: "from-red-500 to-red-700",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Logistics",
      "Sports Tech",
    ],
    image: "/project-images/meetmyrace-landing.webp",
    demoUrl: "https://meetmyrace.com",

    challenge: {
      es: "Resolver la fragmentación de información logística para corredores y facilitar el contacto seguro para compartir gastos. El desafío consistió en construir un MVP funcional en 90 días que integrara un motor de búsqueda de carreras, un sistema de estados logísticos y mensajería en tiempo real.",
      en: "Solve the fragmentation of logistical information for runners and facilitate safe contact to share expenses. The challenge consisted of building a functional MVP in 90 days that integrated a race search engine, a logistical status system, and real-time messaging.",
    },
    solution: {
      es: "Implementé una arquitectura modular Fullstack (React/Node.js) con un sistema de carga comunitaria y validación administrativa. Diseñé un flujo de usuario donde la asistencia a carreras está condicionada a la definición de necesidades logísticas, conectando perfiles compatibles mediante un chat interno 1-a-1.",
      en: "Implemented a modular Fullstack architecture (React/Node.js) with a community upload and administrative validation system. I designed a user flow where race attendance is conditioned on defining logistical needs, connecting compatible profiles through an internal 1-on-1 chat.",
    },
    results: {
      es: [
        "Producto Mínimo Viable (MVP) completamente funcional",
        "Motor de búsqueda de carreras con filtros avanzados",
        "Sistema de logística colaborativa (transporte y alojamiento)",
        "Mensajería interna 1-a-1 para coordinación de usuarios",
        "Panel de administración para curaduría de contenidos",
        "Arquitectura escalable basada en TypeScript y Node.js",
      ],
      en: [
        "Fully functional Minimum Viable Product (MVP)",
        "Race search engine with advanced filters",
        "Collaborative logistics system (transport and accommodation)",
        "Internal 1-on-1 messaging for user coordination",
        "Administrative panel for content curation",
        "Scalable architecture based on TypeScript and Node.js",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "sports",
  },
  {
    slug: "around-notes-blog",
    title: {
      en: "Around Notes Blog",
      es: "Around Notes Blog",
    },
    shortDescription: {
      en: "Medical content platform and knowledge hub",
      es: "Plataforma de contenido médico y centro de conocimiento",
    },
    description: {
      en: "A comprehensive medical blog and knowledge platform for Around Notes, designed to educate healthcare professionals and share insights about AI in medicine. I developed the complete blog architecture, content management system, and user experience, focusing on accessibility, SEO optimization, and medical content presentation standards.",
      es: "Un blog médico integral y plataforma de conocimiento para Around Notes, diseñado para educar a profesionales de la salud y compartir conocimientos sobre IA en medicina. Desarrollé la arquitectura completa del blog, sistema de gestión de contenido, y experiencia de usuario, enfocándome en accesibilidad, optimización SEO, y estándares de presentación de contenido médico.",
    },
    year: 2025,

    color: "from-blue-600 to-blue-800",
    tags: ["Next.js", "MDX", "SEO", "Content Management", "Healthcare", "Blog"],
    image: "/project-images/aroundnotes-blog-image.webp",
    demoUrl: "https://blog.aroundnotes.ai",

    challenge: {
      es: "Crear una plataforma de blog médico que cumpla con estándares de accesibilidad web, optimización SEO, y presentación profesional de contenido médico. El desafío incluía desarrollar un sistema de gestión de contenido eficiente, implementar categorización médica especializada, y asegurar que el contenido sea fácilmente navegable tanto para profesionales médicos como para el público general interesado en IA médica.",
      en: "Create a medical blog platform that meets web accessibility standards, SEO optimization, and professional medical content presentation. The challenge included developing an efficient content management system, implementing specialized medical categorization, and ensuring content is easily navigable for both medical professionals and the general public interested in medical AI.",
    },
    solution: {
      es: "Desarrollé una plataforma de blog completa usando Next.js y MDX para gestión de contenido, implementando un sistema de categorías médicas, optimización SEO avanzada, y diseño responsive. Creé componentes especializados para contenido médico, integré herramientas de análisis de rendimiento, y establecí un flujo de trabajo de publicación eficiente para el equipo de contenido médico.",
      en: "Developed a complete blog platform using Next.js and MDX for content management, implementing a medical categories system, advanced SEO optimization, and responsive design. Created specialized components for medical content, integrated performance analytics tools, and established an efficient publishing workflow for the medical content team.",
    },
    results: {
      es: [
        "Plataforma de blog médico completamente funcional",
        "Sistema de gestión de contenido MDX",
        "Optimización SEO para contenido médico",
        "Categorización especializada de temas médicos",
        "Diseño responsive y accesible",
        "Integración con herramientas de análisis",
      ],
      en: [
        "Fully functional medical blog platform",
        "MDX content management system",
        "SEO optimization for medical content",
        "Specialized medical topic categorization",
        "Responsive and accessible design",
        "Analytics tools integration",
      ],
    },
    featured: false,
    status: "active",
    deliveryType: "landing",
    industry: "healthcare",
  },
  {
    slug: "around-notes-app",
    title: {
      en: "Around Notes app",
      es: "Around Notes app",
    },
    shortDescription: {
      en: "AI-powered HIPAA-safe platform for inpatient medicine",
      es: "Plataforma IA segura HIPAA para medicina hospitalaria",
    },
    description: {
      en: "Around Notes is a HIPAA-safe, browser-based AI platform built by physicians for inpatient medicine. It generates quality medical notes, provides access to PHI secure AI models, and streamlines clinical workflows. As part of the development team, I contributed to frontend development focusing on UX/UI, performance optimization, and key integrations including dashboard, note modules, EKG and radiology modules, and user management systems.",
      es: "Around Notes es una plataforma de IA segura HIPAA, basada en navegador, construida por médicos para medicina hospitalaria. Genera notas médicas de calidad, proporciona acceso a modelos de IA seguros para PHI, y optimiza los flujos de trabajo clínicos. Como parte del equipo de desarrollo, contribuí al desarrollo frontend enfocándome en UX/UI, optimización de rendimiento, e integraciones clave incluyendo dashboard, módulos de notas, módulos de EKG y radiología, y sistemas de gestión de usuarios.",
    },
    year: 2025,

    color: "from-purple-800 to-purple-900",
    tags: ["React", "TypeScript", "UX/UI", "Performance", "Healthcare", "AI"],
    image: "/project-images/aroundnotes-app-image.webp",
    demoUrl: "https://app.aroundnotes.ai",

    challenge: {
      es: "Como parte del equipo, contribuir al desarrollo de una plataforma médica compleja que cumpla con HIPAA, integrando múltiples módulos especializados (notas clínicas, EKG, radiología) mientras mantenemos una experiencia de usuario intuitiva para profesionales médicos en entornos de alta presión. Mi desafío específico incluía optimizar el rendimiento para datos médicos sensibles y crear interfaces que aceleren los flujos de trabajo clínicos.",
      en: "As part of the team, contribute to developing a complex HIPAA-compliant medical platform integrating multiple specialized modules (clinical notes, EKG, radiology) while maintaining an intuitive user experience for medical professionals in high-pressure environments. My specific challenge included optimizing performance for sensitive medical data and creating interfaces that accelerate clinical workflows.",
    },
    solution: {
      es: "Contribuí al desarrollo de una arquitectura frontend modular usando React y TypeScript, trabajando en interfaces especializadas para cada módulo médico. Participé en el desarrollo del dashboard central, colaboré en la optimización del rendimiento para manejo de datos PHI, contribuí a los sistemas de gestión de usuarios, y creé componentes reutilizables que aceleran el desarrollo del equipo. Ocasionalmente colaboré en backend para integraciones clave de funcionalidades críticas.",
      en: "Contributed to developing a modular frontend architecture using React and TypeScript, working on specialized interfaces for each medical module. Participated in central dashboard development, collaborated on performance optimization for PHI data handling, contributed to user management systems, and created reusable components that accelerate team development. Occasionally collaborated on backend for key integrations of critical functionalities.",
    },
    results: {
      es: [
        "Dashboard médico intuitivo y funcional",
        "Módulos especializados (notas, EKG, radiología)",
        "Cumplimiento HIPAA y seguridad PHI",
        "Performance optimizado para datos médicos",
        "Sistema de gestión de usuarios robusto",
        "Arquitectura modular y escalable",
      ],
      en: [
        "Intuitive and functional medical dashboard",
        "Specialized modules (notes, EKG, radiology)",
        "HIPAA compliance and PHI security",
        "Optimized performance for medical data",
        "Robust user management system",
        "Modular and scalable architecture",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "healthcare",
  },
  {
    slug: "around-notes-landing",
    title: {
      en: "Around Notes Landing Page",
      es: "Around Notes Landing Page",
    },
    shortDescription: {
      en: "A landing page for Around Notes App",
      es: "Una Landing page para Around Notes App",
    },
    description: {
      en: "A landing page for the app 'Around Notes', provides a platform for users to create and manage medical notes. The application features a modern design and utilizes various technologies to provide a seamless user experience.",
      es: "Una Landing page para la aplicación 'Around Notes', a una plataforma para que usuarios médicos creen y administren notas médicas. La aplicación presenta un diseño moderno y utiliza varias tecnologías para proporcionar una experiencia de usuario perfecta.",
    },
    year: 2025,

    color: "from-purple-300 to-purple-500",
    tags: ["Astro", "Tailwind", "SEO", "Performance"],
    image: "/project-images/aroundnotes-landing-image.webp",
    demoUrl: "https://aroundnotes.ai",

    challenge: {
      es: "Desarrollar una landing page atractiva y funcional para Around Notes, que comunique efectivamente las características y beneficios de la aplicación. Además, la página debe estar optimizada para SEO y rendimiento. El proyecto debe completarse en un plazo de 2 semanas.",
      en: "Develop an attractive and functional landing page for Around Notes, which effectively communicates the characteristics and benefits of the application. In addition, the page must be optimized for SEO and performance. The project must be completed within 2 weeks.",
    },
    solution: {
      es: "Una landing page funcional, escalable, optimizada para SEO y rendimiento, que presenta de manera clara y atractiva las características y beneficios de Around Notes. La página está diseñada para ser responsiva y accesible en todos los dispositivos.",
      en: "A functional landing page, scalable, optimized for SEO and performance, which clearly and attractively presents the characteristics and benefits of Around Notes. The page is designed to be responsive and accessible on all devices.",
    },
    results: {
      es: [
        "Landing page funcional",
        "SEO optimizado",
        "Perfomance optimizado",
        "Responsive",
      ],
      en: [
        "Landing Page Functional",
        "SEO optimized",
        "Optimized perfomance",
        "Responsive",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "landing",
    industry: "healthcare",
  },
  {
    slug: "sigii-app",
    title: {
      en: "Sigii App | Transforming the learning experience",
      es: "Sigii App | Transformando la experiencia de aprendizaje",
    },
    shortDescription: {
      en: "Comprehensive system for the management of smart institutions",
      es: "Sistema Integral para la Gestion de Instituciones Inteligentes",
    },
    description: {
      en: "Web platform developed for management of institutions, teachers, and students focused on public schools, private and university education. It is part of a larger ecosystem that seeks to facilitate the integration of talents into modernity.",
      es: "Plataforma web desarrollada para gestión de instituciones, profesores, y alumnos enfocado en escuelas públicas, privadas de educación secundaria y universitaria. Forma parte de un ecosistema más grande que busca facilitar la integración de los talentos a la modernidad. ",
    },

    color: "from-blue-700 to-gray-600",
    tags: ["Next.js", "Tailwind", "TypeScript", "Express", "MongoDB"],
    image: "/project-images/sigii-image.png",
    demoUrl: "https://sigii.tips",
    challenge: {
      es: "Construir en un mes una plataforma de gestión institucional completa que contenga herramientas interconectadas formando un ecosistema integral que permita abordar cada etapa del desarrollo humano.",
      en: "Build in a month a complete institutional management platform containing interconnected tools forming an integral ecosystem that allows each stage of human development to be addressed.",
    },
    solution: {
      es: "MVP completo funcionando en 4 semanas, con estructura modular que permite escalar a futuro a múltiples dependencias e integrar nuevas herramientas revolucionarias.",
      en: "Complete MVP running in 4 weeks, with modular structure that allows you to climb to multiple units and integrate new revolutionary tools.",
    },
    results: {
      es: [
        "MVP funcional en 4 semanas",
        "Chatbots funcionales",
        "Integración de herramientas IA",
        "Modularidad",
        "Escalabilidad",
      ],
      en: [
        "MVP functional in 4 weeks",
        "Functional chatbots",
        "INTEGRATION OF TOOLS IA",
        "Modularity",
        "Scalability",
      ],
    },
    featured: false,
    year: 2024,
    status: "active",
    deliveryType: "platform",
    industry: "education",
  },
  {
    slug: "mining-talent-net",
    title: {
      en: "Mining Talent Net",
      es: "Mining Talent Net",
    },
    shortDescription: {
      en: "Platform for mining professionals",
      es: "Plataforma para profesionales mineros",
    },
    description: {
      en: "Connects mining companies with talent. Uses AI to match profiles with job offers.",
      es: "Conecta empresas mineras con talento. Usa IA para emparejar perfiles con ofertas laborales.",
    },
    year: 2025,

    color: "from-yellow-600 to-yellow-800",
    tags: ["Next.js", "Express.js", "TypeScript", "Cloudinary"],
    image: "/project-images/mtn-image.png",
    demoUrl: "https://miningtalent.net",
    githubUrl: "https://github.com/excelso-tech",
    challenge: {
      es: "Conectar talento con empresas potenciadoras de talento, facilitando transacción, interacción y colaboración.",
      en: "Connect talent with talent enhancement companies, facilitating transaction, interaction and collaboration.",
    },
    solution: {
      es: "MVP funcional, escalable, que integra IA para análisis de CV, recomendación de certificaciones, preparación para entrevistas, completado de inputs de formularios de búsqueda de talento.",
      en: "MVP functional, scalable, which integrates for CV analysis, certifications recommendation, preparation for interviews, completed in inputs of talent search forms.",
    },
    results: {
      es: [
        "MVP funcional",
        "Correcta integración de IA",
        "Plataforma adaptable",
        "Constante aparición en buscadores",
      ],
      en: [
        "Functional mvp",
        "Correct integration of AI",
        "Adaptable Platform",
        "Constant appearance in search engines",
      ],
    },
    featured: true,
    status: "active",
    deliveryType: "platform",
    industry: "mining",
  },
  {
    slug: "excelso-tech-group",
    title: {
      en: "Excelso | A Tech Group",
      es: "Excelso | Grupo Tecnológico",
    },
    shortDescription: {
      en: "Driving innovation and sustainability",
      es: "Impulsando innovación y sostenibilidad",
    },
    description: {
      en: "Tech collective focused on digital solutions, sustainability and innovation.",
      es: "Colectivo tecnológico enfocado en soluciones digitales, sostenibilidad e innovación.",
    },

    color: "from-sky-600 to-sky-800",
    tags: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
    image: "/project-images/excelso-image.png",
    demoUrl: "https://excelso.xyz",
    githubUrl: "https://github.com/excelso-tech",
    featured: true,
    year: 2025,
    status: "active",
    deliveryType: "landing",
    industry: "tech",
  },
  {
    slug: "jema-ai-impact",
    title: {
      en: "JEMA | AI for Impact",
      es: "JEMA | IA para el Impacto",
    },
    shortDescription: {
      en: "AI for environmental transparency",
      es: "IA para transparencia ambiental",
    },
    description: {
      en: "AI agent for promoting sustainability and transparency in extractive industries.",
      es: "Agente IA que promueve sostenibilidad y transparencia en industrias extractivas.",
    },

    color: "from-green-600 to-green-800",
    tags: ["Next.js", "TypeScript", "IA", "Cloudinary"],
    image: "/project-images/jema-image.png",
    demoUrl: "https://jema.excelso.xyz",
    challenge: {
      es: "Crear una plataforma de dos lados, una para usuarios simples otra para entidades y/o profesionales que busquen una herramienta para la gestión de informes de impacto ambiental.",
      en: "Create a two-sides platform, one for simple users for entities and/or professionals looking for a tool for the management of environmental impact reports.",
    },
    solution: {
      es: "Plataforma completa, donde se pueden revisar diversos proyectos de extracción de recursos naturales que esten generando impacto ambiental. Y con jema IA poder generar un resumen simplificado con puntos de mejora y puntos criticos del proyecto.",
      en: "Complete platform, where you can review various projects for the extraction of natural resources that are generating environmental impact. And with chiefs to generate a simplified summary with improvement points and critical points of the project.",
    },
    results: {
      es: [
        "MVP en menos de 8 semanas",
        "Agente de IA integrado en el lado del cliente",
        "Plataforma escalable",
      ],
      en: [
        "MVP in less than 8 weeks",
        "Agent of the integrated on the client's side",
        "Scalable platform",
      ],
    },

    featured: true,
    year: 2025,
    status: "active",
    deliveryType: "platform",
    industry: "sustainability",
  },
  {
    slug: "huellitasctg-webapp",
    title: {
      en: "HuellitasCTG WebApp",
      es: "HuellitasCTG WebApp",
    },
    shortDescription: {
      en: "Animal rescue NGO platform",
      es: "Plataforma ONG de rescate animal",
    },
    description: {
      en: "Website for an NGO rescuing street animals. Led product and project management.",
      es: "Sitio web para ONG de rescate animal. Lideré gestión de producto y proyecto.",
    },

    color: "from-pink-600 to-pink-800",
    tags: ["Next.js", "Strapi", "Tailwind", "TypeScript"],
    image: "/project-images/huellitas-image.png",
    demoUrl: "https://www.huellitasctgna.com",
    githubUrl: "https://github.com/inkua/Huellitas",
    challenge: {
      es: "Huellitas-CTGNA necesitaba una web para mostrar sus avances, recaudar fondos y facilitar la adopción de mascotas en la zona donde están actualmente funcionando.",
      en: "Huellitas-CTGNA needed a website to show their progress, raise funds and facilitate the adoption of pets in the area where they are currently working.",
    },
    solution: {
      es: "Se creo para Huellitas una plataforma web completa que permite mediante un CMS crear, modificar y eliminar información clave de la misma web. Mediante un diseño aprobado por el equipo de Huellitas se logro avanzar y finalizar la creación, despliegue y constante mantenimiento de la plataforma.",
      en: "Strikes were created for Hueltes a complete web platform that allows through a CMS to create, modify and eliminate key information from the same website. Through a design approved by the Huellitas team, the creation, deployment and constant maintenance of the platform was made.",
    },
    results: {
      es: [
        "Incremento de la presencia web",
        "Facilitación de adopción",
        "Recaudación de fondos simplificada",
        "Mantenimiento constante de la página",
      ],
      en: [
        "Increase in web presence",
        "Adoption facilitation",
        "Collection of simplified funds",
        "Constant maintenance of the page",
      ],
    },
    featured: false,
    year: 2024,
    status: "active",
    deliveryType: "platform",
    industry: "nonprofit",
  },
  {
    slug: "dc-landing-page",
    title: {
      en: "DC Consultura | Exclusive web",
      es: "DC Consultura | Web exclusiva",
    },
    shortDescription: {
      en: "A exclusive website to DC consultora",
      es: "Una web exclusiva para DC consultora",
    },
    description: {
      en: "A personalized website and with an exclusive design, focused on the consultant, their needs and along with the client's criteria. It is a freelance job. In addition to programming and design, I collaborated in the creation of social networks, logos, online presence, page maintenance, domain and optimization of SEO.",
      es: "Una web personalizada y con un diseño exclusivo, enfocado en la consultora, sus necesidades y a la par de los criterios del cliente. Es un trabajo freelance. Además de la programación y diseño, colaboré en la creación de las redes sociales, logos, presencia en línea, mantenimiento de la página, dominio y optimización de SEO.",
    },

    color: "from-indigo-600 to-indigo-800",
    tags: ["Nextjs", "Tailwind", "Typescript"],
    image: "/project-images/dc-image.png",
    demoUrl: "https://dcconsultora.com.ar",

    challenge: {
      es: "DC consultora necesitaba un sitio exclusivo, presencia en google y un diseño adaptable a múltiples dispositivos.",
      en: "DC consultora needed an exclusive site, presence on Google and a design adaptable to multiple devices.",
    },
    solution: {
      es: "Después de reuniones con el cliente se llegó a la conclusión de que una landing page simple con un diseño único podría facilitar la presencia de la marca en la web, además de generar una impresión única.",
      en: "After meetings with the client, it was concluded that a simple landing page with a unique design could facilitate the presence of the brand on the web, in addition to generating a unique impression.",
    },
    results: {
      es: [
        "Página web adaptable a todos los dispositivos",
        "Incremento de la presencia de la marca en Google",
        "Diseño exclusivo",
        "Mantenimiento constante de la página",
      ],
      en: [
        "Website adaptable to all devices",
        "Increase in the presence of the brand in Google",
        "Exclusive design",
        "Page maintenance constant",
      ],
    },
    year: 2024,
    status: "active",
    deliveryType: "landing",
    industry: "consulting",
  },
  {
    slug: "fuddy-app",
    title: {
      en: "Fuddy App | Economic and accessible recipes",
      es: "Fuddy App | Recetas económicas y accesibles",
    },
    shortDescription: {
      en: "Economic recipes with AI",
      es: "Recetas de económicas con IA",
    },
    description: {
      en: "Web and Mobile application that makes use of artificial intelligence, designed to offer personalized recommendations of healthy and accessible recipes, ask you to enter your ingredients you have at home. Based on these criteria, the website analyzes the user's needs and suggests recipe options, taking into account factors such as diseases, allergies, and food preferences.",
      es: "Aplicación web y mobile que hace uso de inteligencia artificial, diseñada para ofrecer recomendaciones personalizadas de recetas saludables y accesibles, te solicita ingresar tus ingredientes que tengas en casa. Basado en esos criterios, la web analiza las necesidades del usuario y sugiere opciones de recetas, teniendo en cuenta factores como enfermedades, alergias, y preferencias alimenticias.",
    },

    color: "from-gray-600 to-gray-800",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    image: "/project-images/fuddy-app-image.png",
    demoUrl: "https://fuddy.click",
    challenge: {
      es: "La creciente falta de información clara, económica y accesible sobre nutrición, alimentación y creación de recetas hacia necesaria la creación de una herramienta que usara tecnología moderna.",
      en: "The growing lack of clear, economical and accessible information on nutrition, food and creation of recipes towards the creation of a tool that will use modern technology.",
    },
    solution: {
      es: "Una webapp completa que usando IA permite a un usuario consultar recetas con ingredientes que tenga en casa, ofreciéndole un paso a paso, información nutricional y permitiéndole guardar las recetas para verlas a posterior.",
      en: "A complete webpp that using AI allows a user to consult recipes with ingredients you have at home, offering a step by step, nutritional information and allowing you to save the recipes to see them later.",
    },
    results: {
      es: [
        "Newsletter con más de 100 suscriptores",
        "Lanzamiento en tiempo",
        "Escalado sin recursos de 3eros",
        "Aplicación de acceso libre",
      ],
      en: [
        "Newsletter with more than 100 subscribers",
        "Time launch",
        "Scaling without resources",
        "Free access application",
      ],
    },
    featured: false,
    year: 2024,
    status: "active",
    deliveryType: "mvp",
    industry: "food",
  },
  {
    slug: "mailprex",
    title: {
      en: "Mailprex WebApp",
      es: "Mailprex WebApp",
    },
    shortDescription: {
      en: "A SAAS for sending emails",
      es: "Un SAAS para enviar correos",
    },
    description: {
      en: "Mailprex is a web platform designed to simplify the process of sending forms from websites to emails. You can easily integrate a React Hook into your project, to which you pass the minimum data that allow the shipping and content of the form to reach your chosen email without major inconveniences.",
      es: "Mailprex es una plataforma web diseñada para simplificar el proceso de envío de formularios desde sitios web a correos electrónicos. Puedes integrar fácilmente un React Hook a tu proyecto, al cual le pasas los datos mínimos que permiten el envío y el contenido del formulario llega a tu correo elegido sin mayores inconvenientes.",
    },

    color: "from-blue-600 to-blue-800",
    tags: ["Next.js", "Express.js", "Node.js", "Tailwind", "TypeScript"],
    image: "/project-images/mailprex-app.png",
    demoUrl: "https://mailprex.excelso.xyz",
    githubUrl: "https://github.com/nitdraig/mailprex",
    challenge: {
      es: "Entre múltiples landing pages que administraba tenia siempre el inconveniente de crear desde 0 una sección de contacto, donde se enviasen emails de forma simple a través de un formulario de contacto.",
      en: "Among multiple landing pages that he administered always had the inconvenience of creating from 0 a contact section, where emails were sent simply through a contact form.",
    },
    solution: {
      es: "Se construyó una solución de SAAS, que esta deployada en vercel, posee un paquete de NPM, una pagina de documentación y una API propia.",
      en: "A SAAS solution was built, which is deployed in Vercel, has an NPM package, a documentation page and its own API.",
    },
    results: {
      es: [
        "Envio simplificado de emails",
        "Fácil implementación",
        "Capa gratuita extendida",
        "Seguridad web",
      ],
      en: [
        "Simplified emails",
        "Easy implementation",
        "Extended free layer",
        "Web security",
      ],
    },
    featured: false,
    year: 2024,
    status: "active",
    deliveryType: "platform",
    industry: "devtools",
  },
];
