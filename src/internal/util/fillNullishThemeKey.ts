import type { ThemedDict } from '../../@types/ThemedDict';

export const fillNullishThemeKey = (theme: Partial<ThemedDict>): ThemedDict => {
  return {
    colors: {},
    space: {},
    sizes: {},
    radii: {},
    ...theme,
  };
};
