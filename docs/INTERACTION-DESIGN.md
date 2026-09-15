# Interactive design preference

Reference copied from the shared lab brand guide. The parent lab repository currently has no Git remote; this copy preserves the agreed preference alongside the published website.

## Detalles interactivos y descubrimiento

Preferencia explícita de Henalu (2026-09-15): interfaces con pequeños detalles elegantes, juguetones y descubribles. Favorecer respuestas locales al cursor o al clic: fragmentos de píxeles que se apartan de un titular, pequeñas roturas de píxeles al activar navegación y resaltados de filas. Elegir uno o dos gestos propios por producto; compartir personalidad no implica repetir efectos.

El movimiento se descubre al interactuar, no mediante loops ni animaciones continuas de fondo. Mantener legibles textos, navegación y datos; no bloquear clics, cambiar el cursor del sistema ni retrasar acciones. La navegación funciona con teclado y táctil. Respetar prefers-reduced-motion con estados estáticos equivalentes; los efectos de cursor se reservan para puntero preciso. No añadir librerías para estos detalles si CSS, Canvas y APIs nativas bastan.

En la web del laboratorio: el titular desplaza localmente fragmentos de su tinta, el menú emite una breve rotura de píxeles al activarse y las filas resaltan al pasar el cursor o enfocar un enlace. El contenido y las métricas no se animan. Las partículas pueden durar hasta 400 ms; los cambios de estado, unos 180 ms.

Headline refinement: move the actual ink tiles with inertia and a damped attraction to their original positions. Allow a short visible reconstruction after pointer exit; avoid circular eraser masks, halos and unrelated particles fading over intact text. This specific reconstruction can take about a second while navigation feedback stays brief.

## Navigation fragments — 2026-09-15

Explicit follow-up from Henalu: menu labels burst into their actual ink tiles; the two hero links dismantle downwards with staggered gravity-like motion. Tiles return to their original positions without fading into unrelated confetti. Allow a 500 ms delay before these in-page scrolls so the gesture can be seen. This is a deliberate exception to the earlier immediate-navigation guideline, scoped to these links; reduced motion and modified clicks keep native immediate behavior. Repeated clicks replace pending navigation. No background animation or extra dependencies.

Product links use the same gestures: public product destinations burst outwards; Project numbers falls downwards. Both wait 500 ms before navigating, except reduced motion or modified/new-tab clicks. Delegated handling includes future catalogue entries without extra animation wiring.
