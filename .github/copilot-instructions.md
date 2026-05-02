# Guidance for AI coding agents working on Thacer

**Purpose:** Help AI agents be immediately productive by explaining the project's architecture, dev workflows, conventions, and concrete file references.

- **Project layout:** Backend code and data live in `API/`. Frontend is a Vite + Vue 3 app in `vue-thacer/`.
- **Backend (read-only during frontend dev):** `API/index.php` exposes a REST/JSON interface. Data files (CSV, GeoJSON) are under `API/CSV/` and `API/geojson/`. Examples: `?GTh=9` returns sectors; `?CERAM` returns all pottery items as GeoJSON.
- **Frontend:** `vue-thacer/` — run `cd vue-thacer && npm install` then `npm run dev` to start the Vite dev server. Build with `npm run build`.

- **Key files to inspect for behavior:**
  - `vue-thacer/src/main.js` — app bootstrap and Sentry setup (Sentry is only enabled in production builds).
  - `vue-thacer/src/router/index.js` — main routes (`/` -> `TheMap`, `/ceram` -> `TheCeramic`).
  - `vue-thacer/src/components/TheMap.vue` and `vue-thacer/src/assets/js/thacer-map.js` — where map setup and layer logic live (Leaflet + marker cluster).
  - `API/readme.TXT` — API usage and response examples. Use it for concrete query examples and image URL formats.

- **Build/test/debug workflows:**
  - Install dependencies: `cd vue-thacer; npm install`.
  - Dev server: `npm run dev` (Vite). Open devtools; README requests always developing with devtools open.
  - Lint & format: `npm run lint` (eslint auto-fix) and `npm run format` (prettier on `src/`). Projects expect Prettier + ESLint configured in IDE.

- **Conventions & patterns specific to this repo:**
  - Frontend uses Vue 3 (dynamic imports for route-level code-splitting in `router/index.js`). Follow the existing component file layout under `vue-thacer/src/components/`.
  - CSS and static assets: `vue-thacer/public/` and `vue-thacer/src/assets/` (SVG icons used directly, not font-based bootstrap-icons).
  - Backend is treated as production: do not modify production API during frontend work; assume it's read-only unless asked.
  - Commit/PR flow: create branches and PRs on GitHub; squash commits. Use short, imperative, capitalized commit titles per `README.md`.

- **Integration points & external deps:**
  - Leaflet + `leaflet.markercluster` for maps. Look in `src/assets/js/` and `TheMap.vue` for layer setup.
  - Sentry integration in `main.js` — be aware of environment gating (only active in production by default).
  - Axios is used for API calls (see components that call `API/?...`). Image URLs returned by the API point to `API/IMAGES/...`.

- **When making changes:**
  - Keep edits minimal and local to the area you’re modifying. Update only related files.
  - Fix ESLint/prettier issues before committing. The repository expects IDE formatting on save.

- **Examples agents may use:**
  - Fetch sectors: `GET https://thacer.archaiodata.com/API/?GTh=9` — response is a GeoJSON FeatureCollection. See `API/readme.TXT` for samples.
  - Start frontend locally: `cd vue-thacer; npm install; npm run dev`.

If any of this is unclear or you want more detail on a specific area (map layers, API shape, or build/deploy), tell me which part to expand and I'll update this file.
