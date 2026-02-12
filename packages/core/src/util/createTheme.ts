import type { ThemedDict } from '../@types/ThemedDict';

export function createTheme(config?: Partial<ThemedDict>): ThemedDict;
export function createTheme(base: ThemedDict, overrides: Partial<ThemedDict>): ThemedDict;
export function createTheme(
  baseOrConfig: Partial<ThemedDict> = {},
  overrides?: Partial<ThemedDict>,
): ThemedDict {
  if (overrides !== undefined) {
    return {
      colors: { ...baseOrConfig.colors, ...overrides.colors },
      space: { ...baseOrConfig.space, ...overrides.space },
      sizes: { ...baseOrConfig.sizes, ...overrides.sizes },
      radii: { ...baseOrConfig.radii, ...overrides.radii },
      typography: { ...baseOrConfig.typography, ...overrides.typography },
      breakpoints: overrides.breakpoints ?? baseOrConfig.breakpoints ?? [],
    };
  }

  return {
    colors: {},
    space: {},
    sizes: {},
    radii: {},
    typography: {},
    breakpoints: [],
    ...baseOrConfig,
  };
}
