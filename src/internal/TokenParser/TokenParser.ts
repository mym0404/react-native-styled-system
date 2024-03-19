import type { ThemedDict } from '../../@types/ThemedDict';

import { createColorsParser } from './ColorsParser';
import { createRadiiParser } from './RadiiParser';
import { createSizesParser } from './SizesParser';
import { createSpaceAsNumberOnlyParser, createSpaceParser } from './SpaceParser';
import { createTypographyParser } from './TypographyParser';

export const createTokenParsers = (theme: ThemedDict) => {
  return {
    colors: createColorsParser(theme),
    space: createSpaceParser(theme),
    spaceAsNumberOnly: createSpaceAsNumberOnlyParser(theme),
    sizes: createSizesParser(theme),
    radii: createRadiiParser(theme),
    typography: createTypographyParser(theme),
  };
};
