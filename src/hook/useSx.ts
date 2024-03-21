import { useContext, useMemo } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { is } from '@mj-studio/js-util';

import type { SxProps, SxPropsKeys, TextSxProps } from '../@types/SxProps';
import { _textStylePropList, _viewStylePropList } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { useStableCallback } from '../internal/useStableCallback';
import { printWarning } from '../internal/util/printWarning';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import type { InferStyleType, InferSxPropsType, ThemedStyleType } from '../util/propsToThemedStyle';
import { propsToThemedStyle } from '../util/propsToThemedStyle';

type Props = { style?: StyleProp<any> } & TextSxProps;

export type StyleTransform = (style: TextStyle) => TextSxProps;
export type UseSxOptions = {
  theme?: ThemedDict;
  styleType?: ThemedStyleType;
  transform?: StyleTransform;
};
const defaultUseSxOptions: UseSxOptions = { styleType: 'ViewStyle' };
export const useSx = <P extends Props>(
  props?: P | null,
  {
    theme: optionTheme,
    styleType = defaultUseSxOptions.styleType,
    transform = defaultUseSxOptions.transform,
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

      const theme = optionTheme ?? styledSystemContext?.theme;

      if (!theme) {
        printWarning('theme not found from useSx, undefined will be returned.');

        return;
      }

      // todo handle default style
      // causion: priority should be ordered correctly.
      const mergedSx: SxProps = { ...sx, ...props, ...props?.sx };

      const computedStyle = propsToThemedStyle({
        theme,
        sx: mergedSx,
        styleType,
      });

      const composedStyle = !computedStyle
        ? props?.style
        : props?.style
          ? StyleSheet.compose(computedStyle, props.style)
          : computedStyle;

      if (is.function(transform)) {
        const transformedSx = transform(computedStyle ?? {});

        return StyleSheet.compose(
          composedStyle,
          propsToThemedStyle({ theme, sx: transformedSx, styleType }),
        );
      } else {
        return composedStyle;
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
