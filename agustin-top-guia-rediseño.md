# Guía de rediseño — agustin.top

## 0. Objetivo

Rediseñar `agustin.top` como una experiencia web interactiva, moderna y desarrollada a medida que convierta visitantes en potenciales clientes.

La web debe comunicar principalmente:

> **Agustín convierte ideas de producto en productos digitales reales, usando software, diseño, automatización e IA para validar y lanzar rápido.**

La experiencia debe sentirse tecnológica y memorable, pero **nunca debe parecer una demo técnica de Three.js**. La tecnología está al servicio del mensaje, la conversión y la comprensión del proceso.

### Prioridades

1. Claridad del posicionamiento.
2. Conversión de potenciales clientes.
3. Experiencia interactiva memorable.
4. SEO técnico y semántico.
5. GEO / optimización para motores generativos y respuestas de IA.
6. Performance y Core Web Vitals.
7. Accesibilidad.
8. Mantenibilidad.
9. Progressive enhancement: la web debe seguir funcionando si se desactiva JavaScript, WebGL o animaciones.

---

# 1. Concepto de producto

## Concepto principal

### "Dame una idea"

El visitante no debería entrar a una landing convencional.

La experiencia comienza con una pregunta:

> **¿Qué querés construir?**

El visitante puede introducir una idea de producto.

La IA analiza esa idea y la convierte progresivamente en una representación de:

- problema;
- usuarios;
- producto;
- funcionalidades;
- MVP;
- riesgos;
- prioridades;
- posible roadmap.

Three.js representa visualmente esa transformación.

### Principio fundamental

No construir:

> "Una web con Three.js."

Construir:

> **"Una herramienta interactiva que demuestra cómo Agustín transforma una idea en producto."**

---

# 2. User journey principal

## Estado 1 — Entrada

La pantalla inicial debe ser extremadamente simple.

Mensaje:

> **Tenés una idea.  
> Hagamos algo con ella.**

CTA:

> **Contame tu idea**

El fondo puede contener una escena 3D abstracta y liviana.

La escena representa una idea sin estructura.

### Requisitos

- El mensaje debe estar en HTML real.
- El CTA debe ser un `<button>` o enlace real.
- No depender de WebGL para entender el contenido.
- El usuario debe poder acceder al contenido principal sin esperar a que cargue Three.js.

---

# 3. Estado 2 — Idea

El usuario introduce algo como:

> "Quiero crear una plataforma para conectar corredores que viajan a carreras."

La IA debe interpretar la entrada.

No debe fingir certeza.

Debe distinguir entre:

- información proporcionada por el usuario;
- inferencias;
- recomendaciones.

La interfaz puede mostrar:

### Entendí

**Producto:** plataforma digital

**Usuarios:** corredores

**Problema:** coordinación de viajes a carreras

**Hipótesis:** existe una oportunidad para facilitar transporte/logística entre participantes.

CTA:

> **Construir el MVP**

---

# 4. Estado 3 — Descomposición

La idea se transforma visualmente en un sistema.

Ejemplo:

```text
IDEA
 │
 ├── Usuarios
 │
 ├── Problema
 │
 ├── Solución
 │
 ├── Features
 │
 ├── MVP
 │
 └── Roadmap
```

Three.js puede representar los elementos como nodos.

### Interacciones

- hover;
- focus mediante teclado;
- click;
- zoom;
- selección;
- navegación entre nodos.

No utilizar animaciones continuas si no aportan información.

---

# 5. Estado 4 — MVP

La IA propone una primera versión.

Ejemplo:

```text
MVP

01. Registro
02. Perfil
03. Publicación de viaje
04. Matching
05. Reserva
06. Notificaciones
```

Cada feature puede abrir una explicación breve:

- qué resuelve;
- para quién;
- prioridad;
- complejidad aproximada;
- dependencia.

### Importante

No presentar estimaciones como hechos.

Si se muestran tiempos o costes, deben estar explícitamente etiquetados como:

> **estimación inicial**

