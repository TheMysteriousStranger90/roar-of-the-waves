# Roar of the Waves

Official website for the one-man musical project **Roar of the Waves** — dark piano and cinematic soundscapes.

## Stack

- Angular 19 (standalone components, no NgModules)
- Signals for state, `ChangeDetectionStrategy.OnPush`
- TypeScript strict + `strictTemplates`, `noUncheckedIndexedAccess`
- Lazy-loaded routes
- Feature-sliced structure: `core` / `shared` / `features`
- Lightweight signal-based i18n — English / Russian, no third-party i18n library
- SEO service (Title, Meta, Open Graph, JSON-LD)
- Accessibility: skip-link, `prefers-reduced-motion`
- Plain SCSS with design tokens, no third-party UI libraries

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm start
```

The app will be available at `http://localhost:4200`.

## Build

```bash
npm run build
```

Build output goes to `dist/roar-of-the-waves`.

## Project structure

```
src/
├── app/
│   ├── core/        # services, models, tokens, i18n dictionary
│   ├── shared/      # reusable components, pipes, directives
│   └── features/    # pages (home, music, about, not-found)
├── assets/data/     # track catalogue
└── styles/          # design tokens, reset, global styles
```

## Internationalization

The UI ships with English (default) and Russian copy. The active language is
a signal held by `LanguageService`
(`src/app/core/services/language.service.ts`) and persisted to
`localStorage`; all strings live in
`src/app/core/i18n/translations.ts`. Visitors can switch languages from the
header — the choice is remembered on their next visit, and English is always
what a first-time visitor sees.

## Theming

Dark is the default theme. Visitors can switch to light mode from the
header; the choice is persisted to `localStorage`.

## Continuous integration

Every push and pull request against `main` runs
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml), which installs
dependencies and builds the app in production mode.

## Author

Bohdan Harabadzhyu (Bogdan Garabagiu)

## License

MIT — see [LICENSE](./LICENSE).
