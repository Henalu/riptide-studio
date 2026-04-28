# Riptide Studio - Manual Editing Guide

Guia practica para tocar la web a mano sin tener que releer todo `index.html` cada vez.

La regla base: haz cambios pequeños, guarda, previsualiza, ejecuta `scripts/verify.ps1`.

## Antes de tocar nada

1. Abre `PROJECT-CONTEXT.md` para recordar restricciones.
2. Si vas a tocar tono o proyectos, abre `BRAND-CONTEXT.md`.
3. Si vas a tocar diseño, abre `.impeccable.md`.
4. Si vas a tocar comportamiento o workflow, abre `AI-WORKFLOW.md`.
5. Mira `git status --short` para saber que ya estaba cambiado.

Comando:

```powershell
git status --short
```

## Como previsualizar

Servidor local:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Port 5500
```

Luego abre:

```text
http://localhost:5500
```

Si el puerto esta ocupado, usa otro:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Port 5501
```

## Como verificar

Despues de editar `index.html`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify.ps1
```

No lo dejes para el final si has tocado traducciones. Es el error mas facil de crear y el mas facil de pillar pronto.

## Donde esta cada cosa

Todo lo importante esta en `index.html`.

Mapa aproximado:

- CSS global y tokens: arriba del archivo, dentro de `<style>`.
- Navegacion: markup cerca del inicio del `<body>`.
- Hero: seccion `#top`.
- Selected Work: seccion `#projects`.
- Inside my mind: seccion `#mind`.
- My internet lab: seccion `#lab`.
- 10 lives: seccion `#ten-lives`.
- How we ship: seccion `#about`.
- Contacto: seccion `#contact`.
- Traducciones: `const translations = { en: ..., es: ... }`.
- JavaScript de comportamiento: debajo de las traducciones.

Busca rapido con:

```powershell
rg -n "id=\"projects\"|const translations|function applyLang|proj-visual|hero-panel" index.html
```

## Cambiar copy visible

Cada texto traducible tiene un `data-t`.

Ejemplo:

```html
<p class="proj-desc" data-t="wp_desc">
  A bilingual public directory...
</p>
```

Para cambiarlo bien:

1. Cambia el texto visible en el HTML si quieres que el fallback ingles quede correcto.
2. Busca la misma key en `translations.en`.
3. Actualiza esa version.
4. Busca la misma key en `translations.es`.
5. Actualiza la version española.
6. Ejecuta `scripts/verify.ps1`.

Buscar una key:

```powershell
rg -n "wp_desc" index.html
```

No añadas una key nueva en HTML sin añadirla tambien en EN y ES.

## Cambiar proyectos en Selected Work

La seccion vive en `#projects`.

Cada proyecto tiene:

- `article.project-card`
- id del proyecto, por ejemplo `project-wavepass`
- bloque visual `.proj-visual`
- imagen `.proj-cover-image`
- label visual `.vis-label`
- bloque de contenido `.proj-body`
- descripcion
- detalle desplegable en movil
- stack tags

Si cambias el nombre, descripcion o detalle, revisa traducciones.

Si cambias stack tags, normalmente no hace falta traduccion salvo que uses `data-t`.

## Cambiar screenshots de proyectos

Los screenshots estan en:

```text
assets/project-covers/
```

Usa nombres claros, por ejemplo:

```text
wavepass-home-live.png
gijon-throwdown-home.png
shiftswap-home.png
breaking-trail-home.png
sn-assistant-home.png
```

Luego cambia el `src` en el proyecto correspondiente.

Mantener:

```html
class="proj-cover-image"
alt=""
loading="lazy"
decoding="async"
```

El `alt` esta vacio porque estas imagenes son apoyo visual y el contenido textual ya explica el proyecto.

## Regla especial para overlays de Selected Work

No añadas overlays por proyecto.

El sistema correcto es:

- `.proj-cover-image`: imagen.
- `.proj-visual::before`: unico overlay neutral.
- `.proj-visual::after`: desactivado.

Si una imagen se ve demasiado clara, oscura o colorida, ajusta primero:

```css
.proj-cover-image {
  filter: saturate(.62) contrast(1.04) brightness(.82);
}

.proj-visual {
  --cover-overlay: rgba(7,12,18,.36);
}
```

Hazlo con cuidado porque afecta a todos los proyectos. Esa es la idea: mismo material, misma luz, distinto contenido.

Para cambiar solo el encuadre de una captura, usa la clase `vis-*`:

```css
.vis-gt {
  --cover-position: center 14%;
}
```

Eso es aceptable. Colores y overlays propios, no.

## Cambiar imagenes del hero

Assets:

```text
assets/hero/
```

La escena principal usa:

```text
hero-scene-desktop.png
hero-scene-mobile.png
```

