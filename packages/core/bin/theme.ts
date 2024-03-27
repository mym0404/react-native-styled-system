import type { ThemedDict } from '../src';

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
  12: 12 * unit, // 48px
  14: 14 * unit, // 56px
  16: 16 * unit, // 64px
  18: 18 * unit, // 72px
  20: 20 * unit, // 80px
  24: 24 * unit, // 96px
  28: 28 * unit, // 112px
  30: 30 * unit, // 120px
  32: 32 * unit, // 128px
  40: 40 * unit, // 160px
  48: 48 * unit, // 192px
};

export default {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: '#FFFFFF00',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#8D94A0',
    gray500: '#7A828D',
    gray600: '#6F7680',
    gray700: '#575C64',
    gray800: '#43484E',
    gray900: '#33373B',
    violet50: '#F3EFFD',
    violet100: '#E8E1FB',
    violet200: '#D9CDF9',
    violet300: '#C6B5F6',
    violet400: '#9C7EEF',
    violet500: '#835EEB',
    violet600: '#7756D6',
    violet700: '#5D43A7',
    violet800: '#483481',
    violet900: '#372763',
    green50: '#E9FAF6',
    green100: '#BAEFE2',
    green200: '#98E8D4',
    green300: '#69DDC0',
    green400: '#4CD6B4',
    green500: '#1FCCA1',
    green600: '#169172',
    yellow50: '#FFF9E6',
    yellow100: '#FFECB2',
    yellow200: '#FFE28D',
    yellow300: '#FFD559',
    yellow400: '#FFCD39',
    yellow500: '#FFC107',
    yellow600: '#E8B006',
    red50: '#FEE9EB',
    red100: '#FBBCC0',
    red200: '#F99CA2',
    red300: '#F66E78',
    red400: '#F5525D',
    red500: '#F22735',
    red600: '#DC2330',
    blue50: '#edf2fd',
    blue100: '#c6d8fa',
    blue200: '#abc5f7',
    blue300: '#84aaf4',
    blue400: '#6d99f1',
    blue500: '#4880ee',
    blue600: '#4274d9',
    blue700: '#335ba9',
    blue800: '#284683',
    blue900: '#1e3664',
  },
  space,
  sizes: { ...space },
  radii: {
    1: 4,
    2: 8,
    sm: 48,
    md: 12,
  },
  typography: {
    h1: {
      fontFamily: 'Noto Sans',
      fontSize: 20,
    },
  },
} satisfies ThemedDict;
