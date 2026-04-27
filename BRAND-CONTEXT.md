# BRAND CONTEXT — Riptide Studio
> Documento vivo. Actualizar cuando cambien proyectos, posicionamiento o decisiones de tono.
> Última actualización: 2026-04-24

---

## Identidad

**Nombre:** Riptide Studio  
**Tipo:** Estudio web con marca de estudio y voz personal (sin cara visible ni nombre personal como reclamo principal)  
**Servicio principal:** Desarrollo web full-stack  
**Diferenciador clave:** Velocidad + Calidad (AI-native workflow que entrega rápido sin bajar el nivel)  
**Idiomas:** Bilingüe ES/EN — inglés como base de posicionamiento internacional  
**Contacto:** hello@riptide.studio

---

## Posicionamiento

**Frase núcleo (EN):** "We ship fast. We build sharp."  
**Frase núcleo (ES):** "Entregamos rápido. Construimos preciso."

**Propuesta de valor:**
- Productos web reales, no demos ni prototipos interminables
- AI-native: más velocidad sin recortar calidad
- Full-stack: estrategia, diseño, código, despliegue — sin traspasos
- Para startups en crecimiento que necesitan lanzar ya

**Lo que NO somos:**
- Una agencia con 12 revisiones y 4 meses de espera
- Una empresa de "landing pages"
- Un estudio que hace presentaciones bonitas pero nunca envía código

### Arquitectura actual del portfolio

El portfolio ya no es solo una lista de proyectos. La página cuenta tres capas:

1. **Prueba:** hero, proof strip y Selected Work.
2. **Criterio:** Inside my mind y My internet lab, mostrando qué tipos de problemas atraen al estudio.
3. **Carácter:** Things I would build if I had 10 lives, How we ship y contacto.

Esta mezcla permite enseñar capacidad real sin inventar métricas, logos o claims. Mantenerla concreta: si una sección empieza a sonar a manifiesto largo, recortar.

---

## Tono de Voz

**Directos.** No explicamos de más. Una frase bien puesta vale más que tres párrafos.  
**Sin jerga corporativa.** Nada de "sinergias", "ecosistemas holísticos" o "deliverables".  
**Humor ligero y seco.** Una pizca de wit — más Abercrombie que Sanderson en lo que a escritura se refiere. El pie de página dice "Built fast, as usual." — ese nivel.  
**Confiados sin ser arrogantes.** Sabemos lo que hacemos. No lo anunciamos en cada frase.  
**Natural.** Como si lo escribieras en una conversación, no en una presentación de Keynote.

**Ejemplos de tono:**
- ✅ "If it doesn't ship, it didn't happen."
- ✅ "The market doesn't wait."  
- ✅ "Built fast, as usual."
- ✅ "From idea to live — without the drama."
- ❌ "We leverage cutting-edge AI capabilities to deliver synergistic digital experiences."
- ❌ "Our holistic approach ensures maximum stakeholder alignment."

**Influencias literarias (para calibrar el carácter, no el estilo):**
- Joe Abercrombie: preciso, seco, oscuro, sin adornos innecesarios, personajes competentes
- Brandon Sanderson: metódico, construye sistemas que funcionan, no malgasta palabras en lo irrelevante

---

## Sistema Visual

### Paleta
```
Background:   #06080f  (casi negro, con tono azul profundo — mar de noche)
Surface:      #0c1120  (capa intermedia — aguas medias)
Border:       rgba(255,255,255,0.06)
Text:         #dde2f0  (blanco-azulado, no puro)
Muted:        #56607a  (texto secundario)
Accent:       #0df5d0  (teal bioluminiscente — la seña visual del estudio)
Accent glow:  rgba(13,245,208,0.15)
```

### Tipografía
- **Principal:** Space Grotesk (Google Fonts) — geométrica, técnica pero cálida
- **Peso:** 700 para headlines, 400-500 para cuerpo, 300 para labels grandes
- **Letter-spacing headlines:** -0.03em (apretado, editorial)
- **Letter-spacing labels:** +0.12em (abierto, técnico)

