# Jeepney signboard and body lettering (Philippines, 1950s to now)

**Where it comes from.** The jeepney, built from surplus army jeeps after the war and still the street transport of Philippine cities. Two separate trades letter it. Body painters at the builders (Sarao Motors in Las Piñas is the best known; by 2019 it had one painter left) paint names, stripes and pictures on the body. Route signboard painters work on the street (Tondo, Quiapo, Bulacan) and letter the boards that stand behind the windshield. Stainless bodies with vinyl stickers and the modernization programme are replacing both, so the hand-painted board is now a vanishing craft that some painters keep alive with online commissions and live lettering. Study for principles: Edwin Tayao's "box" and "rekta" boards, the panel boards over the windshield. Never trace a real board or a builder's livery.

**Medium.** Enamel and reflectorized paint, brushed by hand on sintra board, fibreglass or metal; airbrush for pictures on the body. When it is reproduced (a magazine pull-out, a print), the print is clean offset and the hand is in the lettering, not in added texture.

## Palette
Paint colours, not screen colours. The board gradient is the one gradient the medium makes.

| Paint | Hex | Role |
|---|---|---|
| Reflectorized yellow | `#ffcf1a` | top of the board gradient |
| Reflectorized red | `#e3261b` | bottom of the board gradient |
| Enamel black | `#151313` | shading around words, the "box" |
| Enamel white | `#f4f0e6` | one-stroke letters, name plates, wings |
| Body blue | `#1c3d94` | the jeepney's body, the poster ground |

Fluorescent board paints are common on the street; on a printed piece keep them for one accent and tell the printer it is a spot ink.

## Type
- No open font of jeepney lettering exists that can be embedded (Quiapo Free forbids web embedding; others have unverified licences). Bungee (OFL) is North American signage: not this.
- Box style: letters left as negative space inside black shading, so the board's gradient shows through the letters. Base: **Archivo** at its narrowest width (62) and black weight, then roughened by hand.
- Rekta: a tapering sans, one flat-brush stroke per letter, white on black. Base: **Archivo** condensed, medium weight, slight per-letter tilt.
- Name plates: a sign painter's script. **Yesteryear** (OFL, after 1940s and 1950s sign script) with a painted shade on one side.
- The peso sign ₱ (U+20B1) is missing from many font files and subsets. Check the render; if it falls back, paint it as a P with two bars in the same brush.
- Real Filipino words only, checked: "Pasahe" (fare), "Biyahe" (trip), "Pinagpala" (blessed), "Barya lang po sa umaga" (coins only please in the morning; wrong for anything at night), "Katas ng Saudi" (bought with Saudi earnings; only for that meaning).

## Composition
- A route board reads destination first, huge; then "via" and the stops in between, smaller.
- The panel board above the windshield carries a dedication: a family name, joined names, a child's name with a numeral, or a blessing, often crowned with wings.
- Body stripes run the length of the vehicle in two or three colours.
- Hung boards are never quite level.
- From across a room this sits close to the stock "black boxes and condensed type" look. What keeps it painted: brush edges, the gradient showing through the letters, and the winged plate. If the thumbnail reads as plain boxes, push those three.

## Texture and print
- `#ip-rough` on painted letters and shading at 1.5 to 2.5 (`IdraPrint.install({ rough: 2 })`): brush edges, not noise.
- Box letters cut with an SVG mask: put `#ip-rough` on a `<g>` around the masked board, or the letter edges stay digitally crisp (see `references/imperfection.md`).
- Paint `density` 0.03 to 0.04 at most. Enamel is glossy and even.
- If the piece is a magazine pull-out: the centre fold and its two staples are the only print marks. No grain.

## Motifs
Wings and crowns on name plates, horses (the karetela the jeepney replaced), saints and family names, basketball, cruise ships for relatives working abroad, chrome, antennas, stripes.

## Fake tells
- A generic "Filipino" palette of flag colours and a sun. The sun and stars belong to the flag; leave them there.
- Flat vector letters with a perfect drop shadow: that is the stock "black box, hard offset shadow, condensed type" look, not a painted board.
- Taglish or mangled Tagalog used as decoration, or phrases used for a meaning they do not have.
- Chrome rendered as glossy 3D. On the board, chrome is painted grey bands and white highlights.
- Every board perfectly level and evenly spaced.

## Works for
Gig and festival posters, magazine pull-outs and covers, food and drink labels, merch, street-level signage, social posts that need a loud local voice.
