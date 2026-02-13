# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native Styled System - a styled-system implementation for React Native. Converts theme tokens (space, sizes, colors, radii, typography) into React Native styles via hooks and HOC patterns.

## Monorepo Structure

- **packages/core** - Main library (`@react-native-styled-system/core`). Built with react-native-builder-bob.
- **packages/util** - Theme utilities (`@react-native-styled-system/util`). Contains `createTheme` and `defaultTheme`.
- **packages/cli** - Theme type generation CLI (`@react-native-styled-system/cli`). Built with tsup. ES Module package.
- **example/** - Expo 51 React Native example app.
- **doc/** - Docusaurus v3 documentation site.

Package manager: **Yarn v4** (node-modules linker). Monorepo managed with **Lerna**.

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

# Run a single test file
yarn check:test --testPathPattern=useSx

# Build all packages
yarn build               # runs lerna run prepack

# Example app
yarn example start
yarn example android
yarn example ios

# Docs site
yarn docs
```

Tests use Jest with react-native preset and ts-jest. Test files live alongside source:
- `packages/core/src/hook/*.test.ts`
- `packages/core/src/internal/util/*.test.ts`
- `packages/util/src/*.test.ts`

Test utilities: `packages/core/src/__testUtils__/testTheme.ts` (provides `emptyTheme`, `baseTheme`, `responsiveTheme`).

## Architecture

### Core Library Flow

1. **StyledSystemProvider** (`provider/StyledSystemProvider.tsx`) - React Context providing `ThemedDict` + `screenWidth` (from `useWindowDimensions`) to the tree. Wraps the raw theme with `createTheme()` to fill defaults.
2. **useSx** hook (`hook/useSx.ts`) - Main API. Takes component props + options, returns `{ getStyle, filteredProps }`. Handles shortcut prop expansion, token resolution, style merging, and optional caching via object-hash.
3. **useSxStyle** hook (`hook/useSxStyle.ts`) - Returns a function `(sx: TextSxProps) => StyleProp<TextStyle>` for ad-hoc style computation without component props.
4. **useSxTokens** hook (`hook/useSxTokens.ts`) - Resolves raw token values by type (e.g., `useSxTokens('colors', ['red.500'])` returns the resolved color values).
5. **propsToThemedStyle** (`util/propsToThemedStyle.ts`) - Pure function converting SxProps to React Native TextStyle/ViewStyle using TokenParsers. Central mapping of all style properties. Resolves responsive arrays before parsing.
6. **TokenParser** (`internal/TokenParser/`) - Factory functions creating parsers for each token type (colors, space, sizes, radii, typography). Each parser resolves theme token keys to concrete values.
7. **createSxComponent / createSxTextComponent** (`util/createSxComponent.tsx`) - HOC wrapping any RN component with sx prop support via `forwardRef`.
8. **createTheme** (`@react-native-styled-system/util`) - Overloaded: `createTheme(partial?)` fills empty token categories; `createTheme(base, overrides)` merges two themes.
9. **defaultTheme** (`@react-native-styled-system/util`) - Pre-built theme with Tailwind CSS v4 palette + semantic tokens.

### Style Resolution Priority

Styles merge in this order (later overrides earlier):
```
fallback < props < sx prop < style prop
```

Within each level, shortcut props are expanded to their full names first (e.g., `bg` -> `backgroundColor`), and the full name takes priority over the shortcut when both are provided.

### Shortcut Props

Defined in `SHORTCUT_NAME_MAP` (`@types/SxProps.ts`). Key mappings: `bg`->`backgroundColor`, `m/mt/mr/mb/ml/mx/my`->margin variants, `p/pt/pr/pb/pl/px/py`->padding variants, `w/h`->`width/height`, `radius`->`borderRadius`, `pos`->`position`, `t`->`typography`, `weight`->`fontWeight`, `align`->`textAlign`.

### Responsive Values

Style props accept `Responsive<T> = T | T[]` arrays. Resolution (`resolveResponsiveValue`) picks the value matching the current `screenWidth` against `breakpoints` (defined in `ThemedDict.breakpoints`, default `[480, 768, 1024]`). Array index 0 = base value, index N+1 = value when screenWidth >= breakpoints[N]. The `transform` prop is excluded from responsive wrapping.

### Default Theme & Semantic Colors

- `defaultTheme` (`@react-native-styled-system/util`) - Pre-built theme with Tailwind CSS v4 palette + shadcn/ui semantic colors. Default semantic colors use `base: 'neutral', theme: 'neutral'`.
- `createThemeColors({ base, theme })` - Generates light/dark semantic color sets following shadcn/ui convention. `base` is a gray scale (`slate`|`gray`|`zinc`|`neutral`|`stone`), `theme` is any Tailwind color name.
- Semantic color tokens: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`, `chart-1`~`chart-5`.

### Key Types

- `ThemedDict` (`@types/ThemedDict.ts`) - Theme shape: `{ space, sizes, colors, radii, typography, breakpoints? }`.
- `SxProps` / `TextSxProps` (`@types/SxProps.ts`) - All supported style props. `SxProps` = view styles only, `TextSxProps` extends with text styles. Both wrap values in `Responsive<T>`.
- `ResolvedSxProps` / `ResolvedTextSxProps` - Internal types after responsive resolution (no array wrapping).
- `ThemedTypings` (`@types/ThemedTypings.ts`) - Auto-generated type augmentation from CLI for type-safe token keys.
- `BaseColor` / `ThemeColor` (`@types/ThemedDict.ts`) - Type aliases for `createThemeColors` parameters.
- `Theme` (`@react-native-styled-system/util`) - Utility package theme type used by `createTheme` and `defaultTheme`.

### CLI

`generate-theme-type <sourceFile>` reads a theme file via `bundle-n-require`, extracts token keys, and generates TypeScript interface augmentation for type-safe theme tokens.

Theme source file rule:
- Keep `theme.ts` import surface minimal.
- Import only theme-related utilities (`createTheme`, `defaultTheme`, `createThemeColors`) and avoid unrelated runtime imports.

## Git Hooks

Husky pre-commit hook runs `yarn check:all` (lint + type + test) before every commit. Commit messages are validated by commitlint.

## TypeScript

Root `tsconfig.json`: `strict: true`, `target: ESNext`, `module: ESNext`. Path aliases:
- `@react-native-styled-system/core` -> `packages/core/src/index`
- `@react-native-styled-system/util` -> `packages/util/src/index`

## Jest

Preset: `react-native`, environment: `node`, transform: `ts-jest`. Ignores `node_modules`, `lib`, `cli`, and `.worktrees` directories.

## Conventions

- Conventional commits enforced via commitlint (`feat:`, `fix:`, `docs:`, etc.)
- PR base branch: `develop`. Publish from `main` (Lerna `pub:version` + `pub:release`).
- Branch naming: `[type/scope]` (e.g., `fix/accordion-hook`, `feat/new-token`).
- Prettier: single quotes, trailing commas, 100 char print width, `arrowParens: always`, `jsxSingleQuote: false`.
- ESLint: `@mj-studio/eslint-config-react`.
