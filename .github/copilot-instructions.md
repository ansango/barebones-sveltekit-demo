# Copilot Instructions

## Project Overview

SvelteKit application using **Svelte 5** with runes, **Tailwind CSS v4**, and **shadcn-ui-svelte** components. Backend follows **DDD architecture** in `src/core/`.

## Tech Stack

- **Runtime**: Bun (use `bun run` for all scripts)
- **Framework**: SvelteKit with Svelte 5 (runes: `$state`, `$derived`, `$effect`)
- **Styling**: Tailwind CSS v4 (CSS-based config in `src/routes/layout.css`, OKLCH colors)
- **Components**: shadcn-ui-svelte (56 components in `src/lib/components/ui/`)
- **Testing**: Vitest (browser + node) + Playwright E2E

## Key Commands

```bash
bun run dev          # Start dev server
bun run format       # Prettier + Tailwind class sorting
bun run lint         # Prettier check + ESLint
bun run check        # TypeScript + Svelte type checking
bun run test:unit    # Vitest tests
bun run test:e2e     # Playwright tests
```

## Architecture

### Frontend (`src/routes/`, `src/lib/components/`)

- Use Svelte 5 runes, NOT Svelte 4 syntax (`let count = $state(0)` not `let count = 0`)
- Style with Tailwind classes using semantic colors (`bg-primary`, `text-foreground`)
- Prefer shadcn-ui-svelte components from `$lib/components/ui/`

### Backend DDD (`src/core/`)

```
src/core/
├── domain/         # Entities, Value Objects, Repository interfaces (NO external deps)
├── application/    # Use Cases with single execute() method
├── infrastructure/ # Concrete implementations (DB, APIs)
└── config/         # Dependency container (object composition)
```

- Domain layer has zero external dependencies
- Use Cases receive dependencies via constructor injection
- SvelteKit routes consume use cases from `$core/config/container`

### SvelteKit Server Patterns

- API routes: `src/routes/api/**/+server.ts`
- Server load: `+page.server.ts`, `+layout.server.ts`
- Form actions: Use `fail()` for validation errors, `redirect()` for success

## Code Quality Workflow

1. Write code following Svelte 5 / DDD patterns
2. Validate with `svelte-autofixer` (MCP) for `.svelte` files
3. Validate with `lint-files` (MCP) for all code files
4. Run `bun run format` to apply formatting
5. Run `bun run lint && bun run check` before delivery

## Project-Specific Conventions

- **Tailwind v4**: No `tailwind.config.js` — theme in `src/routes/layout.css` with `@theme inline`
- **Path aliases**: `$lib` → `src/lib`, `@/core` → `src/core` (configured in `svelte.config.js`)
- **Prettier**: Uses tabs, single quotes, no trailing commas (see `.prettierrc`)
- **Components**: All UI in `src/lib/components/ui/`, utilities in `src/lib/utils.ts`

## Environment Variables

SvelteKit provides type-safe environment variable access:

```typescript
// Server-only (secrets, API keys) - NEVER exposed to client
import { DATABASE_URL, API_SECRET } from '$env/static/private';
import { env } from '$env/dynamic/private';

// Client-safe (must be prefixed with PUBLIC_)
import { PUBLIC_API_URL } from '$env/static/public';
import { env } from '$env/dynamic/public';
```

- **Static**: Replaced at build time, better performance
- **Dynamic**: Read at runtime, useful for different environments
- Define variables in `.env`, `.env.local`, `.env.[mode]`

## MCP Tools Available

- `svelte/*`: Official Svelte docs (`list-sections`, `get-documentation`, `svelte-autofixer`)
- `shadcn-ui-svelte/*`: Component library (`list_components`, `get_component_demo`)
- `ESLint/*`: Linting (`lint-files`)

## Specialized Agents

See `.github/agents/` for detailed instructions:

- `Frontend.agent.md`: UI development with shadcn-ui and Tailwind
- `Backend.agent.md`: DDD architecture and server-side logic
