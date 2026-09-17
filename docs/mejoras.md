# Informe de UX/UI — [agustin.top](http://agustin.top)

**Nota metodológica:** este informe combina dos análisis — el contenido/estructura HTML del sitio, y una revisión visual sobre la captura de pantalla de la versión en inglés (desktop). Falta todavía ver el comportamiento en mobile, así que si tenés una captura de esa versión te recomiendo mandarla para completar el análisis.

---

## 0. 🚨 Hallazgo crítico — corregir primero

Antes que cualquier mejora estética, hay **dos bugs visibles** que le restan seriedad al sitio y conviene arreglar ya:

### A) Texto fantasma en el hero (bilingüe, filtrándose de fondo)

En la captura se ve, detrás de la foto y el overlay oscuro del hero, un bloque de texto en **español** ("Quién soy?", "Desarrollo en mi carrera diferentes startups y proyectos...", "El mercado empieza por vos. No por el cliente...") apareciendo semi-transparente por debajo del contenido en inglés. Esto pasa aunque el visitante esté viendo la versión **EN** del sitio.

Es casi seguro un bug de z-index/capas: parece contenido de otra sección (quizás una versión anterior del "Sobre mí" en español) que quedó posicionado absoluto detrás del hero y no se oculta correctamente. **Esto es lo primero que ve cualquier visitante** — antes que cualquier ajuste de diseño, hay que arreglar esto porque además de verse como un error técnico, mezcla idiomas de forma confusa.

### B) Mezcla de idiomas en el formulario de contacto

Todo el formulario está en inglés ("Full name", "Your Email", "Submit request"...), pero el widget de verificación de Cloudflare debajo muestra el mensaje **"¡Operación exitosa!" en español**. Es un detalle chico pero, justo en el paso final antes de enviar una consulta (el momento de mayor fricción/confianza), rompe la coherencia y da sensación de sitio "a medio traducir". Hay que revisar la config regional de Cloudflare Turnstile para que respete el idioma seleccionado.

### C) Texto duplicado literal entre "About Me" y "What I Do"

Confirmado visualmente: ambas secciones usan **exactamente la misma oración**, palabra por palabra — *"I transform ideas into functional products using AI and manage the entire launch process."* No es solo un parecido de redacción como sospechaba en el análisis de contenido: es el mismo copy pegado dos veces. Hay que reescribir al menos una de las dos bajanadas (ver punto 3 más abajo para sugerencia de diferenciación).

---

## 1. Resumen ejecutivo

El sitio tiene una base de contenido **muy fuerte**: 4+ años de experiencia, 20+ proyectos, testimonios reales de CEOs, blog activo, recursos descargables y un formulario de contacto bien segmentado (lead qualification). El problema no es de contenido, sino de **jerarquía, densidad y guía visual**. Hay mucho para mostrar y el riesgo es que el visitante se sienta abrumado o no sepa por dónde seguir. Las mejoras propuestas abajo apuntan a hacer que ese contenido "respire" y guíe al usuario hacia la conversión (contacto).

---

## 2. Hero / Primera impresión

**Lo que hay:** foto de perfil, estado "Disponible", título "Semi-senior AI-Powered Fullstack Developer &amp; PM", stats (4+ años, 20+ proyectos, 100% clientes satisfechos), ubicación, 2 CTAs, íconos de redes.

**Observaciones:**

- **"Semi-senior" en el título es un riesgo de posicionamiento.** Es información honesta y valiosa para vos, pero en el hero (lo primero que ve un cliente potencial) puede restar autoridad antes de que lea el resto. Mejor moverlo a la sección "Sobre mí" o directamente omitirlo del hero — dejá que los 20+ proyectos y los testimonios hablen por tu nivel.
- **Doble CTA ("Ver mis trabajos" / "Hablemos!")** está bien, pero conviene que tengan jerarquía visual clara: uno primario (sólido) y otro secundario (outline/ghost), no dos con el mismo peso.
- El badge "Disponible" es un buen recurso de urgencia/confianza — asegurate de que sea fácil de actualizar (si en algún momento no estás disponible, un visitante que lo vea desactualizado pierde confianza).
- Considerar agregar un **subtítulo con propuesta de valor concreta** (ej. "Lanzo tu MVP en 4-6 semanas" o similar), porque "Transformo ideas en productos exitosos..." es una frase genérica que muchos developers usan. Cuanto más específico y medible, más creíble.

