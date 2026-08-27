# TalentX Clone

A React base project built with Vite, TypeScript, Tailwind CSS, shadcn/base components, React Query, Zustand, React Router, and React Compiler.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- shadcn/base components
- React Router
- TanStack React Query
- Zustand
- React Compiler
- ESLint

## Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The app will usually be available at:

```bash
http://localhost:5173
```

## Available Scripts

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Project Setup Notes

- `@/...` is configured as an import alias for `src/...`.
- shadcn/base components are located in `src/components/ui/shadcn`.
- React Query is configured through a shared `QueryClient`.
- Zustand is used for client state, including the mock auth store.
- React Compiler is enabled in the Vite config.