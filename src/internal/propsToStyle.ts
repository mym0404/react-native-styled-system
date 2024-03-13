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
  sx,
}: {
  baseStyle?: ViewStyle;
  theme?: ThemedDict;
  sx?: SxProps;
}): ViewStyle => {
  const styleProp: ViewStyle = StyleSheet.flatten(baseStyle) || {};
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
    styleProp.backgroundColor ?? parseColor(sx.backgroundColor ?? sx.bg),
  );

  fillViewStyleIfNotNullish(
    ret,
    'borderColor',
    styleProp.borderColor ?? parseColor(sx.borderColor),
  );
  // endregion

  // region space
  fillViewStyleIfNotNullish(ret, 'margin', styleProp.margin ?? parseSpace(sx.m));
  fillViewStyleIfNotNullish(ret, 'marginTop', styleProp.marginTop ?? parseSpace(sx.mt ?? sx.my));

  fillViewStyleIfNotNullish(
    ret,
    'marginRight',
    styleProp.marginRight ?? parseSpace(sx.mr ?? sx.mx),
  );

  fillViewStyleIfNotNullish(
    ret,
    'marginBottom',
    styleProp.marginBottom ?? parseSpace(sx.mb ?? sx.my),
  );

  fillViewStyleIfNotNullish(ret, 'marginLeft', styleProp.marginLeft ?? parseSpace(sx.ml ?? sx.mx));

  fillViewStyleIfNotNullish(ret, 'padding', styleProp.padding ?? parseSpace(sx.p));
  fillViewStyleIfNotNullish(ret, 'paddingTop', styleProp.paddingTop ?? parseSpace(sx.pt ?? sx.py));

  fillViewStyleIfNotNullish(
    ret,
    'paddingRight',
    styleProp.paddingRight ?? parseSpace(sx.pr ?? sx.px),
  );

  fillViewStyleIfNotNullish(
    ret,
    'paddingBottom',
    styleProp.paddingBottom ?? parseSpace(sx.pb ?? sx.py),
  );

  fillViewStyleIfNotNullish(
    ret,
    'paddingLeft',
    styleProp.paddingLeft ?? parseSpace(sx.pl ?? sx.px),
  );

  fillViewStyleIfNotNullish(ret, 'top', styleProp.top ?? parseSpace(sx.t));
  fillViewStyleIfNotNullish(ret, 'right', styleProp.right ?? parseSpace(sx.r));
  fillViewStyleIfNotNullish(ret, 'bottom', styleProp.bottom ?? parseSpace(sx.b));
  fillViewStyleIfNotNullish(ret, 'left', styleProp.left ?? parseSpace(sx.l));

  // endregion

  // region sizes
  fillViewStyleIfNotNullish(ret, 'width', styleProp.width ?? parseSizes(sx.width ?? sx.w));
  fillViewStyleIfNotNullish(
    ret,
    'minWidth',
    styleProp.minWidth ?? parseSizes(sx.minWidth ?? sx.minW),
  );

  fillViewStyleIfNotNullish(
    ret,
    'maxWidth',
    styleProp.maxWidth ?? parseSizes(sx.maxWidth ?? sx.maxW),
  );

  fillViewStyleIfNotNullish(ret, 'height', styleProp.height ?? parseSizes(sx.height ?? sx.h));
  fillViewStyleIfNotNullish(
    ret,
    'minHeight',
    styleProp.minHeight ?? parseSizes(sx.minHeight ?? sx.minH),
  );

  fillViewStyleIfNotNullish(
    ret,
    'maxHeight',
    styleProp.maxHeight ?? parseSizes(sx.maxHeight ?? sx.maxH),
  );

  // fillViewStyleIfNotNullish(ret, 'gap', styleProp.gap ?? parseSpaceAsNumberOnly(props.gap));
  fillViewStyleIfNotNullish(
    ret,
    'columnGap',
    styleProp.columnGap ?? parseSpaceAsNumberOnly(sx.gapX),
  );
  fillViewStyleIfNotNullish(ret, 'rowGap', styleProp.rowGap ?? parseSpaceAsNumberOnly(sx.gapY));
  // endregion

  // region styles

  fillViewStyleIfNotNullish(ret, 'flex', styleProp.flex ?? sx.flex);
  fillViewStyleIfNotNullish(ret, 'alignItems', styleProp.alignItems ?? sx.alignItems);
  fillViewStyleIfNotNullish(ret, 'alignContent', styleProp.alignContent ?? sx.alignContent);
  fillViewStyleIfNotNullish(ret, 'justifyContent', styleProp.justifyContent ?? sx.justifyContent);
  fillViewStyleIfNotNullish(ret, 'flexWrap', styleProp.flexWrap ?? sx.flexWrap);
  fillViewStyleIfNotNullish(ret, 'flexDirection', styleProp.flexDirection ?? sx.flexDirection);
  fillViewStyleIfNotNullish(ret, 'flexGrow', styleProp.flexGrow ?? sx.flexGrow);
  fillViewStyleIfNotNullish(ret, 'flexShrink', styleProp.flexShrink ?? sx.flexShrink);
  fillViewStyleIfNotNullish(ret, 'flexBasis', styleProp.flexBasis ?? sx.flexBasis);
  fillViewStyleIfNotNullish(ret, 'alignSelf', styleProp.alignSelf ?? sx.alignSelf);
  fillViewStyleIfNotNullish(ret, 'position', styleProp.position ?? sx.position ?? sx.pos);
  fillViewStyleIfNotNullish(ret, 'borderWidth', styleProp.borderWidth ?? sx.borderWidth);
  fillViewStyleIfNotNullish(
    ret,
    'borderRadius',
    styleProp.borderRadius ?? sx.borderRadius ?? sx.radius,
  );

  // endregion

  return ret;
};
