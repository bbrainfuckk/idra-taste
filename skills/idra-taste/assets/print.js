/*
 * IdraPrint: marks with a physical cause, for print and screen styles.
 * No dependencies, deterministic (seeded), works in any page.
 *
 *   IdraPrint.install({ seed, grain, density, rough })  inject the SVG filters once
 *   IdraPrint.layer(el, { offset: [x, y], texture })     ink layer: multiply + drift + ink texture
 *   IdraPrint.paper(el, '#f2eee3', { fibre })           paper colour with faint fibre
 *   IdraPrint.halftone(src, opts) -> canvas              tone-driven AM halftone in one ink
 *   IdraPrint.dither(src, opts) -> canvas                palette dither (bayer2/4/8 or floyd)
 *   IdraPrint.ready() -> Promise                         fonts and images settled, sets html[data-ready]
 *
 * Filters (use with CSS `filter: url(#ip-ink)` etc.):
 *   #ip-ink    grain plus uneven ink density, for riso, silkscreen and offset layers
 *   #ip-rough  slight hand wobble on edges, for drawn and cut shapes
 *   #ip-toner  photocopy: grey crushed, speckle added
 */
(function () {
  'use strict';

  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hexToRgb(hex) {
    let h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  const SVGNS = 'http://www.w3.org/2000/svg';

  function install(opts) {
    const o = Object.assign({ seed: 7, grain: 0.08, density: 0.06, rough: 1.5 }, opts || {});
    const old = document.getElementById('idra-print-filters');
    if (old) old.remove();
    // Alpha masks: alpha = 1 + k - 2k * noise, so the mean stays near 1 and solids lose ink in specks and patches.
    const g = o.grain, d = o.density;
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('id', 'idra-print-filters');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
    svg.innerHTML = `
      <filter id="ip-ink" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${o.seed}" result="fine"/>
        <feColorMatrix in="fine" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-4 * g} 0 0 0 ${1 + 2 * g}" result="fineMask"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.012" numOctaves="3" seed="${o.seed + 11}" result="blot"/>
        <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-6 * d} 0 0 0 ${1 + 3 * d}" result="blotMask"/>
        <feComposite in="SourceGraphic" in2="fineMask" operator="in" result="a"/>
        <feComposite in="a" in2="blotMask" operator="in"/>
      </filter>
      <filter id="ip-rough" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${o.seed + 3}" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="${o.rough}" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="ip-toner" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0" result="grey"/>
        <feComponentTransfer in="grey" result="crushed">
          <feFuncR type="linear" slope="2.6" intercept="-0.75"/>
          <feFuncG type="linear" slope="2.6" intercept="-0.75"/>
          <feFuncB type="linear" slope="2.6" intercept="-0.75"/>
        </feComponentTransfer>
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="${o.seed + 5}" result="sp"/>
        <feColorMatrix in="sp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  12 0 0 0 -8.7" result="specks"/>
        <feFlood flood-color="#111" result="toner"/>
        <feComposite in="toner" in2="specks" operator="in" result="dots"/>
        <feMerge><feMergeNode in="crushed"/><feMergeNode in="dots"/></feMerge>
      </filter>`;
    (document.body || document.documentElement).appendChild(svg);
    return svg;
  }

  // An ink layer: everything inside prints in one pass, so it shares drift and texture.
  function layer(el, opts) {
    const o = Object.assign({ offset: [0, 0], texture: true, blend: 'multiply' }, opts || {});
    el.style.mixBlendMode = o.blend;
    el.style.transform = `translate(${o.offset[0]}px, ${o.offset[1]}px)`;
    if (o.texture) el.style.filter = 'url(#ip-ink)';
    return el;
  }

  function paper(el, color, opts) {
    const o = Object.assign({ fibre: 0.1 }, opts || {});
    const tile = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'>` +
      `<filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.7 0.25' numOctaves='3' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.22  ${o.fibre * 2} 0 0 0 ${-o.fibre * 0.7}'/></filter>` +
      `<rect width='100%' height='100%' filter='url(#f)'/></svg>`;
    el.style.backgroundColor = color;
    el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;
    el.style.backgroundSize = '320px 320px';
    return el;
  }

  // Draw any image, canvas, video or SVG into a canvas of w x h with object-fit: cover.
  function rasterise(src, w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (typeof src === 'function') { src(ctx, w, h); return c; }
    const sw = src.naturalWidth || src.videoWidth || src.width;
    const sh = src.naturalHeight || src.videoHeight || src.height;
    const s = Math.max(w / sw, h / sh);
    const dw = sw * s, dh = sh * s;
    ctx.drawImage(src, (w - dw) / 2, (h - dh) / 2, dw, dh);
    return c;
  }

  function lumaAt(data, w, h, x, y) {
    const xi = Math.min(w - 1, Math.max(0, x | 0));
    const yi = Math.min(h - 1, Math.max(0, y | 0));
    const i = (yi * w + xi) * 4;
    const a = data[i + 3] / 255;
    const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    return 1 - a + a * l; // transparent counts as paper
  }

  /*
   * Tone-driven halftone in one ink. Dark areas get big dots, light areas small ones.
   * src: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | (ctx, w, h) => void
   * opts: width, height, cell (px between dot centres), angle (deg), ink, paper (null = transparent),
   *       contrast (1 = as is), gamma, shape ('dot' | 'line'), jitter (0..1, ink spread)
   */
  function halftone(src, opts) {
    const o = Object.assign({ width: 800, height: 800, cell: 8, angle: 45, ink: '#000000', paper: null,
      contrast: 1, gamma: 1, shape: 'dot', jitter: 0.06, seed: 1 }, opts || {});
    const W = o.width, H = o.height;
    const srcC = rasterise(src, W, H);
    const data = srcC.getContext('2d').getImageData(0, 0, W, H).data;
    const out = document.createElement('canvas');
    out.width = W; out.height = H;
    const ctx = out.getContext('2d');
    if (o.paper) { ctx.fillStyle = o.paper; ctx.fillRect(0, 0, W, H); }
    ctx.fillStyle = o.ink;
    const r = rng(o.seed);
    const a = (o.angle * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a);
    const cx = W / 2, cy = H / 2, R = Math.hypot(W, H) / 2 + o.cell;
    const maxR = (o.cell / 2) * Math.SQRT2;
    for (let v = -R; v <= R; v += o.cell) {
      for (let u = -R; u <= R; u += o.cell) {
        const x = cx + u * ca - v * sa;
        const y = cy + u * sa + v * ca;
        if (x < -o.cell || y < -o.cell || x > W + o.cell || y > H + o.cell) continue;
        let l = lumaAt(data, W, H, x, y);
        l = Math.min(1, Math.max(0, (l - 0.5) * o.contrast + 0.5));
        const dark = Math.pow(1 - l, o.gamma);
        if (dark < 0.02) continue;
        const spread = 1 + (r() - 0.5) * o.jitter;
        if (o.shape === 'line') {
          const t = dark * o.cell * spread;
          ctx.save(); ctx.translate(x, y); ctx.rotate(a);
          ctx.fillRect(-o.cell / 2, -t / 2, o.cell, t);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, Math.sqrt(dark) * maxR * spread, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    return out;
  }

  const BAYER = {
    bayer2: [[0, 2], [3, 1]],
    bayer4: [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]],
    // 8 x 8 from the 4 x 4 by the standard recursion: M8 = 4 * M4 + M2 per quadrant.
    bayer8: (function () {
      const m4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
      const m2 = [[0, 2], [3, 1]];
      const m = [];
      for (let y = 0; y < 8; y++) {
        m[y] = [];
        for (let x = 0; x < 8; x++) m[y][x] = 4 * m4[y % 4][x % 4] + m2[(y / 4) | 0][(x / 4) | 0];
      }
      return m;
    })(),
  };

  /*
   * Map an image to a fixed palette with ordered (Bayer) or Floyd-Steinberg dithering.
   * Output is small and exact; scale it with CSS `image-rendering: pixelated` at integer factors.
   * opts: width, height, palette (hex array), matrix ('bayer2' | 'bayer4' | 'bayer8' | 'floyd'), spread (0..128)
   */
  function dither(src, opts) {
    const o = Object.assign({ width: 320, height: 200, palette: ['#000000', '#ffffff'], matrix: 'bayer4', spread: 48 }, opts || {});
    const W = o.width, H = o.height;
    const c = rasterise(src, W, H);
    const ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    const pal = o.palette.map(hexToRgb);
    const nearest = (r, g, b) => {
      let best = 0, bd = Infinity;
      for (let i = 0; i < pal.length; i++) {
        const p = pal[i];
        const dr = r - p[0], dg = g - p[1], db = b - p[2];
        const dist = 0.3 * dr * dr + 0.59 * dg * dg + 0.11 * db * db;
        if (dist < bd) { bd = dist; best = i; }
      }
      return pal[best];
    };
    if (o.matrix === 'floyd') {
      const buf = new Float32Array(W * H * 3);
      for (let i = 0; i < W * H; i++) { buf[i * 3] = d[i * 4]; buf[i * 3 + 1] = d[i * 4 + 1]; buf[i * 3 + 2] = d[i * 4 + 2]; }
      const push = (x, y, er, eg, eb, f) => {
        if (x < 0 || y < 0 || x >= W || y >= H) return;
        const j = (y * W + x) * 3; buf[j] += er * f; buf[j + 1] += eg * f; buf[j + 2] += eb * f;
      };
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const j = (y * W + x) * 3;
          const p = nearest(buf[j], buf[j + 1], buf[j + 2]);
          const er = buf[j] - p[0], eg = buf[j + 1] - p[1], eb = buf[j + 2] - p[2];
          d[(y * W + x) * 4] = p[0]; d[(y * W + x) * 4 + 1] = p[1]; d[(y * W + x) * 4 + 2] = p[2]; d[(y * W + x) * 4 + 3] = 255;
          push(x + 1, y, er, eg, eb, 7 / 16); push(x - 1, y + 1, er, eg, eb, 3 / 16);
          push(x, y + 1, er, eg, eb, 5 / 16); push(x + 1, y + 1, er, eg, eb, 1 / 16);
        }
      }
    } else {
      const m = BAYER[o.matrix] || BAYER.bayer4;
      const n = m.length, levels = n * n;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const t = ((m[y % n][x % n] + 0.5) / levels - 0.5) * o.spread;
          const p = nearest(d[i] + t, d[i + 1] + t, d[i + 2] + t);
          d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2]; d[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
    c.style.imageRendering = 'pixelated';
    return c;
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error('Could not load ' + url + ' (serve the page over http, or use scripts/shot.mjs)'));
      im.src = url;
    });
  }

  async function ready() {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    await Promise.all(imgs.map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    document.documentElement.dataset.ready = '1';
  }

  window.IdraPrint = { install, layer, paper, halftone, dither, rasterise, loadImage, ready, rng, hexToRgb };
})();