y depender de supuestos visibles.

---

# 6. Estado 5 — Portfolio contextual

El portfolio no debe ser solamente un grid.

Debe responder:

> **¿Qué experiencia relevante tiene Agustín para este proyecto?**

La IA puede relacionar la idea introducida con proyectos existentes.

Ejemplo:

> **Proyectos relacionados**

Y mostrar casos relevantes.

Cada caso debe contener contenido HTML indexable:

- nombre;
- problema;
- solución;
- rol;
- tecnologías;
- resultado;
- contexto;
- enlace al caso completo.

### Regla

La IA puede recomendar casos.

La información factual de los casos debe provenir de una fuente estructurada y controlada, no ser inventada por el modelo.

---

# 7. Estado 6 — Proceso

Mostrar el proceso de trabajo:

```text
01 — Discovery
02 — Product strategy
03 — UX/UI
04 — Architecture
05 — Development
06 — AI integration
07 — QA
08 — Launch
09 — Iteration
```

Cada etapa debe explicar:

- qué ocurre;
- qué recibe el cliente;
- qué decisiones se toman;
- qué resultado produce.

La animación debe reforzar esta narrativa.

---

# 8. Estado 7 — IA como multiplicador

La IA no debe presentarse como un chatbot genérico.

Debe mostrarse como parte del proceso de trabajo.

Ejemplos:

- análisis de requisitos;
- research;
- generación de hipótesis;
- prototipado;
- arquitectura asistida;
- desarrollo;
- testing;
- documentación;
- automatización;
- análisis de datos.

Mensaje conceptual:

> **La IA no reemplaza el proceso de producto. Lo acelera y amplifica.**

Evitar claims absolutos o no verificables.

---

# 9. Estado 8 — Conversión

Después de la experiencia:

> **Esto es lo que construiría primero.**

Mostrar un resumen generado:

```text
Producto
Usuarios
Problema
MVP
Features prioritarias
Riesgos
Próximo paso
```

CTA:

> **Hablemos del proyecto**

El formulario debe reutilizar el contexto que el usuario ya proporcionó.

No pedir nuevamente información que ya está disponible.

---

# 10. Portfolio

Crear casos de estudio completos.

Cada caso debería seguir:

```text
Overview
Problem
Context
Role
Approach
Product
UX/UI
Technology
AI
Challenges
Outcome
Lessons
```

No inventar métricas.

Si no existe una métrica verificable:

- no publicarla;
- o indicar claramente que no está disponible.

---

# 11. Arquitectura de información

Propuesta:

```text
/
├── Work
│   ├── /work/project-1
│   ├── /work/project-2
│   └── ...
│
├── Process
├── About
├── Resources
│   ├── /resources/article-1
│   └── ...
│
├── Contact
└── /idea
```

La experiencia interactiva puede estar en `/` y/o `/idea`.

No esconder información crítica exclusivamente dentro de una escena WebGL.

---

# 12. SEO

## Principio

La web debe ser comprensible para:

- Google;
- Bing;
- otros buscadores;
- crawlers;
- lectores de pantalla;
- sistemas de recuperación;
- modelos generativos.

Three.js no debe convertirse en una barrera de indexación.

## HTML semántico

Utilizar correctamente:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- `<h1>` a `<h6>`
- `<p>`
- `<ul>`
- `<ol>`
- `<button>`
- `<a>`

No utilizar `<div>` para todo.

## Headings

Cada página debe tener:

- un `<h1>` único;
- jerarquía lógica;
- headings descriptivos.

No utilizar headings solamente por motivos visuales.

## Metadata

Cada página debe tener:

- `<title>` único;
- meta description;
- canonical;
- Open Graph;
- Twitter/X metadata;
- idioma;
- viewport;
- robots cuando corresponda.

## URLs

Usar URLs:

- cortas;
- descriptivas;
- estables;
- lowercase;
- sin parámetros innecesarios.

Ejemplo:

```text
/work/meetmyrace
/resources/how-to-build-an-mvp
```

