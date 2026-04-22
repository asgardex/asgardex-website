# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Development server on http://localhost:3000
- `yarn build` - Production build
- `yarn start` - Serve production build
- `yarn lint` - Run ESLint
- `yarn lint --fix` - Auto-fix lint issues
- `yarn analyze` or `yarn build:analyze` - Production build with bundle analyzer (`ANALYZE=true`)
- `yarn perf` - Run performance checks (`scripts/performance-check.js`)

## Architecture

Next.js 14 App Router site for the Asgardex desktop application landing page. TypeScript, Tailwind CSS, NextUI components.

### Pages

- `/` (`src/app/page.tsx`) - Home page with hero, features, and three live metrics widgets (client components fetching from external APIs)
- `/installer` (`src/app/installer/page.tsx`) - Download page (server component). Reads release data via `src/app/lib/api.tsx` which dynamically imports `src/releases.json`
- `/getting-started` (`src/app/getting-started/page.tsx`) - Step-by-step setup guide (client component)

### Data Flow for Releases

`src/releases.json` (GitHub API release data) -> `src/app/lib/api.tsx` (`getAsgardexReleases()`) -> `/installer` page. The API module parses release assets by platform (Windows `.exe`, macOS `.dmg` with Sequoia/Sonoma/Ventura variants, Linux `.AppImage`) and extracts release summaries from markdown bodies.

### Live Metrics Widgets

Three client-side widgets on the home page fetch from external APIs with 30-second polling intervals:
- `LiveMetricsWidget.tsx` - THORChain via `gateway.liquify.com/chain/thorchain_midgard/v2/`
- `LiveMayaMetricsWidget.tsx` - MayaChain via `midgard.mayachain.info/v2/`
- `LiveChainflipMetricsWidget.tsx` - Chainflip via `chainflip-broker.io/`

All use `AnimatedCounter` for smooth number transitions and include rate limiting, abort controllers, and request timeouts.

### Download Analytics

`src/app/lib/downloadAnalytics.ts` processes `releases.json` to extract per-OS download counts. Rendered by `DownloadChart.tsx` (Recharts) on the installer page.

### Component Library

UI components in `src/app/ui/`: Header, Footer, Card, Selector (dropdown for previous release versions), AnimatedBackground, DownloadChart, fonts.

### Providers

`src/app/providers.tsx` wraps the app with NextUI + next-themes (dark mode default, class-based switching).

## Styling

Two color systems coexist in `tailwind.config.ts`:
- **NextUI theme colors** (used via `text-primary`, `bg-secondary`, etc.): primary `#23DCC8`, secondary `#00CCFF`, danger `#FF4954`, warning `#F3BA2F`
- **Extended Tailwind colors** (`asgardex-primary-*`, `asgardex-secondary-*`, etc.): full shade palettes for fine-grained use

Custom gradients: `bg-gradient-primary`, `bg-gradient-secondary`, `bg-gradient-accent`, `bg-gradient-subtle`. Custom shadows: `shadow-glow`, `shadow-glow-blue`.

## ESLint

Configured in `.eslintrc.json`. Extends `standard-with-typescript` + `plugin:react` + `next/recommended`. Notable disabled rules: `explicit-function-return-type`, `no-floating-promises`, `strict-boolean-expressions`, `prefer-nullish-coalescing`. Path alias: `@/*` maps to `./src/*`.

## Environment

Requires `PRIVATE_REPO_TOKEN` env var for Kairos organization packages (`.npmrc`).
