# Colour

Generated design picks colours on a screen. Real design picks inks, paints and pigments, and lets them mix like matter. Start from the medium.

## Work in inks, not hex
1. Choose 2 to 5 inks from the movement recipe or the list below.
2. Add the paper as a colour.
3. Every other colour on the piece must be an overprint (multiply) of two inks, a halftone tint of one ink, or the paper.
4. Write the ink list at the top of the CSS as custom properties (`--ink-pink`, `--ink-blue`, `--paper`) and use nothing else.

## Risograph ink list (selection)
From the open `riso-colors` data (MIT, sourced from stencil.wiki). Full list: `https://cdn.jsdelivr.net/npm/riso-colors@1.0.1/riso-colors.json`.

| Ink | Hex | Ink | Hex |
|---|---|---|---|
| Black | `#000000` | Fluorescent Pink | `#ff48b0` |
| Medium Blue | `#3255a4` | Fluorescent Orange | `#ff7477` |
| Blue | `#0078bf` | Fluorescent Yellow | `#ffe900` |
| RisoFederal Blue | `#3d5588` | Fluorescent Green | `#44d62c` |
| Aqua | `#5ec8e5` | Fluorescent Red | `#ff4c65` |
| Teal | `#00838a` | Bright Red | `#f15060` |
| Green | `#00a95c` | Scarlet | `#f65058` |
| Kelly Green | `#67b346` | Pumpkin | `#ff6f4c` |
| Sea Foam | `#62c2b1` | Orange | `#ff6c2f` |
| Hunter Green | `#407060` | Sunflower | `#ffb511` |
| Purple | `#765ba7` | Yellow | `#ffe800` |
| Violet | `#9d7ad2` | Light Lime | `#e3ed55` |
| Burgundy | `#914e72` | Flat Gold | `#bb8b41` |
| Bubble Gum | `#f984ca` | Metallic Gold | `#ac936e` |
| Light Mauve | `#e6b5c9` | Midnight | `#435060` |
| Brick | `#a75154` | Light Gray | `#88898a` |

## Papers
| Paper | Hex |
|---|---|
| Natural | `#f2eee3` |
| Uncoated white | `#f6f4ee` |
| Newsprint | `#e9e4d8` |
| Cream | `#f4ead2` |
| Kraft | `#c9a77c` |
| Black stock (with opaque or metallic ink) | `#1c1b1a` |
| Pink stock (approximate) | `#f4c6d4` |
| Sky stock (approximate) | `#bfdff0` |
| Canary stock (approximate) | `#f6e27a` |
| Mint stock (approximate) | `#cde8d6` |

Cream and natural are the most common generated grounds. Pick the paper for the subject: a coloured stock often does more than a fourth ink.

## Pigment mixing with spectral.js
RGB mixing makes muddy greys (blue plus yellow gives grey). Paint and ink mixing gives green. For gradients, tints and colour ramps that feel physical, mix with spectral.js (MIT):

```html
<script src="https://cdn.jsdelivr.net/npm/spectral.js@3.0.0/spectral.min.js"></script>
<script>
  const blue = new spectral.Color('#0078bf');
  const yellow = new spectral.Color('#ffe800');
  spectral.mix([blue, 1], [yellow, 1]).toString();        // a real green
  spectral.palette(blue, yellow, 7).map(c => c.toString()); // 7-step pigment ramp
</script>
```

Use it for: split-fountain bands, airbrush skies, paint-like ramps, tints of an ink. Do not use it to invent new hues outside the palette.

## Rules
- **Value first.** Check the piece in grayscale. A strong design has a clear dark, middle and light structure.
- **Vibration is a tool.** Complementary colours at equal value shimmer (Fillmore). Use it on purpose or avoid it on purpose.
- **Dominant, secondary, accent.** Roughly 60, 30, 10 by area. Generated designs spread colours evenly.
- **No default gradients.** The only gradients allowed are ones the medium makes: split fountain, airbrush, halftone ramp, dither ramp, pigment mix.
- **Accessibility on screens.** For web text, check contrast (WCAG AA 4.5:1 for body text). Fluorescent inks on paper colours often fail; keep them for large display text and shapes.
- **Fluorescents on screen.** They are outside print gamut and look correct on screens. For real print, tell the printer it is a fluorescent spot ink; do not convert to CMYK.
