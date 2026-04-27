# Riptide Studio - Technical Overview

Este documento explica como esta montado el portfolio de Riptide Studio, por que esta hecho asi y que piezas conviene entender antes de tocar nada.

La idea corta: es una web estatica de una sola pagina. Todo vive en `index.html`, con assets locales y un poco de JavaScript vanilla. No hay framework, build, dependencias locales ni servidor obligatorio. Esa simplicidad es parte del producto.

## Que es este repo

Riptide Studio es un portfolio publico para convertir founders, operadores y equipos pequeños en conversaciones por email. No intenta parecer una agencia grande. Enseña prueba real, criterio de producto y una forma de trabajar rapida.

La web esta pensada para responder tres preguntas rapido:

- Que haces.
- Que has construido.
- Como se siente trabajar contigo.

Por eso la pagina mezcla proyectos reales, pensamiento de producto y contacto directo.

## Stack real

- `index.html`: fuente de verdad de la web.
- HTML semantico para estructura.
- CSS embebido para todo el sistema visual.
- JavaScript vanilla al final del archivo.
- GSAP desde CDN para motion y scroll reveals.
- Google Fonts para `Space Grotesk`.
- Imagenes locales en `assets/`.
- Scripts PowerShell en `scripts/` para preview y verificacion.

No hay `package.json`, Vite, Next, Astro, Tailwind ni bundler. Si algo se puede resolver en HTML/CSS/JS directo, se mantiene ahi.

## Por que esta montado asi

La web tiene una mision simple: cargar rapido, abrir directamente como HTML, y ser facil de ajustar sin levantar una app completa.

La decision de tener todo en `index.html` tiene ventajas claras:

- Menos friccion para editar.
- Menos cosas que romper.
- Deploy trivial.
- Traducciones y contenido visibles en el mismo sitio.
- Mejor encaje con una pagina portfolio que no necesita estado complejo.

El coste es que el archivo es grande. Por eso importa mantener un orden claro: estilos arriba, markup en medio, traducciones y comportamiento abajo.

## Estructura de la pagina

La pagina tiene estas capas:

1. `nav`: marca, cambio de idioma, CTA y menu.
2. `#top`: hero con escena oceanica, copy principal, CTAs y paneles flotantes clicables.
3. proof strip: lista corta de capacidades.
4. `#projects`: Selected Work con proyectos reales y una banda para Alvear IA.
5. `#mind`: mapa de intereses y criterio.
6. `#lab`: proyectos/ideas en evolucion.
7. `#ten-lives`: ideas que expresan caracter y direccion.
8. CTA conceptual.
9. `#about`: filosofia de trabajo.
10. `#contact`: cierre con email.

La arquitectura narrativa es: prueba, criterio, caracter, contacto.

## Assets

Los assets se dividen en dos familias.

`assets/hero/`

- `hero-scene-desktop.png`
- `hero-scene-mobile.png`
- `panel-*-concept.png`
- `panel-*-riptide.png`
- `panel-*.png`

Estos assets construyen la atmosfera del hero. Los paneles del hero son concept covers: sugieren el proyecto, pero no pretenden ser capturas reales. Los `*-riptide.png` son las versiones tratadas que usa actualmente el CSS del hero; comparten oscuridad, grano, vidrio y corrientes de luz para que no parezcan wallpapers sueltos.

`assets/project-covers/`

- `wavepass-home-live.png`
- `gijon-throwdown-home.png`
- `shiftswap-home.png`
- `breaking-trail-home.png`
- `sn-assistant-home.png`

Estos son screenshots/capturas reales usadas en Selected Work. Aqui la regla es distinta: deben parecer evidencia de producto, no decoracion.

## Sistema visual

La direccion visual es "night ocean": fondo casi negro azulado, tension editorial, acento teal bioluminiscente y movimiento flotante.

La paleta base esta en `:root` dentro de `index.html`. Los tokens importantes son:

- `--bg`
- `--surface`
- `--text`
- `--muted`
- `--accent`
- `--border`
- `--nav-h`
- easings de motion

La pagina evita claims falsos, logos inventados y metricas decorativas. La prueba son proyectos, screenshots y stack real.

## Selected Work

Esta seccion es delicada porque mezcla screenshots de productos distintos. Para que no parezcan cinco sistemas visuales sin relacion, todos los covers usan el mismo tratamiento:

- imagen real en `.proj-cover-image`
- mismo filtro CSS
- un unico overlay neutral en `.proj-visual::before`
- sin `mix-blend-mode` especial
- sin overlay de color por proyecto
- sin marco interno `::after`

La regla practica: si un screenshot necesita integrarse mejor, ajusta el sistema comun. No metas una capa roja, verde o una caja concreta para un proyecto.

Cada tarjeta sigue esta forma:

```html
<article class="project-card reveal" id="project-wavepass">
  <div class="proj-visual vis-wp">
    <img class="proj-cover-image" src="assets/project-covers/..." alt="">
    <div class="vis-label" data-t="visual_wavepass">...</div>
  </div>
  <div class="proj-body">...</div>
</article>
```

Las clases `vis-wp`, `vis-gt`, `vis-ss`, `vis-bt` y `vis-sna` solo deben ajustar posicionamiento de imagen o detalles muy controlados. No deben introducir overlays propios.

## Traducciones

La web es bilingue EN/ES. El HTML visible esta escrito en ingles y cada texto traducible lleva `data-t`.

Abajo del archivo hay un objeto:

```js
const translations = {
  en: { ... },
  es: { ... }
};
```

Cuando se cambia el idioma, `applyLang()` busca todos los elementos con `data-t` y reemplaza su texto por el valor correspondiente.

Regla de oro: si añades `data-t="nuevo_key"`, añade `nuevo_key` en `en` y en `es` en el mismo cambio.

## Interaccion y JavaScript

El JavaScript se encarga de:

- cambio de idioma
- menu responsive
- disclosures moviles
- clicks de paneles del hero hacia proyectos
- magnetismo suave en botones/paneles
- scroll alignment para anchors
- reduced motion
- animaciones GSAP si estan disponibles

Los patrones importantes son:

- `data-disclosure-toggle`: abre/cierra detalles en movil.
- `data-show-more`: muestra mas items en secciones densas.
- `.reveal`: elementos que entran con GSAP.
- `.hero-panel`: botones flotantes que apuntan a proyectos con `data-target`.

Si GSAP falla, la pagina debe seguir siendo usable. Motion es mejora, no requisito.

## Verificacion

El check obligatorio despues de tocar `index.html` es:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify.ps1
```

Este script comprueba:

- marcadores basicos (`#top`, `#projects`, `#contact`, `main`, email)
- artefactos legacy prohibidos
- existencia de claves `data-t`
- paridad de traducciones EN/ES

Para preview local:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Port 5500
```

La web tambien debe abrir directamente como HTML, pero para revisar anchors, assets y comportamiento real es mejor usar servidor local.

## Cosas que no deberian cambiar sin una razon fuerte

- No introducir framework.
- No añadir build step.
- No añadir claims falsos.
- No duplicar contenido EN/ES sin actualizar traducciones.
- No meter overlays de color por proyecto en Selected Work.
- No convertir la pagina en una landing SaaS generica.
- No esconder el contacto: el email debe seguir siendo obvio.

## Como pensar esta web

No es una demo tecnica. Es una pieza de posicionamiento.

Cada cambio deberia mejorar una de estas cosas:

- claridad
- confianza
- prueba real
- velocidad percibida
- facilidad de contacto
- coherencia visual

Si un cambio no ayuda a nada de eso, probablemente sobra.
