# Imperfection rules

Machine-made design is too even: every gap the same, every edge perfect, every colour exact. Real design carries the marks of how it was made. These rules add those marks honestly.

## Rule 0: every mark needs a cause
Before adding any texture, name the physical process that made it: ink, paper, screen, drum, toner, lens, scanner, airbrush, brush, CRT, compression. If you cannot name the cause, do not add the mark. A riso piece gets riso marks, a pixel piece gets pixel marks, a clean editorial piece gets almost none.

## Print processes

| Process | Marks it leaves | Marks it never leaves |
|---|---|---|
| Risograph | grain per ink, multiply overprint, 0.3 to 1 mm drift per layer, uneven solids, roller banding | full colour, smooth gradients, pure black |
| Silkscreen | flat opaque ink, crisp edges with slight spread, keyline drift, split fountain | halftone finer than about 65 lpi, soft shadows |
| Offset (vintage) | halftone rosettes, slight drift between plates, paper tone | grain noise on type |
| Letterpress | impression (ink squash at edges), uneven fill on solids | gradients, fine tints |
| Photocopy | toner speckle, crushed blacks, thickened edges, generation loss | colour, mid greys |
| Airbrush | long smooth gradients, soft overspray at masks | grain, halftone dots at viewing distance |

## Misregistration
- One whole **layer** moves, never single elements. Every element of the pink layer shifts together.
- Size: on screen 1 to 3 px; at print size 0.3 to 1 mm for riso, 0.1 to 0.5 mm for offset and screen print.
- Direction: pick one per layer (for example pink +2 px x, +1 px y). Keep it the same across the piece.
- The keyline (black) layer drifting against the colour fields is the most convincing version.

## Overprint
- Inks multiply where they overlap: `mix-blend-mode: multiply` on each ink layer.
- Plan overlaps as colours. Pink over blue gives violet: use the violet on purpose.
- White does not exist as ink in most processes. White is the paper.

## Ink density and grain
- Solids are never flat: add low-frequency density variation of 3 to 8 percent, and fine grain of 4 to 10 percent.
- Type in an ink layer gets the same texture as the rest of that layer.
- Grain is monochrome and scaled to the output size. Grain that is visible at thumbnail size is too strong.

## Halftone
- Tone-driven: dot size follows the image luminance. A uniform dot pattern laid over an image is not halftone.
- One frequency per ink. Classic angles: black 45, cyan 15, magenta 75, yellow 0 degrees. For two-ink work use 45 and 75 or 15.
- Coarse (20 to 45 lpi at print size) reads as pop and comic. Fine (85 to 150 lpi) reads as magazine.

## Paper
- Paper is a decision, not a default. Choose it like an ink. Coloured stocks (pink, sky, canary, mint, kraft, black with opaque ink) are often the stronger move.
- Warm cream is the most common generated ground. Use it only when the subject's world really is cream (old books, newsprint, aged labels) and say why in the design notes.
- Print styles avoid pure `#ffffff` unless a bright coated white stock is chosen on purpose. Options: uncoated white `#f6f4ee`, natural `#f2eee3`, newsprint `#e9e4d8`, kraft `#c9a77c`, or a coloured stock from `color.md`.
- Age shows as a flat tone shift, not as stains, tears and scratches.

## Hand-made shapes
- Drawn elements wobble slightly: displace paths with low-amplitude noise (`IdraPrint` rough filter at scale 1 to 2).
- SVG applies an element's filter before its mask and clip-path, so `filter: url(#ip-rough)` on a masked shape roughens the fill while the cut edges stay digitally crisp (knock-out letters are the usual victim). Put the mask on the shape and the filter on a `<g>` around it: `<g filter="url(#ip-rough)"><rect mask="url(#knockout)" ... /></g>`.
- Cut-paper edges are straight segments with small angle changes, not noisy.
- Symmetry is built by hand: mirror, then adjust a few points.

## Rhythm and spacing
- Use a spacing scale with real contrast (for example 4, 8, 24, 64) and choose per relationship. Uniform 24 px gaps everywhere is a tell.
- Break one rule per layout on purpose: one element crosses the grid, one word is huge, one image is cropped by the edge. Only one, and it should mean something.

## Screen media
- Pixel art: integer scaling, one pixel grid, palette limit, no anti-aliasing. Imperfection is in hand-placed pixels and dither choices.
- CRT marks (scanlines, glow, bloom) only when the subject is a CRT.
- Compression marks (JPEG blocks, GIF banding) only when the subject is the early web.

## Limits
- If a viewer notices the effect before the image, it is too strong. Halve it.
- Never stack effects from different processes (riso grain plus VHS glitch plus film grain).
- Things that are not imperfection: random rotation of every element, grunge brush overlays, coffee stains, scratches everywhere, chromatic aberration on everything, glitch on a print piece.
