import { useContext } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { is } from '@mj-studio/js-util';

import type { StyledProps } from '../@types/StyledProps';
import type { Token } from '../@types/Token';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

type Props = { style?: StyleProp<any> } & StyledProps;

function fillViewStyleIfNeeded<T extends keyof ViewStyle>(
  into: ViewStyle,
  key: T,
  value?: ViewStyle[T] | null,
) {
  if (is.undefined(value) || is.null(value)) {
    return;
  }

  into[key] = value;
}

function parsePixelSuffixNumber(value: any): number | undefined {
  if (is.string(value) && value.endsWith('px')) {
    const sub = value.substring(0, value.length - 2);
    if (is.numberString(sub)) {
      return Number(sub);
    }
  }
}

export const useConstructThemedStyle = (props: Props) => {
  const styledSystemContext = useContext(StyledSystemContext);

  const styleProp: ViewStyle = !props.style ? {} : StyleSheet.flatten(props.style);

  const parseColor = (token?: Token<'colors'>): string | undefined => {
    if (!token || !styledSystemContext) {
      return;
    }

    return styledSystemContext.theme.colors[token];
  };

  /**
   * Space should be handle negative string like '-1' as well
   */
  const parseSpace = (token?: Token<'space'>): DimensionValue | undefined => {
    if (!styledSystemContext || is.nullOrUndefined(token)) {
      return;
    }

    const px = parsePixelSuffixNumber(token);
    if (is.number(px)) {
      return px;
    }

    const spaces = styledSystemContext.theme.space;

    if ((is.string(token) || is.number(token)) && token in spaces) {
      return spaces[token] as DimensionValue;
    }

    // Parse is number
    if (is.number(token)) {
      const stringKey = `${token}`;
      if (stringKey in spaces) {
        return spaces[stringKey] as DimensionValue;
      }

      const negativeStringKey =
        stringKey.charAt(0) === '-' ? stringKey.substring(1) : `-${stringKey}`;

      if (negativeStringKey in spaces) {
        return spaces[negativeStringKey] as DimensionValue;
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
    if (!styledSystemContext || is.nullOrUndefined(token)) {
      return;
    }

    const px = parsePixelSuffixNumber(token);
    if (is.number(px)) {
      return px;
    }

    const sizes = styledSystemContext.theme.sizes;

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

  const viewStyle = useStableCallback((): ViewStyle => {
    const ret: ViewStyle = styleProp;

    // region colors
    fillViewStyleIfNeeded(
      ret,
      'backgroundColor',
      styleProp.backgroundColor ?? parseColor(props.backgroundColor ?? props.bg),
    );

    fillViewStyleIfNeeded(
      ret,
      'borderColor',
      styleProp.borderColor ?? parseColor(props.borderColor),
    );
    // endregion

    // region space
    fillViewStyleIfNeeded(ret, 'margin', styleProp.margin ?? parseSpace(props.m));
    fillViewStyleIfNeeded(
      ret,
      'marginTop',
      styleProp.marginTop ?? parseSpace(props.mt ?? props.my),
    );

    fillViewStyleIfNeeded(
      ret,
      'marginRight',
      styleProp.marginRight ?? parseSpace(props.mr ?? props.mx),
    );

    fillViewStyleIfNeeded(
      ret,
      'marginBottom',
      styleProp.marginBottom ?? parseSpace(props.mb ?? props.my),
    );

    fillViewStyleIfNeeded(
      ret,
      'marginLeft',
      styleProp.marginLeft ?? parseSpace(props.ml ?? props.mx),
    );

    fillViewStyleIfNeeded(ret, 'padding', styleProp.padding ?? parseSpace(props.p));
    fillViewStyleIfNeeded(
      ret,
      'paddingTop',
      styleProp.paddingTop ?? parseSpace(props.pt ?? props.py),
    );

    fillViewStyleIfNeeded(
      ret,
      'paddingRight',
      styleProp.paddingRight ?? parseSpace(props.pr ?? props.px),
    );

    fillViewStyleIfNeeded(
      ret,
      'paddingBottom',
      styleProp.paddingBottom ?? parseSpace(props.pb ?? props.py),
    );

    fillViewStyleIfNeeded(
      ret,
      'paddingLeft',
      styleProp.paddingLeft ?? parseSpace(props.pl ?? props.px),
    );

    fillViewStyleIfNeeded(ret, 'top', styleProp.top ?? parseSpace(props.t));
    fillViewStyleIfNeeded(ret, 'right', styleProp.right ?? parseSpace(props.r));
    fillViewStyleIfNeeded(ret, 'bottom', styleProp.bottom ?? parseSpace(props.b));
    fillViewStyleIfNeeded(ret, 'left', styleProp.left ?? parseSpace(props.l));

    // endregion

    // region sizes
    fillViewStyleIfNeeded(ret, 'width', styleProp.width ?? parseSizes(props.width ?? props.w));
    fillViewStyleIfNeeded(
      ret,
      'minWidth',
      styleProp.minWidth ?? parseSizes(props.minWidth ?? props.minW),
    );

    fillViewStyleIfNeeded(
      ret,
      'maxWidth',
      styleProp.maxWidth ?? parseSizes(props.maxWidth ?? props.maxW),
    );

    fillViewStyleIfNeeded(ret, 'height', styleProp.height ?? parseSizes(props.height ?? props.h));
    fillViewStyleIfNeeded(
      ret,
      'minHeight',
      styleProp.minHeight ?? parseSizes(props.minHeight ?? props.minH),
    );

    fillViewStyleIfNeeded(
      ret,
      'maxHeight',
      styleProp.maxHeight ?? parseSizes(props.maxHeight ?? props.maxH),
    );

    // fillViewStyleIfNeeded(ret, 'gap', styleProp.gap ?? parseSpaceAsNumberOnly(props.gap));
    fillViewStyleIfNeeded(
      ret,
      'columnGap',
      styleProp.columnGap ?? parseSpaceAsNumberOnly(props.gapX),
    );
    fillViewStyleIfNeeded(ret, 'rowGap', styleProp.rowGap ?? parseSpaceAsNumberOnly(props.gapY));
    // endregion

    // region styles

    fillViewStyleIfNeeded(ret, 'flex', styleProp.flex ?? props.flex);
    fillViewStyleIfNeeded(ret, 'alignItems', styleProp.alignItems ?? props.alignItems);
    fillViewStyleIfNeeded(ret, 'alignContent', styleProp.alignContent ?? props.alignContent);
    fillViewStyleIfNeeded(ret, 'justifyContent', styleProp.justifyContent ?? props.justifyContent);
    fillViewStyleIfNeeded(ret, 'flexWrap', styleProp.flexWrap ?? props.flexWrap);
    fillViewStyleIfNeeded(ret, 'flexDirection', styleProp.flexDirection ?? props.flexDirection);
    fillViewStyleIfNeeded(ret, 'flexGrow', styleProp.flexGrow ?? props.flexGrow);
    fillViewStyleIfNeeded(ret, 'flexShrink', styleProp.flexShrink ?? props.flexShrink);
    fillViewStyleIfNeeded(ret, 'flexBasis', styleProp.flexBasis ?? props.flexBasis);
    fillViewStyleIfNeeded(ret, 'alignSelf', styleProp.alignSelf ?? props.alignSelf);
    fillViewStyleIfNeeded(ret, 'position', styleProp.position ?? props.position ?? props.pos);
    fillViewStyleIfNeeded(ret, 'borderWidth', styleProp.borderWidth ?? props.borderWidth);
    fillViewStyleIfNeeded(
      ret,
      'borderRadius',
      styleProp.borderRadius ?? props.borderRadius ?? props.radius,
    );

    // endregion

    return ret;
  });

  return { viewStyle };
};
