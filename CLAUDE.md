# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native Styled System - a styled-system implementation for React Native. Converts theme tokens (space, sizes, colors, radii, typography) into React Native styles via hooks and HOC patterns.

## Monorepo Structure

- **packages/core** - Main library (`@react-native-styled-system/core`). Built with react-native-builder-bob.
- **packages/cli** - Theme type generation CLI (`@react-native-styled-system/cli`). Built with tsup. ES Module package.
- **example/** - Expo 51 React Native example app.
- **doc/** - Docusaurus v3 documentation site.

Package manager: **Yarn v4.1.1** (node-modules linker). Monorepo managed with **Lerna**.

## Commands

```bash
# Install all dependencies (root + example)
yarn

# Run all checks (lint + type + test)
yarn check:all

# Individual checks
yarn check:lint          # ESLint (packages only)
yarn check:type          # TypeScript noEmit check
yarn check:test          # Jest tests

# Build all packages
yarn build               # runs lerna run prepack

# Example app
yarn example start
yarn example android
yarn example ios
```

Tests are in `packages/core/src/hook/` (useSx.test.ts, useSxStyle.test.ts, useSxTokens.test.ts). Jest with react-native preset and ts-jest transform.

## Architecture

### Core Library Flow

1. **StyledSystemProvider** (`provider/StyledSystemProvider.tsx`) - React Context providing `ThemedDict` to the tree.
2. **useSx** hook (`hook/useSx.ts`) - Main API. Takes component props + options, returns `{ getStyle, filteredProps }`. Handles shortcut prop expansion, token resolution, style merging, and optional caching via object-hash.
3. **propsToThemedStyle** (`util/propsToThemedStyle.ts`) - Pure function converting SxProps to React Native TextStyle/ViewStyle using TokenParsers. Central mapping of all style properties.
4. **TokenParser** (`internal/TokenParser/`) - Factory functions creating parsers for each token type (colors, space, sizes, radii, typography). Each parser resolves theme token keys to concrete values.
5. **createSxComponent / createSxTextComponent** (`util/createSxComponent.tsx`) - HOC wrapping any RN component with sx prop support via `forwardRef`.

### Default Theme & Semantic Colors

- `defaultTheme` (`@types/ThemedDict.ts`) - Pre-built theme with Tailwind CSS v4 palette + shadcn/ui semantic colors. Default semantic colors use `base: 'neutral', theme: 'neutral'`.
- `createThemeColors({ base, theme })` - Generates light/dark semantic color sets following shadcn/ui convention. `base` is a gray scale (`slate`|`gray`|`zinc`|`neutral`|`stone`), `theme` is any Tailwind color name.
- Semantic color tokens: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`, `chart-1`~`chart-5`.

### Key Types

- `ThemedDict` (`@types/ThemedDict.ts`) - Theme shape: `{ space, sizes, colors, radii, typography }` as `Record<string|number, TokenValue>`.
- `SxProps` / `TextSxProps` (`@types/SxProps.ts`) - All supported style props including shortcuts (e.g., `bg` for `backgroundColor`, `m` for `margin`, `t` for `typography`).
- `ThemedTypings` (`@types/ThemedTypings.ts`) - Auto-generated type augmentation from CLI for type-safe token keys.
- `BaseColor` / `ThemeColor` (`@types/ThemedDict.ts`) - Type aliases for `createThemeColors` parameters.

### CLI

`generate-theme-type <sourceFile>` reads a theme file via `bundle-n-require`, extracts token keys, and generates TypeScript interface augmentation for type-safe theme tokens.

## Conventions

- Conventional commits enforced via commitlint (`feat:`, `fix:`, `docs:`, etc.)
- PR base branch: `develop`. Publish from `main`.
- Prettier: single quotes, trailing commas, 100 char print width.
- ESLint: `@mj-studio/eslint-config-react`.