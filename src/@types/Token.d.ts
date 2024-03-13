import type { ThemedTypings } from './ThemedTypings';
export type Token<ThemeKey extends keyof ThemedTypings> = ThemeKey extends keyof ThemedTypings ? ThemedTypings[ThemeKey] : never;