### Metáfora visual
El **mar nocturno y profundo**: oscuridad real, no "dark mode gris". Bioluminiscencia como acento — ese teal que aparece en aguas profundas. Objetos que flotan lentamente (como el debris en el océano, o las medusas). No hay olas espumosas ni playas soleadas — esto es el fondo del mar donde se trabaja en serio.

La versión actual usa assets bitmap locales para el hero y paneles flotantes de proyectos. Los paneles del hero funcionan como **concept covers tratados**: imágenes ficticias y abstractas que representan el concepto del proyecto sin fingir ser capturas reales. Mantener esa dirección: imágenes con presencia, oscuridad profunda, acentos precisos, lenguaje oceánico común y nada de fondos genéricos de IA. Los `*-riptide.png` son las versiones actualmente usadas en el hero; los `*-concept.png` quedan como fuente/base.

### Proyectos — Identidad visual de cada uno
| Proyecto | Color | Metáfora |
|---------|-------|---------|
| WavePass | Teal → Azul | Ola de surf, agua en movimiento |
| Gijón Throwdown | Rojo → Naranja | Fuego de la competición |
| ShiftSwap | Púrpura → Violeta | Noche/día, turnos cambiantes |
| Breaking Trail | Verde → Esmeralda | Terreno nuevo, código frondoso |
| SN Assistant | Jade → Steel | Herramienta incrustada, copiloto técnico |
| Alvear IA | Pizarra → Teal frío | Corrientes ocultas, simulación bajo superficie |

---

## Proyectos

### 1. WavePass
**Tagline EN:** "A clearer public directory for wave pools worldwide."  
**Tagline ES:** "El directorio público de piscinas de olas más claro del mundo."  
**Descripción EN:** Bilingual directory for wave pools. Helps surfers compare destinations, operators get visibility. No booking chaos.  
**Descripción ES:** Directorio bilingüe de piscinas de olas. Ayuda a surfistas a comparar destinos y a operadores a conseguir visibilidad.  
**Stack:** Next.js · TypeScript · Supabase · Vercel · i18n (EN/ES)  
**Estado:** Live  
**URL:** Por definir  
**Por qué importa:** Mercado emergente, problema de información fragmentada. Primero en este nicho en español.

### 2. Gijón Throwdown
**Tagline EN:** "Full event platform for functional fitness."  
**Tagline ES:** "Plataforma completa para competición funcional."  
**Descripción EN:** Public site + live scoring + admin ops + photo gallery + OBS overlay. Everything an event needs, shipped as one product.  
**Descripción ES:** Sitio público + scoring en vivo + admin + galería de fotos + overlay para streaming. Todo lo que necesita un evento, en un solo producto.  
**Stack:** Next.js 16 · React 19 · Supabase Realtime · Tailwind CSS · Postgres  
**Estado:** Live  
**Complejidad destacable:** Real-time scoring, multi-role auth (superadmin/admin/volunteer/judge), photo gallery with signed URLs, OBS streaming overlay

### 3. ShiftSwap
**Tagline EN:** "Shift exchange without the spreadsheet."  
**Tagline ES:** "Cambio de turnos sin la hoja de cálculo."  
**Descripción EN:** Internal marketplace for employee shift swaps. Full workflow: proposal → negotiation → digital signature → PDF → approval.  
**Descripción ES:** Marketplace interno para intercambio de turnos. Flujo completo: propuesta → negociación → firma digital → PDF → validación.  
**Stack:** Next.js 16 · Supabase · Stripe · @react-pdf/renderer · Playwright  
**Estado:** En piloto (testing con usuarios reales)  
**Complejidad destacable:** Workforce scheduling logic, marketplace flow, billing con Stripe, PDF generation, smoke tests con Playwright

