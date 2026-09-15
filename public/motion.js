(() => {
  'use strict';
  const heading = document.querySelector('.hero h1');
  if (!heading) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const canvas = document.createElement('canvas');
  canvas.className = 'pixel-effects';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  document.body.append(canvas);
  const ink = getComputedStyle(document.body).color;
  let cells = [],
    sparks = [],
    pointer = null,
    bounds,
    frame = 0,
    previous = 0;
  let width = 0,
    height = 0,
    ratio = 1,
    prepared = false;
  const radius = 68;
  let bitmap,
    active = false;
  const tileSize = 4;
  let navigationTimer;

  function clearBursts() {
    sparks.forEach((burst) => {
      burst.link.style.opacity = '';
    });
    sparks = [];
  }

  function fragmentLink(link, falling) {
    const box = link.getBoundingClientRect();
    const source = document.createElement('canvas');
    source.width = Math.ceil(box.width * ratio);
    source.height = Math.ceil(box.height * ratio);
    const paint = source.getContext('2d', { willReadFrequently: true });
    if (!paint || !source.width || !source.height) return null;
    paint.scale(ratio, ratio);
    const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const style = getComputedStyle(node.parentElement);
      paint.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      paint.letterSpacing = style.letterSpacing;
      paint.fillStyle = style.color;
      // Per-character ranges also preserve flex gaps, arrows and wrapped links.
      for (let i = 0; i < node.length; i++) {
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        const glyph = node.textContent[i];
        const metrics = paint.measureText(glyph);
        const ascent =
          metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
        const descent =
          metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
        paint.fillText(
          glyph,
          rect.left - box.left,
          rect.top - box.top + (rect.height - ascent - descent) / 2 + ascent,
        );
      }
    }
    const pixels = paint.getImageData(0, 0, source.width, source.height).data;
    const tiles = [],
      step = Math.round(2 * ratio);
    for (let y = 0; y < source.height; y += step) {
      for (let x = 0; x < source.width; x += step) {
        const w = Math.min(step, source.width - x),
          h = Math.min(step, source.height - y);
        let occupied = false;
        for (let yy = y; yy < y + h && !occupied; yy++) {
          for (let xx = x; xx < x + w; xx++) {
            if (pixels[(yy * source.width + xx) * 4 + 3]) {
              occupied = true;
              break;
            }
          }
        }
        if (!occupied) continue;
        const seed = ((x * 13 + y * 7) % 97) / 97;
        const angle =
          Math.atan2(y / ratio - box.height / 2, x / ratio - box.width / 2) +
          (seed - 0.5);
        tiles.push({
          x,
          y,
          w,
          h,
          delay: falling ? seed * 110 : seed * 35,
          dx: falling ? (seed - 0.5) * 20 : Math.cos(angle) * (22 + seed * 32),
          dy: falling ? 28 + seed * 35 : Math.sin(angle) * (20 + seed * 28),
        });
      }
    }
    return tiles.length
      ? { link, source, tiles, falling, start: performance.now() }
      : null;
  }

  function resizeCanvas() {
    width = innerWidth;
    height = innerHeight;
    ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(width * ratio);
    canvas.height = Math.ceil(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function restore() {
    pointer = null;
  }

  function revealText() {
    active = false;
    heading.style.opacity = '';
  }

  function stop() {
    restore();
    revealText();
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    clearBursts();
    cells.forEach((c) => {
      c.dx = c.dy = c.vx = c.vy = 0;
    });
    ctx.clearRect(0, 0, width, height);
  }

  // Sample the real headline font once per size, not on every mouse move.
  function prepare() {
    stop();
    prepared = false;
    cells = [];
    if (reduced.matches || !fine.matches) return;
    bounds = heading.getBoundingClientRect();
    bitmap = document.createElement('canvas');
    bitmap.width = Math.ceil(bounds.width * ratio);
    bitmap.height = Math.ceil(bounds.height * ratio);
    const paint = bitmap.getContext('2d', { willReadFrequently: true });
    if (!paint || !bitmap.width || !bitmap.height) return;
    paint.setTransform(ratio, 0, 0, ratio, 0, 0);
    paint.fillStyle = ink;
    for (const line of heading.children) {
      const style = getComputedStyle(line);
      const range = document.createRange();
      range.selectNodeContents(line);
      const box = range.getBoundingClientRect();
      paint.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      paint.letterSpacing = style.letterSpacing;
      const text = line.textContent;
      const metrics = paint.measureText(text);
      const ascent =
        metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
      const descent =
        metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
      const baseline =
        box.top - bounds.top + (box.height - ascent - descent) / 2 + ascent;
      paint.save();
      paint.translate(box.left - bounds.left, baseline);
      paint.scale(metrics.width ? box.width / metrics.width : 1, 1);
      paint.fillText(text, 0, 0);
      paint.restore();
    }
    const pixels = paint.getImageData(0, 0, bitmap.width, bitmap.height).data;
    const step = Math.round(tileSize * ratio);
    for (let y = 0; y < bitmap.height; y += step) {
      for (let x = 0; x < bitmap.width; x += step) {
        const w = Math.min(step, bitmap.width - x),
          h = Math.min(step, bitmap.height - y);
        let occupied = false;
        for (let yy = y; yy < y + h && !occupied; yy++) {
          for (let xx = x; xx < x + w; xx++) {
            if (pixels[(yy * bitmap.width + xx) * 4 + 3]) {
              occupied = true;
              break;
            }
          }
        }
        if (occupied)
          cells.push({
            x: x / ratio,
            y: y / ratio,
            sx: x,
            sy: y,
            w,
            h,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            variation: 0.7 + ((x * 13 + y * 7) % 97) / 160,
          });
      }
    }
    prepared = true;
  }

  function wake() {
    if (!frame && !reduced.matches && !document.hidden) {
      previous = 0;
      frame = requestAnimationFrame(draw);
    }
  }

  function draw(now) {
    frame = 0;
    const dt = previous ? Math.min(now - previous, 40) : 16;
    previous = now;
    const ticks = dt / (1000 / 60);
    ctx.clearRect(0, 0, width, height);
    let moving = false;
    if (active) {
      for (const cell of cells) {
        const x = cell.x + tileSize / 2 - (pointer?.x ?? 0);
        const y = cell.y + tileSize / 2 - (pointer?.y ?? 0);
        const distance = Math.hypot(x, y);
        const influence = pointer ? Math.max(0, 1 - distance / radius) : 0;
        const force = influence * influence * 95 * cell.variation;
        const angle = Math.atan2(y, x) + (cell.variation - 1) * 0.8;
        const targetX = Math.cos(angle) * force;
        const targetY = Math.sin(angle) * force;
        // Damped springs: each actual ink tile keeps its own position and velocity.
        const substeps = Math.ceil(ticks);
        const step = ticks / substeps;
        for (let i = 0; i < substeps; i++) {
          cell.vx =
            (cell.vx + (targetX - cell.dx) * 0.035 * step) *
            Math.pow(0.82, step);
          cell.vy =
            (cell.vy + (targetY - cell.dy) * 0.035 * step) *
            Math.pow(0.82, step);
          cell.dx += cell.vx * step;
          cell.dy += cell.vy * step;
        }
        if (
          Math.abs(cell.dx - targetX) > 0.06 ||
          Math.abs(cell.dy - targetY) > 0.06 ||
          Math.abs(cell.vx) > 0.025 ||
          Math.abs(cell.vy) > 0.025
        )
          moving = true;
        else {
          cell.dx = targetX;
          cell.dy = targetY;
          cell.vx = cell.vy = 0;
        }
        ctx.drawImage(
          bitmap,
          cell.sx,
          cell.sy,
          cell.w,
          cell.h,
          bounds.left + cell.x + cell.dx,
          bounds.top + cell.y + cell.dy,
          cell.w / ratio,
          cell.h / ratio,
        );
      }
      if (!pointer && !moving) {
        revealText();
        ctx.clearRect(0, 0, width, height);
      }
    }
    sparks = sparks.filter((burst) => {
      if (now - burst.start < 950) return true;
      burst.link.style.opacity = '';
      return false;
    });
    for (const burst of sparks) {
      const box = burst.link.getBoundingClientRect();
      for (const tile of burst.tiles) {
        const age = Math.max(0, now - burst.start - tile.delay);
        const outward = Math.min(1, age / 240);
        const returnTime = Math.min(1, Math.max(0, age - 260) / 570);
        const travel =
          (burst.falling ? outward * outward : 1 - Math.pow(1 - outward, 3)) *
          (1 - returnTime * returnTime * (3 - 2 * returnTime));
        ctx.drawImage(
          burst.source,
          tile.x,
          tile.y,
          tile.w,
          tile.h,
          box.left + tile.x / ratio + tile.dx * travel,
          box.top + tile.y / ratio + tile.dy * travel,
          tile.w / ratio,
          tile.h / ratio,
        );
      }
    }
    if (moving || sparks.length) frame = requestAnimationFrame(draw);
  }

  heading.addEventListener(
    'pointermove',
    (event) => {
      if (
        reduced.matches ||
        !fine.matches ||
        event.pointerType === 'touch' ||
        event.buttons ||
        !prepared
      )
        return;
      bounds = heading.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      active = true;
      heading.style.opacity = '0';
      wake();
    },
    { passive: true },
  );
  heading.addEventListener('pointerleave', () => {
    restore();
    wake();
  });
  heading.addEventListener('pointerdown', stop);

  document.addEventListener('click', () => clearTimeout(navigationTimer), true);
  addEventListener('pagehide', () => {
    clearTimeout(navigationTimer);
    stop();
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest(
      '.site-header nav a, .hero-actions a, .product-heading a.text-link, .product-bottom a.text-link',
    );
    if (
      !link ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self')
    )
      return;
    if (
      reduced.matches ||
      document.hidden ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (event.defaultPrevented || event.button > 0) return;
    const href = link.getAttribute('href');
    const internal = href?.startsWith('#');
    if (
      internal
        ? !document.getElementById(href.slice(1))
        : !href?.startsWith('https://')
    )
      return;
    clearTimeout(navigationTimer);
    clearBursts();
    const burst = fragmentLink(
      link,
      !!link.closest('.hero-actions, .product-bottom'),
    );
    if (!burst) return;
    event.preventDefault();
    sparks.push(burst);
    link.style.opacity = '0';
    navigationTimer = setTimeout(() => {
      if (internal) location.hash = href;
      else location.assign(href);
    }, 500);
    restore();
    wake();
  });

  addEventListener(
    'scroll',
    () => {
      if (!active) return;
      restore();
      revealText();
      cells.forEach((c) => {
        c.dx = c.dy = c.vx = c.vy = 0;
      });
      wake();
    },
    { passive: true },
  );
  addEventListener('blur', stop);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  reduced.addEventListener('change', prepare);
  fine.addEventListener('change', prepare);
  new ResizeObserver(() => {
    resizeCanvas();
    prepare();
  }).observe(heading);
  addEventListener(
    'resize',
    () => {
      resizeCanvas();
      prepare();
    },
    { passive: true },
  );
  resizeCanvas();
  document.fonts.ready.then(prepare);
})();
