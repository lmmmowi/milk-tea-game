# Free Asset Candidates

Use these as optional sources when replacing the current inline SVG art with sprite sheets or UI packs.

- Kenney Assets: broad 2D/UI/game asset packs. Prefer packs with a visible `Creative Commons CC0` license on the asset page.
- Kenney UI Pack: useful for buttons, panels, and icons if the UI moves further toward a game HUD.
- OpenGameArt CC0 assets: good for animal sprites, tile maps, and small props. Check each asset page license before importing.
- Tiny Creatures by Clint Bellanger: CC0 pixel creatures with many small animals; suitable if the art direction shifts toward pixel art.
- itch.io free assets: useful discovery source, but license varies per creator. Only import packs whose page clearly permits the intended use.

Current implementation keeps the game self-contained with React/SVG/CSS art so the visual style stays consistent and no extra asset attribution workflow is required.

## Imported Assets

- Kenney Animal Pack Remastered is extracted under `public/assets/kenney/animal-pack-remastered/`.
- The game currently uses customer sprites copied from `PNG/Round (outline)` into `png-round-outline/` because the outline reads well against the colorful shop scene and the deployed URLs avoid spaces.
- `License.txt` from the downloaded package is kept next to the extracted assets.
