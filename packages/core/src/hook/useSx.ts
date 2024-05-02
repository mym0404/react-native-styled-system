import { useContext, useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { is } from '@mj-studio/js-util';

import type { SxPropsKeys, TextSxProps } from '../@types/SxProps';
import { _textStylePropList, _viewStylePropList } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { useStableCallback } from '../internal/useStableCallback';
import { mutateShortcutPropToOriginalKeys } from '../internal/util/mutateShortcutPropToOriginalKeys';
import { printWarning } from '../internal/util/printWarning';
import { getCachedStyle } from '../internal/util/StyleHash';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import type { ThemedStyleType } from '../util/propsToThemedStyle';
import { propsToThemedStyle } from '../util/propsToThemedStyle';

type Props = { style?: StyleProp<any> } & TextSxProps;

export type StyleTransform = (style: TextStyle) => TextSxProps;
export type StyleFallback = Omit<TextSxProps, 'sx'>;
export type UseSxOptions = {
  theme?: ThemedDict;
  styleType?: ThemedStyleType;
  transform?: StyleTransform;
  fallback?: StyleFallback;
  cache?: boolean;
};
const defaultUseSxOptions: UseSxOptions = { styleType: 'ViewStyle' };
export const useSx = <S extends ViewStyle = ViewStyle, P extends Props = Props>(
  props?: P | null,
  {
    theme: optionTheme,
    styleType = defaultUseSxOptions.styleType,
    transform = defaultUseSxOptions.transform,
    fallback,
    cache,
  }: UseSxOptions = defaultUseSxOptions,
) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const getStyle = useStableCallback((): StyleProp<S> | undefined => {
    const skip = !props && !fallback;
    const theme = optionTheme ?? styledSystemContext?.theme;

    if (skip) {
      if (is.function(transform)) {
        return propsToThemedStyle({ theme, sx: transform({}) }) as S;
      } else {
        return;
      }
    }

    if (!theme) {
      printWarning('theme not found from useSx, undefined will be returned.');

      return;
    }

    // caution: priority should be ordered correctly.
    const mergedSx: TextSxProps = {
      ...mutateShortcutPropToOriginalKeys(fallback),
      ...mutateShortcutPropToOriginalKeys(props),
      ...mutateShortcutPropToOriginalKeys(props?.sx),
    };

    const mergedSxStyle = propsToThemedStyle({
      theme,
      sx: mergedSx,
      styleType,
    });

    const composedStyle = !mergedSxStyle
      ? props?.style
      : props?.style
        ? [mergedSxStyle, props.style]
        : mergedSxStyle;

    if (is.function(transform)) {
      const transformedSx = transform(StyleSheet.flatten(composedStyle));

      const ret = [composedStyle, propsToThemedStyle({ theme, sx: transformedSx, styleType })];

      if (cache) {
        return getCachedStyle(ret);
      } else {
        return ret as StyleProp<S>;
      }
    } else {
      if (cache) {
        return getCachedStyle(composedStyle);
      } else {
        return composedStyle as StyleProp<S>;
      }
    }
  });

  const filteredProps: Omit<P, SxPropsKeys | 'style'> = useMemo(() => {
    const ret = { ...props } as Omit<P, SxPropsKeys | 'style'>;

    _viewStylePropList.forEach((keyName) => delete ret[keyName]);
    if (styleType === 'TextStyle') {
      _textStylePropList.forEach((keyName) => delete ret[keyName]);
    }

    return ret;
  }, [props, styleType]);

  return { getStyle, filteredProps };
};
