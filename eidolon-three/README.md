# Eidolon Sleep — synced poster + Three.js site

This package keeps the poster entrance as `index.html`, keeps the main portfolio as `home.html`, keeps the archive as `blog.html`, and syncs the JavaScript/CSS paths so the full site works together.

## File map

- `index.html` — poster entrance linking to `home.html`
- `home.html` — main portfolio page with the Three.js background layer
- `blog.html` — lyrics/archive page with the same Three.js background layer
- `css/index.css` — shared portfolio/blog styling plus the `.three-stage` layer styles
- `js/poster-particles.js` — poster dust particles
- `js/three-scene.js` — full-site Three.js atmosphere
- `images/` — placeholder SVGs used by the blog page
- `music/` — place audio files here, such as `demo.mp3`

## Preview

Use VS Code Live Server and open `index.html`. The JavaScript imports Three.js from a CDN, so the particles/3D scene need internet access.
