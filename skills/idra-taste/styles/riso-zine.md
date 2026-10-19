# Risograph zine

**Where it comes from.** Independent publishing, art book fairs and small studios since the 2000s, built on the Riso stencil duplicator: one drum per ink, one ink per pass, soy inks that sit on top of uncoated paper.

**Medium.** 2 or 3 spot inks, each printed in its own pass from a greyscale master. Inks are semi-transparent and multiply where they overlap. Registration drifts by up to about 1 mm between passes.

## Palette
Pick a pair or a trio and design for the overprint colours they make.

| Combination | Inks | Overprint gives |
|---|---|---|
| Classic | Fluorescent Pink `#ff48b0` + Medium Blue `#3255a4` | deep violet |
| Warm | Sunflower `#ffb511` + Teal `#00838a` | olive green |
| Bold | Bright Red `#f15060` + RisoFederal Blue `#3d5588` | near black |
| Soft | Aqua `#5ec8e5` + Bubble Gum `#f984ca` | lilac |
| Trio | Yellow `#ffe800` + Fluorescent Pink `#ff48b0` + Blue `#0078bf` | full gamut feel |

Paper: a coloured stock (pink, sky, canary, mint), kraft `#c9a77c`, newsprint `#e9e4d8` or natural `#f2eee3`, chosen for the subject. Never pure `#ffffff`.

## Type
- Whatever the content needs, but set it as part of one ink layer: type gets the same grain and drift as the image in that ink.
- Good open choices: **Departure Mono** or **Fragment Mono** for zine captions (not Space Mono or IBM Plex Mono, both overused); **Young Serif**, **Gloock** or **Ultra** for headlines; Velvetyne libre fonts for experimental display.
- Avoid hairlines under about 0.25 pt at print size: riso fills them in or drops them.

## Composition
- Think in layers, not colours: draw the pink layer, draw the blue layer, see what the overlap does.
- Large solid areas are fine but they print unevenly. Use that.
- Grids are loose: zines are made fast, but with intention.

## Texture and print
- Grain screen or coarse halftone per layer (`IdraPrint.halftone`, about 50 to 85 lpi at print size), each layer at a different angle.
- Misregistration: offset one whole layer by 1 to 3 px (screen) or 0.3 to 1 mm (print). The whole layer moves together.
- Ink density: solids slightly lighter in the middle, darker at the edges; faint roller banding along the feed direction.
- Multiply blending between layers (`mix-blend-mode: multiply`).

## Fake tells
- Overlay PNG "riso texture" on top of a full-colour image. Riso has no full colour.
- Each element shifted in a different direction. Misregistration is per layer.
- Colours outside the ink list or gradients between arbitrary RGB values.
- Perfect blacks. Riso black is a dark grey with grain.

## Works for
Zines, posters, prints, book covers, event flyers, brand collateral for studios, cafés, galleries, music; also a strong web aesthetic when the layer logic is kept.
