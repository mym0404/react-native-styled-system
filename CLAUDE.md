# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native Styled System - a React Native implementation of `styled-system` for theme-based, prop-driven styling with caching and TypeScript type generation.

## Commands

```bash
# Install dependencies
yarn install

# Full check (lint + type + test) - also runs as pre-commit hook
yarn check:all

# Individual checks
yarn check:lint    # ESLint
yarn check:type    # TypeScript (tsc --noEmit)
yarn check:test    # Jest

# Run a single test file
yarn check:test -- --testPathPattern=useSx

# Build all packages
yarn build
```

## Monorepo Structure

Yarn 4 (Berry) workspaces + Lerna. Two packages:

- **`packages/core`** - Main library (`@react-native-styled-system/core`). Built with `react-native-builder-bob` (CJS, ESM, TypeScript declarations).
- **`packages/cli`** - Theme type generation CLI. Built with `tsup`.
- **`example/`** - Expo 51 example app.
- **`doc/`** - Docusaurus documentation site.

## Architecture

### Core Library Flow

Props with sx shorthand (`bg`, `m`, `p`, `w`, `flex`, etc.) → `useSx` hook → themed style objects (React Native `ViewStyle`/`TextStyle`)

Key layers:

1. **Theme (`ThemedDict`)** - User-defined tokens: `colors`, `space`, `sizes`, `radii`, `typography`
2. **Sx Props (`SxProps` / `TextSxProps`)** - Shorthand prop types mapping to style properties. Defined in `packages/core/src/@types/SxProps.ts`
3. **Token Parsers** (`packages/core/src/internal/TokenParser/`) - Convert theme token references to concrete values. Separate parsers for colors, space, sizes, radii, typography
4. **Style Resolution** (`propsToThemedStyle`) - Merges parsed tokens into final style objects
5. **Caching** (`StyleHash`) - `object-hash` based deduplication to prevent unnecessary rerenders

### Public API

- `useSx(props, options)` - Core hook: resolves sx props to style, returns `{ getStyle, filteredProps }`
- `useSxStyle(sx)` - Returns only the resolved style
- `useSxTokens()` - Access theme tokens directly
- `createSxComponent(Component)()` - Factory for View-based sx components
- `createSxTextComponent(Component)()` - Factory for Text-based sx components
- `StyledSystemProvider` - Theme context provider
- `propsToThemedStyle({ theme, sx })` - Non-hook style resolution

### Shortcut Props

Shortcuts are expanded via `mutateShortcutPropToOriginalKeys`. Examples: `bg` → `backgroundColor`, `m` → `margin`, `p` → `padding`, `w` → `width`, `h` → `height`, `t` → `typography`, `radius` → `borderRadius`.

### CLI Type Generation

`packages/cli` reads a theme file and generates `ThemedTypings` interface for type-safe token autocompletion.

## Conventions

- Conventional commits enforced via commitlint (`feat:`, `fix:`, `docs:`, etc.)
- Prettier: single quotes, trailing commas, 100 char print width
- Tests live alongside source in `packages/core/src/hook/*.test.ts`
- Path alias: `@react-native-styled-system/core` → `./packages/core/src/index`