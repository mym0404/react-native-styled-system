/* eslint-disable padding-line-between-statements */
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { is } from '@mj-studio/js-util';

import type { SxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import type { Token } from '../@types/Token';
import { fillViewStyleIfNotNullish } from '../internal/util/fillViewStyleIfNotNullish';
import { parsePxSuffixNumber } from '../internal/util/parsePxSuffixNumber';

export const propsToThemedStyle = ({
  baseStyle,
  theme,
  sx,
}: {
  baseStyle?: StyleProp<ViewStyle>;
  theme?: ThemedDict;
  sx?: SxProps;
}): StyleProp<ViewStyle> | undefined => {
  const ret: ViewStyle = {};
  if (!theme || !sx) {
    return baseStyle;
  }

  const parseColor = (token?: Token<'colors'>): string | undefined => {
    if (!token) {
      return;
    }

    return theme.colors[token];
  };

  /**
   * Space should be handle negative string like '-1' as well
   */
  const parseSpace = (token?: Token<'space'>): DimensionValue | undefined => {
    if (is.nullOrUndefined(token)) {
      return;
    }

    const px = parsePxSuffixNumber(token);
    if (is.number(px)) {
      return px;
    }

    const spaces = theme.space;

    if ((is.string(token) || is.number(token)) && token in spaces) {
      return spaces[token] as DimensionValue;
    }

    // Parse is number
    if (is.number(token)) {
      const stringKey = `${token}`;
      if (stringKey in spaces) {
        return spaces[stringKey] as DimensionValue;
      }

      const negativeNumberKey = -token;
      if (negativeNumberKey in spaces) {
        const value = spaces[negativeNumberKey];
        if (is.number(value)) {
          return -value;
        }
      }

      const negativeStringKey =
        stringKey.charAt(0) === '-' ? stringKey.substring(1) : `-${stringKey}`;

      if (negativeStringKey in spaces) {
        const value = spaces[negativeStringKey];
        if (is.number(value)) {
          return -value;
        }
      }
    }

    // Parse prefix minus token string
    if (is.string(token) && token.startsWith('-')) {
      const originalToken = token.substring(1);
      if (originalToken in spaces) {
        const value = spaces[originalToken];
        if (is.number(value)) {
          return -value;
        }
        // not invert sign percent string yet(will be supported).
      }

      // don't return malformed string. It is not acceptable as DimensionValue
      return;
    }

    if (is.numberString(token)) {
      return Number(token);
    }

    return token;
  };

  /**
   * handle like gap (number only prop)
   */
  const parseSpaceAsNumberOnly = (token?: Token<'space'>): number | undefined => {
    const ret = parseSpace(token);
    if (is.number(ret)) {
      return ret;
    }
  };

  /**
   * Space should be handle negative string like '-1' as well
   */
  const parseSizes = (token?: Token<'sizes'>): DimensionValue | undefined => {
    if (is.nullOrUndefined(token)) {
      return;
    }

    const px = parsePxSuffixNumber(token);
    if (is.number(px)) {
      return px;
    }

    const sizes = theme.sizes;

    if ((is.string(token) || is.number(token)) && token in sizes) {
      return sizes[token] as DimensionValue;
    }

    if (is.number(token)) {
      const stringKey = `${token}`;
      if (stringKey in sizes) {
        return sizes[stringKey] as DimensionValue;
      }
    }

    if (is.numberString(token)) {
      return Number(token);
    }

    return token;
  };

  // region colors
  fillViewStyleIfNotNullish(ret, 'backgroundColor', parseColor(sx.backgroundColor ?? sx.bg));
  fillViewStyleIfNotNullish(ret, 'borderColor', parseColor(sx.borderColor));
  // endregion

  // region space
  fillViewStyleIfNotNullish(ret, 'margin', parseSpace(sx.margin ?? sx.m));
  fillViewStyleIfNotNullish(ret, 'marginTop', parseSpace(sx.marginTop ?? sx.mt));
  fillViewStyleIfNotNullish(ret, 'marginRight', parseSpace(sx.marginRight ?? sx.mr));
  fillViewStyleIfNotNullish(ret, 'marginBottom', parseSpace(sx.marginBottom ?? sx.mb));
  fillViewStyleIfNotNullish(ret, 'marginLeft', parseSpace(sx.marginLeft ?? sx.ml));
  fillViewStyleIfNotNullish(ret, 'marginVertical', parseSpace(sx.marginY ?? sx.my));
  fillViewStyleIfNotNullish(ret, 'marginHorizontal', parseSpace(sx.marginX ?? sx.mx));

  fillViewStyleIfNotNullish(ret, 'padding', parseSpace(sx.padding ?? sx.p));
  fillViewStyleIfNotNullish(ret, 'paddingTop', parseSpace(sx.paddingTop ?? sx.pt));
  fillViewStyleIfNotNullish(ret, 'paddingRight', parseSpace(sx.paddingRight ?? sx.pr));
  fillViewStyleIfNotNullish(ret, 'paddingBottom', parseSpace(sx.paddingBottom ?? sx.pb));
  fillViewStyleIfNotNullish(ret, 'paddingLeft', parseSpace(sx.paddingLeft ?? sx.pl));
  fillViewStyleIfNotNullish(ret, 'paddingVertical', parseSpace(sx.paddingY ?? sx.py));
  fillViewStyleIfNotNullish(ret, 'paddingHorizontal', parseSpace(sx.paddingX ?? sx.px));

  fillViewStyleIfNotNullish(
    ret,
    'top',
    parseSpace(sx.top ?? sx.t ?? (sx.absoluteFill ? 0 : undefined)),
  );
  fillViewStyleIfNotNullish(
    ret,
    'right',
    parseSpace(sx.right ?? sx.r ?? (sx.absoluteFill ? 0 : undefined)),
  );
  fillViewStyleIfNotNullish(
    ret,
    'bottom',
    parseSpace(sx.bottom ?? sx.b ?? (sx.absoluteFill ? 0 : undefined)),
  );
  fillViewStyleIfNotNullish(
    ret,
    'left',
    parseSpace(sx.left ?? sx.l ?? (sx.absoluteFill ? 0 : undefined)),
  );

  // endregion

  // region sizes
  fillViewStyleIfNotNullish(ret, 'width', parseSizes(sx.width ?? sx.w));
  fillViewStyleIfNotNullish(ret, 'minWidth', parseSizes(sx.minWidth ?? sx.minW));
  fillViewStyleIfNotNullish(ret, 'maxWidth', parseSizes(sx.maxWidth ?? sx.maxW));

  fillViewStyleIfNotNullish(ret, 'height', parseSizes(sx.height ?? sx.h));
  fillViewStyleIfNotNullish(ret, 'minHeight', parseSizes(sx.minHeight ?? sx.minH));
  fillViewStyleIfNotNullish(ret, 'maxHeight', parseSizes(sx.maxHeight ?? sx.maxH));

  fillViewStyleIfNotNullish(ret, 'gap', parseSpaceAsNumberOnly(sx.gap));
  fillViewStyleIfNotNullish(ret, 'columnGap', parseSpaceAsNumberOnly(sx.gapX));
  fillViewStyleIfNotNullish(ret, 'rowGap', parseSpaceAsNumberOnly(sx.gapY));
  // endregion

  // region styles
  fillViewStyleIfNotNullish(ret, 'flex', sx.flex);
  fillViewStyleIfNotNullish(ret, 'alignItems', sx.alignItems ?? (sx.center ? 'center' : undefined));
  fillViewStyleIfNotNullish(ret, 'alignContent', sx.alignContent);
  fillViewStyleIfNotNullish(
    ret,
    'justifyContent',
    sx.justifyContent ?? (sx.center ? 'center' : undefined),
  );
  fillViewStyleIfNotNullish(ret, 'flexWrap', sx.flexWrap);
  fillViewStyleIfNotNullish(ret, 'flexDirection', sx.flexDirection);
  fillViewStyleIfNotNullish(ret, 'flexGrow', sx.flexGrow);
  fillViewStyleIfNotNullish(ret, 'flexShrink', sx.flexShrink);
  fillViewStyleIfNotNullish(ret, 'flexBasis', sx.flexBasis);
  fillViewStyleIfNotNullish(ret, 'alignSelf', sx.alignSelf);
  fillViewStyleIfNotNullish(
    ret,
    'position',
    sx.position ?? sx.pos ?? (sx.absoluteFill ? 'absolute' : undefined),
  );
  fillViewStyleIfNotNullish(ret, 'borderWidth', sx.borderWidth);
  fillViewStyleIfNotNullish(ret, 'borderRadius', sx.borderRadius ?? sx.radius);
  fillViewStyleIfNotNullish(ret, 'opacity', sx.opacity);
  fillViewStyleIfNotNullish(ret, 'overflow', sx.overflow);
  fillViewStyleIfNotNullish(ret, 'transform', sx.transform);
  fillViewStyleIfNotNullish(ret, 'aspectRatio', sx.aspectRatio);
  fillViewStyleIfNotNullish(ret, 'display', sx.display);
  fillViewStyleIfNotNullish(ret, 'elevation', sx.elevation);
  fillViewStyleIfNotNullish(ret, 'zIndex', sx.zIndex);
  // endregion

  return StyleSheet.compose(baseStyle, ret);
};
