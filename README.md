<p align="center">
  <a href="https://mj-studio-library.github.io/react-native-naver-map/">
    <img width="160px" src="https://raw.githubusercontent.com/mym0404/image-archive/master/202404261501218.webp"><br/>
  </a>
  <h1 align="center">React Native Styled System</h1>
  <p align="center">
  <a href="https://www.npmjs.com/package/@react-native-styled-system/core"><img src="https://img.shields.io/npm/dm/@react-native-styled-system/core.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/@react-native-styled-system/core"><img src="https://img.shields.io/npm/v/@react-native-styled-system/core.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/@react-native-styled-system/core.svg?style=flat-square" alt="License"></a>
  <h3 align="center">Bring styled-system to React Native</h3>
  </p>
</p>

---

- [Documentation](https://mj-studio-library.github.io/react-native-styled-system/)



`React Native Styled System` is a React Native implementation
of the `styled-system` package commonly used on the web.

## Highlights

- ⚡️ All styles are cached. So it doesn't cause any rerender if result is consistent.
- ⭐️ Allows arguments such as `m, px, py, bg, flex, flexDirection, position` to be passed directly to Props according to the grammar of `styled-system`.
- 🎨 Users can define the design system by directly defining and delivering themes.
- ❤️ TypeScript can be fully used through the Type Generation process using CLI.
- 🚀 Logical or responsive values such as `safeAreaTop` and `sidePadding` can be injected into the theme and used as token values.
- 💬 Text Typography
- 🎉 Integrate Dark Theme easily.

## Why we need styled-system

Let me show this code.

```tsx
const Sample = () => {
  const theme = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors.red500,
      borderRadius: theme.radii.lg
    }}>
      <Text style={[theme.typography.h1, { marginTop: theme.spaces[4] }]}>
        React Native
      </Text>
    </View>
  );
};
```

This is quite verbose.

**With Styled System! 👇**

```tsx
const Sample = () => {
  return (
    <Box bg={'red500'} radius={'lg'}>
      <Txt t={'h1'} mt={4}>
        React Native
      </Txt>
    </Box>
  );
};
```

`styled-system` is useful for rapid UI development by providing a consistent approach to styling in React applications.

It offers a design system with predefined style props that streamline component styling, ensuring scalability, consistency, and responsive design.

But original `styled-system` is for CSS not in React Native.

We introduce **React Native Styled System** 🎉

&nbsp;

> [!NOTE]
> It does not fully support the grammar of `styled-system` and there are some grammars that are not currently supported, but this is not a technical limitation and will be added as needed.
> 
> Styles such as `justifySelf` that are not yet supported in React Native obviously cannot be added in the future.

## Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.

## Lincese

MIT
