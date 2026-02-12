import { useContext } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

import type { TextSxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { printWarning } from '../internal/util/printWarning';
import { getCachedStyle } from '../internal/util/StyleHash';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import { propsToThemedStyle } from '../util/propsToThemedStyle';

export type UseSxStyleOptions = {
  theme?: ThemedDict;
  cache?: boolean;
  screenWidth?: number;
};
const defaultOptions: UseSxStyleOptions = {};

export const useSxStyle = ({
  theme: optionTheme,
  cache,
  screenWidth: optionScreenWidth,
}: UseSxStyleOptions = defaultOptions) => {
  const styledSystemContext = useContext(StyledSystemContext);

  return (sx: TextSxProps): StyleProp<TextStyle> => {
    const theme = optionTheme ?? styledSystemContext?.theme;
    const breakpoints = theme?.breakpoints ?? [];
    const screenWidth = optionScreenWidth ?? styledSystemContext?.screenWidth ?? 0;

    if (!theme) {
      printWarning('theme not found from useSxStyle, empty style will be returned.');

      return {};
    }

    if (cache) {
      return getCachedStyle(
        propsToThemedStyle({
          theme,
          sx,
          breakpoints,
          screenWidth,
        }),
      );
    } else {
      return propsToThemedStyle({
        theme,
        sx,
        breakpoints,
        screenWidth,
      });
    }
  };
};