Evitar:

```text
/project?id=3827
```

---

# 13. SEO de contenido

Crear contenido orientado a las preguntas reales de potenciales clientes.

Temas potenciales:

- desarrollo de MVP;
- desarrollo de productos digitales;
- AI product development;
- AI-powered applications;
- desarrollo SaaS;
- product strategy;
- UX/UI para startups;
- desarrollo full-stack;
- validación de ideas;
- automatización con IA;
- lanzamiento de productos digitales.

No crear páginas artificiales únicamente para posicionar keywords.

Cada página debe responder una intención concreta.

---

# 14. GEO — Generative Engine Optimization

La web debe estar estructurada para que los sistemas de IA puedan identificar claramente:

### Quién es Agustín

- profesión;
- especialización;
- servicios;
- experiencia;
- ubicación si corresponde;
- idiomas si corresponde.

### Qué hace

- qué tipo de productos construye;
- para qué tipo de clientes;
- qué problemas resuelve.

### Evidencia

- proyectos;
- casos de estudio;
- testimonios;
- publicaciones;
- experiencia.

### Cómo trabaja

- proceso;
- metodología;
- tecnologías;
- uso de IA.

---

# 15. Contenido "citation-friendly"

Los casos y artículos deben contener afirmaciones concretas y fácilmente extraíbles.

Ejemplo:

```text
## Qué es MeetMyRace

MeetMyRace es [descripción factual].

## Mi rol

Agustín participó en [rol factual].

## Problema

[problema factual].

## Solución

[solución factual].

## Stack

[tecnologías verificadas].
```

Evitar párrafos excesivamente marketineros.

Preferir:

- definiciones;
- hechos;
- listas;
- tablas;
- preguntas y respuestas;
- explicaciones directas.

---

# 16. Structured Data

Implementar Schema.org cuando corresponda.

Posibles tipos:

- `Person`
- `WebSite`
- `WebPage`
- `Article`
- `CreativeWork`
- `SoftwareApplication`
- `BreadcrumbList`
- `FAQPage` solamente cuando el contenido FAQ exista realmente y cumpla las directrices correspondientes.

No agregar structured data falsa.

Los datos estructurados deben coincidir con el contenido visible.

---

# 17. Sitemap y robots

Generar:

```text
/sitemap.xml
/robots.txt
```

El sitemap debe incluir únicamente URLs indexables y canónicas.

No indexar:

- estados internos;
- resultados privados;
- sesiones de IA;
- parámetros;
- páginas duplicadas;
- contenido generado temporalmente.

---

# 18. IA y contenido indexable

La interacción de IA puede ser dinámica.

Pero la web debe tener contenido estático suficiente para explicar:

- quién sos;
- qué hacés;
- servicios;
- portfolio;
- proceso;
- contacto.

Nunca asumir:

> "Google puede ejecutar mi aplicación y entender todo."

El contenido importante debe existir en HTML.

---

# 19. Performance

Objetivo:

> **La experiencia 3D no puede convertir la web en una página lenta.**

Priorizar:

1. HTML inicial rápido.
2. CSS mínimo.
3. JavaScript mínimo inicial.
4. Lazy loading.
5. Code splitting.
6. Carga diferida de Three.js.
7. Optimización de assets.
8. Evitar JavaScript innecesario.
9. Evitar fuentes pesadas.
10. Evitar third-party scripts innecesarios.

---

# 20. Three.js

Three.js debe cargarse solamente cuando sea necesario.

### Estrategia recomendada

```text
Initial HTML
    ↓
Critical CSS
    ↓
Contenido principal
    ↓
Interacción básica
    ↓
Three.js
    ↓
Escena 3D
```

La experiencia no debe bloquear el render inicial.

## Optimización 3D

Evitar:

- geometrías excesivamente complejas;
- demasiados objetos;
- texturas enormes;
- sombras costosas;
- post-processing innecesario;
- render loop permanente cuando no sea necesario;
- modelos 3D pesados.

