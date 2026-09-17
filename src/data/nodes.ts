export type NodeKey =
  | "AI"
  | "CODE"
  | "PROJECTS"
  | "MVP"
  | "RESOURCES"
  | "CLIENTS"
  | "ABOUT"
  | "REASONING"
  | "ENVIRONMENT"
  | "AIDEV";

export const CONCEPTS: NodeKey[] = [
  "AI",
  "CODE",
  "PROJECTS",
  "MVP",
  "RESOURCES",
  "CLIENTS",
  "ABOUT",
  "REASONING",
  "ENVIRONMENT",
  "AIDEV",
];

export type BilingualText = { es: string; en: string };

function t(es: string, en: string): BilingualText {
  return { es, en };
}

export type ContentItem =
  | { title: BilingualText; text: BilingualText }
  | { name: string; meta: string; desc: BilingualText; links: { label: string; url: string }[] }
  | { title: BilingualText; author: string; type: BilingualText; link: string }
  | { quote: BilingualText; author: string; role: string; companyName?: string; companyUrl?: string }
  | { date: string; role: BilingualText; company: string; url?: string };

export type NodeContent =
  | { type: "list"; title: BilingualText; items: { title: BilingualText; text: BilingualText }[] }
  | { type: "tools"; title: BilingualText; items: { name: string; meta: string; desc: BilingualText; links: { label: string; url: string }[] }[] }
  | { type: "projects" }
  | { type: "resources"; title: BilingualText; items: { title: BilingualText; author: string; type: BilingualText; link: string }[] }
  | { type: "testimonials"; title: BilingualText; items: { quote: BilingualText; author: string; role: string; companyName?: string; companyUrl?: string }[] }
  | { type: "timeline"; title: BilingualText; items: { date: string; role: BilingualText; company: string; url?: string }[] };

export type NodeDetail = {
  intro: BilingualText;
  sections: { title: BilingualText; text: BilingualText }[];
  links?: { label: string; url: string }[];
  image?: string;
  imageAlt?: string;
};

export type NodeData = {
  tag: string;
  title: BilingualText;
  desc: BilingualText;
  chips: string[];
  content: NodeContent;
  detail: NodeDetail;
};