---

## 3. Sección "Sobre Mí" y "Qué Hago"

**Observación clave: hay redundancia de contenido.** "Sobre Mí" dice "Transformo ideas en productos funcionales usando IA y gestiono todo el proceso de lanzamiento" y la sección "Qué Hago" dice casi lo mismo con otras palabras ("Transformo ideas en productos funcionales usando IA, gestionando todo el proceso de lanzamiento"). Esto es repetición que no suma información nueva — el usuario lee dos veces el mismo mensaje.

**Recomendación:** fusionar estas dos secciones en una sola, o diferenciarlas claramente:

- "Sobre Mí" → quién sos, tu trayectoria, tu enfoque (más personal/narrativo)
- "Qué Hago" → servicios concretos con outcomes (más comercial/estructurado)

Las 3 tarjetas de "Qué Hago" (MVP potenciado con IA / Lanzamiento Completo / Escalado y Ventas) están bien pensadas como funnel (etapa temprana → media → tardía del negocio del cliente), pero les falta un **CTA o micro-ejemplo** en cada una (ej. "Ver caso" o un dato tipo "de idea a demo en 3 semanas").

---

## 4. Proyectos Destacados

**Corrección respecto al análisis anterior:** en la captura se confirma que de entrada **solo se muestran 3 proyectos** (Flowfolio, Experimental Global, MeetMyRace) con un botón "See More" debajo — no los 13 de una. Esto ya está bien resuelto y evita la fatiga de scroll que había anticipado. También los tags de stack sí tienen espaciado correcto ("Next.js · TypeScript · Tailwind CSS · AI · +4") — lo que había leído como texto pegado era solo un artefacto de la extracción de HTML, no un bug real. Bien ahí.

**Lo que sí se puede mejorar, ahora viendo el diseño real:**

- Las 3 tarjetas tienen buen aire y jerarquía (imagen, nombre en negrita, descripción, tags). Consistente y prolijo.
- **Falta métrica de resultado.** El texto actual describe *qué es* cada proyecto ("Flowfolio is the command center for freelancers...") pero no *qué logró*. Agregar un dato tipo "+40% conversión" o "500 usuarios en el primer mes" debajo de la descripción, en cada una de las 3 tarjetas destacadas, aumentaría mucho el peso persuasivo — ahora mismo se lee como un catálogo de trabajos, no como casos de éxito (que es justo como los llama el menú de navegación, ver punto 10).
- Las imágenes de preview de cada proyecto son screenshots reales de las apps — bien, transmite autenticidad. Se ve que tienen tamaños/proporciones consistentes entre sí, lo cual es buena señal de sistema de diseño cuidado.
- Elegir cuáles 3 quedan "destacadas" (que hoy parecen ser las primeras del listado) de forma más estratégica: priorizar las de mayor complejidad/impacto (ej. Around Notes app por ser HIPAA, o Sigii) en vez de orden cronológico o alfabético.

---

## 5. Blog / Últimas Publicaciones

Bien resuelto — muestra 3 posts recientes con categoría, fecha, tiempo de lectura y preview. Es coherente con el resto del sitio.

**Sugerencia menor:** la categoría "Management" se repite en los 3 posts mostrados. Si tenés posts de otras categorías (dev, IA), mostrar diversidad acá refuerza que no sos "solo" un PM sino también technical — reforzando el mensaje "AI-Powered Fullstack Developer &amp; PM" del hero.

---

## 6. Recursos (lead magnets)

Tenés 2 recursos gratuitos descargables con buen copy. Esto es una fortaleza — pocos portfolios de developers tienen lead magnets.

**Recomendaciones:**

- Verificar que el formulario de descarga (el modal "Cerrar / Descargar Gratis" que aparece en el HTML) pida el mínimo de fricción posible — idealmente solo email.
- Considerar mover esta sección **más arriba** (antes de "Proyectos" o justo después de "Sobre Mí"), porque es una herramienta de captura de leads de bajo compromiso, ideal para visitantes que aún no están listos para "Hablemos!" pero sí quieren dejar su email.

---

## 7. Testimonios

