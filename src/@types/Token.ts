import type { ThemedTypings } from './ThemedTypings';

export type Token<ThemeKey extends keyof ThemedTypings> = ThemeKey extends keyof ThemedTypings
  ? ThemedTypings[ThemeKey]
  : never;

export type SpaceValue = number | 'auto' | `${number}%` | null;
export type SizesValue = number | 'auto' | `${number}%` | null;
export type ColorsValue = string;
export type RadiiValue = number;
