import { useContext, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import type { SxProps } from '../@types/SxProps';
import { allPropNameList } from '../@types/SxProps';
import { propsToStyle } from '../internal/propsToStyle';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

type Props<T> = T & { style?: StyleProp<any> } & SxProps;

export const useSx = <T>(props: Props<T>) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const styleProp: ViewStyle = !props.style ? undefined : StyleSheet.flatten(props.style);

  const viewStyle = useStableCallback((sx?: SxProps): ViewStyle => {
    const mergedSx: SxProps = { ...sx, ...props, ...props.sx };

    return propsToStyle({
      theme: styledSystemContext?.theme,
      sx: mergedSx,
      baseStyle: styleProp,
    });
  });

  const filteredProps: T = useMemo(() => {
    const ret = { ...props };
    allPropNameList.forEach((keyName) => delete ret[keyName]);

    return ret;
  }, [props]);

  return { viewStyle, filteredProps };
};
