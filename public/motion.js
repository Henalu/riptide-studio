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
  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();
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
  const radius = 48;

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
    heading.style.maskImage = '';
    heading.style.webkitMaskImage = '';
  }

  function stop() {
    restore();
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    sparks = [];
    cells.forEach((c) => {
      c.dx = c.dy = c.opacity = 0;
    });
    ctx.clearRect(0, 0, width, height);
  }

  // Sample the real headline font once per size, not on every mouse move.
  function prepare() {
    stop();
    prepared = false;
    cells = [];
    if (
      reduced.matches ||
      !fine.matches ||
      !CSS.supports('mask-image', 'radial-gradient(black, transparent)')
    )
      return;
    bounds = heading.getBoundingClientRect();
    const bitmap = document.createElement('canvas');
    bitmap.width = Math.ceil(bounds.width);
    bitmap.height = Math.ceil(bounds.height);
    const paint = bitmap.getContext('2d', { willReadFrequently: true });
    if (!paint || !bitmap.width || !bitmap.height) return;
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
      paint.fillText(text, box.left - bounds.left, baseline);
    }
    const pixels = paint.getImageData(0, 0, bitmap.width, bitmap.height).data;
    const step = 4;
    for (let y = 0; y < bitmap.height; y += step) {
      for (let x = 0; x < bitmap.width; x += step) {
        let alpha = 0;
        for (let yy = y; yy < Math.min(y + step, bitmap.height); yy++) {
          for (let xx = x; xx < Math.min(x + step, bitmap.width); xx++) {
            alpha += pixels[(yy * bitmap.width + xx) * 4 + 3];
          }
        }
        alpha /= step * step * 255;
        if (alpha > 0.12) cells.push({ x, y, alpha, dx: 0, dy: 0, opacity: 0 });
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
    const ease = 1 - Math.exp(-dt / 45);
    ctx.clearRect(0, 0, width, height);
    let moving = false;
    ctx.fillStyle = ink;
    for (const cell of cells) {
      const vx = pointer ? cell.x + 2 - pointer.x : 0;
      const vy = pointer ? cell.y + 2 - pointer.y : 0;
      const distance = Math.hypot(vx, vy);
      const strength = pointer ? Math.max(0, 1 - distance / radius) : 0;
      const opacity = Math.min(1, strength * 2.5);
      const shift = strength * 32;
      const dx = distance ? (vx / distance) * shift : shift;
      const dy = distance ? (vy / distance) * shift : 0;
      cell.dx += (dx - cell.dx) * ease;
      cell.dy += (dy - cell.dy) * ease;
      cell.opacity += (opacity - cell.opacity) * ease;
      if (
        Math.abs(cell.opacity - opacity) > 0.01 ||
        Math.abs(cell.dx - dx) > 0.1 ||
        Math.abs(cell.dy - dy) > 0.1
      )
        moving = true;
      if (cell.opacity > 0.01) {
        ctx.globalAlpha = cell.opacity * cell.alpha;
        ctx.fillRect(
          bounds.left + cell.x + cell.dx,
          bounds.top + cell.y + cell.dy,
          3.2,
          3.2,
        );
      }
    }
    sparks = sparks.filter((p) => now - p.start < p.duration);
    for (const p of sparks) {
      const progress = Math.max(0, (now - p.start) / p.duration);
      const travel = 1 - Math.pow(1 - progress, 3);
      ctx.globalAlpha = (1 - progress) * 0.9;
      ctx.fillStyle = p.color;
      ctx.fillRect(
        p.x + p.dx * travel,
        p.y + p.dy * travel + progress * progress * 12,
        p.size,
        p.size,
      );
    }
    ctx.globalAlpha = 1;
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
      const mask = `radial-gradient(circle ${radius}px at ${pointer.x}px ${pointer.y}px, transparent 0%, transparent 60%, black 100%)`;
      heading.style.maskImage = mask;
      heading.style.webkitMaskImage = mask;
      wake();
    },
    { passive: true },
  );
  heading.addEventListener('pointerleave', () => {
    restore();
    wake();
  });
  heading.addEventListener('pointerdown', stop);

  document.querySelectorAll('.site-header nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        reduced.matches ||
        document.hidden ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const box = link.getBoundingClientRect();
      const originX = event.detail ? event.clientX : box.left + box.width / 2;
      const originY = event.detail ? event.clientY : box.top + box.height / 2;
      // Native navigation happens immediately; the fragments never intercept input.
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const speed = 16 + Math.random() * 24;
        sparks.push({
          x: originX + ((i % 6) - 2.5) * 4,
          y: originY + (Math.floor(i / 6) - 1) * 4,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: i % 3 === 0 ? 4 : 3,
          color: i % 4 === 0 ? accent : ink,
          start: performance.now(),
          duration: 300 + (i % 3) * 40,
        });
      }
      sparks = sparks.slice(-72);
      restore();
      wake();
    });
  });

  addEventListener(
    'scroll',
    () => {
      if (!pointer && !cells.some((c) => c.opacity > 0.01)) return;
      restore();
      cells.forEach((c) => {
        c.opacity = c.dx = c.dy = 0;
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
