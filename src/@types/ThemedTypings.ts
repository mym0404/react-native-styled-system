import type { DimensionValue } from 'react-native';

export interface ThemedTypings {
  space: DimensionValue | `${number}` | `${number}px`;
  sizes: DimensionValue | `${number}` | `${number}px`;
  colors: string;
}
