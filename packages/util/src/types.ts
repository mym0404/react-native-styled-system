import type { TextStyle } from 'react-native';

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

export type Theme = {
  space: Record<string | number, SpaceValue>;
  sizes: Record<string | number, SizesValue>;
  colors: Record<string | number, ColorsValue>;
  radii: Record<string | number, RadiiValue>;
  typography: Record<string | number, TypographyValue>;
  breakpoints?: number[];
};
