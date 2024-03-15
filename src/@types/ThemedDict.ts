import type { DimensionValue } from 'react-native';

export interface ThemedDict {
  space: Record<string | number, DimensionValue>;
  sizes: Record<string | number, DimensionValue>;
  colors: Record<string, string>;
  radii: Record<string | number, number>;
}
export const emptyThemedDict = {
  space: {},
  colors: {},
  sizes: {},
  radii: {},
} satisfies ThemedDict;
