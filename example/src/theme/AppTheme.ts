import { createTheme, defaultTheme } from '@react-native-styled-system/core';

const theme = createTheme(defaultTheme, {
  space: {
    sfTop: 0,
    sfRight: 0,
    sfBottom: 0,
    sfLeft: 0,
  },
  breakpoints: [500, 1366],
});

export default theme;
