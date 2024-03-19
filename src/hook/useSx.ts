import { useContext, useMemo } from 'react';
import type { StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';

import type { SxProps, SxPropsKeys } from '../@types/SxProps';
import { _textStylePropList, _viewStylePropList } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import type { InferStyleType, InferSxPropsType, ThemedStyleType } from '../util/propsToThemedStyle';
import { propsToThemedStyle } from '../util/propsToThemedStyle';

type Props = { style?: StyleProp<any> } & SxProps;

export type UseSxOptions = {
  theme?: ThemedDict;
  styleType?: ThemedStyleType;
};
const defaultUseSxOptions: UseSxOptions = { styleType: 'ViewStyle' };
export const useSx = <P extends Props>(
  props?: P | null,
  {
    theme: optionTheme,
    styleType = defaultUseSxOptions.styleType,
  }: UseSxOptions = defaultUseSxOptions,
) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const getStyle = useStableCallback(
    (
      sx?: Omit<InferSxPropsType<typeof styleType>, 'sx'>,
    ): StyleProp<InferStyleType<typeof styleType>> | undefined => {
      const skip = !props && !sx;

      if (skip) {
        return;
      }

      const mergedSx: SxProps = { ...sx, ...props, ...props?.sx };

      const ret = propsToThemedStyle({
        theme: optionTheme ?? styledSystemContext?.theme,
        sx: mergedSx,
        styleType,
      });

      if (!ret) {
        return props?.style;
      } else if (props?.style) {
        return StyleSheet.compose(ret, props.style);
      } else {
        return ret;
      }
    },
  );

  const filteredProps: Omit<P, SxPropsKeys | 'style'> = useMemo(() => {
    const ret = { ...props };

    _viewStylePropList.forEach((keyName) => delete ret[keyName]);
    if (styleType === 'TextStyle') {
      _textStylePropList.forEach((keyName) => delete ret[keyName]);
    }

    return ret as Omit<P, keyof SxProps | 'style'>;
  }, [props, styleType]);

  return { getStyle, filteredProps };
};