Preferir:

- geometría procedural;
- instancing;
- LOD cuando sea útil;
- texturas comprimidas;
- DPR limitado;
- render bajo demanda;
- animaciones basadas en eventos;
- assets pequeños.

---

# 21. GPU y dispositivos móviles

Detectar capacidades del dispositivo.

En hardware limitado:

- reducir resolución;
- reducir partículas;
- reducir efectos;
- eliminar post-processing;
- limitar FPS;
- simplificar geometrías.

En dispositivos sin WebGL:

> mostrar una experiencia 2D equivalente.

No mostrar una pantalla rota.

---

# 22. Reduced motion

Respetar:

```text
prefers-reduced-motion
```

Cuando está activo:

- eliminar parallax;
- reducir transiciones;
- detener animaciones decorativas;
- simplificar navegación.

El contenido y la funcionalidad deben mantenerse.

---

# 23. Core Web Vitals

Optimizar especialmente:

### LCP

El elemento principal debe aparecer rápidamente.

No hacer que el hero dependa de la carga de Three.js.

### INP

Evitar:

- handlers pesados;
- cálculos durante interacción;
- tareas largas;
- bloqueo del main thread.

### CLS

Reservar dimensiones para:

- imágenes;
- fuentes;
- canvas;
- componentes dinámicos.

La página no debe saltar durante la carga.

---

# 24. Imágenes

Usar:

- AVIF;
- WebP;
- responsive images;
- `srcset`;
- `sizes`;
- dimensiones explícitas.

No enviar una imagen de 3000px si se muestra a 500px.

Las imágenes fuera del viewport deben lazy-loadearse.

La imagen LCP no debe cargarse con lazy loading.

---

# 25. Fonts

Reducir al mínimo las fuentes.

Preferir:

- variable fonts;
- WOFF2;
- subsets;
- `font-display: swap`.

Evitar cargar familias completas si solo se necesitan algunos pesos.

---

# 26. JavaScript

Principio:

> **HTML first, JavaScript second, WebGL third.**

Todo lo que pueda funcionar con HTML/CSS debe hacerlo así.

JavaScript debe mejorar la experiencia, no ser un requisito absoluto.

---

# 27. Accesibilidad

Objetivo mínimo: WCAG 2.2 AA.

Verificar:

- contraste;
- navegación por teclado;
- focus visible;
- labels;
- formularios accesibles;
- landmarks;
- alt text;
- headings;
- botones reales;
- links reales;
- mensajes de error;
- estados de carga;
- `aria-*` solamente cuando sea necesario.

La escena 3D debe tener una alternativa semántica.

---

# 28. Cursor e interacciones

Si se usa cursor personalizado:

- no reemplazar completamente el cursor nativo;
- mantener indicadores claros;
- funcionar con teclado;
- desactivarse en touch;
- no interferir con selección de texto.

Evitar efectos tipo "cursor mágico" que reduzcan usabilidad.

---

# 29. Mobile-first

La experiencia debe diseñarse primero para mobile.

En mobile:

- evitar escenas 3D pesadas;
- priorizar contenido;
- utilizar gestos simples;
- no depender de hover;
- reducir partículas;
- simplificar navegación.

El desktop puede ofrecer la experiencia 3D completa.

---

# 30. Navegación

La navegación debe permanecer siempre comprensible.

Propuesta:

```text
Work
Process
About
Resources
Contact
```

CTA persistente:

> **Start a project**

En mobile, utilizar navegación simple.

No esconder toda la navegación detrás de interacciones experimentales.

---

# 31. IA conversacional

La IA debe tener límites claros.

Debe:

- explicar;
- clasificar;
- resumir;
- proponer;
- preguntar;
- recomendar.

No debe:

- inventar casos;
- inventar clientes;
- inventar resultados;
- inventar tecnologías utilizadas;
- inventar testimonios;
- prometer tiempos;
- prometer costes;
- presentar estimaciones como hechos.

