# Gothic 4-shade pixel art (1986 to now)

**Where it comes from.** Two lines meet here. First, the dark adventure and action games made for machines that could show almost nothing: the 1-bit Macintosh adventures of ICOM Simulations (Uninvited 1986, Shadowgate 1987) and the 4-shade Game Boy (Castlevania: The Adventure 1989, Castlevania II: Belmont's Revenge 1991), where whole castles were built from four greys. Second, the present-day limited-palette pixel scene (4-colour and 1-bit palette challenges) and the cassette covers of the dungeon synth underground, which kept that look alive for music. Study for principles only: how much mood four values can hold, and how a scene is staged with light.

**Medium.** A screen at native resolution. 2 bits per pixel, so exactly four colours. Square pixels on one grid, every pixel placed on purpose, scaled up by a whole number.

## Palette
Four values, chosen like inks. A tinted ramp reads as a custom Super Game Boy style palette rather than a filter. A tested ramp:

| Index | Hex | Role |
|---|---|---|
| 0 | `#0b0910` | night, voids, silhouettes |
| 1 | `#30273a` | stone in shadow, most of the wall |
| 2 | `#7d7283` | moonlit stone, the light on the floor |
| 3 | `#e3d8bf` | glass, flame, bone highlights, lettering |

Rules: never a fifth colour. The steps must be far apart in value (here about 3, 17, 50 and 87 L*), or the scene turns to mud at thumbnail size.

## Type
- Lettering is drawn pixel by pixel, not typed. The pixel blackletter fonts on Google Fonts (Jacquard 12, Jacquarda Bastarda 9) are built from separated squares like woven cloth and do not sit on a 1 px grid, so they break into half-pixels at native size.
- Textura logic at small size: 2 px stems, a 1 px lozenge head pointing up-left and a foot pointing down-right (a broad pen held at 45 degrees), joins as diagonals, round letters broken into straight segments. Below about 12 px tall, capitals drift toward a gothic display letter; give the title more height if it must read as textura.
- Small text: a hand-made 3 x 5 capital alphabet, one pixel of space between letters.

## Composition
- Stage the scene around one light source and let it tell the story. Light falling on a surface is more interesting than the lamp.
- Symmetry is the architecture's, not the picture's: a symmetric building with an off-centre event (a figure, one lit candle, one broken pane).
- Big dark masses at the edges, detail only where the light is. Texture in the dark is wasted pixels.

## Texture and print
- No print.js marks. This is a screen medium: no grain, no halftone, no CRT unless the subject is a screen.
- Dither only as a hand-placed 50 percent checker at a light's edge, never as an automatic gradient over the whole picture (no `IdraPrint.dither` on a smooth render).
- Draw on a canvas at native size (for example 125 x 125, shown at 12x for a 1500 px cover). `image-rendering: pixelated` and integer scaling only. Check the render: every scaled block must be one flat colour.
- After drawing, run a cleanup pass for orphan pixels and uneven line steps.

## Motifs
Lancet windows and tracery, quarry glazing (small diamond panes in lead), candles, bell ropes, ledger stones set in church floors, piers and vaults, cloaked figures seen from behind. Religious symbols only when the subject needs them; the architecture usually says enough.

## Fake tells
- A smooth painting or render pushed through a pixelate or dither filter: noisy clusters, hundreds of colours, no clean lines.
- Mixed pixel sizes in one frame, or text in a smooth font laid over pixel art.
- The stock gothic kit: full moon behind a castle on a hill, bats, a purple-to-black gradient sky.
- Pillow shading (every shape lit from its own centre) instead of one light source.
- Orphan pixels and jaggies everywhere: lines with uneven step lengths, single stray pixels nobody chose.

## Works for
Music covers (dungeon synth, darkwave, ambient), game key art and title screens, book covers for horror and fantasy, merch, streaming overlays, small animated loops.
