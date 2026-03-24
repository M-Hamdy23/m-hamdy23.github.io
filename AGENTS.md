# AGENTS.md

## Repo snapshot
- Portfolio site repo with two parallel implementations: legacy Bulma/Flickity page in `index.html` and an in-progress redesign in `index_New.html`.
- Production entry appears to be `index.html` (`css/main.bundle.css` + `js/bundle.js` are the assets it loads).
- Static assets live in `img/`, `docs/`, and `favicon.png`; there is no backend/service boundary in this repo.

## Architecture and data flow
- Legacy page (`index.html`) is mostly static content plus JS-driven UI behaviors:
  - Modal open/close via `.modal-trigger[data-target]` and matching modal `id` (`index.js`).
  - Project filtering via `filterDiv` class tags + button text matching (`filterSelection("All")` bootstraps initial state).
  - Optional per-modal Flickity carousel initialization when `#{target}-carousel` exists (`openModal` in `index.js`).
- Styling flow is source `styles.scss` -> bundled `css/main.bundle.css`; JS flow is `index.js` -> bundled `js/bundle.js`.
- Redesign page (`index_New.html`) is self-contained (inline `<style>` + `<script>`) and data-driven:
  - `PROJECTS` array is the single source of truth for project cards, filters, and modal content.
  - `renderProjects()` + `filterProjects()` regenerate project cards in `#projects-grid`.
  - Effects include Three.js background, typewriter text, reveal observers, and custom cursor.

## Developer workflow (discoverable)
- No `package.json`, lockfile, or build config is committed; bundling tooling is implied by `require(...)` in `index.js` and minified outputs in `js/` + `css/`.
- Treat `js/bundle.js` and `css/main.bundle.css` as generated artifacts; prefer editing `index.js` and `styles.scss`.
- For quick validation, open `index.html` directly in a browser and verify:
  - Project filter buttons toggle visible `.filterDiv` cards.
  - Clicking project tiles opens/closes matching modals.
  - Resume links (`docs/resume.pdf`) and image paths resolve.

## Project-specific editing conventions
- Keep legacy filter tags synchronized across three places:
  - Button labels in `#filterBtnContainer` (`index.html`).
  - `filterDiv` class tokens on each project card (`index.html`).
  - Any logic that assumes button text == filter token (`index.js` click handler).
- Modal wiring convention in legacy page: each trigger `data-target="project-X-modal"` must have a corresponding modal element `id="project-X-modal"`.
- If a modal uses carousel content, keep the ID contract `project-X-modal-carousel` so lazy initialization still works.
- In redesign page, add/edit project data only through `PROJECTS` objects; avoid hardcoding project cards in markup.

## External dependencies and integrations
- Legacy external libs/CDNs: Font Awesome kit in `index.html`; Flickity + imagesLoaded via bundled JS.
- Redesign external libs/CDNs: Google Fonts and Three.js CDN in `index_New.html`.
- External integration points are outbound links only (YouTube iframes, GitHub/LinkedIn, Google Play, Asset Store, resume PDF).

## Agent notes
- A glob search for existing AI guidance files (`README.md`, `.github/copilot-instructions.md`, `AGENT*.md`, cursor/windsurf/cline rules) returned no matches in this repo.
- When uncertain which page to change, default to `index.html` unless the task explicitly targets the redesign in `index_New.html`.

