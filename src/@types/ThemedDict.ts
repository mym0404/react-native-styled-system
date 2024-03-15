import type { ColorsValue, RadiiValue, SizesValue, SpaceValue } from './Token';

export interface ThemedDict {
  space: Record<string | number, SpaceValue>;
  sizes: Record<string | number, SizesValue>;
  colors: Record<string | number, ColorsValue>;
  radii: Record<string | number, RadiiValue>;
}
export const emptyThemedDict = {
  space: {},
  colors: {},
  sizes: {},
  radii: {},
} satisfies ThemedDict;