Los paneles flotantes usan imagenes tipo:

```text
panel-wavepass-riptide.png
panel-gijon-throwdown-riptide.png
panel-shiftswap-riptide.png
panel-sn-assistant-riptide.png
```

Estos paneles son conceptuales. No tienen que ser screenshots reales. Los `*-concept.png` son fuentes/base; los `*-riptide.png` son las versiones tratadas que debe usar el hero si no hay una razon clara para cambiar.

Mantener los cuatro con el mismo lenguaje:

- dark ocean
- vidrio
- grano
- corrientes de luz
- contraste parecido
- color especifico del proyecto solo como acento

Si cambias un panel del hero, revisa CSS de `.hero-panel-*` y el atributo `data-target` del boton.

## Cambiar a donde apunta un panel del hero

Ejemplo:

```html
<button class="hero-panel hero-panel-wavepass" data-target="project-wavepass">
```

`data-target` debe coincidir con el `id` de una tarjeta:

```html
<article class="project-card reveal" id="project-wavepass">
```

Si no coincide, el click no llevara al proyecto.

## Añadir un proyecto nuevo

Checklist:

1. Duplica un `article.project-card`.
2. Cambia el `id`.
3. Añade screenshot en `assets/project-covers/`.
4. Cambia `src` de la imagen.
5. Cambia label, titulo, badge, descripcion, detalle y stack.
6. Añade nuevas keys `data-t` en EN y ES si hacen falta.
7. Si quieres que un panel del hero apunte al proyecto, crea/ajusta un `.hero-panel`.
8. Actualiza `PROJECT-CONTEXT.md` y `BRAND-CONTEXT.md`.
9. Ejecuta `scripts/verify.ps1`.
10. Revisa desktop y movil.

No inventes URL, metricas, logos ni claims si no existen.

## Cambiar el menu

El menu visible esta en el nav.

Si añades una seccion:

1. Crea un `id` en la seccion.
2. Añade un link `href="#nuevo-id"`.
3. Añade `data-t` si el texto debe traducirse.
4. Actualiza `translations.en` y `translations.es`.
5. Comprueba que el anchor cae bien con el nav fijo.

El scroll usa `scroll-margin-top` y `alignHashTarget()`.

## Cambiar mobile disclosures

Los bloques desplegables en movil usan:

```html
data-disclosure-toggle
aria-controls="..."
```

Y un panel con ese mismo id:

```html
<div class="mobile-disclosure-panel" id="...">
```

Si `aria-controls` y `id` no coinciden, el toggle se rompe.

Para grupos donde solo uno debe estar abierto:

```html
data-disclosure-group="projects"
data-close-siblings="true"
```

## Cambiar motion

Motion principal:

- CSS transitions para hover, cards y botones.
- GSAP para intro del hero y reveals.
- `prefers-reduced-motion` para fallback seguro.

Si tocas motion:

- No hagas depender la lectura de una animacion.
- Mantén usable el sitio sin GSAP.
- Revisa `syncReducedMotionState()`.
- Evita animar layout si puedes usar `transform` y `opacity`.

## Cambiar contacto

El email aparece en la seccion `#contact` y tambien lo comprueba `verify.ps1`.

Si cambia el email, busca todas las apariciones:

```powershell
rg -n "marcohenalu@gmail.com|mailto:" index.html PROJECT-CONTEXT.md BRAND-CONTEXT.md scripts
```

Actualiza tambien el verify script si deja de buscar el email antiguo.

## Cosas que conviene no tocar a mano sin revisar bien

- El objeto `translations`, porque un coma mal puesta rompe el JS.
- Los ids de secciones, porque rompen anchors.
- `data-target` en hero panels, porque rompe navegación a proyectos.
- `data-disclosure-*`, porque rompe movil.
- El overlay de Selected Work, porque es facil crear tintes raros.
- El nav fijo y scroll alignment, porque afecta a toda la pagina.

## Si algo se rompe

Primero ejecuta:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify.ps1
```

Luego mira consola del navegador.

Despues busca el ultimo cambio:

```powershell
git diff -- index.html
```

Si el problema es visual, revisa:

- CSS de la seccion.
- media queries cerca del final del CSS.
- si hay pseudo-elementos `::before` o `::after` heredados.
- si una clase antigua sigue aplicando estilos a una nueva estructura.

## Flujo recomendado para cambios pequeños

1. Buscar la zona.
2. Editar lo minimo.
3. Preview local.
4. Probar desktop y movil.
5. Ejecutar verify.
6. Actualizar contexto si el cambio altera estructura, criterio o workflow.

La web esta hecha para poder tocarse a mano. Solo pide una cosa: no mezclar prueba real con decoracion que parezca prueba.
