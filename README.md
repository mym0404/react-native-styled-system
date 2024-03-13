# React Native Styled System

[Documentation](https://mj-studio-library.github.io/react-native-styled-system/)

`React Native Styled System` is a React Native implementation
of the `styled-system` package commonly used on the web.


It does not fully support the grammar of `styled-system` and there are some grammars that are not currently supported, but this is not a technical limitation and will be added as needed.

Styles such as `justifySelf` that are not yet supported in React Native obviously cannot be added in the future.

## Supported features

- Allows arguments such as `m, px, py, bg, flex, flexDirection, position` to be passed directly to Props according to the grammar of `styled-system`.
- Users can define the design system by directly defining and delivering themes.
- TypeScript can be fully used through the Type Generation process using CLI.
- Logical or responsive values such as `safeAreaTop` and `sidePadding` can be injected into the theme and used as token values.

## Limit

- The only tokens currently supported are `space`, `sizes`, and `colors`, and tokens such as `fontSize` and `zIndices` will be added in the future.
- Not all `View` style fields or props are supported yet.
- The dark mode function does not exist yet.