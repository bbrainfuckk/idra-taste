# PC-98 pixel art (Japan, 1982 to 1997)

**Where it comes from.** The NEC PC-9801 family, the computer of Japanese adventure games and visual novels. 640 x 400 pixels, 16 colours on screen chosen from 4,096, and artists who made skies, skin and chrome out of dither patterns.

**Medium.** Screen. Square pixels at a fixed grid, 16-colour palette, ordered and hand-placed dithering, no anti-aliasing.

## Palette
Always a 16-colour palette, each value from the 4,096 colour space (multiples of 17 per channel: `00 11 22 33 ... ee ff`). A dusk palette that works:

`#000000 #221133 #443366 #665588 #8877aa #bb99cc #ffccdd #ffffee`
`#113344 #226677 #44aaaa #88ddcc #aa4444 #dd7755 #ffaa66 #ffdd88`

Rules: pick the 16 for the scene before drawing. Never add a 17th. Gradients are dither patterns between two palette colours.

## Type
- **DotGothic16** (Fontworks, OFL, based on 16 x 16 bitmap gothic), **Misaki** (8 x 8 Japanese bitmap font, free licence, check its terms), **Departure Mono** for Latin.
- Render text at its native pixel size and scale the whole frame by an integer. Never at fractional sizes.
- Dialogue box at the bottom, framed by a 1 or 2 pixel border, is the iconic UI.

## Composition
- 4:3 frame (640 x 400 pixels shown on a 4:3 monitor, so pixels were taller than wide). Decide: square pixels (modern) or 1:1.2 aspect (authentic).
- A large illustrated scene with a text window, or a portrait with a window frame.
- Dithered skies and gradients, detailed hair and fabric with hand-placed pixels.

## Texture and print
- `image-rendering: pixelated;` and integer scaling only (2x, 3x, 4x).
- Dither by hand, at a light's edge: a few rows of 50 percent checker (with 25 and 75 percent steps if the band is wide) where light meets shadow or one sky band meets the next, placed pixel by pixel. Never push a whole smooth render or canvas gradient through `IdraPrint.dither`: that is the "pixelate filter" look under fake tells.
- Optional CRT: only if the piece is about the screen. Subtle scanlines at 1 per pixel row, no fish-eye.

## Tools
- In the browser: draw on a small canvas (for example 320 x 200), scale up with CSS.
- Sprites and frame animation: Aseprite or Pixelorama. Optional Claude route: the `pixel-plugin` for Claude Code (willibrandon/pixel-plugin, needs Aseprite installed).

## Fake tells
- Mixed pixel sizes in one frame. Every pixel on the same grid.
- Anti-aliased edges or smooth gradients inside pixel art.
- Upscaled AI images run through a pixelate filter: noisy clusters, no clean lines, colour count in the hundreds.
- Text in a smooth web font on top of pixel art.

## Works for
Game art, music covers, streaming overlays, web pages with a retro computer concept, merch, social posts, identities for tech and gaming.
