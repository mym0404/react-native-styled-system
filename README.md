<p align="center">
  <a href="https://mym0404.github.io/react-native-styled-system/">
    <img width="160px" src="https://raw.githubusercontent.com/mym0404/image-archive/master/202404261501218.webp"><br/>
  </a>
  <h1 align="center">React Native Styled System</h1>
  <p align="center">
  <a href="https://www.npmjs.com/package/@react-native-styled-system/core"><img src="https://img.shields.io/npm/dm/@react-native-styled-system/core.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/@react-native-styled-system/core"><img src="https://img.shields.io/npm/v/@react-native-styled-system/core.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/@react-native-styled-system/core.svg?style=flat-square" alt="License"></a>
  <h3 align="center">Deadly Simple Style Library</h3>
  </p>
</p>

---

Token-driven styling for React Native. Pass design tokens as props, resolve them from a centralized theme, and ship consistent UI faster.

## Install

```
yarn add @react-native-styled-system/core
```

## Why

Typical React Native styling requires manually referencing theme values everywhere:

```tsx
const Sample = () => {
  const theme = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors['red.500'],
      borderRadius: theme.radii.lg,
    }}>
      <Text style={[theme.typography.h1, { marginTop: theme.spaces[4] }]}>
        React Native
      </Text>
    </View>
  );
};
```

With Styled System, design tokens become props:

```tsx
const Sample = () => {
  return (
    <Box bg={'red.500'} radius={'lg'}>
      <Txt t={'h1'} mt={4}>
        React Native
      </Txt>
    </Box>
  );
};
```

## What's New in v2.0

- **Built-in design tokens** - Comprehensive color palette and semantic color tokens included as `defaultTheme`
- **Semantic color generation** - `createThemeColors({ base, theme })` generates light/dark color sets automatically
- **Theme utilities** - `createTheme()` for creating and merging themes with sensible defaults
- **Responsive values** - Pass `[base, sm, md, lg]` arrays to any style prop for breakpoint-based styling

See the full [v2.0 release notes](https://mym0404.github.io/react-native-styled-system/docs/whats-new/v2) for details.

## Features

- Pass style props like `m`, `px`, `py`, `bg`, `flex`, `flexDirection`, `position` directly to components
- All styles are cacheable, preventing unnecessary re-renders when values haven't changed
- Define and deliver custom design systems through themes
- Full TypeScript support via CLI-generated type augmentations
- Inject logical or responsive values (e.g. `safeAreaTop`, `sidePadding`) into theme tokens
- Text typography support
- Dark theme integration

## Quick Start

**1. Wrap your app with the provider:**

```tsx
import { StyledSystemProvider, defaultTheme } from '@react-native-styled-system/core';

const App = () => (
  <StyledSystemProvider theme={defaultTheme}>
    {/* your app */}
  </StyledSystemProvider>
);
```

**2. Create styled components:**

```tsx
import { createSxComponent } from '@react-native-styled-system/core';
import { View, Text } from 'react-native';

const Box = createSxComponent(View);
const Txt = createSxTextComponent(Text);
```

**3. Use token props:**

```tsx
<Box bg={'primary'} p={4} radius={'lg'}>
  <Txt t={'h1'} color={'primary-foreground'}>
    Hello World
  </Txt>
</Box>
```

## Documentation

Full documentation is available at [mym0404.github.io/react-native-styled-system](https://mym0404.github.io/react-native-styled-system/).

## Contributing

See the [contributing guide](./CONTRIBUTING.md) for details.

## License

MIT
