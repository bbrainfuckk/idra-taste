# Japanese psychedelic poster (1965 to 1975)

**Where it comes from.** Posters for underground theatre (angura), concerts, galleries and magazines in late-1960s Tokyo. Pop art and psychedelia from the West met Edo woodblock prints, Showa advertising and manga, and the results were printed by silkscreen and offset in a few loud flat inks. Study for principles: Tadanori Yokoo, Keiichi Tanaami, Kiyoshi Awazu. Look at the work, never trace it.

**Medium.** Silkscreen or offset with 3 to 6 spot inks. Flat colour fields, hard edges, coarse halftone on photographs, black keyline on top.

## Palette
Flat, saturated, and printed as spot colours. Pick 4 or 5:

| Ink | Hex | Role |
|---|---|---|
| Fluorescent Pink | `#ff48b0` | dominant field |
| Yellow | `#ffe800` | rays, second field |
| Kelly Green | `#67b346` | acid accent, clashes with pink on purpose |
| Sky Blue | `#4982cf` | sky, water, cool relief |
| Bright Red | `#f15060` | sun, lips, small hot areas |
| Metallic Gold | `#ac936e` | frames, halos, sparing |
| Black | `#000000` | keyline layer, halftone photos |

Gradients only as **split fountain** (two inks loaded in one roller, blending across the sheet). That is the only gradient this medium had: a horizontal or vertical band where two inks meet, never a smooth radial glow.

## Type
- Display Japanese: **Dela Gothic One** (heavy, poster), **Rampart One** (outlined, 3D), **Reggae One**, **Train One** (all Fontworks, OFL, Google Fonts). Better still, hand-built lettering from SVG paths.
- Vertical setting for Japanese headlines (`writing-mode: vertical-rl`) sitting beside horizontal Latin.
- Latin: a condensed grotesque or a Victorian display face. Keep it secondary.
- Information block (dates, venue, price) set small, dense, framed, often in a corner box like a ticket.

## Composition
- Frontal and symmetrical, like an altar or a theatre proscenium. A central figure or object with a frame around it.
- Radiating rays behind the centre (see the note on rays below), clouds and waves from woodblock prints, rainbow arcs, stacked horizon bands.
- Collage at mixed scales: a halftone photo of a face next to a drawn hand next to a tiny train. Scale contradictions are the point.
- Borders and frames inside frames. Corners filled. Empty space is rare.

## Texture and print
- Halftone photographs at 20 to 45 lpi, one ink, angle 45 degrees. Use `IdraPrint.halftone`.
- Black keyline layer printed last and slightly out of register (1 to 3 px at screen size) against the colour fields.
- Ink density variation on large flat fields (`IdraPrint` ink filter, low strength).
- Paper: warm off-white `#f3efe6` showing through gaps.

## Motifs
Rays, clouds, waves, Mount Fuji, rising and setting suns, hands, eyes, trains, ukiyo-e figures, lotus, skulls, rainbow arcs, star bursts, pointing fingers, ticket stubs.

## Fake tells (fix if you see them)
- Smooth digital gradients or glow. There were none.
- Kanji used as decoration with no meaning, or Chinese glyph forms in a Japanese layout (set `lang="ja"`).
- Everything perfectly registered and vector clean.
- Synthwave neon on black. This style lives on paper colours, not on a void.
- Symmetry that is mirror-copied pixel for pixel. Hand-built symmetry wobbles.

## A note on rays
Red-and-white rays from a central sun read as the rising-sun flag, which is offensive in Korea and China. For any audience beyond Japan, use rays in non-flag colours (yellow on pink, green on yellow), with uneven ray widths, or with the sun off centre.

## Works for
Event and gig posters, album and single covers, festival identities, book covers, merch prints, editorial openers, social posts for music and art.
