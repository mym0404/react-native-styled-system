import type { ColorsValue, RadiiValue, SizesValue, SpaceValue, TypographyValue } from './Token';

export interface ThemedDict {
  space: Record<string | number, SpaceValue>;
  sizes: Record<string | number, SizesValue>;
  colors: Record<string | number, ColorsValue>;
  radii: Record<string | number, RadiiValue>;
  typography: Record<string | number, TypographyValue>;
  breakpoints?: number[];
}

export const emptyThemedDict = {
  space: {},
  colors: {},
  sizes: {},
  radii: {},
  typography: {},
  breakpoints: [],
} satisfies ThemedDict;
