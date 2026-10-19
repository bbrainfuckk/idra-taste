# Toolbox

idra-taste does art direction and owns the print marks (`assets/print.js`). Everything else is installed from its own project and called when needed. Nothing below is copied into this plugin.

## Installed alongside (Claude Code plugins)
Run `setup.sh` in the plugin folder once per machine, or install by hand:

| Plugin | Install | Use it for |
|---|---|---|
| frontend-design (Anthropic) | `claude plugin install frontend-design@claude-plugins-official` | Principles for distinctive web UI. Its rules apply to every web page. |
| taste-skill (Leonxlnx) | `claude plugin marketplace add Leonxlnx/taste-skill` then `claude plugin install taste-skill@taste-skill` | Web pages and app screens: its section blueprints, its real-browser inspector (`inspect.mjs`) and its three-width screenshot loop. |
| Impeccable (Paul Bakaus) | `claude plugin marketplace add pbakaus/impeccable` then `claude plugin install impeccable@impeccable` | The slop detector. `/impeccable critique`, `/impeccable audit`, `/impeccable polish`, and the CLI below. |

**Impeccable detector on any file:** find the installed launcher and run it.
```bash
IMP=$(ls -d ~/.claude/plugins/cache/impeccable/impeccable/*/skills/impeccable/scripts/impeccable | tail -1)
"$IMP" detect path/to/poster.html
```
Impeccable also installs hooks: after an Edit or Write on a UI file it scans the file and adds a short note, and at the end of a turn it runs a deeper pass. It keeps a cache in `.impeccable/` in the project (add it to `.gitignore`). Turn it off per project with `/impeccable hooks off`.

**When Impeccable flags something the movement wants** (for example all-caps labels in a constructivist poster, a split-fountain gradient), do not silently ignore it. Record the reason with its narrow ignore command (`hooks ignore-value ... --reason "constructivist poster: all-caps labels are the movement's language"`) or note it in the design notes.

**taste-skill and idra-taste together on a web page:** idra-taste picks the movement, palette, type and marks. taste-skill supplies the page run (sections, inspector, screenshots). Where taste-skill's house style bans something the movement uses on purpose (thin rules in a Japanese editorial grid, dense small text in Y2K web), the movement wins, and the design notes say why.

## Optional plugins (not installed by default)
| Plugin | Licence | Why optional |
|---|---|---|
| `emilkowalski/skills` (emil-design-eng) | MIT | Motion and interaction polish for web UI. Install when a page needs refined micro-interactions. |
| `ConardLi/garden-skills` (web-design-engineer) | MIT | Extra web style recipes and an anti-cliche list. Overlaps with taste-skill. |
| `taste-skill-classics@taste-skill` | MIT | Brutalist, minimalist and soft web styles, called by name. |
| `willibrandon/pixel-plugin` | MIT | Lets Claude drive Aseprite for sprites and frame animation. Needs Aseprite installed (paid app) and Go to build. |

## Libraries for the page itself
Load from a CDN with the exact version below, or `npm install` in the project. All versions were checked to exist.

| Library | Licence | Load | Use |
|---|---|---|---|
| `assets/print.js` (ours) | IDRA | copy next to the page | ink layers, drift, grain, density, paper, halftone, dither, toner, rough edges |
| spectral.js 3.0.0 | MIT | `https://cdn.jsdelivr.net/npm/spectral.js@3.0.0/spectral.min.js` (global `spectral`) | pigment mixing, split fountain, airbrush skies |
| Paper Shaders 0.0.81 | Apache-2.0 | `import { ShaderMount, halftoneDotsFragmentShader, halftoneCmykFragmentShader, imageDitheringFragmentShader, paperTextureFragmentShader, grainGradientFragmentShader, getShaderColorFromString } from 'https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.81/+esm'` | GPU halftone CMYK, image dithering, paper texture, live and animated effects. Constructor: `new ShaderMount(div, fragmentShader, uniforms, undefined, speed)`; uniform names are listed in each shader's `.d.ts` |
| riso-colors 1.0.1 | MIT | `https://cdn.jsdelivr.net/npm/riso-colors@1.0.1/riso-colors.json` | the full Risograph ink list |
| p5 2.3.4 | LGPL-2.1 | `https://cdn.jsdelivr.net/npm/p5@2.3.4/lib/p5.min.js` | generative drawing when a sketch is the clearest way |
| Hydra (hydra-synth 1.4.0) | AGPL-3.0 | `https://cdn.jsdelivr.net/npm/hydra-synth@1.4.0/dist/hydra-synth.js` | psychedelic video feedback, kaleidoscopes, live visuals |
| LYGIA 1.4.1 | Prosperity (non-commercial) or Patron | `https://lygia.xyz/resolve.js` | shader functions: noise, warps, colour |
| p5.riso (antiboredom) | Anti-Capitalist Licence | `https://cdn.jsdelivr.net/gh/antiboredom/p5.riso@0ec2a9e330be5b7292ea8faf931f82fbb34687fb/lib/p5.riso.js` | real riso colour separations for printing on a Risograph |

### Licence notes for client work
- **Safe for commercial work:** print.js, spectral.js, Paper Shaders, riso-colors, p5, and the OFL fonts.
- **Hydra (AGPL):** the images and videos you make with it are yours. Embedding Hydra in a client's website puts that site's code under AGPL terms, so render it to video (idra-motion) or stills instead.
- **LYGIA:** free for non-commercial work. For a paying client, sponsor the author (Patron licence) or use Paper Shaders and your own noise.
- **p5.riso:** its licence allows individuals, non-profits and worker-owned co-operatives only. A company with non-worker owners may not use it. For company work, separate the layers with print.js and export each ink as a greyscale master instead.

## Motion
- idra-motion (already installed): a scene is one HTML page whose frames are a function of time. Use the same recipe, inks and `print.js` inside the scene. Keep every mark seeded so frames are stable (`IdraPrint.install({ seed })`, `IdraPrint.halftone(..., { seed })`).
- Hydra for feedback loops: render frames to video through idra-motion or a screen capture, then grade them through the recipe's inks.

## Rendering and review
- `scripts/shot.mjs page.html out.png --size 1200x1600 --scale 2` renders with headless Chrome or Edge. `--size` is the sheet's own size; the script sets the viewport to exactly that through DevTools emulation, because `--window-size` alone gives a smaller viewport in headless Chrome and heavy filtered layers then paint only part of the sheet. It captures once `html[data-ready]` is set (`IdraPrint.ready()`), or after `--wait` ms. `page.html#gray` gives the value check. `page.html#thumb` with the same `--size` gives the thumbnail read: the whole sheet rendered, then shrunk to a tenth with an area average in linear light, so halftone dots and grain blend the way they do from across a room. A `.pdf` output prints the sheet at its `@page` size.
- `scripts/serve.mjs folder` serves a folder on `http://localhost:8750/` so canvases can read local images. Pages opened as `file://` cannot halftone local photos in a normal browser.
- Print masters: for a Risograph or screen printer, export each ink layer alone as a greyscale PNG (hide the other layers, set the layer's colour to black, render).
