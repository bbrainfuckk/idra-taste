#!/usr/bin/env node
// Render an HTML sheet to PNG or PDF with headless Chrome or Edge, driven over the DevTools pipe. No dependencies.
//
//   node shot.mjs <page.html[#gray|#thumb] | url> <out.png|out.pdf> [--size 1200x1600] [--scale 2] [--wait 8000]
//
// --size   the sheet in CSS px (match its --w and --h). The viewport is set to exactly this size through
//          DevTools emulation: --window-size alone gives a smaller viewport in headless Chrome.
// --scale  device scale factor (2 = retina, 2.923 = 1200 px wide sheet to A3 at 300 dpi)
// --wait   longest wait in ms for html[data-ready] (set by IdraPrint.ready) before rendering anyway
// #gray    the page's own greyscale view (html.gray in the starter).
// #thumb   renders the whole sheet, then shrinks the picture to a tenth (area average in linear light),
//          so the thumbnail is the real piece seen small, not the page laid out again at 10 percent.
// Set BROWSER to a Chrome or Edge path if neither is found.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf('--' + name);
  if (i === -1) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const size = flag('size', '1200x1600');
const scale = Number(flag('scale', '1'));
const wait = Number(flag('wait', '8000'));
const [input, output] = args;
if (!input || !output) {
  console.error('usage: node shot.mjs <page.html | url> <out.png | out.pdf> [--size WxH] [--scale N] [--wait ms]');
  process.exit(2);
}

function findBrowser() {
  const env = process.env.BROWSER;
  if (env && existsSync(env)) return env;
  const pf = process.env['PROGRAMFILES'] || 'C:\\Program Files';
  const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  const local = process.env.LOCALAPPDATA || '';
  const candidates = [
    join(pf, 'Google\\Chrome\\Application\\chrome.exe'),
    join(pf86, 'Google\\Chrome\\Application\\chrome.exe'),
    join(local, 'Google\\Chrome\\Application\\chrome.exe'),
    join(pf86, 'Microsoft\\Edge\\Application\\msedge.exe'),
    join(pf, 'Microsoft\\Edge\\Application\\msedge.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge',
  ];
  return candidates.find((p) => p && existsSync(p));
}

const browser = findBrowser();
if (!browser) {
  console.error('No Chrome or Edge found. Set BROWSER to its path.');
  process.exit(1);
}

// #thumb is made here, so the page always renders at full size and its own thumb CSS (if any) stays off.
let url = input;
let thumb = false;
if (!/^[a-z]+:\/\//i.test(input)) {
  const [file, hash] = input.split('#');
  thumb = hash === 'thumb';
  url = pathToFileURL(resolve(file)).href + (hash && !thumb ? '#' + hash : '');
} else if (url.endsWith('#thumb')) {
  thumb = true;
  url = url.slice(0, -'#thumb'.length);
}
const out = resolve(output);
const pdf = out.toLowerCase().endsWith('.pdf');
const [w, h] = size.split('x').map(Number);
const profile = mkdtempSync(join(tmpdir(), 'idra-taste-shot-'));

const chrome = spawn(browser, [
  '--headless=new', '--remote-debugging-pipe', '--disable-gpu-sandbox', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--allow-file-access-from-files', `--user-data-dir=${profile}`,
], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
let stderr = '';
chrome.stderr.on('data', (d) => { stderr = (stderr + d).slice(-800); });
chrome.once('error', (e) => { console.error('Could not start the browser.', e.message); process.exit(1); });
const exited = new Promise((r) => chrome.once('exit', r));

// DevTools protocol over the pipe: JSON messages separated by a NUL byte, fd 3 in and fd 4 out.
let nextId = 0;
const pending = new Map();
const listeners = new Set();
let partial = [];
chrome.stdio[4].on('data', (d) => {
  let start = 0, end;
  while ((end = d.indexOf(0, start)) !== -1) {
    partial.push(d.subarray(start, end));
    const m = JSON.parse(Buffer.concat(partial).toString('utf8'));
    partial = [];
    start = end + 1;
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id);
      pending.delete(m.id);
      m.error ? p.reject(new Error(`${p.method}: ${m.error.message}`)) : p.resolve(m.result);
    } else if (m.method) {
      for (const l of listeners) l(m);
    }
  }
  if (start < d.length) partial.push(d.subarray(start));
});
exited.then(() => {
  for (const p of pending.values()) p.reject(new Error(`${p.method}: the browser exited. ${stderr}`));
  pending.clear();
});
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, { resolve, reject, method });
  chrome.stdio[3].write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + '\0');
});
const once = (method, sessionId) => new Promise((resolve) => {
  const l = (m) => { if (m.method === method && m.sessionId === sessionId) { listeners.delete(l); resolve(m.params); } };
  listeners.add(l);
});

