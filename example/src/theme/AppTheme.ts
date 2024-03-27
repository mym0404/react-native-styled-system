import type { ThemedDict } from '@react-native-styled-system/core';

const unit = 4;
const space = {
  0: 0 * unit, // 0px
  px: 1, // 1px
  0.5: 0.5 * unit, // 2px
  1: 1 * unit, // 4px
  2: 2 * unit, // 8px
  3: 3 * unit, // 12px
  4: 4 * unit, // 16px
  5: 5 * unit, // 20px
  6: 6 * unit, // 24px
  7: 7 * unit, // 28px
  8: 8 * unit, // 32px
  9: 9 * unit, // 36px
  10: 10 * unit, // 40px
  11: 11 * unit, // 44px
  12: 12 * unit, // 48px
  13: 13 * unit, // 52px
  14: 14 * unit, // 56px
  15: 15 * unit, // 60px
  16: 16 * unit, // 64px
  17: 17 * unit, // 68px
  18: 18 * unit, // 72px
  19: 19 * unit, // 76px
  20: 20 * unit, // 80px
  24: 24 * unit, // 96px
  28: 28 * unit, // 112px
  30: 30 * unit, // 120px
  32: 32 * unit, // 128px
  40: 40 * unit, // 160px
  48: 48 * unit, // 192px
};

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: '#FFFFFF00',
  gray50: '#ECEDF0',
  gray100: '#E3E5E8',
  gray200: '#D6D8DC',
  gray300: '#C5C8CE',
  gray400: '#93979B',
  gray500: '#7A7E85',
  gray600: '#6E7278',
  gray700: '#5A5D63',
  gray800: '#484A4F',
  gray900: '#37393D',
  violet50: '#EFEAFC',
  violet100: '#E0DBF8',
  violet200: '#D3CCF7',
  violet300: '#BDB0F3',
  violet400: '#A689EB',
  violet500: '#9067E8',
  violet600: '#8460CD',
  violet700: '#6346A0',
  violet800: '#4C4575',
  violet900: '#3B3559',
  green50: '#DDF9ED',
  green100: '#BEF0DD',
  green200: '#96E7CD',
  green300: '#6FDDB3',
  green400: '#4AD5A4',
  green500: '#28CD8E',
  green600: '#1A9874',
  yellow50: '#FFF6DC',
  yellow100: '#FFECA0',
  yellow200: '#FFE26C',
  yellow300: '#FFD535',
  yellow400: '#FFCE15',
  yellow500: '#FFC00A',
  yellow600: '#D8AE06',
  red50: '#FED8DA',
  red100: '#FAAFB8',
  red200: '#F99B97',
  red300: '#F66A6C',
  red400: '#F5494D',
  red500: '#F22324',
  red600: '#DB202D',
  blue50: '#E0EDFB',
  blue100: '#C0D4F6',
  blue200: '#A7C0F3',
  blue300: '#89ACF1',
  blue400: '#6F95EC',
  blue500: '#497CEE',
  blue600: '#426ED2',
  blue700: '#354EA1',
  blue800: '#2B4270',
  blue900: '#21354F',
};

type ThemeColors = {
  bg: string;
  text: string;
  subText: string;
  primary: string;
  onPrimary: string;
};

export const lightColors = {
  bg: palette.white,
  text: palette.gray900,
  subText: palette.gray700,
  primary: palette.blue500,
  onPrimary: palette.white,
} satisfies ThemeColors;

export const darkColors = {
  bg: palette.black,
  text: palette.gray50,
  subText: palette.gray400,
  primary: palette.violet800,
  onPrimary: palette.white,
} satisfies ThemeColors;

const theme: Partial<ThemedDict> = {
  colors: {
    ...palette,
    ...lightColors,
  },
  radii: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
    },
    body: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
  sizes: {
    ...space,
  },
  space: {
    ...space,
    sfTop: 0,
    sfRight: 0,
    sfBottom: 0,
    sfLeft: 0,
  },
};

export default theme;
