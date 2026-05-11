# Eidolon Sleep — Three.js Version

This package keeps the original portfolio/blog content and CSS, then adds a Three.js atmosphere layer.

## Files

- `index.html` — portfolio page
- `blog.html` — lyrics and notes archive
- `css/index.css` — original styling plus the new Three.js layer styling
- `js/three-scene.js` — the 3D scene
- `images/` — keep your image assets here
- `music/` — keep your audio assets here

## How to run

Because the Three.js file imports from a CDN, run this through a local server or GitHub Pages.

Easy local option with VS Code:

1. Install the Live Server extension.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

GitHub Pages option:

1. Upload these files to your repo.
2. Make sure `index.html` stays at the root.
3. Turn on GitHub Pages for the branch.

## What changed

- Added `<div class="three-stage" aria-hidden="true"></div>` after the opening body tag.
- Added `<script type="module" src="js/three-scene.js"></script>` before the closing body tag.
- Added a 3D moon, glowing archive panels, floating symbols, dust particles, floor grid, and subtle motion.
- Preserved the existing text, page structure, navigation, and core design.