**Corrección respecto al análisis anterior:** ya es un carrusel (uno a la vez, con flechas laterales y dots de navegación), no una grilla estática — buena decisión de diseño, resuelve el problema de densidad que había anticipado.

**Lo que se puede afinar:**

- El testimonio se ve limpio: 5 estrellas, cita, avatar con inicial, nombre y cargo. Funciona bien.
- El avatar es solo una inicial en círculo oscuro (ej. "E" para Emiliano). Es un fallback prolijo, pero una **foto real de cada persona** (o al menos el logo de la empresa) aumentaría más la confianza que una inicial — sobre todo tratándose de testimonios de CEOs reales con nombre y apellido completo.
- Al ser carrusel, el visitante puede no darse cuenta de que hay más de un testimonio si no repara en los dots. Considerar autoplay lento (5-7 segundos) o un contador tipo "1 / 4" además de los dots, para que sea obvio que hay más contenido.
- Verificar contraste de los dots inactivos (se ven bastante tenues sobre fondo blanco) — el actual se distingue pero podría costar en pantallas con brillo bajo.

---

## 8. Formulario de contacto

Este es un punto **muy fuerte** del sitio: preguntas de calificación de lead (necesidad, presupuesto, urgencia, si es decisor) son prácticas de alto nivel que muchos freelancers no implementan. Bien pensado para filtrar leads de calidad.

**Riesgo a revisar:** un formulario con 7 campos (website, company, nombre, correo, necesidad, presupuesto, urgencia, decisor, mensaje) es **largo**. Esto es intencional para calificar leads, pero puede generar abandono en visitantes menos comprometidos.

**Recomendaciones:**

- Considerar dividirlo en **pasos (multi-step form)** en vez de todo junto — mejora sustancialmente la tasa de completado percibida (mostrar "Paso 1 de 3" reduce la fricción psicológica).
- Marcar claramente cuáles campos son opcionales vs obligatorios (ya vi que "Website/Company" no tienen asterisco y "Mensaje adicional" dice opcional — bien, pero confirmar que esto se vea claro visualmente).
- El mensaje de confirmación ("¡Solicitud enviada!") está bien, con expectativa de tiempo de respuesta (24-48h) — buena práctica, mantenerlo.

---

## 8.b Observaciones visuales adicionales (hero, header, paleta)

Ahora que veo el diseño real, algunos puntos que no podía evaluar antes solo con el HTML:

- **Paleta de colores:** predomina un azul marino muy oscuro (casi negro) combinado con blanco y grises neutros, con un verde/turquesa como acento puntual (visible en el screenshot de Flowfolio y en algún botón). Es una paleta sobria y profesional, coherente en todas las secciones — buen punto de partida. Si querés un color de marca más distintivo, el acento turquesa que ya aparece en el proyecto Flowfolio podría extenderse como color de acento del sitio entero (links, hover states, algún ícono), para que el sitio tenga una identidad de color propia más allá del blanco/negro.
- **Jerarquía de los 2 CTAs del hero:** "View My Works" (fondo blanco, texto negro) y "Let's talk!" (fondo azul marino, texto blanco) tienen **pesos visuales muy similares** — ambos son botones sólidos rellenos. Como comentaba en el análisis de contenido, conviene que uno sea claramente primario. Sugerencia concreta: si la conversión que más te importa es que te contacten, "Let's talk!" debería ser el sólido/lleno y "View My Works" pasar a un estilo outline (borde, sin relleno) — así el ojo va directo al CTA de contacto.
- **Los 4 íconos flotantes alrededor de la foto de perfil** (flechas, un ícono tipo cerebro/red, un cohete, una medalla) no tienen texto ni tooltip visible en la captura — no queda claro qué representan o si son interactivos/decorativos. Si son puramente decorativos, están bien, pero si tienen función (ej. abren un modal con logros), conviene un micro-label o tooltip, porque tal como están generan curiosidad sin resolución, lo cual es fricción cognitiva innecesaria en el primer scroll.
- **Badge "React · AI · Node.js"** flotando sobre la foto es un buen recurso — comunica stack rápido sin necesidad de leer texto largo. Mantenerlo.
- **Contraste del hero:** el overlay oscuro sobre la foto de fondo (persona hablando en un evento) funciona bien para legibilidad del texto blanco — no hay problema de contraste ahí. Buen manejo.
- **Logo "AA" serif** en el header contrasta con la tipografía sans-serif del resto del sitio (títulos y texto en una sans geométrica moderna). No es necesariamente un error — un logo serif como detalle de marca puede funcionar — pero vale la pena confirmar que sea una decisión intencional de identidad y no un descuido, porque hoy se siente un poco aislado del resto del sistema tipográfico.
- **Header/nav:** limpio, con buen contraste (blanco sobre azul marino), selector de idioma EN/ES visible como pastillas — todo correcto y sin ruido visual.