## Fuente de verdad

Crear una base estructurada con:

```text
Person
Services
Projects
Testimonials
Skills
Experience
Articles
FAQs
Process
```

La IA debe consultar esa información.

---

# 32. Privacidad

La idea introducida por un visitante puede ser información sensible.

Por defecto:

- no mostrarla públicamente;
- no almacenarla innecesariamente;
- explicar si se almacena;
- evitar enviarla a terceros sin necesidad;
- evitar incluirla en analytics;
- permitir abandonar la experiencia.

Si se utiliza un proveedor externo de IA, documentar claramente qué datos se transmiten.

---

# 33. Analytics

Medir comportamiento sin convertir la web en un sistema de tracking invasivo.

Eventos relevantes:

```text
landing_view
idea_started
idea_submitted
idea_analysis_completed
portfolio_project_opened
process_step_viewed
contact_started
contact_submitted
```

No registrar el contenido completo de la idea del usuario salvo consentimiento y necesidad explícita.

---

# 34. Error states

Diseñar estados para:

- IA no disponible;
- timeout;
- WebGL no disponible;
- conexión lenta;
- API error;
- respuesta inválida;
- rate limit;
- usuario abandona.

La experiencia debe degradar correctamente.

Ejemplo:

> **La experiencia interactiva no está disponible ahora.**

Y debajo:

> Podés conocer mis proyectos y proceso mientras tanto.

---

# 35. Seguridad

Implementar:

- rate limiting;
- protección contra abuso del endpoint de IA;
- validación de inputs;
- sanitización;
- límites de tamaño;
- protección de API keys;
- secretos exclusivamente en servidor;
- CSP cuando sea viable;
- headers de seguridad.

Nunca exponer claves de proveedores de IA en el cliente.

---

# 36. Arquitectura recomendada

Preferir una arquitectura moderna con:

- rendering server-side o static generation cuando corresponda;
- componentes reutilizables;
- rutas indexables;
- contenido estructurado;
- carga progresiva;
- separación entre UI, contenido y lógica de IA.

Three.js debe ser un módulo aislado de la aplicación.

La capa de IA también debe estar desacoplada.

Conceptualmente:

```text
CONTENT
   │
   ├── Projects
   ├── Services
   ├── Articles
   └── Person
          │
          ↓
      APPLICATION
          │
     ┌────┴────┐
     ↓         ↓
    UI      AI Layer
     │
     ↓
 Three.js
```

---

# 37. Diseño visual

Dirección:

- dark-first;
- tipografía grande;
- mucho espacio negativo;
- UI editorial;
- estética de producto tecnológico;
- motion sutil;
- elementos 3D abstractos;
- profundidad;
- transiciones suaves.

Pero evitar convertir la web en una "tech demo".

### Regla visual

Cada animación debe responder al menos una de estas preguntas:

1. ¿Ayuda a entender?
2. ¿Ayuda a navegar?
3. ¿Ayuda a recordar?
4. ¿Ayuda a convertir?

Si la respuesta es no, eliminarla.

---

# 38. Performance budget

Definir budgets antes de implementar.

Como objetivo inicial:

```text
HTML inicial: pequeño
JS inicial: mínimo
CSS inicial: mínimo
Imágenes: comprimidas
Fonts: 1 familia / mínimo de pesos
Three.js: lazy
3D assets: pequeños
Third-party scripts: mínimo
```

Medir siempre en:

- Lighthouse;
- PageSpeed Insights;
- Chrome DevTools;
- dispositivos móviles reales;
- conexión lenta.

No optimizar solamente en desktop de desarrollo.

---

# 39. SEO + performance + UX deben convivir

No aceptar soluciones del tipo:

> "Esto mejora el SEO pero rompe la experiencia."

o:

> "Esto hace la experiencia increíble pero bloquea el render."

La solución debe buscar:

```text
SEO
  +
Accessibility
  +
Performance
  +
Interaction
  +
Conversion
```

---

# 40. Criterios de éxito

