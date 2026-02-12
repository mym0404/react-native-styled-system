import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';

export const emptyTheme = emptyThemedDict;

export const baseTheme: ThemedDict = {
  colors: {
    red: 'red',
    blue: 'blue',
    green: 'green',
  },
  sizes: {
    1: 4,
    2: 8,
    pagePadding: 20,
    full: '100%',
  },
  space: { 1: 4, 2: 8, pagePadding: 20, full: '100%' },
  radii: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  typography: {
    title: {
      fontFamily: 'Noto Sans',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
    },
    body: {
      fontFamily: 'Noto Sans',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
    },
  },
};

export const responsiveTheme: ThemedDict = {
  ...baseTheme,
  breakpoints: [480, 768, 1024],
};
