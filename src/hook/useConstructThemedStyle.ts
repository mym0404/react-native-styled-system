import { useContext } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import type { ThemedViewProps } from '../@types/ThemedProps';
import type { Token } from '../@types/Token';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

type Props = { style?: StyleProp<any> } & ThemedViewProps;

export const useConstructThemedStyle = (props: Props) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const styleProp: ViewStyle = !props.style ? {} : StyleSheet.flatten(props.style);

  const parseColor = (token: Token<'colors'>): string | undefined => {
    if (!token || !styledSystemContext) {
      return;
    }

    return styledSystemContext.theme.colors[token];
  };

  const viewStyle = useStableCallback((): ViewStyle => {
    const backgroundColor =
      styleProp.backgroundColor ?? parseColor(props.backgroundColor ?? props.bg);

    return {
      backgroundColor,
    };
  });

  return { viewStyle };
};
