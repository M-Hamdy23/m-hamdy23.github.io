# AGENTS.md

## Repo snapshot
- Portfolio site repo now has three HTML entry points: current redesign in `index.html`, legacy Bulma/Flickity page in `index_legacy.html`, and a similar redesign variant in `index_New.html`.
- Production entry appears to be the self-contained `index.html`; `css/main.bundle.css` + `js/bundle.js` are loaded by `index_legacy.html`.
- Static assets live in `img/`, `docs/`, and `favicon.png`; there is no backend/service boundary in this repo.

## Architecture and data flow
- Legacy page (`index_legacy.html`) is mostly static content plus JS-driven UI behaviors:
  - Modal open/close via `.modal-trigger[data-target]` and matching modal `id` (`index.js`).
  - Project filtering via `filterDiv` class tags + button text matching (`filterSelection("All")` bootstraps initial state).
  - Optional per-modal Flickity carousel initialization when `#{target}-carousel` exists (`openModal` in `index.js`).
- Legacy styling flow is source `styles.scss` -> bundled `css/main.bundle.css`; legacy JS flow is `index.js` -> bundled `js/bundle.js`.
- Current redesign page (`index.html`) is self-contained (inline `<style>` + `<script>`) and data-driven:
  - `PROJECTS` array is the single source of truth for project cards, filters, and modal content.
  - `renderProjects()` + `filterProjects()` regenerate project cards in `#projects-grid`.
  - `openModal()` fills the shared `#modal-overlay` from the selected `PROJECTS` entry instead of using per-project modal markup.
  - `index.html` modal flow also includes project screenshots/video rendering and the separate `#media-lightbox` overlay.
- `index_New.html` keeps a similar redesign structure, but with a simpler modal implementation and an animated Three.js canvas background (`#three-canvas`).

## Developer workflow (discoverable)
- No `package.json`, lockfile, or build config is committed; bundling tooling is implied by `require(...)` in `index.js` and minified outputs in `js/` + `css/`, while `index.html` and `index_New.html` are self-contained.
- Treat `js/bundle.js` and `css/main.bundle.css` as generated artifacts for the legacy page; prefer editing `index.js` and `styles.scss`, or edit `index.html` directly for the current redesign.
- For quick validation, open the relevant page directly in a browser and verify:
  - In `index.html`, project filter buttons repopulate `#projects-grid`, clicking a project card opens/closes the shared overlay modal, and resume/social links resolve.
  - In `index_legacy.html`, project filter buttons toggle visible `.filterDiv` cards, clicking project tiles opens/closes matching modals, and asset paths such as `docs/resume.pdf` and `img/*` resolve.

## Project-specific editing conventions
- Keep legacy filter tags synchronized across three places:
  - Button labels in `#filterBtnContainer` (`index_legacy.html`).
  - `filterDiv` class tokens on each project card (`index_legacy.html`).
  - Any logic that assumes button text == filter token (`index.js` click handler).
- Modal wiring convention in legacy page: each trigger `data-target="project-X-modal"` must have a corresponding modal element `id="project-X-modal"`.
- If a modal uses carousel content, keep the ID contract `project-X-modal-carousel` so lazy initialization still works.
- In redesign pages (`index.html`, `index_New.html`), add/edit project data only through `PROJECTS` objects; avoid hardcoding project cards in markup.
- In redesign pages, keep filter button arguments like `filterProjects('pc', this)` aligned with lowercase values in `PROJECTS[].tags`.
- In `index.html`, keep `PROJECTS[].id` unique numeric values because card clicks call `openModal(id)` directly.
- In `index.html`, `openModal()` normalizes media from `videos` and `media` fields (`normalizeProjectVideos`, `normalizeProjectScreenshots`), so preserve these keys when adding richer media content.

## External dependencies and integrations
- Legacy external libs/CDNs: Font Awesome kit in `index_legacy.html`; Flickity + imagesLoaded via bundled JS.
- Redesign external libs/CDNs: Google Fonts in `index.html` and `index_New.html`; Three.js CDN is currently used by `index_New.html` only.
- External integration points are outbound links/embeds only (YouTube/Vimeo iframes, GitHub/LinkedIn, Google Play, Asset Store, itch.io, Global Game Jam, resume PDF).

## Agent notes
- A glob search for existing AI guidance files (`README.md`, `.github/copilot-instructions.md`, `AGENT*.md`, cursor/windsurf/cline rules) returned only this root `AGENTS.md`.
- When uncertain which page to change, default to `index.html` for the current redesign; use `index_legacy.html` only for legacy Bulma/Flickity work.

