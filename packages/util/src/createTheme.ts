import type { Theme } from './types';

type CreateThemeType = {
  (config?: Partial<Theme>): Theme;
  (base: Theme, overrides: Partial<Theme>): Theme;
};

export const createTheme: CreateThemeType = (
  baseOrConfig: Partial<Theme> = {},
  overrides?: Partial<Theme>,
) => {
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
};
