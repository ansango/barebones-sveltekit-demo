---
title: Getting Started
description: Quick start guide to set up and run your SvelteKit DDD application
---

# Getting Started

This guide will help you set up and run the SvelteKit application with Domain-Driven Design architecture.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** v1.0 or higher - [Install Bun](https://bun.sh/)
- **Node.js** v18 or higher (for compatibility)
- **Git** - For version control

You can verify your installations:

```bash
bun --version
node --version
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd barebones-sveltekit-demo
```

### 2. Install Dependencies

```bash
bun install
```

This will install all project dependencies including:
- SvelteKit with Svelte 5
- Tailwind CSS v4
- shadcn-ui-svelte components
- Vitest for testing
- Playwright for E2E testing
- Better-sqlite3 for database

## Project Structure

```
src/
├── core/                   # Backend DDD architecture
│   ├── domain/            # Business logic (entities, value objects)
│   ├── application/       # Use cases
│   ├── infrastructure/    # Database implementations
│   └── config/            # Dependency injection container
├── lib/                   # Frontend utilities
│   └── components/        # Reusable UI components
└── routes/                # SvelteKit routes
    ├── api/              # API endpoints
    └── users/            # User pages
```

## Configuration

### Environment Variables

Create a `.env` file in the project root (optional):

```bash
# Public variables (available in browser)
PUBLIC_API_URL=http://localhost:5173

# Private variables (server-only)
DATABASE_URL=./data/app.db
```

### Database Setup

The SQLite database is automatically initialized on first run. Data is stored in:

```
data/app.db
```

No additional setup required!

## Running the Application

### Development Server

Start the development server with hot-reload:

```bash
bun run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Building for Production

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Development Workflow

### Type Checking

Run TypeScript and Svelte type checking:

```bash
bun run check
```

For watch mode during development:

```bash
bun run check:watch
```

### Formatting

Format code with Prettier (includes Tailwind class sorting):

```bash
bun run format
```

### Linting

Check code style and potential errors:

```bash
bun run lint
```

### Testing

Run unit tests with Vitest:

```bash
bun run test:unit
```

Run tests in watch mode:

```bash
bun run test:unit -- --watch
```

Generate coverage report:

```bash
bun run test:coverage
```

Run end-to-end tests with Playwright:

```bash
bun run test:e2e
```

## Quick Feature Test

### 1. Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Navigate to Users

Click on the "Users" link or go to [http://localhost:5173/users](http://localhost:5173/users)

### 3. Create a User

- Click "Create User" button
- Fill in the form with:
  - **Name**: John Doe
  - **Email**: john@example.com
- Submit the form

### 4. Verify the User

The user should appear in the users table with:
- Auto-generated ID
- Name and email
- Action buttons (Edit/Delete)

## Next Steps

- **Learn the Architecture**: Read the [DDD Architecture](/guides/architecture) guide
- **Explore Components**: Check the [shadcn-ui-svelte components](/reference/components)
- **Study Use Cases**: Review [Application Use Cases](/reference/application/use-cases)
- **Understand Domain Models**: See [Domain Entities](/reference/domain/user)

## Common Issues

### Port Already in Use

If port 5173 is already in use:

```bash
bun run dev -- --port 3000
```

### Database Locked

If you get a database locked error, ensure no other process is using the database:

```bash
# On Linux/Mac
lsof data/app.db

# Kill the process if needed
kill -9 <PID>
```

### Type Errors After Install

Run prepare and check:

```bash
bun run prepare
bun run check
```

## Getting Help

- Check the [documentation](/guides/example)
- Review the codebase architecture
- Look at existing tests for examples

Happy coding! 🚀
