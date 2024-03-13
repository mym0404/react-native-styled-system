import type { DimensionValue, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { is } from '@mj-studio/js-util';

import type { SxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import type { Token } from '../@types/Token';

import { fillViewStyleIfNotNullish } from './util/fillViewStyleIfNotNullish';
import { parsePxSuffixNumber } from './util/parsePxSuffixNumber';

export const propsToStyle = ({
  baseStyle,
  theme,
  props,
}: {
  baseStyle?: ViewStyle;
  theme?: ThemedDict;
  props?: SxProps;
}): ViewStyle => {
  const styleProp = StyleSheet.flatten(baseStyle) || {};
  const ret: ViewStyle = { ...styleProp };
  if (!theme) {
    return ret;
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
  fillViewStyleIfNotNullish(
    ret,
    'backgroundColor',
    styleProp.backgroundColor ?? parseColor(props.backgroundColor ?? props.bg),
  );

  fillViewStyleIfNotNullish(
    ret,
    'borderColor',
    styleProp.borderColor ?? parseColor(props.borderColor),
  );
  // endregion

  // region space
  fillViewStyleIfNotNullish(ret, 'margin', styleProp.margin ?? parseSpace(props.m));
  fillViewStyleIfNotNullish(
    ret,
    'marginTop',
    styleProp.marginTop ?? parseSpace(props.mt ?? props.my),
  );

  fillViewStyleIfNotNullish(
    ret,
    'marginRight',
    styleProp.marginRight ?? parseSpace(props.mr ?? props.mx),
  );

  fillViewStyleIfNotNullish(
    ret,
    'marginBottom',
    styleProp.marginBottom ?? parseSpace(props.mb ?? props.my),
  );

  fillViewStyleIfNotNullish(
    ret,
    'marginLeft',
    styleProp.marginLeft ?? parseSpace(props.ml ?? props.mx),
  );

  fillViewStyleIfNotNullish(ret, 'padding', styleProp.padding ?? parseSpace(props.p));
  fillViewStyleIfNotNullish(
    ret,
    'paddingTop',
    styleProp.paddingTop ?? parseSpace(props.pt ?? props.py),
  );

  fillViewStyleIfNotNullish(
    ret,
    'paddingRight',
    styleProp.paddingRight ?? parseSpace(props.pr ?? props.px),
  );

  fillViewStyleIfNotNullish(
    ret,
    'paddingBottom',
    styleProp.paddingBottom ?? parseSpace(props.pb ?? props.py),
  );

  fillViewStyleIfNotNullish(
    ret,
    'paddingLeft',
    styleProp.paddingLeft ?? parseSpace(props.pl ?? props.px),
  );

  fillViewStyleIfNotNullish(ret, 'top', styleProp.top ?? parseSpace(props.t));
  fillViewStyleIfNotNullish(ret, 'right', styleProp.right ?? parseSpace(props.r));
  fillViewStyleIfNotNullish(ret, 'bottom', styleProp.bottom ?? parseSpace(props.b));
  fillViewStyleIfNotNullish(ret, 'left', styleProp.left ?? parseSpace(props.l));

  // endregion

  // region sizes
  fillViewStyleIfNotNullish(ret, 'width', styleProp.width ?? parseSizes(props.width ?? props.w));
  fillViewStyleIfNotNullish(
    ret,
    'minWidth',
    styleProp.minWidth ?? parseSizes(props.minWidth ?? props.minW),
  );

  fillViewStyleIfNotNullish(
    ret,
    'maxWidth',
    styleProp.maxWidth ?? parseSizes(props.maxWidth ?? props.maxW),
  );

  fillViewStyleIfNotNullish(ret, 'height', styleProp.height ?? parseSizes(props.height ?? props.h));
  fillViewStyleIfNotNullish(
    ret,
    'minHeight',
    styleProp.minHeight ?? parseSizes(props.minHeight ?? props.minH),
  );

  fillViewStyleIfNotNullish(
    ret,
    'maxHeight',
    styleProp.maxHeight ?? parseSizes(props.maxHeight ?? props.maxH),
  );

  // fillViewStyleIfNotNullish(ret, 'gap', styleProp.gap ?? parseSpaceAsNumberOnly(props.gap));
  fillViewStyleIfNotNullish(
    ret,
    'columnGap',
    styleProp.columnGap ?? parseSpaceAsNumberOnly(props.gapX),
  );
  fillViewStyleIfNotNullish(ret, 'rowGap', styleProp.rowGap ?? parseSpaceAsNumberOnly(props.gapY));
  // endregion

  // region styles

  fillViewStyleIfNotNullish(ret, 'flex', styleProp.flex ?? props.flex);
  fillViewStyleIfNotNullish(ret, 'alignItems', styleProp.alignItems ?? props.alignItems);
  fillViewStyleIfNotNullish(ret, 'alignContent', styleProp.alignContent ?? props.alignContent);
  fillViewStyleIfNotNullish(
    ret,
    'justifyContent',
    styleProp.justifyContent ?? props.justifyContent,
  );
  fillViewStyleIfNotNullish(ret, 'flexWrap', styleProp.flexWrap ?? props.flexWrap);
  fillViewStyleIfNotNullish(ret, 'flexDirection', styleProp.flexDirection ?? props.flexDirection);
  fillViewStyleIfNotNullish(ret, 'flexGrow', styleProp.flexGrow ?? props.flexGrow);
  fillViewStyleIfNotNullish(ret, 'flexShrink', styleProp.flexShrink ?? props.flexShrink);
  fillViewStyleIfNotNullish(ret, 'flexBasis', styleProp.flexBasis ?? props.flexBasis);
  fillViewStyleIfNotNullish(ret, 'alignSelf', styleProp.alignSelf ?? props.alignSelf);
  fillViewStyleIfNotNullish(ret, 'position', styleProp.position ?? props.position ?? props.pos);
  fillViewStyleIfNotNullish(ret, 'borderWidth', styleProp.borderWidth ?? props.borderWidth);
  fillViewStyleIfNotNullish(
    ret,
    'borderRadius',
    styleProp.borderRadius ?? props.borderRadius ?? props.radius,
  );

  // endregion

  return ret;
};
