# Type

Type carries most of the personality. Pick it from the movement and the subject, never from habit.

## Never by default
Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Bebas Neue, Space Grotesk, Space Mono, IBM Plex, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Syne, Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader. They are fine fonts that generated pages reach for again and again (the list matches the Impeccable detector). Use one only when the brief or the brand demands it, and say so in the design notes. A subject association (books want a serif, tech wants a mono) is not a reason.

## Open fonts by mood
All on Google Fonts (load with `https://fonts.googleapis.com/css2?family=Name&display=swap`) unless noted. Every name below was checked to exist.

### Latin display
| Font | Character | Use |
|---|---|---|
| Shrikhand | fat italic display | Fillmore base for warped lettering |
| Bagel Fat One | fat rounded | Fillmore, pop |
| Archivo Black / Archivo Narrow | heavy and condensed grotesque | Blue Note, rave, constructivist |
| Archivo (width axis 62 to 125) | grotesque, narrowest at 62 | jeepney box and rekta lettering base |
| Big Shoulders Display | condensed, many weights | Blue Note, posters |
| League Gothic | tall condensed | constructivist, posters |
| Jost | geometric (Futura-like) | Bauhaus, city pop captions |
| Gloock | high-contrast display serif | editorial covers, fashion |
| Libre Caslon Display | classical display serif | Japanese editorial partner, books |
| Sorts Mill Goudy | old-style text serif | long reading, menus |
| Young Serif | sturdy old serif | zines, food |
| Ultra | fat slab | Showa labels, circus, pop |
| Rye | Western woodtype | posters with a print-shop feel |
| Special Elite | typewriter | xerox punk |
| Stardos Stencil | stencil | punk, military surplus, industrial |
| Courier Prime | clean typewriter | captions, credits |
| Londrina Solid | blunt hand-drawn capitals | May 1968 silkscreen base, protest |
| Caveat Brush | quick brush script | May 1968 slogans, handwritten notes |
| Permanent Marker (Apache 2.0) | marker capitals | protest, street, zines |
| Yesteryear | 1940s and 1950s sign script | jeepney name plates, sign painting |

### Japanese display (Fontworks, OFL)
| Font | Character | Use |
|---|---|---|
| Dela Gothic One | very heavy gothic | posters, psychedelic, constructivist energy |
| Rampart One | outlined, 3D | pop posters, toy and game titles |
| Reggae One | brushy, bouncy | music, street |
| Train One | inline, stencil feel | retro signage |
| RocknRoll One | rounded heavy | friendly loud titles |
| Stick | thin, sticks | experimental, quiet posters |
| DotGothic16 | 16 x 16 bitmap gothic | pixel, PC-98, Y2K web |
| Yusei Magic | marker hand | casual, handwritten notes |
| Hachi Maru Pop | cute round hand | kawaii, Y2K |
| Potta One | brush pop | food, Showa labels |
| Mochiy Pop One | soft pop | kids, candy, Showa |
| Kaisei Decol | decorative mincho | retro elegant, packaging |
| Zen Antique | old print mincho | antique labels, Taisho and Showa feel |
| Kiwi Maru | rounded mincho | warm editorial |

### Japanese text
Shippori Mincho, Zen Old Mincho, BIZ UDPMincho, Noto Serif JP (reading); Zen Kaku Gothic New, BIZ UDPGothic, Zen Maru Gothic (labels, UI); M PLUS 1 Code (mono).

### Pixel and mono
- **Departure Mono** (Helena Zhang, OFL, not on Google Fonts): `https://cdn.jsdelivr.net/gh/rektdeckard/departure-mono@v1.500/public/assets/DepartureMono-Regular.woff2`. Designed at 11 px; use multiples of 11.
- **DotGothic16** at 16 px multiples.
- **Fragment Mono**, **Azeret Mono** or **Martian Mono** for clean mono captions. Avoid Space Mono and IBM Plex Mono (overused).

### Experimental libre foundries
Velvetyne (velvetyne.fr) and Collletttivo (collletttivo.it) publish free, open experimental display faces. Download the files into the project `fonts/` folder and keep each font's licence file next to it.

## Rules
- One or two families. If two, make them clearly different (serif and grotesque, Japanese gothic and Latin serif).
- Display type is part of the image: crop it, stack it, fill shapes with it, set it vertically. Treat it as a material.
- Display sizes need manual kerning (`font-kerning: normal` plus manual `letter-spacing` or per-letter spans for problem pairs).
- Japanese with Latin: set `lang` correctly on each run, scale Latin about 1.05 to 1.1x, and check the baseline in the render. `text-autospace: normal` adds the small gap between Japanese and Latin where browsers support it.
- Japanese headlines: `font-feature-settings: "palt";` Body text: leave full-width spacing. Line breaking: `line-break: strict;`
- Vertical: `writing-mode: vertical-rl; text-orientation: mixed;` short numbers with `text-combine-upright: all` on a span.
- For print and offline renders, download fonts into the project and load them with `@font-face`, so the render never falls back silently.

## Hand lettering
When the movement calls for it (Fillmore, Polish posters, May 1968 silkscreens, jeepney boards, Showa labels, xerox), build lettering instead of typing it: draw SVG paths, or convert a base font to outlines and edit them, or warp with an SVG displacement filter. Keep a slight wobble (`IdraPrint` rough filter at scale 1 to 2).