### 4. Breaking Trail
**Tagline EN:** "ServiceNow reference for people who need real answers."  
**Tagline ES:** "Referencia de ServiceNow para quien necesita respuestas reales."  
**Descripción EN:** Technical reference site for ServiceNow professionals in Spanish. Real production problems. What didn't work first. Actual solutions.  
**Descripción ES:** Referencia técnica de ServiceNow en español. Problemas reales de producción. Lo que no funcionó antes. Soluciones de verdad.  
**Stack:** Astro 5 · Tailwind CSS · MDX · Pagefind · Vercel  
**Estado:** Live  
**Complejidad destacable:** Static search (Pagefind), content-first architecture, bilingual potential

### 5. SN Assistant
**Tagline EN:** "AI copilot for ServiceNow developers, inside the browser."  
**Tagline ES:** "Copiloto IA para desarrolladores de ServiceNow, dentro del navegador."  
**Descripción EN:** Chrome extension that explains, refactors, documents scripts and generates Update Set docs directly inside ServiceNow workflows.  
**Descripción ES:** Extensión de Chrome que explica, refactoriza, documenta scripts y genera documentación de Update Sets directamente dentro del flujo de ServiceNow.  
**Stack:** Chrome Extension · JavaScript · Multi-provider AI routing · Local RAG · ServiceNow  
**Estado:** Live  
**Complejidad destacable:** Browser extension UX, ServiceNow-aware prompting, local RAG grounded with Breaking Trail, command palette, one-click documentation export

### 6. Alvear IA
**Tagline EN:** "Offline-first simulation before the launch."  
**Tagline ES:** "Simulación offline-first antes del lanzamiento."  
**Descripción EN:** Experimental simulation layer to test collective reactions before launching a product, message or decision. Local graph, local models, CLI-first workflow.  
**Descripción ES:** Capa experimental de simulación para ensayar reacciones colectivas antes de lanzar un producto, mensaje o decisión. Grafo local, modelos locales, workflow CLI-first.  
**Stack:** Python · Neo4j · Ollama · CLI · Offline-first architecture  
**Estado:** En development  
**Complejidad destacable:** Local graph orchestration, offline simulation pipeline, reporting artifacts, long-run validation flow

---

## Referencias de Diseño

1. **Off Menu (O/M)** — off.menu  
   Concepto: hero con imágenes circulares flotantes dispersas por el viewport, texto central, fondo claro. Para Riptide: mismo concepto pero dark ocean.

2. **Carlos Prado** — carlosprado.com  
   Concepto: scroll horizontal en hero, tipografía editorial grande, disponibilidad visible en nav, proyectos como imágenes full-bleed. Para Riptide: escala y confianza tipográfica.

3. **Steven Mengin** — stevenmengin.com  
   Concepto: dirección creativa, bold typography, dark aesthetics. Para Riptide: referencia de studio branding y presencia.

---

## Stack del Estudio

Tecnologías que Riptide usa y puede mostrar con confianza:
- **Frontend:** Next.js, Astro, React, TypeScript, Tailwind CSS
- **Extensiones/Navegador:** Chrome Extensions, command palettes, embedded browser tooling
- **Backend/BaaS:** Supabase (Auth, Postgres, Realtime, Storage)
- **IA aplicada:** Claude, OpenAI, local RAG, multi-provider routing, Ollama
- **Datos/Grafo:** Neo4j
- **Pagos:** Stripe
- **Despliegue:** Vercel
- **Testing:** Playwright
- **IA:** Claude (workflow interno AI-native)
- **Otras:** MDX, Pagefind, react-pdf, shadcn/ui

---

## Preguntas Abiertas

- [ ] ¿Hay URLs live para los proyectos? (para añadir al portfolio)
- [ ] ¿Los screenshots actuales de `assets/project-covers/` siguen representando la versión pública más reciente?
- [ ] ¿Hay URLs live o capturas públicas para SN Assistant?
- [ ] ¿Cómo se presenta Alvear IA en el portfolio sin sobreprometer una v1 todavía en desarrollo?
- [ ] ¿Disponibilidad para proyectos? (¿se anuncia en el portfolio?)
- [ ] ¿Hay logo o marca visual existente para Riptide?

---

*Documento mantenido por: Claude (Cowork mode)*  
*Próxima revisión cuando: se añadan proyectos, cambien URLs, o cambie el enfoque del portfolio*
