---
name: idra-taste
description: >-
  Art direction for any visual design that has to look made by a designer with real taste, not by AI:
  posters, album, book and playlist covers, flyers, zines, packaging and labels, merch, social posts,
  decks, editorial layouts, web pages, pixel art and motion. Grounds every piece in a real medium
  (risograph, silkscreen, offset, photocopy, airbrush, hand-painted signs, pixel screen) and a real
  movement from the subject's own world (Polish posters, constructivism, the May 1968 Paris silkscreens,
  Fillmore, Blue Note, acid rave flyers, xerox punk, riso zines, Philippine jeepney signboards, Japanese
  psychedelic posters, Japanese editorial, city pop, Showa labels, PC-98 and gothic 4-shade pixel art,
  Y2K Japanese web, or a new one from any culture researched on the spot), adds honest print marks with
  a seeded texture engine, and reviews the output with a keen-eye checklist and the Impeccable detector.
  Use when the user wants something niche, underground, psychedelic, retro, printed, editorial, rooted
  in a local vernacular (Japanese, Filipino, French, Polish or any other), "designer-made",
  "not AI-looking", "not slop", or says a design looks generic, templated or AI-made.
---

# idra-taste

Generated design looks generated because nothing in it comes from anywhere: default fonts, screen colours, even spacing, clean edges, no medium. Designers with a keen eye see it at once. This skill makes every choice come from three sources you can name: **the subject**, **the medium** and **a real movement**. Then it checks the result like a print designer would.

`<skill>` below means this skill's folder.

## The run

### 1. Read the brief
Settle five things. Propose sensible answers yourself and only ask when one is truly missing and changes everything.
- **Subject:** what it is about, its world (materials, places, objects, history, vernacular).
- **Audience:** who must find it cool. A Japanese graphic designer, a club crowd, a book buyer.
- **Output:** poster, cover, page, label, post, sprite, motion. Format and exact size.
- **Content:** real copy, names, dates, images. Never lorem. If text is missing, write real, specific copy and mark it as a draft.
- **Constraints:** brand colours or fonts that must stay, print process, budget for inks.

### 2. Choose the direction
1. Pick two or three candidate movements from `<skill>/styles/` whose medium and spirit connect to the **subject** (not just to "cool"). Start from the subject's own place and culture: a Manila subject looks first at Philippine vernacular, a Paris one at French print. The library leans Japanese, but Japan is not a default: choose a Japanese recipe only when the subject, the audience or the medium points there. If none fits, research one and write a recipe from `<skill>/styles/_template.md` into the project at `.idra-taste/recipes/`.
2. For each, one line: why it fits this subject.
3. Choose one (or let the user choose if they asked to). A blend is allowed only when one movement leads and the other contributes a single element.
4. Read the chosen recipe in full, plus `<skill>/references/imperfection.md`. Read `type.md` and `color.md` when choosing fonts and inks.

| Movement | Place | File | Medium |
|---|---|---|---|
| Constructivist and Bauhaus | Russia, Germany | `styles/constructivist-bauhaus.md` | letterpress, photomontage |
| Polish poster school | Poland | `styles/polish-poster-school.md` | painted, offset |
| Atelier Populaire 1968 | France | `styles/atelier-populaire-1968.md` | one-ink silkscreen on newsprint |
| San Francisco psychedelic | USA | `styles/fillmore-psychedelic.md` | offset, vibrating pairs |
| Blue Note jazz | USA | `styles/blue-note-jazz.md` | 2-colour offset, duotone |
| Acid rave flyer | UK, Europe, USA | `styles/acid-rave-flyer.md` | cheap litho, fluorescents, early Mac |
| Xerox punk | UK, USA | `styles/xerox-punk.md` | photocopy |
| Riso zine | anywhere | `styles/riso-zine.md` | Risograph |
| Jeepney signboard | Philippines | `styles/jeepney-signboard.md` | hand-painted enamel boards |
| Japanese psychedelic poster | Japan | `styles/japanese-psychedelic-poster.md` | silkscreen, spot inks |
| Japanese editorial grid | Japan | `styles/japanese-editorial.md` | offset, vertical type |
| City pop airbrush | Japan | `styles/city-pop-airbrush.md` | airbrush illustration |
| Showa retro label | Japan | `styles/showa-retro-label.md` | 2 to 3 ink letterpress |
| PC-98 pixel art | Japan | `styles/pc98-pixel.md` | 16-colour screen |
| Gothic 4-shade pixel art | USA, Japan | `styles/gothic-4-shade-pixel.md` | 4-shade screen |
| Y2K Japanese web | Japan | `styles/y2k-japanese-web.md` | early web |