// Wait for IdraPrint.ready (html[data-ready]); a page without print.js only waits for its fonts.
const settle = `new Promise((done) => {
  const t0 = performance.now();
  const frames = () => requestAnimationFrame(() => requestAnimationFrame(() => done(true)));
  const check = () => {
    if (document.documentElement.dataset.ready === '1') return frames();
    if (!window.IdraPrint) return document.fonts.ready.then(frames);
    if (performance.now() - t0 > ${wait}) return done(false);
    setTimeout(check, 50);
  };
  check();
})`;

// Box filter in linear light: the average a viewer's eye makes of halftone dots and grain from across a room.
const shrink = async (src, tw, th) => {
  const im = new Image();
  im.src = src;
  await im.decode();
  const sw = im.naturalWidth, sh = im.naturalHeight;
  const c = document.createElement('canvas');
  c.width = sw; c.height = sh;
  const g = c.getContext('2d');
  g.drawImage(im, 0, 0);
  const s = g.getImageData(0, 0, sw, sh).data;
  const lin = new Float64Array(256);
  for (let i = 0; i < 256; i++) { const v = i / 255; lin[i] = v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }
  const enc = (v) => Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055));
  const sum = new Float64Array(tw * th * 3), n = new Uint32Array(tw * th);
  for (let y = 0; y < sh; y++) {
    const row = Math.floor(y * th / sh) * tw;
    for (let x = 0; x < sw; x++) {
      const i = (y * sw + x) * 4, j = row + Math.floor(x * tw / sw);
      sum[j * 3] += lin[s[i]]; sum[j * 3 + 1] += lin[s[i + 1]]; sum[j * 3 + 2] += lin[s[i + 2]]; n[j]++;
    }
  }
  c.width = tw; c.height = th;
  const o = g.createImageData(tw, th);
  for (let j = 0; j < tw * th; j++) {
    for (let k = 0; k < 3; k++) o.data[j * 4 + k] = enc(sum[j * 3 + k] / n[j]);
    o.data[j * 4 + 3] = 255;
  }
  g.putImageData(o, 0, 0);
  return c.toDataURL('image/png').split(',')[1];
};

const watchdog = setTimeout(() => { console.error('Render timed out after 120 s.'); chrome.kill(); process.exit(1); }, 120000);
let failed = '';
let note = '';
try {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  await page('Page.enable');
  await page('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: false });
  const loaded = once('Page.loadEventFired', sessionId);
  const nav = await page('Page.navigate', { url });
  if (nav.errorText) throw new Error(`Could not open ${url} (${nav.errorText})`);
  await loaded;
  const { result } = await page('Runtime.evaluate', { expression: settle, awaitPromise: true, returnByValue: true });
  if (!result.value) note = ` (html[data-ready] not set after ${wait} ms, rendered anyway)`;

  let data;
  if (pdf) {
    ({ data } = await page('Page.printToPDF', {
      printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    }));
  } else {
    ({ data } = await page('Page.captureScreenshot', { format: 'png' }));
    if (thumb) {
      const tw = Math.max(1, Math.round(w * scale / 10)), th = Math.max(1, Math.round(h * scale / 10));
      await page('Page.navigate', { url: 'about:blank' });
      const r = await page('Runtime.evaluate', {
        expression: `(${shrink})(${JSON.stringify('data:image/png;base64,' + data)}, ${tw}, ${th})`,
        awaitPromise: true, returnByValue: true,
      });
      if (r.exceptionDetails) throw new Error('Thumbnail failed: ' + r.exceptionDetails.text);
      data = r.result.value;
    }
  }
  writeFileSync(out, Buffer.from(data, 'base64'));
  await send('Browser.close').catch(() => {});
} catch (e) {
  failed = e.message;
  chrome.kill();
}
await Promise.race([exited, new Promise((r) => setTimeout(r, 5000).unref())]);
clearTimeout(watchdog);
// Chrome's helper processes inherit the pipes and hold them open for seconds; let go of them now.
for (const s of chrome.stdio) s?.destroy();

for (let i = 0; i < 40; i++) {
  try { rmSync(profile, { recursive: true, force: true }); break; } catch { await new Promise((r) => setTimeout(r, 250)); }
}

if (failed) {
  console.error('Render failed.', failed);
  process.exit(1);
}
const what = thumb ? `thumbnail at a tenth of ${w}x${h} css px at ${scale}x` : `${w}x${h} css px at ${scale}x`;
console.log(`${out} (${what})${note}`);
