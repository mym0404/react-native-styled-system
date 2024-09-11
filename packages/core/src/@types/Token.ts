import type { TextStyle } from 'react-native';

import type { ThemedTypings } from './ThemedTypings';

export type Token<ThemeKey extends keyof ThemedTypings> = ThemeKey extends keyof ThemedTypings
  ? ThemedTypings[ThemeKey]
  : never;

/**
 * Types passed to React Native style prop.
 */
export type SpaceValue = number | 'auto' | `${number}%` | null;
export type SizesValue = number | 'auto' | `${number}%` | null;
export type ColorsValue = string;
export type RadiiValue = number;
export type TypographyValue = {
  fontFamily?: TextStyle['fontFamily'];
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: TextStyle['lineHeight'];
  letterSpacing?: TextStyle['letterSpacing'];
  textAlign?: TextStyle['textAlign'];
  fontStyle?: TextStyle['fontStyle'];
};
