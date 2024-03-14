import type { DimensionValue } from 'react-native';

export interface ThemedTypings {
  space: DimensionValue | `${number}` | `${number}px` | `${any}px`;
  sizes: DimensionValue | `${number}` | `${number}px` | `${any}px`;
  colors: string;
}
