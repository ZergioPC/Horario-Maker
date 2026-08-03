# Horario Maker — Agent Guide

## Project overview

- React 19 + Vite 7 SPA (JavaScript, no TypeScript) for building student class schedules.
- No backend: state persists to `localStorage`. Deployed to GitHub Pages.

## Commands

Package manager: `pnpm@11.3.0` (do not use npm/yarn).

- `pnpm dev` — dev server
- `pnpm build` — build to `dist`
- `pnpm preview` — preview production build
- `pnpm lint` — ESLint (only verification; no tests or typecheck exist)

## Project structure

- `src/main.jsx` → `src/App.jsx` (root; owns modal state + composition)
- `src/components/HorarioXxx/index.jsx` — one directory per component, `Horario` prefix, `index.jsx`
- `src/hooks/` — state logic (`useHorariosTabs`, `useLocalStorageState`)
- `src/constants/horarios.js` — `DIAS`, `HORAS`, `NOMBRES_DIAS`, `cellKey`/`parseCellKey` helpers
- `src/utils/horarios.js` — pure logic: validation (`validateMateria`) and conflict detection (`getConflicts` returns a `Map` keyed by `"dia-hora"`)
- `.github/workflows/deploy.yml` — CI/CD: lint + build + deploy on push to `main`

## Code conventions

- Named exports (`export { Foo }`); components as arrow functions `const Foo = ({...})=>(...)`
- IDs via `crypto.randomUUID()`; localStorage keys namespaced `horario-maker:*` through `useLocalStorageState`
- UI text and identifiers are in Spanish (keep as-is; matches existing code)
- `PascalCase` components, `camelCase` hooks/helpers, `SCREAMING_SNAKE` constants
- Quotes/semicolons are mixed in the codebase (not enforced by ESLint) — match surrounding style

## Verification

- Run `pnpm lint` before finishing any change.

## Deploy

- Push to `main` triggers the GitHub Pages workflow automatically; no manual steps.