La nueva web será considerada exitosa si un visitante puede responder rápidamente:

### ¿Quién es Agustín?

Desarrollador/product builder especializado en construir productos digitales.

### ¿Qué hace?

Convierte ideas y necesidades de negocio en productos digitales.

### ¿Qué sabe hacer?

Product strategy + UX/UI + desarrollo + IA + lanzamiento.

### ¿Ya hizo esto?

Sí, y puedo explorar casos concretos.

### ¿Cómo trabaja?

Existe un proceso claro.

### ¿Qué pasaría con mi idea?

Puedo introducirla y recibir una primera estructuración.

### ¿Cómo contacto?

El CTA es evidente.

---

# 41. Orden de implementación

No intentar construir todo simultáneamente.

## Fase 1 — Foundation

- arquitectura;
- contenido;
- SEO;
- responsive;
- accesibilidad;
- navegación;
- portfolio;
- contacto.

## Fase 2 — Motion

- microinteracciones;
- transiciones;
- scroll animations;
- estados.

## Fase 3 — Three.js

- escena principal;
- sistema de nodos;
- interacción;
- responsive;
- fallback 2D.

## Fase 4 — IA

- input de idea;
- análisis;
- estructuración;
- recomendación de MVP;
- portfolio contextual.

## Fase 5 — Conversión

- resumen del proyecto;
- formulario contextual;
- envío;
- analytics.

## Fase 6 — Optimización

- Core Web Vitals;
- bundle;
- imágenes;
- fonts;
- GPU;
- accesibilidad;
- SEO;
- structured data.

---

# 42. Checklist antes de producción

## UX

- [ ] El usuario entiende qué hago en menos de 10 segundos.
- [ ] Existe un CTA principal.
- [ ] La interacción 3D tiene propósito.
- [ ] La web funciona sin WebGL.
- [ ] La navegación es evidente.
- [ ] Mobile está correctamente resuelto.

## SEO

- [ ] Cada página tiene title.
- [ ] Cada página tiene meta description.
- [ ] Existe canonical.
- [ ] H1 correcto.
- [ ] HTML semántico.
- [ ] URLs limpias.
- [ ] Sitemap.
- [ ] Robots.
- [ ] Structured data válida.
- [ ] Open Graph.
- [ ] Internal linking.
- [ ] Contenido indexable sin depender de WebGL.

## GEO

- [ ] Identidad claramente definida.
- [ ] Servicios claramente definidos.
- [ ] Portfolio con casos verificables.
- [ ] Proceso explicado.
- [ ] Contenido estructurado.
- [ ] Preguntas frecuentes cuando sean relevantes.
- [ ] Afirmaciones verificables.
- [ ] Sin claims inventados.
- [ ] Datos estructurados coherentes con contenido visible.

## Performance

- [ ] LCP optimizado.
- [ ] INP optimizado.
- [ ] CLS controlado.
- [ ] Three.js lazy-loaded.
- [ ] Assets comprimidos.
- [ ] Fonts optimizadas.
- [ ] Third-party scripts minimizados.
- [ ] Mobile probado.
- [ ] Conexión lenta probada.
- [ ] GPU limitada probada.

## Accessibility

- [ ] Keyboard navigation.
- [ ] Focus visible.
- [ ] Contrast.
- [ ] Alt text.
- [ ] Form labels.
- [ ] Reduced motion.
- [ ] Screen reader.
- [ ] No interacción crítica basada exclusivamente en hover.

---

# 43. Regla final para la IA que implemente el proyecto

Antes de implementar cualquier feature preguntarse:

> **¿Esto ayuda a un potencial cliente a entender, confiar o decidir?**

Si solamente existe porque:

> "queda cool"

no implementarlo.

La web debe sentirse como una combinación de:

**portfolio + producto interactivo + consultoría + demostración técnica.**

La experiencia 3D y la IA son medios.

El producto real que se está vendiendo es:

> **la capacidad de convertir una idea ambigua en un producto digital concreto.**
