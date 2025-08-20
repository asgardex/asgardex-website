# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `yarn install`
- **Development server**: `yarn dev` (runs on http://localhost:3000)
- **Production build**: `yarn build`
- **Production server**: `yarn start`
- **Linting**: `yarn lint`
- **Fix lint issues**: `yarn lint --fix`

## Tech Stack & Architecture

This is a Next.js 14 website for the Asgardex landing page using the App Router architecture.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS with NextUI components
- **Theme**: next-themes for dark/light mode (defaults to dark)
- **Icons**: Tabler icons and React Icons
- **Animation**: Framer Motion

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Header/Footer and background image
  - `page.tsx` - Home page
  - `providers.tsx` - NextUI and theme providers
  - `installer/page.tsx` - Installation page
  - `ui/` - Reusable UI components (Header, Footer, Card, Selector)
  - `lib/api.tsx` - API utilities
- `src/releases.json` - Large JSON file containing GitHub release data for download links
- `public/` - Static assets (logos, backgrounds, favicons)

### Styling System
- Custom Tailwind theme with Asgardex brand colors:
  - Primary: Green gradient (#33FF99 to #00BC42)
  - Secondary: Blue gradient (#00CCFF to #0061AC)
  - Gray and dark color palettes
- NextUI component library integration
- Dark mode as default theme

### Key Patterns
- All components use TypeScript with strict type checking
- ESLint configured with TypeScript Standard style
- Custom path aliases: `@/*` for `./src/*`
- Server and client components follow Next.js 14 App Router patterns
- Theme switching handled via next-themes provider

### Environment Requirements
- Node.js environment with Yarn package manager
- Requires `PRIVATE_REPO_TOKEN` environment variable for Kairos organization packages (contact administrators if needed)

### Release Data
The `src/releases.json` file contains GitHub API data for Asgardex desktop application releases, used to populate download links and version information on the installer page.