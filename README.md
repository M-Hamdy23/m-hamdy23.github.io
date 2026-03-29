# Portfolio Admin Dashboard

This repo now includes a static admin editor at `editorUI.html` for managing `data/portfolio-data.json` without manually editing JSON.

## What it does

- Loads the default portfolio JSON from `data/portfolio-data.json`
- Imports any local `.json` file with the same general structure
- Edits all portfolio sections in a user-friendly dashboard
- Supports nested arrays/objects, tag editing, media previews, and project drag/drop reordering
- Saves directly to a picked file when the browser supports it
- Always supports JSON export/download as a fallback

## Open it locally

The default JSON fetch works best when the repo is served over HTTP.

### Python

```powershell
cd D:\Work\Private\m-hamdy23.github.io
python -m http.server 8000
```

Then open:

- `http://localhost:8000/editorUI.html`

## Notes about media uploads

This is a static web app, so selecting an image or video:

1. previews it immediately in the dashboard
2. suggests a relative path in the JSON
3. does **not** physically copy the asset into the repo for you

After choosing a file, move that asset into the appropriate repo folder (for example `img/`) and keep the saved path accurate before publishing.

## Keyboard shortcuts

- `Ctrl + Z` → Undo
- `Ctrl + Y` → Redo
- `Ctrl + Shift + Z` → Redo

