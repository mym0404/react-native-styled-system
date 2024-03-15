import type { ColorsValue, RadiiValue, SizesValue, SpaceValue } from './Token';

export interface ThemedTypings {
  space: SpaceValue | `${number}` | `${number}px` | `${any}px`;
  sizes: SizesValue | `${number}` | `${number}px` | `${any}px`;
  colors: ColorsValue;
  radii: RadiiValue | `${number}` | `${number}px` | `${any}px`;
}
