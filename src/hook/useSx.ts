import { useContext, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { SxProps } from '../@types/SxProps';
import { _allPropList } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import { propsToThemedStyle } from '../util/propsToThemedStyle';

type Props = { style?: StyleProp<any> } & SxProps;

export type UseSxOptions = {
  theme?: ThemedDict;
};
export const useSx = <P extends Props>(
  props?: P | null,
  { theme: optionTheme }: UseSxOptions = {},
) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const viewStyle = useStableCallback((sx?: SxProps): StyleProp<ViewStyle> | undefined => {
    const skip = !props && !sx;

    if (skip) {
      return;
    }

    const mergedSx: SxProps = { ...sx, ...props, ...props?.sx };

    return propsToThemedStyle({
      theme: optionTheme ?? styledSystemContext?.theme,
      sx: mergedSx,
      baseStyle: props?.style,
    });
  });

  const filteredProps: Omit<P, keyof SxProps | 'style'> = useMemo(() => {
    const ret = { ...props };
    _allPropList.forEach((keyName) => delete ret[keyName]);

    return ret as Omit<P, keyof SxProps | 'style'>;
  }, [props]);

  return { viewStyle, filteredProps };
};
