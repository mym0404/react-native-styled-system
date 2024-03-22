import { useContext } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type { TextSxProps, ThemedDict } from 'react-native-themed-styled-system';
import { propsToThemedStyle, StyledSystemContext } from 'react-native-themed-styled-system';

import { printWarning } from '../internal/util/printWarning';

export type UseSxStyleOptions = {
  theme?: ThemedDict;
};
const defaultOptions: UseSxStyleOptions = {};

export const useSxStyle = ({ theme: optionTheme }: UseSxStyleOptions = defaultOptions) => {
  const styledSystemContext = useContext(StyledSystemContext);

  return (sx: TextSxProps): StyleProp<TextStyle> => {
    const theme = optionTheme ?? styledSystemContext?.theme;

    if (!theme) {
      printWarning('theme not found from useSxStyle, empty style will be returned.');

      return {};
    }

    return propsToThemedStyle({
      theme,
      sx,
    });
  };
};
