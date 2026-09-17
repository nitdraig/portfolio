export interface Resource {
  id: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  highlights: {
    es: string[];
    en: string[];
  };
  tags: string[];
  coverImage?: string;
  downloadUrl: string;
  isFree: boolean;
  isNew: boolean;
  isFeatured: boolean;
  year: number;
}

export const resources: Resource[] = [
  {
    id: "context-engineering",
    title: {
      es: "Context Engineering: El Arte de Comunicar con IA",
      en: "Context Engineering: The Art of Communicating with AI",
    },
    subtitle: {
      es: "Enfocados a PMs y Developers, porque ya no alcanza con usar IA, hay que entender cómo hablarle bien.",
      en: "Focused on PMs and Developers, because it's no longer enough to use AI, you need to understand how to communicate with it well.",
    },
    description: {
      es: "Después de aplicar IA en proyectos reales como Fuddy, MiningTalentNet, Skipy, y más proyectos, descubrí que lo que marca la diferencia no es el prompt... es el contexto 🗺️",
      en: "After applying AI in real projects like Fuddy, MiningTalentNet, Skipy, and more projects, I discovered that what makes the difference is not the prompt... it's the context 🗺️",
    },
    highlights: {
      es: [
        "Qué es Context Engineering y cómo te posiciona como profesional",
        "Framework paso a paso para estructurar prompts útiles",
        "Templates de uso diario para gestión y desarrollo",
        "Ejemplos reales de cómo lo aplico en mis proyectos",
        "Mi checklist personal para integrarlo a cualquier equipo",
      ],
      en: [
        "What Context Engineering is and how it positions you as a professional",
        "Step-by-step framework to structure useful prompts",
        "Daily-use templates for management and development",
        "Real examples of how I apply it in my projects",
        "My personal checklist to integrate it into any team",
      ],
    },
    tags: ["PM", "Developers", "IA", "Context Engineering"],
    coverImage: "/resources/context-engineering.webp",
    downloadUrl: "https://skipy.click/wj3l7p",
    isFree: true,
    isNew: false,
    isFeatured: true,
    year: 2025,
  },
  {
    id: "metodo-freelance",
    title: {
      es: "Método Freelance: Exportar Soluciones Digitales, de Catamarca al Mundo",
      en: "Freelance Method: Exporting Digital Solutions, from Catamarca to the World",
    },
    subtitle: {
      es: "Un método probado para dejar de vender horas y empezar a vender soluciones de alto impacto al exterior.",
      en: "A proven method to stop selling hours and start selling high-impact solutions abroad.",
    },
    description: {
      es: "Nace de errores reales y proyectos para diversas startups en las que colaboré. Este ebook te muestra cómo construir una forma de trabajar profesional para que tu trabajo viaje más lejos que vos.",
      en: "Born from real mistakes and projects for various startups I collaborated with. This ebook shows you how to build a professional way of working so your work travels further than you do.",
    },
    highlights: {
      es: [
        "Las cuatro bases del método: Tú, Cómo, Plus y Cliente",
        "Cómo traducir ideas vagas en alcances técnicos claros",
        "Guía práctica de cobros: Payoneer, Stripe y DolarApp",
        "Estrategias para conseguir proyectos sin depender de una sola plataforma",
        "Resiliencia profesional: sistema antes que motivación",
      ],
      en: [
        "The four pillars of the method: You, How, Plus, and Client",
        "How to translate vague ideas into clear technical scopes",
        "Practical payment guide: Payoneer, Stripe, and DolarApp",
        "Strategies to get projects without depending on a single platform",
        "Professional resilience: system before motivation",
      ],
    },
    tags: [
      "Freelance",
      "Project Management",
      "Fullstack",
      "Catamarca",
      "Exportación de Servicios",
    ],
    coverImage: "/resources/freelance-method.webp",
    downloadUrl: "https://skipy.click/bjgmya",
    isFree: true,
    isNew: true,
    isFeatured: true,
    year: 2026,
  },
];
