import { useContext } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import type { SxProps } from '../@types/SxProps';
import { propsToStyle } from '../internal/propsToStyle';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

type Props = { style?: StyleProp<any> } & SxProps;

export const useSx = (props: Props) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const styleProp: ViewStyle = !props.style ? undefined : StyleSheet.flatten(props.style);

  const viewStyle = useStableCallback((sx?: SxProps): ViewStyle => {
    return propsToStyle({
      theme: styledSystemContext?.theme,
      props: sx ? { ...props, ...sx } : props,
      baseStyle: styleProp,
    });
  });

  return { viewStyle };
};
