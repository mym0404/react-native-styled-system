import type { ThemedDict } from '../@types/ThemedDict';

export const createTheme = (options: Partial<ThemedDict> = {}): ThemedDict => {
  return {
    colors: {
      ...options?.colors,
    },
    sizes: {
      ...options?.sizes,
    },
    space: {
      ...options?.space,
    },
  };
};