---

## 9. Footer

Simple y funcional. Un detalle: el footer dice "CEO en Excelso" con link — está bien, pero es información que ya apareció en el hero. No es un problema grave, pero es otro caso de repetición de contenido que podría aprovecharse para algo distinto (ej. links rápidos a secciones, o un mini CTA de newsletter).

---

## 10. Arquitectura de información / Navegación

Menú: Yo · Casos de éxito · Blogs · Recursos · Contactarme + selector de idioma (EN/ES).

- Buena decisión de nombrar "Casos de éxito" en vez de "Proyectos" — es más orientado a resultados/cliente que a portfolio técnico. Consistencia: dentro del sitio la sección se llama "Proyectos Destacados", no "Casos de éxito" — **unificar el naming** entre menú y sección para no confundir.
- "Yo" como link a "Sobre mí" es informal pero coherente con el tono cercano del resto de la copy.
- Selector de idioma EN/ES es un plus importante para un desarrollador que busca clientes internacionales — asegurate de que la versión en inglés esté igual de pulida y completa que la española (vale la pena que me pases también ese link para comparar).

---

## 11. SEO / Metadata (ya revisado en el código)

Esto está **bien implementado**:

- Meta description clara y con keywords relevantes (Fullstack, IA, gestión de proyectos)
- Open Graph y Twitter Card configurados con imagen (og-image.webp)
- Título con marca personal + propuesta de valor

**Sugerencia:** el título "Semi-senior" no aparece en el meta title (bien, ahí sí decís "AI-Powered Fullstack Developer &amp; Project Manager" sin calificarlo de semi-senior) — hay una inconsistencia entre cómo te posicionás en el meta title vs en el hero visible. Sugiero alinear ambos hacia la versión más fuerte (sin "semi-senior").

---

## 12. Accesibilidad y performance (a validar con el PDF/visual)

Cosas que valdría la pena chequear una vez que vea el diseño:

- Contraste de texto sobre las imágenes de fondo (hero con imagen de fondo + texto superpuesto es un punto clásico de bajo contraste)
- Tamaño de tap targets en mobile (con 13 proyectos + formulario largo, mobile es donde más se sufre)
- Peso de imágenes: hay muchas imágenes .webp de proyectos (buena elección de formato) pero con 13 proyectos + hero + recursos, vale la pena confirmar lazy loading está activo
- Alt text: los nombres de archivo sugieren que sí hay alt descriptivo (ej. "Flowfolio - Project screenshot") — buena práctica ya implementada

---

## 13. Prioridades sugeridas (orden de impacto)

1. **🚨 Arreglar el texto fantasma en español que se filtra en el hero** — bug visible, primera impresión del sitio
2. **🚨 Corregir el idioma del mensaje de Cloudflare en el formulario** (aparece en español en la versión EN)
3. **Reescribir el copy duplicado entre "About Me" y "What I Do"** (hoy es literalmente la misma oración)
4. **Definir jerarquía clara entre los 2 CTAs del hero** (uno sólido/primario, otro outline/secundario)
5. **Agregar métricas de resultado a los 3 proyectos destacados** (no solo qué es, sino qué logró)
6. **Quitar o reubicar "Semi-senior" del hero**
7. Agregar fotos reales o logos de empresa en los testimonios, en vez de solo iniciales
8. Aclarar función de los 4 íconos flotantes junto a la foto (o quitarlos si son solo decorativos)
9. Evaluar multi-step en el formulario de contacto
10. Unificar naming "Casos de éxito" (menú) vs "Proyectos Destacados" (sección)

---

*Informe basado en análisis de contenido/HTML + revisión visual de la captura desktop (versión EN). Pendiente: revisión de la versión mobile si se comparte una captura.*