# Japanese editorial grid

**Where it comes from.** Japanese magazines, book design and corporate graphics from the 1960s to now. Swiss rigour met Japanese vertical writing, and white space became a material. Study for principles: Yusaku Kamekura, Ikko Tanaka, Kenya Hara, and the layouts of Japanese culture and lifestyle magazines.

**Medium.** Offset on uncoated or lightly coated paper. Mostly black and one accent, generous margins, very precise.

## Palette
Paper and ink, plus one accent at most.

| Colour | Hex | Role |
|---|---|---|
| Uncoated white | `#f6f4ee` | page |
| Sumi black | `#1b1b1b` | text and rules |
| Warm grey | `#928d88` | captions, folios |
| Accent: vermilion | `#e45d50` | one stamp, one number, one rule |
| Accent: indigo | `#484d7a` | alternative to vermilion |

## Type
- Mincho for reading: **Shippori Mincho**, **Zen Old Mincho**, **BIZ UDPMincho**, **Noto Serif JP**. Gothic for labels: **Zen Kaku Gothic New**, **BIZ UDPGothic**.
- Latin partner: a classical serif (**Libre Caslon Display**, **Sorts Mill Goudy**) or a neutral grotesque (**Archivo**), set slightly larger (about 1.05 to 1.1x) so its x-height matches the kana.
- Vertical body text: `writing-mode: vertical-rl; text-orientation: mixed;` with two-digit numbers upright via `text-combine-upright: digits 2` (or wrap them in a span with `text-combine-upright: all`).
- Headlines: proportional kana with `font-feature-settings: "palt"`. Body text keeps full-width spacing.
- Line breaking: `line-break: strict;` so small kana and closing punctuation never start a line (kinsoku).
- `lang="ja"` on every Japanese element, or the browser may pick Chinese glyph forms.

## Composition
- A strict grid with a visible logic: columns for vertical text read right to left, horizontal Latin sits in its own band.
- Huge numerals or a single huge character against tiny captions. Scale contrast is the drama.
- Hairline rules (0.5 pt look) used as structure, not decoration.
- Large empty fields that are clearly intended: the empty area is balanced by a small, precise element.

## Texture and print
- Almost none. A very light paper tone and no grain on text.
- If photographs: matte, slightly desaturated, cropped hard.

## Fake tells
- Vertical text set by rotating horizontal text 90 degrees. Characters must stay upright.
- Random kanji as decoration, or Japanese copy that does not say anything.
- Japanese and Latin at the same point size, so the Latin looks small.
- Centred everything. This tradition is asymmetric and gridded.
- The generic "editorial" look: hairlines, an italic display serif and tiny tracked mono labels on cream. Japanese editorial work gets its tension from vertical setting, scale contrast and white, not from that kit.

## Works for
Editorial sites, magazines, book covers, exhibition catalogues, architecture and craft brands, restaurant menus, annual reports, quiet luxury.