export const NODE_DATA: Record<NodeKey, NodeData> = {
  AI: {
    tag: "CAPABILITY",
    title: t("Inteligencia Artificial", "Artificial Intelligence"),
    desc: t(
      "No uso la IA para generar más rápido. La uso para pensar con más disciplina. Diseñé Lexis, un ecosistema propio de agentes para desarrollo de software.",
      "I don't use AI to generate faster. I use it to think with more discipline. I designed Lexis, my own agent ecosystem for software development."
    ),
    chips: ["Lexis", "Agents", "Context Engineering", "Anti-prompt-theater"],
    content: {
      type: "list",
      title: t("Cómo uso la IA", "How I use AI"),
      items: [
        {
          title: t("Disciplina sobre velocidad", "Discipline over speed"),
          text: t(
            "La IA no es un mago al que le pedís un deseo, es un colaborador técnico al que hay que darle contexto, roles, restricciones y criterios de revisión.",
            "AI is not a genie you make wishes to. It's a technical collaborator that needs context, roles, constraints, and review criteria."
          ),
        },
        {
          title: t("Ecosistema Lexis", "Lexis ecosystem"),
          text: t(
            "Ecosistema propio de agentes especializados que no premia la velocidad ciega sino el criterio. Cada agente tiene un rol definido y boundaries claros.",
            "A proprietary ecosystem of specialized agents that rewards judgment, not blind speed. Each agent has a defined role and clear boundaries."
          ),
        },
        {
          title: t("Context Engineering", "Context Engineering"),
          text: t(
            "No importa tanto qué le pedís a la IA, importa cómo se lo pedís y qué controles le ponés alrededor. Escribí un ebook completo sobre esto.",
            "What you ask AI matters less than how you ask it and what controls you wrap around it. I wrote a full ebook about this."
          ),
        },
        {
          title: t("La escalera", "The ladder"),
          text: t(
            "¿Esto necesita existir? ¿Ya lo resuelve el lenguaje? ¿Ya lo resuelve algo instalado? ¿Puede ser una sola línea? Solo si nada alcanza, se construye código nuevo.",
            "Does this need to exist? Does the language already solve it? Does the platform? Can it be one line? Only if nothing else works do we write new code."
          ),
        },
      ],
    },
    detail: {
      intro: t(
        "Acá es donde probablemente me diferencio más, y prefiero ser honesto en vez de vendedor: no uso la IA para generar más rápido. La uso para pensar con más disciplina. Le llamo anti-teatro de prompts: la IA no es un mago, es un colaborador técnico.",
        "This is where I probably differ the most, and I'd rather be honest than salesy: I don't use AI to generate faster. I use it to think with more discipline. I call it anti-prompt-theater: AI is not a magician, it's a technical collaborator."
      ),
      sections: [
        {
          title: t("Anti-teatro de prompts", "Anti-prompt-theater"),
          text: t(
            "La IA no es un mago al que le pedís un deseo, es un colaborador técnico al que hay que darle contexto, roles, restricciones y criterios de revisión, igual que a cualquier persona del equipo. Antes de que un agente escriba una sola línea, tiene que pasar por una escalera de decisión.",
            "AI is not a genie you make wishes to. It's a technical collaborator that needs context, roles, constraints, and review criteria, just like any team member. Before an agent writes a single line, it must pass a decision ladder."
          ),
        },
        {
          title: t("La escalera", "The ladder"),
          text: t(
            "¿Esto necesita existir? (YAGNI). ¿Stdlib lo hace? ¿La plataforma lo resuelve? ¿Ya hay algo instalado? ¿Puede ser una sola línea? Solo si nada de eso alcanza, se construye código nuevo — el mínimo que funciona bajo condiciones reales.",
            "Does this need to exist? (YAGNI). Does the stdlib do it? Does the platform solve it? Is something already installed? Can it be one line? Only if none of that works do we build new code — the minimum that works under real conditions."
          ),
        },
        {
          title: t("Context Engineering", "Context Engineering"),
          text: t(
            "No importa tanto qué le pedís a la IA, importa cómo se lo pedís y qué controles le ponés alrededor. Escribí un ebook completo sobre esto porque me lo preguntan seguido. El criterio no se delega.",
            "What you ask AI matters less than how you ask it and what controls you wrap around it. I wrote a full ebook because people ask about it often. Judgment is not delegated."
          ),
        },
      ],
      links: [
        { label: "Ebook Context Engineering", url: "https://skipy.click/wj3l7p" },
        { label: "Lexis ecosystem", url: "https://lexis-two.excelso.xyz" },
      ],
    },
  },
  CODE: {
    tag: "STACK",
    title: t("Código", "Code"),
    desc: t(
      "Stack moderno, pero la tecnología nunca es el punto de partida. El punto de partida es siempre: qué es lo mínimo que resuelve esto de verdad.",
      "Modern stack, but technology is never the starting point. The starting point is always: what is the minimum that actually solves this?"
    ),
    chips: ["TypeScript", "React", "Next.js", "Node.js"],
    content: {
      type: "tools",
      title: t("Herramientas open source", "Open source tools"),
      items: [
        {
          name: "Lexis",
          meta: "Multi-agent ecosystem · TypeScript",
          desc: t(
            "Ecosistema de agentes para shipping de apps web con disciplina de ingeniería. Planificación, implementación, review, refactor y seguridad coordinados.",
            "Agent ecosystem for shipping web apps with engineering discipline. Planning, implementation, review, refactor, and security coordinated."
          ),
          links: [{ label: "GitHub", url: "https://github.com/nitdraig/lexis-two" }],
        },
        {
          name: "Encrypt-D",
          meta: "Folder encryption · Windows",
          desc: t(
            "Gestor profesional de carpetas encriptadas con AES-256-GCM. Parte de Excelso Open.",
            "Professional encrypted folder manager using AES-256-GCM. Part of Excelso Open."
          ),
          links: [{ label: "GitHub", url: "https://github.com/nitdraig/encrypt-d" }],
        },
        {
          name: "Skipy",
          meta: "Developer multi-tool · Web",
          desc: t(
            "Multi-tool web open-source para simplificar tareas repetitivas de developers, QA, DevOps e IT.",
            "Open-source web multi-tool to simplify repetitive tasks for developers, QA, DevOps, and IT."
          ),
          links: [{ label: "GitHub", url: "https://github.com/nitdraig/skipy" }],
        },
      ],
    },
    detail: {
      intro: t(
        "Stack moderno — React, Next.js, Node.js, TypeScript, Python — pero la tecnología nunca es el punto de partida. El punto de partida es siempre: qué es lo mínimo que resuelve esto de verdad. Prefiero un one-liner aburrido a una abstracción elegante que nadie pidió.",
        "Modern stack — React, Next.js, Node.js, TypeScript, Python — but technology is never the starting point. The starting point is always: what is the minimum that actually solves this. I prefer a boring one-liner to an elegant abstraction nobody asked for."
      ),
      sections: [
        {
          title: t("Frontend", "Frontend"),
          text: t(
            "React, Next.js, Tailwind CSS, TanStack Query. Server components cuando aportan, client components solo cuando hay interactividad. Componentes compostables, nada más.",
            "React, Next.js, Tailwind CSS, TanStack Query. Server components when they add value, client components only when there's interactivity. Composable components, nothing more."
          ),
        },
        {
          title: t("Backend", "Backend"),
          text: t(
            "Node.js con Express o Fastify, TypeScript estricto. APIs REST limpias, validación en boundary, error handling centralizado. MongoDB/Mongoose o Prisma según el caso.",
            "Node.js with Express or Fastify, strict TypeScript. Clean REST APIs, validation at boundaries, centralized error handling. MongoDB/Mongoose or Prisma depending on the case."
          ),
        },
        {
          title: t("Cómo código", "How I code"),
          text: t(
            "Reviso mis propios cambios buscando sobre-ingeniería antes de que alguien más tenga que hacerlo. Y cuando tomo un atajo consciente, lo dejo marcado en el código para volver después — no escondido, documentado.",
            "I review my own changes looking for over-engineering before someone else has to. And when I take a conscious shortcut, I mark it in the code to revisit later — not hidden, documented."
          ),
        },
      ],
      links: [{ label: "GitHub", url: "https://github.com/nitdraig" }],
    },
  },
  PROJECTS: {
    tag: "PORTFOLIO",
    title: t("Proyectos", "Projects"),
    desc: t(
      "20+ productos shippeados. Cada proyecto aporta patrones que se reutilizan en el siguiente. Filtrá por lo que necesites.",
      "20+ shipped products. Each project contributes patterns reused in the next one. Filter by what you need."
    ),
    chips: ["SaaS", "Fintech", "Social", "Automation"],
    content: { type: "projects" },
    detail: {
      intro: t(
        "Cada proyecto es un caso de resolución de problemas reales. No hago demos; construyo productos que la gente usa y paga. Aquí van los patrones que más se repiten.",
        "Every project is a real problem-solving case. I don't build demos; I build products people use and pay for. These are the patterns that repeat the most."
      ),
      sections: [
        {
          title: t("Qué puedo construir", "What I can build"),
          text: t(
            "Onboarding en simples pasos, dashboards con métricas accionables, sistemas de notificación por eventos, y MVPs que shippean en semanas, páginas de aterrizaje para tu idea/proyecto/empresa.",
            "Simple-step onboarding, dashboards with actionable metrics, event-driven notification systems, MVPs that ship in weeks, landing pages for your idea/project/company."
          ),
        },
        {
          title: t("Industrias", "Industries"),
          text: t(
            "Healthcare, fintech, education, sustainability, developer tools, management. La industria define las constraints; el patrón de producto se reutiliza.",
            "Healthcare, fintech, education, sustainability, developer tools, management. The industry defines the constraints; the product pattern is reused."
          ),
        },
        {
          title: t("Cómo trabajo", "How I work"),
          text: t(
            "Descubrimiento → validación → MVP → iteración. Cada fase tiene un entregable tangible. No sigo adelante sin validar la hipótesis clave.",
            "Discovery → validation → MVP → iteration. Each phase has a tangible deliverable. I don't move forward without validating the key hypothesis."
          ),
        },
      ],
      links: [{ label: "Desarrollar mi idea", url: "#" }],
    },
  },
  MVP: {
    tag: "PROCESS",
    title: t("MVP", "MVP"),
    desc: t(
      "No entrego código: entrego un proceso. Discovery antes de especificación, especificación antes de implementación, revisión antes de cerrar.",
      "I don't deliver code: I deliver a process. Discovery before specification, specification before implementation, review before closing."
    ),
    chips: ["Lean", "Validation", "Ship", "Iterate"],
    content: {
      type: "list",
      title: t("Por qué MVP primero", "Why MVP first"),
      items: [
        {
          title: t("Reducir riesgo", "Reduce risk"),
          text: t(
            "Validás la hipótesis clave antes de invertir meses en features no prioritarias.",
            "Validate the key hypothesis before investing months in non-priority features."
          ),
        },
        {
          title: t("Rapidez para aprender", "Speed to learn"),
          text: t(
            "En 2-4 semanas tenés usuarios reales dando feedback sobre algo tangible.",
            "In 2-4 weeks you have real users giving feedback on something tangible."
          ),
        },
        {
          title: t("Enfoque", "Focus"),
          text: t(
            "Obliga a definir el loop de valor central y descartar lo demás.",
            "Forces you to define the central value loop and discard the rest."
          ),
        },
        {
          title: t("Disciplina", "Discipline"),
          text: t(
            "Discovery → validación → MVP → iteración. Cada fase tiene un entregable tangible. No sigo adelante sin validar la hipótesis clave.",
            "Discovery → validation → MVP → iteration. Each phase has a tangible deliverable. I don't move forward without validating the key hypothesis."
          ),
        },
      ],
    },
    detail: {
      intro: t(
        "Un MVP exitoso no es el que shippea más rápido, sino el que aprende más con menos. No entrego código: entrego un proceso. Discovery antes de especificación, especificación antes de implementación, revisión antes de cerrar. Esa disciplina viene de años colaborando con equipos reales.",
        "A successful MVP is not the one that ships fastest, but the one that learns the most with the least. I don't deliver code: I deliver a process. Discovery before specification, specification before implementation, review before closing. That discipline comes from years of collaborating with real teams."
      ),
      sections: [
        {
          title: t("El proceso", "The process"),
          text: t(
            "Week 1: Discovery + hipótesis. Week 2-3: Build el loop central. Week 4: Release a early users + instrumentar. Week 5+: Iterar con datos reales. Cada fase tiene un entregable tangible.",
            "Week 1: Discovery + hypothesis. Week 2-3: Build the core loop. Week 4: Release to early users + instrument. Week 5+: Iterate with real data. Each phase has a tangible deliverable."
          ),
        },
        {
          title: t("Qué se descarta", "What gets cut"),
          text: t(
            "Perfiles de usuario elaborados, dashboards admin, settings avanzados, integración con 3ros, y todo lo que no contribuye a validar la hipótesis central.",
            "Elaborate user profiles, admin dashboards, advanced settings, third-party integrations, and anything that doesn't help validate the central hypothesis."
          ),
        },
        {
          title: t("Métrica de éxito", "Success metric"),
          text: t(
            "No es features shipped; es aprendizaje por semana. Si después de 4 semanas no sabés más que al inicio, el MVP falló. Un MVP no es un producto roto; es la versión mínima que permite aprender algo real.",
            "It's not features shipped; it's learning per week. If after 4 weeks you don't know more than at the start, the MVP failed. An MVP is not a broken product; it's the minimum version that lets you learn something real."
          ),
        },
      ],
    },
  },
  RESOURCES: {
    tag: "LIBRARY",
    title: t("Recursos", "Resources"),
    desc: t(
      "Ebooks gratuitos, blog, publicaciones en LinkedIn y artículos. Context Engineering y Método Freelance, disponibles para descarga.",
      "Free ebooks, blog, LinkedIn posts, and articles. Context Engineering and Método Freelance available for download."
    ),
    chips: ["Context Engineering", "Método Freelance", "Blog", "LinkedIn"],
    content: {
      type: "resources",
      title: t("Recursos", "Resources"),
      items: [
        {
          title: t("Context Engineering: El Arte de Comunicar con IA", "Context Engineering: The Art of Communicating with AI"),
          author: "Agustín Avellaneda",
          type: t("Ebook · 2025", "Ebook · 2025"),
          link: "https://skipy.click/wj3l7p",
        },
        {
          title: t("Método Freelance: Exportar Soluciones Digitales", "Freelance Method: Exporting Digital Solutions"),
          author: "Agustín Avellaneda",
          type: t("Ebook · 2026", "Ebook · 2026"),
          link: "https://skipy.click/bjgmya",
        },
        {
          title: t("Blog", "Blog"),
          author: "Agustín Avellaneda",
          type: t("Artículos", "Articles"),
          link: "https://blog.agustin.top",
        },
        {
          title: t("LinkedIn Articles", "LinkedIn Articles"),
          author: "Agustín Avellaneda",
          type: t("Publicaciones", "Posts"),
          link: "https://www.linkedin.com/in/avellaneda-agustin/recent-activity/articles/",
        },
      ],
    },
    detail: {
      intro: t(
        "Dos ebooks gratuitos nacidos de proyectos reales, un blog y publicaciones en LinkedIn donde comparto artículos sobre product engineering, IA aplicada y lecciones de proyectos reales.",
        "Two free ebooks born from real projects, a blog, and LinkedIn posts where I share articles on product engineering, applied AI, and lessons from real projects."
      ),
      sections: [
        {
          title: t("Context Engineering", "Context Engineering"),
          text: t(
            "Después de aplicar IA en proyectos reales como Fuddy, Mining Talent Net y otros, descubrí que lo que marca la diferencia no es el prompt, es el contexto. Framework paso a paso, templates de uso diario, ejemplos reales y checklist personal.",
            "After applying AI in real projects like Fuddy, Mining Talent Net, and others, I discovered that what makes the difference is not the prompt, but the context. Step-by-step framework, daily-use templates, real examples, and a personal checklist."
          ),
        },
        {
          title: t("Método Freelance", "Freelance Method"),
          text: t(
            "Nace de errores reales y proyectos para diversas startups. Cómo construir una forma de trabajar profesional para que tu trabajo viaje más lejos que vos. Las cuatro bases del método, cobros con Payoneer/Stripe/DolarApp, y estrategias para conseguir proyectos.",
            "Born from real mistakes and projects for various startups. How to build a professional way of working so your work travels farther than you. The four bases of the method, payments with Payoneer/Stripe/DolarApp, and strategies to get projects."
          ),
        },
        {
          title: t("Blog", "Blog"),
          text: t(
            "Artículos sobre product engineering, IA aplicada, lecciones de proyectos reales y reflections sobre el trabajo como developer y PM.",
            "Articles on product engineering, applied AI, lessons from real projects, and reflections on working as a developer and PM."
          ),
        },
        {
          title: t("LinkedIn", "LinkedIn"),
          text: t(
            "Publicaciones periódicas sobre tecnología, product engineering y experiencias reales de desarrollo. Artículos cortos con insights accionables.",
            "Regular posts on technology, product engineering, and real development experiences. Short articles with actionable insights."
          ),
        },
      ],
      links: [
        { label: "Context Engineering (descarga)", url: "https://skipy.click/wj3l7p" },
        { label: "Método Freelance (descarga)", url: "https://skipy.click/bjgmya" },
        { label: "Blog", url: "https://blog.agustin.top" },
        { label: "LinkedIn Articles", url: "https://www.linkedin.com/in/avellaneda-agustin/recent-activity/articles/" },
      ],
    },
  },
  CLIENTS: {
    tag: "TESTIMONIALS",
    title: t("Clientes", "Clients"),
    desc: t(
      "Años colaborando con equipos reales: IcarisTech, InkuA, Fuddy, Experimental Global, Around notes, Cliniweb, Excelso. Los retrabajos justos, sorpresas acordes, plazos que se cumplen.",
      "Years collaborating with real teams: IcarisTech, InkuA, Fuddy, Experimental Global, Around Notes, Cliniweb, Excelso. Fair rework, aligned surprises, deadlines met."
    ),
    chips: ["Founders", "Teams", "Products"],
    content: {
      type: "testimonials",
      title: t("Qué dicen mis clientes", "What my clients say"),
      items: [
        {
          quote: t(
            "Trabajar con Agustín es una de esas experiencias que confirman que el talento joven está más vivo que nunca. Lo conocí en una charla, le compartí una idea, y al toque estábamos trabajando juntos con una sintonía que no es fácil de lograr. Lo que más destaco no es solo su capacidad de materializar cualquier visión, sino el cuidado estético con el que lo hace: limpio, moderno, con criterio.",
            "Working with Agustín is one of those experiences that confirms young talent is more alive than ever. I met him at a talk, shared an idea, and right away we were working together with a synergy that isn't easy to achieve. What I highlight most is not only his ability to materialize any vision, but the aesthetic care with which he does it: clean, modern, with judgment."
          ),
          author: "Emiliano Salas Porta",
          role: "CEO",
          companyName: "MeetMyRace",
          companyUrl: "https://meetmyrace.com",
        },
        {
          quote: t(
            "Excepcionalmente talentoso, flexible, buen ojo para frontend y sus detalles. Confiable.",
            "Exceptionally talented, flexible, good eye for frontend and its details. Reliable."
          ),
          author: "Mike Massoud",
          role: "CEO",
          companyName: "AroundNotes",
          companyUrl: "https://aroundnotes.com",
        },
        {
          quote: t(
            "Agustín ha demostrado una notoria habilidad para transformar visiones complejas en productos tangibles. Su enfoque es práctico y orientado a resultados, con una responsabilidad y disciplina que garantizan el cumplimiento de los plazos.",
            "Agustín has shown a notable ability to transform complex visions into tangible products. His approach is practical and results-oriented, with a responsibility and discipline that guarantee deadlines are met."
          ),
          author: "Pablo Vegvarel",
          role: "CEO",
          companyName: "Experimental Global",
          companyUrl: "https://experimental.global",
        },
        {
          quote: t(
            "Agustín es un individuo excepcionalmente inteligente y estratégico, capaz de abordar los desafíos más complejos con claridad y precisión. Su profesionalismo y su capacidad para pensar a largo plazo lo convierten en un contribuyente invaluable a cualquier equipo.",
            "Agustín is an exceptionally intelligent and strategic individual, able to tackle the most complex challenges with clarity and precision. His professionalism and long-term thinking make him an invaluable contributor to any team."
          ),
          author: "Manuel Esteban Florez Lopez",
          role: "CTO",
          companyName: "InkuA",
          companyUrl: "https://inkua.de",
        },
      ],
    },
    detail: {
      intro: t(
        "El trabajo con clientes se mide en resultados, no en líneas de código. Años colaborando con equipos reales — IcarisTech, InkuA, Fuddy, Experimental Global, Around notes, Cliniweb, Excelso — y se nota en algo simple: los retrabajos justos, sorpresas acordes, plazos que se cumplen.",
        "Client work is measured in results, not lines of code. Years collaborating with real teams — IcarisTech, InkuA, Fuddy, Experimental Global, Around Notes, Cliniweb, Excelso — and it shows in something simple: fair rework, aligned surprises, deadlines met."
      ),
      sections: [
        {
          title: t("Cómo colaboro", "How I collaborate"),
          text: t(
            "Trabajo directo con founders y product leads. No necesito un PM intermedio; hablo el lenguaje del negocio y del código. Reuniones cortas, entregables claros, iteración constante.",
            "I work directly with founders and product leads. I don't need an intermediate PM; I speak the language of business and code. Short meetings, clear deliverables, constant iteration."
          ),
        },
        {
          title: t("Modelo de trabajo", "Work model"),
          text: t(
            "De discovery a deploy: scope acotado, milestone-based, comunicación semanal con demos funcionales. Sin sorpresas, sin scope creep.",
            "From discovery to deploy: scoped scope, milestone-based, weekly communication with working demos. No surprises, no scope creep."
          ),
        },
        {
          title: t("Post-lanzamiento", "Post-launch"),
          text: t(
            "Soporte post-launch incluido en el alcance. No desaparezco después del deploy. Si algo rompe, lo arreglo. Si hay learnings, los documentamos.",
            "Post-launch support included in scope. I don't disappear after deploy. If something breaks, I fix it. If there are learnings, we document them."
          ),
        },
      ],
    },
  },
  ABOUT: {
    tag: "BIO",
    title: t("Sobre mí", "About"),
    desc: t(
      "PM y Fullstack Developer, fundador de Excelso. Catamarca, Argentina.",
      "PM and Fullstack Developer, founder of Excelso. Catamarca, Argentina."
    ),
    chips: ["Experiencia", "Trayectoria", "Contacto"],
    content: {
      type: "timeline",
      title: t("Experiencia", "Experience"),
      items: [
        { date: "2025 — Present", role: t("Founder, Developer & PM", "Founder, Developer & PM"), company: "Excelso", url: "https://excelso.xyz" },
        { date: "Jul 2026 — Present", role: t("Fullstack Developer SSR", "Fullstack Developer SSR"), company: "Cliniweb", url: "https://www.cliniweb.com" },
        { date: "Jan 2026 - Present", role: t("PartTime CTO", "PartTime CTO"), company: "Experimental Global", url: "https://experimental.global" },
        { date: "Jul 2025 — Ago 2026", role: t("Front-end Developer SSR", "Front-end Developer SSR"), company: "Around Notes", url: "https://aroundnotes.ai" },
        { date: "Sep 2024 — Jan 2025", role: t("Web Dev Project Manager", "Web Dev Project Manager"), company: "IcarisTech", url: "" },
        { date: "Apr 2024 - Sep 2024", role: t("Product Owner & IT PM", "Product Owner & IT PM"), company: "InkuA", url: "https://inkua.eu" },
        { date: "Ago 2023 — Mar 2024", role: t("Founder, PM & Fullstack Dev", "Founder, PM & Fullstack Dev"), company: "Fuddy", url: "https://fuddy.click" },
        { date: "Apr 2018 — Dic 2023", role: t("Multimedia Editor & Dev", "Multimedia Editor & Dev"), company: "Tinta Negra Studios", url: "https://tns.agustin.top" },
        { date: "Jan 2023 - May 2023", role: t("Front-End Developer", "Front-End Developer"), company: "Advance Valley", url: "" },
      ],
    },
    detail: {
      image: "/profile.webp",
      imageAlt: "Agustín Avellaneda",
      intro: t(
        "Empecé lejos de donde se supone que empiezan estas historias: Catamarca, Argentina, con un título de Técnico Minero y meses de trabajo de campo en el Salar del Hombre Muerto. Nada de eso suena a developer. Y sin embargo es exactamente ahí donde aprendí lo que hoy uso todos los días: que un sistema complejo no se entiende mirando una sola pieza, sino las relaciones entre todas.",
        "I started far from where these stories are supposed to begin: Catamarca, Argentina, with a Mining Technician degree and months of field work in the Salar del Hombre Muerto. None of that sounds like a developer. And yet that's exactly where I learned what I use every day: that a complex system isn't understood by looking at one piece, but at the relationships between all of them."
      ),
      sections: [
        {
          title: t("Qué me mueve", "What drives me"),
          text: t(
            "Resolver problemas reales con herramientas simples. No me interesa la tecnología por la tecnología; me interesa qué cambia en la vida de alguien cuando el producto funciona. Soy PM porque necesito ordenar. Soy developer porque necesito poder ejecutar lo que ordeno.",
            "Solving real problems with simple tools. I'm not interested in technology for technology's sake; I care about what changes in someone's life when the product works. I'm a PM because I need to organize. I'm a developer because I need to execute what I organize."
          ),
        },
        {
          title: t("Cómo trabajo", "How I work"),
          text: t(
            "Discovery antes de especificación, especificación antes de implementación, revisión antes de cerrar. Trabajo directo con founders y product leads, sin PM intermedio. Reuniones cortas, entregables claros, iteración constante.",
            "Discovery before specification, specification before implementation, review before closing. I work directly with founders and product leads, no intermediate PM. Short meetings, clear deliverables, constant iteration."
          ),
        },
        {
          title: t("Qué busco", "What I'm looking for"),
          text: t(
            "Problemas interesantes, equipos que valoran la claridad, y productos donde la calidad técnica importa porque el producto importa. Si buscás a alguien que ordene el problema, construya con criterio y te acompañe con la cabeza puesta en el resultado, hablemos.",
            "Interesting problems, teams that value clarity, and products where technical quality matters because the product matters. If you're looking for someone who organizes the problem, builds with judgment, and accompanies you with eyes on the result, let's talk."
          ),
        },
      ],
      links: [
        { label: "me@agustin.top", url: "#" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/avellaneda-agustin/" },
        { label: "GitHub", url: "https://github.com/nitdraig" },
      ],
    },
  },
  REASONING: {
    tag: "MINDSET",
    title: t("Mentalidad", "Reasoning"),
    desc: t(
      "No creo en las instrucciones perfectas. Mi trabajo es traducir caos en alcance claro, antes de escribir la primera línea de código.",
      "I don't believe in perfect instructions. My job is to translate chaos into clear scope before writing the first line of code."
    ),
    chips: ["First Principles", "Simplicity", "Measurement"],
    content: {
      type: "list",
      title: t("Cómo pienso", "How I think"),
      items: [
        {
          title: t("Primeros principios", "First principles"),
          text: t(
            "Desarmo el problema hasta sus partes irreducibles antes de elegir solución.",
            "I break down the problem into irreducible parts before choosing a solution."
          ),
        },
        {
          title: t("Aburrido sobre inteligente", "Boring over clever"),
          text: t(
            "Prefiero un one-liner aburrido a una abstracción elegante que nadie pidió. Reviso mis propios cambios buscando sobre-ingeniería.",
            "I prefer a boring one-liner to an elegant abstraction nobody asked for. I review my own changes looking for over-engineering."
          ),
        },
        {
          title: t("Medir primero", "Measure first"),
          text: t(
            "No optimizo por intuición. Agrego instrumentación antes de cambiar cualquier sistema.",
            "I don't optimize by intuition. I add instrumentation before changing any system."
          ),
        },
        {
          title: t("Lanzar para aprender", "Ship to learn"),
          text: t(
            "El feedback real vale más que cualquier debate de arquitectura en una sala.",
            "Real feedback is worth more than any architecture debate in a room."
          ),
        },
      ],
    },
    detail: {
      intro: t(
        "Los clientes y la realidad casi nunca dan instrucciones perfectas. Mi trabajo es traducir caos en alcance claro, antes de escribir la primera línea de código. Eso es más gestión que programación, pero es lo que hace que un producto llegue a destino sin explotar en el camino.",
        "Clients and reality almost never give perfect instructions. My job is to translate chaos into clear scope before writing the first line of code. That's more management than programming, but it's what makes a product reach its destination without exploding along the way."
      ),
      sections: [
        {
          title: t("PM + Developer", "PM + Developer"),
          text: t(
            "Soy PM porque necesito ordenar. Soy developer porque necesito poder ejecutar lo que ordeno. Un perfil no reemplaza al otro: se sostienen. La gestión sin ejecución es un PowerPoint; la ejecución sin gestión es código huérfano.",
            "I'm a PM because I need to organize. I'm a developer because I need to execute what I organize. One profile doesn't replace the other: they support each other. Management without execution is a PowerPoint; execution without management is orphan code."
          ),
        },
        {
          title: t("Decisiones", "Decisions"),
          text: t(
            "Cada decisión técnica tiene un costo: complejidad, tiempo, deuda. Elijo la opción que maximiza aprendizaje por esfuerzo. Si no sé cuál es, mido antes de decidir. Y cuando tomo un atajo consciente, lo dejo marcado en el código para volver después.",
            "Every technical decision has a cost: complexity, time, debt. I choose the option that maximizes learning per effort. If I don't know which one, I measure before deciding. And when I take a conscious shortcut, I mark it in the code to revisit later."
          ),
        },
        {
          title: t("Iteración", "Iteration"),
          text: t(
            "No planifico 6 meses adelante. Planifico 2 semanas, shippeo, aprendo, y replanifico. La iteración corta es mi herramienta de gestión principal. Los retrabajos justos, sorpresas acordes, plazos que se cumplen.",
            "I don't plan 6 months ahead. I plan 2 weeks, ship, learn, and replan. Short iteration is my main management tool. Fair rework, aligned surprises, deadlines met."
          ),
        },
      ],
    },
  },
  ENVIRONMENT: {
    tag: "SCIENCE",
    title: t("Medio Ambiente", "Environment"),
    desc: t(
      "Técnico Minero y Licenciado en Ciencias Ambientales. Aprendí en el Salar del Hombre Muerto que un sistema complejo no se entiende mirando una sola pieza.",
      "Mining Technician and Environmental Sciences graduate. I learned in the Salar del Hombre Muerto that a complex system isn't understood by looking at one piece."
    ),
    chips: ["Sustainability", "Systems thinking", "JEMA", "Impact"],
    content: {
      type: "list",
      title: t("Mirada ambiental", "Environmental lens"),
      items: [
        {
          title: t("Experiencia de campo", "Field experience"),
          text: t(
            "Trabajo de campo en el Salar del Hombre Muerto. Ese cambio de mirada — ver relaciones entre piezas, no piezas aisladas — nunca lo abandoné.",
            "Field work in the Salar del Hombre Muerto. That shift in perspective — seeing relationships between pieces, not isolated pieces — I never abandoned."
          ),
        },
        {
          title: t("Pensamiento sistémico", "Systems thinking"),
          text: t(
            "Abordo los problemas como sistemas interconectados, no como síntomas aislados. Esto aplica a ecosistemas, proyectos de software y equipos.",
            "I approach problems as interconnected systems, not isolated symptoms. This applies to ecosystems, software projects, and teams."
          ),
        },
        {
          title: t("JEMA", "JEMA"),
          text: t(
            "Agente de IA para transparencia ambiental en industrias extractivas. Monitorea compliance, detecta anomalías y genera reportes ejecutivos.",
            "AI agent for environmental transparency in extractive industries. Monitors compliance, detects anomalies, and generates executive reports."
          ),
        },
        {
          title: t("Sustainability by design", "Sustainability by design"),
          text: t(
            "Considero impacto ambiental y social en las decisiones de producto. En mi investigación sobre IA aplicada a auditoría ambiental, la IA acelera y detecta, pero el juicio final no se delega.",
            "I consider environmental and social impact in product decisions. In my research on AI applied to environmental auditing, AI accelerates and detects, but final judgment is not delegated."
          ),
        },
      ],
    },
    detail: {
      intro: t(
        "Empecé lejos de donde se supone que empiezan estas historias: Catamarca, Argentina, con un título de Técnico Minero y meses de trabajo de campo en el Salar del Hombre Muerto. Nada de eso suena a developer. Y sin embargo es exactamente ahí donde aprendí lo que hoy uso todos los días: que un sistema complejo — un ecosistema, un proyecto de software, un equipo — no se entiende mirando una sola pieza, sino las relaciones entre todas.",
        "I started far from where these stories are supposed to begin: Catamarca, Argentina, with a Mining Technician degree and months of field work in the Salar del Hombre Muerto. None of that sounds like a developer. And yet that's exactly where I learned what I use every day: that a complex system — an ecosystem, a software project, a team — isn't understood by looking at one piece, but at the relationships between all of them."
      ),
      sections: [
        {
          title: t("JEMA", "JEMA"),
          text: t(
            "Agente de IA diseñado para monitorear y reportar compliance ambiental en industrias extractivas. Automatiza la recopilación de datos, detecta anomalías y genera reportes ejecutivos.",
            "AI agent designed to monitor and report environmental compliance in extractive industries. Automates data collection, detects anomalies, and generates executive reports."
          ),
        },
        {
          title: t("Enfoque sistémico", "Systems approach"),
          text: t(
            "Aplico pensamiento sistémico a productos digitales: no optimizo un componente sin entender su impacto en el sistema completo. Esto evita soluciones que rompen otra parte. Solo cambié el terreno.",
            "I apply systems thinking to digital products: I don't optimize one component without understanding its impact on the whole system. This prevents solutions that break another part. Only the terrain changed."
          ),
        },
        {
          title: t("Investigación", "Research"),
          text: t(
            "Investigación académica sobre IA aplicada a auditoría ambiental. La IA acelera y detecta, pero el juicio final — técnico, ético, humano — no se delega. Eso no es una limitación de la tecnología. Es una decisión de diseño.",
            "Academic research on AI applied to environmental auditing. AI accelerates and detects, but final judgment — technical, ethical, human — is not delegated. That is not a limitation of technology. It is a design decision."
          ),
        },
      ],
      links: [{ label: "JEMA project", url: "https://jema.excelso.xyz" }],
    },
  },
  AIDEV: {
    tag: "AGENTS",
    title: t("Soluciones IA", "AI Development"),
    desc: t(
      "Construyo agentes, automatizaciones y tools que amplifican la capacidad de los equipos. Parte de Excelso Open, disponible públicamente.",
      "I build agents, automations, and tools that amplify team capacity. Part of Excelso Open, publicly available."
    ),
    chips: ["Lexis-Two", "Agents", "Automation", "Excelso Open"],
    content: {
      type: "list",
      title: t("Soluciones de IA", "AI solutions"),
      items: [
        {
          title: t("Lexis-One", "Lexis-One"),
          text: t(
            "Lead agent fullstack: planifica, arquitecta e implementa features de punta a punta.",
            "Fullstack lead agent: plans, architects, and implements end-to-end features."
          ),
        },
        {
          title: t("Lexis-Two", "Lexis-Two"),
          text: t(
            "Lazy senior developer: el camino más corto que funciona. Stdlib primero, código nuevo como último recurso.",
            "Lazy senior developer: the shortest path that works. Stdlib first, new code as a last resort."
          ),
        },
        {
          title: t("Lexis-Review", "Lexis-Review"),
          text: t(
            "Quality gate: revisa código buscando sobre-ingeniería, bugs y breaking changes antes de merge.",
            "Quality gate: reviews code looking for over-engineering, bugs, and breaking changes before merge."
          ),
        },
        {
          title: t("Lexis ecosystem", "Lexis ecosystem"),
          text: t(
            "6 agentes especializados coordinándose: One, Two, Review, Security, UI, Tutor. Cada uno con un skillset acotado.",
            "6 specialized agents coordinating: One, Two, Review, Security, UI, Tutor. Each with a narrow skillset."
          ),
        },
      ],
    },
    detail: {
      intro: t(
        "No vendo chatbots. Construyo agentes que ejecutan trabajos reales: código, análisis, decisiones, flujos. Cada agente tiene un rol definido, boundaries claros y supervisión humana. Parte de Excelso Open, disponible públicamente.",
        "I don't sell chatbots. I build agents that execute real work: code, analysis, decisions, flows. Each agent has a defined role, clear boundaries, and human oversight. Part of Excelso Open, publicly available."
      ),
      sections: [
        {
          title: t("Lexis ecosystem", "Lexis ecosystem"),
          text: t(
            "Lexis-One (fullstack lead), Lexis-Two (lazy senior), Lexis-Review (quality gate), Lexis-Security, Lexis-UI, Lexis-Tutor. Cada agente tiene un skillset acotado y trabaja en coordinación. No premia la velocidad ciega sino el criterio.",
            "Lexis-One (fullstack lead), Lexis-Two (lazy senior), Lexis-Review (quality gate), Lexis-Security, Lexis-UI, Lexis-Tutor. Each agent has a narrow skillset and works in coordination. It rewards judgment, not blind speed."
          ),
        },
        {
          title: t("Qué construyo", "What I build"),
          text: t(
            "Agentes de código que implementan features, agentes de análisis que procesan datos, agentes de soporte que responden con contexto, y pipelines de automatización que conectan servicios.",
            "Code agents that implement features, analysis agents that process data, support agents that respond with context, and automation pipelines that connect services."
          ),
        },
        {
          title: t("Enfoque", "Approach"),
          text: t(
            "Empiezo con el flujo manual más simple, lo automatizo, y solo después agrego complejidad. Un agente que falla el 5% de las veces es peor que un humano que falla el 5%.",
            "I start with the simplest manual flow, automate it, and only then add complexity. An agent that fails 5% of the time is worse than a human that fails 5% of the time."
          ),
        },
      ],
      links: [
        { label: "Lexis ecosystem", url: "https://lexis-two.excelso.xyz" },
        { label: "Excelso Open", url: "https://www.excelso.xyz" },
      ],
    },
  },
};

export type NodeEnrichment = {
  title: BilingualText;
  lens: string;
  angle: string;
  verbs: string[];
};

export const NODE_ENRICHMENT: Record<NodeKey, NodeEnrichment> = {
  AI: { title: t("Inteligencia Artificial", "Artificial Intelligence"), lens: "AI-native", angle: "Use AI to automate a core decision or workflow, not as a chat layer.", verbs: ["automate", "predict", "generate", "rank"] },
  CODE: { title: t("Código", "Code"), lens: "Technical product", angle: "Define the stack, data model and critical APIs first.", verbs: ["build", "integrate", "deploy", "scale"] },
  PROJECTS: { title: t("Proyectos", "Projects"), lens: "Portfolio-style", angle: "Reuse proven patterns from similar shipped products.", verbs: ["match", "adapt", "launch", "grow"] },
  MVP: { title: t("MVP", "MVP"), lens: "MVP", angle: "Cut everything except the one loop that proves value.", verbs: ["ship", "test", "learn", "iterate"] },
  RESOURCES: { title: t("Recursos", "Resources"), lens: "Knowledge-driven", angle: "Turn proven mental models into a repeatable product process.", verbs: ["apply", "teach", "share", "scale"] },
  CLIENTS: { title: t("Clientes", "Clients"), lens: "Client-backed", angle: "Build something that earns trust and delivers measurable outcomes.", verbs: ["deliver", "earn", "satisfy", "grow"] },
  ABOUT: { title: t("Sobre mí", "About"), lens: "Founder-led", angle: "Lead product and execution end-to-end with clear ownership.", verbs: ["lead", "ship", "own", "scale"] },
  REASONING: { title: t("Mentalidad", "Reasoning"), lens: "Systems-thinking", angle: "Design the simplest system that solves the real problem.", verbs: ["simplify", "connect", "measure", "iterate"] },
  ENVIRONMENT: { title: t("Medio Ambiente", "Environment"), lens: "Sustainability-driven", angle: "Design products that account for systemic impact and long-term resilience.", verbs: ["measure", "reduce", "balance", "sustain"] },
  AIDEV: { title: t("Soluciones IA", "AI Development"), lens: "AI-native solution", angle: "Build agents and automations that multiply team output.", verbs: ["automate", "orchestrate", "generate", "reason"] },
};
