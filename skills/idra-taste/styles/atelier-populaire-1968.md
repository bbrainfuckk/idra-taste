# Atelier Populaire silkscreen (Paris, May to June 1968)

**Where it comes from.** On 14 May 1968 students occupied the lithography studio of the École des Beaux-Arts and began printing posters for the strikes. The painter Guy de Rougemont brought in silkscreen, which was faster. About 300 designs and an estimated 120,000 prints were made in weeks. Designs were voted on each night by a general assembly with two questions: is the message right, and does the poster carry it well. Posters were anonymous, credited to the collective. Study for principles; never reprint the originals as new work.

**Medium.** Home-made silkscreen. Images drawn straight onto the screen with drawing gum (a screen filler); press photographs traced with an opaque projector; photo-emulsion screens only from early June. Printed fast on thin, rough newsprint, partly donated by striking workers, so letters often have thin or missing ink.

## Palette
One ink. Mostly black, often red. Blue, green, brown or purple occasionally; two inks together was rare.

| Ink | Hex (approximate, take real values from scans) | Role |
|---|---|---|
| Black | `#1a1816` | everything |
| Red | `#c8261e` | everything, when red |
| Newsprint | `#e9e4d8` | the paper, and the only white |

## Type
- Lettering drawn by hand with a brush or marker, straight onto the screen. One poster can mix a chalky script and block capitals.
- Closest open fonts as a base only: **Londrina Solid** (OFL), **Caveat Brush** (OFL); **Permanent Marker** is Apache 2.0. Hand lettering is still more faithful than any of them.
- Short slogans in correct French, with the accents. Never machine-translate a slogan; if the slogan is new, have a French speaker check it and say so in the design notes.

## Composition
- One flat symbol and one short line. Nothing else.
- Silhouettes without tones: a factory, a fist, a shield, a profile. Image and word often merge (a roofline that becomes a fist).
- The symbol is big and crude on purpose; it was drawn in minutes.

## Texture and print
- One `.ink` layer. `#ip-rough` strong on everything drawn: `IdraPrint.install({ rough: 2.5 })` (2 to 3).
- Ink starvation: letters and solids lose ink in patches (`density` 0.12 to 0.18, `grain` 0.06). That is the medium's mark; a grunge overlay is not.
- Knock-out letters or shapes cut with an SVG mask: put `#ip-rough` on a `<g>` around the masked element, or the cut edges stay crisp (see `references/imperfection.md`).
- No halftone: there were no tones.

## Motifs
Factory and chimney, fist, riot shield, the ballot box, the microphone, broadcast towers, students and workers together. These carry a real political charge: use them when the brief is about labour, protest or a cause, never as decoration.

## Fake tells
- Several colours or a gradient.
- Clean digital or military stencil type.
- Even, perfect ink, or a grunge texture laid over bright heavy paper instead of ink gaps on thin newsprint.
- Halftone photographs.
- A designer's signature. The posters were anonymous; if the piece must carry a credit, set the studio's name small, like a printer's line.

## Works for
Protest and campaign posters, union and community notices, editorial illustration about labour and politics, zine covers, any brief that needs one message said loudly and quickly.
