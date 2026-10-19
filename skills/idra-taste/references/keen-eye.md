# Keen-eye review

Run this on every piece before it ships. Look at the actual output (screenshot or render), never at the code alone. Fix, then look again.

## 1. Instant fails (the AI tells)
Any one of these means fix before anything else:

- Default fonts with no reason: Inter, Roboto, Poppins, Montserrat, Space Grotesk, Bebas Neue, Playfair Display.
- Purple-to-blue or pink-to-purple gradients, gradient text, glow shadows, glassmorphism blur panels.
- Centred hero, small label above the headline, three icon cards below.
- Emoji used as icons. Icons in tinted rounded squares.
- Everything rounded 12 to 16 px with the same soft shadow.
- Perfectly even spacing everywhere.
- Copy that could be on any product ("Unlock your potential", "Elevate your experience", "Seamless").
- Japanese text that is decorative nonsense, machine-translated, or rendered with Chinese glyph forms (missing `lang="ja"`).
- Generated imagery with its tells left in: plastic skin, mangled hands, melted text, over-smooth studio light, symmetrical faces, the same glossy look on everything.
- Texture laid over the whole page as one overlay, with no layer logic.
- A style mash-up: riso grain plus neon glow plus 3D chrome plus glitch.
- One of the four stock generated looks, unless the brief asked for it: cream ground with a serif display and a terracotta accent; near-black with one neon accent and glowing edges; hairlines, italic display serif and small tracked mono labels; flat saturated ink with black boxes, hard offset shadows and heavy condensed type.

## 2. Medium consistency
- Name the medium. Does every element obey it? (Riso: inks and overprints only. Pixel: one grid, no smoothing. Silkscreen: flat ink, no soft shadows.)
- Count the inks. Every colour on the piece is an ink, the paper, or an overprint of two inks.
- Does the type live in the medium too (same ink layer, same texture, same grid)?

## 3. Composition
- **Three-second read:** what is seen first, second, third? If the answer is unclear, the hierarchy is weak.
- **Thumbnail test:** view at 10 percent size. The main shape and the title should still read.
- **Squint test:** view in grayscale. Is there a clear light and dark structure? Do vibrating pairs collapse to the same grey (when vibration is intended)?
- One deliberate rule break, no more.

## 4. Typography
- Display type is kerned by eye at display size. Look at pairs like AV, To, LT, ry.
- Optical alignment: round letters and punctuation hang slightly past the edge.
- No widows or orphans in short blocks. Ragged right is shaped, not random.
- Japanese: `line-break: strict` (kinsoku), `palt` on headlines only, vertical text with upright characters, Latin scaled about 1.05 to 1.1x next to kana, numbers upright in vertical text where short.
- Mixed scripts share a baseline logic. Check it in the render.

## 5. Specificity
- Could this exact design be used for a different client by changing the name? If yes, it is generic. Pull something from the subject's own world: its materials, place, history, vernacular, objects.
- For every major choice, can you say where it came from (the subject, the medium, or the reference movement)? Write it in the design notes.

## 6. Originality and respect
- References are studied, not traced. No copied compositions, characters or signature motifs of living artists.
- Political, religious and national symbols only when the subject requires them. Check the rising-sun rays note in the Japanese psychedelic recipe.

## 7. Machine checks
- HTML or CSS output: run the Impeccable detector on the file and fix what it reports, or note why a finding is intended by the movement (for example, all-caps labels in a constructivist poster).
- Web pages: also run the taste-skill inspector and its three-width screenshots.
- Exports: check the pixel size and DPI for print (300 dpi at final size), colour profile, bleed (3 mm) if it goes to a printer.

## Scoring
Give the piece a short verdict in the design notes: what the medium is, which movement it borrows from, the three strongest decisions, and anything left that a keen eye might still question.
