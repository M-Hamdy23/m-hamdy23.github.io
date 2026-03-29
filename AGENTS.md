# AGENTS.md

## Repo snapshot
- Portfolio site repo now has multiple HTML entry points: current redesign in `index.html`, legacy Bulma/Flickity page in `index_legacy.html`, redesign variants in `index_New.html` and `index-Refiend.html`, plus the static admin dashboard in `editorUI.html`.
- Production entry appears to be `index.html`, which now loads content from `data/portfolio-data.json`; `css/main.bundle.css` + `js/bundle.js` are loaded by `index_legacy.html`.
- Static assets/content live in `img/`, `docs/`, `data/`, and `favicon.png`; there is no backend/service boundary in this repo.

## Architecture and data flow
- Legacy page (`index_legacy.html`) is mostly static content plus JS-driven UI behaviors:
  - Modal open/close via `.modal-trigger[data-target]` and matching modal `id` (`index.js`).
  - Project filtering via `filterDiv` class tags + button text matching (`filterSelection("All")` bootstraps initial state).
  - Optional per-modal Flickity carousel initialization when `#{target}-carousel` exists (`openModal` in `index.js`).
- Legacy styling flow is source `styles.scss` -> bundled `css/main.bundle.css`; legacy JS flow is `index.js` -> bundled `js/bundle.js`.
- Current redesign page (`index.html`) keeps inline `<style>` + `<script>` but loads data at runtime from `data/portfolio-data.json`:
  - `PORTOFOLIO_DATA` is hydrated by `loadPortfolioDataFromJson()` and remains the in-memory source for rendered sections (`HERO_DATA`, `SKILLS_DATA`, `EXPERIENCE_DATA`, `EDUCATION_DATA`, `CONTACT_DATA`, `FOOTER_DATA`) and nested project data in `PORTOFOLIO_DATA.PROJECTS`.
  - `renderProjects()` + `filterProjects()` regenerate project cards in `#projects-grid`.
  - `openModal()` fills the shared `#modal-overlay` from the selected `PORTOFOLIO_DATA.PROJECTS` entry instead of using per-project modal markup.
  - `index.html` modal flow also includes project screenshots/video rendering and the separate `#media-lightbox` overlay.
- `index_New.html` keeps a similar redesign structure, but with a simpler modal implementation and an animated Three.js canvas background (`#three-canvas`).
- `editorUI.html` + `js/editor-dashboard.js` provide a static JSON editor for the same schema, with load/import/edit/reorder/save/export actions targeting `data/portfolio-data.json`.

## Developer workflow (discoverable)
- No `package.json`, lockfile, or build config is committed; bundling tooling is implied by `require(...)` in `index.js` and minified outputs in `js/` + `css/`.
- Treat `js/bundle.js` and `css/main.bundle.css` as generated artifacts for the legacy page; prefer editing `index.js` and `styles.scss`, or edit `index.html` directly for the current redesign.
- For quick validation, open the relevant page directly in a browser and verify:
  - In `index.html`, serve the repo over HTTP first (because `fetch('data/portfolio-data.json')` is used), then verify sections render from `PORTOFOLIO_DATA` (hero/skills/experience/education/contact/footer), project filter buttons repopulate `#projects-grid`, clicking a project card opens/closes the shared overlay modal, and resume/social links resolve.
  - In `editorUI.html`, verify `Load Default JSON` reads `data/portfolio-data.json`, project reordering and field edits update the preview state, and `Save JSON`/`Export Download` produce valid JSON.
  - In `index_legacy.html`, project filter buttons toggle visible `.filterDiv` cards, clicking project tiles opens/closes matching modals, and asset paths such as `docs/resume.pdf` and `img/*` resolve.

## Project-specific editing conventions
- Keep legacy filter tags synchronized across three places:
  - Button labels in `#filterBtnContainer` (`index_legacy.html`).
  - `filterDiv` class tokens on each project card (`index_legacy.html`).
  - Any logic that assumes button text == filter token (`index.js` click handler).
- Modal wiring convention in legacy page: each trigger `data-target="project-X-modal"` must have a corresponding modal element `id="project-X-modal"`.
- If a modal uses carousel content, keep the ID contract `project-X-modal-carousel` so lazy initialization still works.
- In redesign pages, add/edit project data through the data sources (`data/portfolio-data.json` for `index.html`, `PROJECTS` in `index_New.html`); avoid hardcoding project cards in markup.
- In redesign pages, keep filter button arguments like `filterProjects('pc', this)` aligned with lowercase values in project `tags`.
- In `index.html`, keep `PORTOFOLIO_DATA.PROJECTS[].id` unique string IDs/slugs because card clicks call `openModal(id)` directly (the editor normalizes project IDs to slugs during save/export).
- In `index.html`, `openModal()` normalizes videos from `media.videos`/`videos` and screenshots from `media` (`normalizeProjectVideos`, `normalizeProjectScreenshots`), so preserve these keys when adding richer media content.

## External dependencies and integrations
- Legacy external libs/CDNs: Font Awesome kit in `index_legacy.html`; Flickity + imagesLoaded via bundled JS.
- Redesign external libs/CDNs: Google Fonts in `index.html` and `index_New.html`; Three.js CDN is currently used by `index_New.html` only.
- Editor dashboard integrations: browser File System Access API (`showOpenFilePicker`, `showSaveFilePicker`) is used when available, with JSON download fallback when unavailable.
- External integration points are outbound links/embeds only (YouTube/Vimeo iframes, GitHub/LinkedIn, Google Play, Asset Store, itch.io, Global Game Jam, resume PDF).

## Agent notes
- A glob search for existing AI guidance files (`README.md`, `.github/copilot-instructions.md`, `AGENT*.md`, cursor/windsurf/cline rules) currently returns this root `AGENTS.md` and `README.md`.
- When uncertain which page to change, default to `index.html` for the current redesign; use `index_legacy.html` only for legacy Bulma/Flickity work.