Not covered yet, so research on the spot: Latin America, Africa, South Asia, the Arab world, and most of Southeast Asia beyond the Philippines.

### 3. Fix the system before drawing
Write these at the top of the file, as CSS custom properties and a comment block:
- Inks (2 to 5) and paper, from the recipe or `color.md`. No other colours.
- One or two type families from `type.md`, with the reason.
- The marks the medium allows (from `imperfection.md`) and their strength.
- The one deliberate rule break.

### 4. Build by output type
- **Posters, covers, flyers, labels, social posts, zine pages:** copy `<skill>/assets/starter.html` and `<skill>/assets/print.js` into the project folder. One `.ink` layer per ink; drift per layer with `IdraPrint.layer`; paper with `IdraPrint.paper`; photographs through `IdraPrint.halftone`; posterised images through `IdraPrint.dither`; drawn shapes as SVG, with `filter: url(#ip-rough)` where hand-made. Draw the main image yourself in SVG or canvas when no real photo is given.
- **Web pages:** decide the movement, inks, type and marks here, then use the taste-skill page run (`design-taste-frontend`) for sections, the inspector and screenshots, and follow frontend-design. Keep marks light on UI: texture on large display areas and images, never on body text or controls.
- **App screens and dashboards:** taste-skill's app run. Use the movement only for colour, type and one signature element. No grain, drift or halftone on working UI.
- **Pixel art:** `styles/pc98-pixel.md` (16 colours) or `styles/gothic-4-shade-pixel.md` (4 shades). Draw on a small canvas at native resolution, place every pixel and every dither by hand, scale with integers. For sprites and animation, Aseprite or Pixelorama (or the optional pixel-plugin).
- **Motion:** idra-motion. Same recipe, same inks, same `print.js` with fixed seeds so every frame is stable. Hydra for feedback loops, rendered to video.
- **Decks and documents:** the movement sets cover, section openers and type; inner pages stay calm and readable.

Images: prefer the user's photographs, open-collection photographs, or drawn SVG. If a generated image is the only option, treat it as raw material: crop it hard and push it through the medium (halftone, dither, duotone, toner) so it reads as printed matter, and never present a glossy render as the finished hero.

### 5. Look at what you made
Render it and look. Never judge from code.
```bash
node <skill>/scripts/shot.mjs poster.html out/poster.png --size 1200x1600 --scale 1
node <skill>/scripts/shot.mjs "poster.html#gray" out/poster-gray.png --size 1200x1600
node <skill>/scripts/shot.mjs "poster.html#thumb" out/poster-thumb.png --size 1200x1600
```
`--size` is always the sheet's own size. `#thumb` renders the whole sheet and shrinks the picture to a tenth (120 x 160 here). Read the images. Then run `<skill>/references/keen-eye.md` section by section, and the Impeccable detector on HTML files (command in `references/toolbox.md`). Fix and render again. At least two rounds; stop when the keen-eye list is clean.

### 6. Deliver
- The source file, the renders (PNG at the final size, PDF for print, and per-ink greyscale masters if it goes to a Risograph or screen printer).
- **Design notes** (short): medium, movement, inks, fonts, the three strongest decisions and where each came from, the rule break, and anything a keen eye might still question. Plain language, no talk about AI.

## Rules
- **Every mark has a cause.** No texture, gradient or effect without a medium that makes it.
- **Study, never copy.** Use a movement's principles. Do not trace or reproduce specific artworks, characters or the signature motifs of living artists, and do not prompt image models with living artists' names.
- **Real language.** Japanese, Cyrillic or any other script only with correct, meaningful words and the right `lang` attribute. If unsure of a translation, keep it short and flag it in the design notes.
- **Symbols with care.** National, political and religious symbols only when the subject needs them (see the rays note in the Japanese psychedelic recipe).
- **One leader.** One movement leads each piece. Mash-ups of several looks are the most common AI tell.
- **Restraint in the marks, boldness in the idea.** If the texture is the first thing noticed, halve it. If the idea is timid, push it.

## References
- `references/imperfection.md`: marks per process, misregistration, overprint, halftone, paper, limits.
- `references/keen-eye.md`: the review checklist.
- `references/type.md`: open fonts by mood (all names checked), Japanese setting rules.
- `references/color.md`: inks, papers, pigment mixing.
- `references/toolbox.md`: installed plugins, libraries with pinned versions and licences, rendering.
