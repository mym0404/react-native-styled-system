# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native Styled System is a theming and styling library for React Native that provides a type-safe, token-based design system inspired by styled-system and theme-ui.

This is a **Lerna monorepo** with Yarn Workspaces:
- `packages/core` - Main library
- `packages/cli` - Type generation CLI tool
- `example` - Expo example app
- `doc` - Docusaurus documentation site

## Development Commands

### Root Level
```bash
# Install dependencies for all packages
yarn install

# Run all checks (lint, type, test)
yarn check:all

# Individual checks
yarn check:lint   # ESLint on packages directory
yarn check:type   # TypeScript type checking
yarn check:test   # Jest tests

# Build all packages
yarn build

# Work with example app
yarn example <command>
```

### Core Package (`packages/core`)
```bash
cd packages/core

# Run tests
yarn test

# Generate TypeScript types from theme file
yarn gen

# Build package (CommonJS + ESM + TypeScript definitions)
yarn prepack
```

### Testing
- Tests are located alongside source files: `src/**/*.test.ts(x)`
- Use `@testing-library/react-native` for hook testing
- `react-test-renderer` must be version `18.2.0` for compatibility

## Architecture

### Theme System

**ThemedDict Structure** (packages/core/src/@types/ThemedDict.ts):
```typescript
interface ThemedDict {
  space: Record<string | number, SpaceValue>;      // Spacing tokens
  sizes: Record<string | number, SizesValue>;      // Size tokens
  colors: Record<string | number, ColorsValue>;    // Color tokens
  radii: Record<string | number, RadiiValue>;      // Border radius tokens
  typography: Record<string | number, TypographyValue>; // Typography tokens
}
```

**StyledSystemProvider** (packages/core/src/provider/StyledSystemProvider.tsx):
- React Context provider that supplies theme to all hooks
- Automatically fills nullish theme keys with empty objects
- Usage: `<StyledSystemProvider theme={yourTheme}>{children}</StyledSystemProvider>`

### Sx Props System

**Core Hook - useSx** (packages/core/src/hook/useSx.ts):
- Converts sx props to React Native styles
- Returns `{ getStyle, filteredProps }`
- Priority: `style` prop > `sx` prop > component props > `fallback` option
- Supports style caching via `object-hash` when `cache: true`

**Style Types**:
- `ViewStyle` (default) - For View components
- `TextStyle` - For Text components, includes typography support

**Shortcut Props**:
- `bg` → `backgroundColor`
- `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` → margin variants
- `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` → padding variants
- `w`, `h` → `width`, `height`
- `radius` → `borderRadius`
- `t` → `typography` (TextStyle only)

**Token Parsing**:
- Number tokens: `m: 2` looks up `theme.space[2]`
- String tokens: `bg: 'primary'` looks up `theme.colors.primary`
- Pixel suffix: `m: '16px'` → `margin: 16`
- Percentage: `w: '100%'` → `width: '100%'`
- Negative values: `m: -2` looks up negative of `theme.space[2]`

### Type Generation

The CLI tool (`packages/cli`) generates TypeScript types from theme files:

```bash
# In packages/core
yarn gen  # Runs: node bin/theme-gen.js bin/theme.ts bin/ret.d.ts
```

This reads a theme file and generates `ThemedTypings` interface for autocomplete support.

**Important**: The example project currently does not support type generation.

### Build System

**Core Package**:
- Uses `react-native-builder-bob`
- Outputs: CommonJS (`lib/commonjs`), ESM (`lib/module`), TypeScript definitions (`lib/typescript`)
- Source: `src/index.ts`
- Configuration in `package.json` under `react-native-builder-bob`

**CLI Package**:
- Uses `tsup` for bundling
- Outputs single ESM file with shebang

### Testing Configuration

**Jest Setup** (jest.config.js):
- No `react-native` preset (removed to avoid TypeScript parsing issues)
- Uses `ts-jest` for TypeScript files
- Transform pattern: `'^.+\\.(ts|tsx)$': 'ts-jest'`
- Test environment: `node`
- Transform ignore patterns include React Native packages

**Important**:
- All test dependencies are managed at root level, not in individual packages
- `react-test-renderer@18.2.0` is required (not 19.x)

## Code Conventions

### Props and Components
- Use object parameter with destructuring in functions
- Prefer `Type[]` over `Array<Type>`
- Avoid `any` and type assertions
- React props should use curly braces: `<Component prop={"value"} />`

### Commits
- Uses Conventional Commits format
- Commitizen configured for interactive commits
- Format: `type(scope): message` (e.g., `feat(core): add new feature`)

### Package Structure
```
packages/core/src/
├── @types/          # TypeScript type definitions
├── component/       # (Removed - only provider now)
├── hook/            # React hooks (useSx, useSxStyle, useSxTokens)
├── internal/        # Internal utilities
├── provider/        # StyledSystemProvider
└── util/            # Public utilities (propsToThemedStyle)
```

## Common Tasks

### Adding a New Style Property
1. Add to `SxProps` type in `packages/core/src/@types/SxProps.ts`
2. Update `propsToThemedStyle` in `packages/core/src/util/propsToThemedStyle.ts`
3. Add to appropriate prop list (`_viewStylePropList` or `_textStylePropList`)
4. Add tests in relevant `.test.ts` files

### Modifying Theme Structure
1. Update `ThemedDict` in `packages/core/src/@types/ThemedDict.ts`
2. Update token parsers in `packages/core/src/internal/token/`
3. Regenerate types: `cd packages/core && yarn gen`
4. Update documentation

### Running Single Test
```bash
# From root
jest packages/core/src/hook/useSx.test.ts

# Or with pattern
jest useSx
```
