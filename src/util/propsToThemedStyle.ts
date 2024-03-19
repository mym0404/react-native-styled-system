/* eslint-disable padding-line-between-statements */
import type { TextStyle, ViewStyle } from 'react-native';

import type { SxProps, TextSxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { createTokenParsers } from '../internal/TokenParser/TokenParser';
import {
  fillTextStyleIfNotNullish,
  fillViewStyleIfNotNullish,
} from '../internal/util/fillStyleIfNotNullish';
import { printWarning } from '../internal/util/printWarning';

export type ThemedStyleType = 'ViewStyle' | 'TextStyle';
export type InferStyleType<T extends ThemedStyleType | undefined | null> = T extends 'TextStyle'
  ? TextStyle
  : ViewStyle;
export type InferSxPropsType<T extends ThemedStyleType | undefined | null> = T extends 'TextStyle'
  ? TextSxProps
  : SxProps;
export const propsToThemedStyle = ({
  theme,
  sx,
  styleType = 'ViewStyle',
}: {
  theme?: ThemedDict;
  sx?: TextSxProps;
  styleType?: ThemedStyleType;
}): InferStyleType<typeof styleType> | undefined => {
  const ret: InferStyleType<typeof styleType> = {};

  if (!theme) {
    printWarning('theme not found');
    return;
  }

  if (!sx) {
    return;
  }

  const { colors, radii, sizes, space, spaceAsNumberOnly } = createTokenParsers(theme);

  // region colors
  fillViewStyleIfNotNullish(ret, 'backgroundColor', colors(sx.backgroundColor ?? sx.bg));
  fillViewStyleIfNotNullish(ret, 'borderColor', colors(sx.borderColor));
  // endregion

  // region space
  fillViewStyleIfNotNullish(ret, 'margin', space(sx.margin ?? sx.m));
  fillViewStyleIfNotNullish(ret, 'marginTop', space(sx.marginTop ?? sx.mt));
  fillViewStyleIfNotNullish(ret, 'marginRight', space(sx.marginRight ?? sx.mr));
  fillViewStyleIfNotNullish(ret, 'marginBottom', space(sx.marginBottom ?? sx.mb));
  fillViewStyleIfNotNullish(ret, 'marginLeft', space(sx.marginLeft ?? sx.ml));
  fillViewStyleIfNotNullish(ret, 'marginVertical', space(sx.marginY ?? sx.my));
  fillViewStyleIfNotNullish(ret, 'marginHorizontal', space(sx.marginX ?? sx.mx));

  fillViewStyleIfNotNullish(ret, 'padding', space(sx.padding ?? sx.p));
  fillViewStyleIfNotNullish(ret, 'paddingTop', space(sx.paddingTop ?? sx.pt));
  fillViewStyleIfNotNullish(ret, 'paddingRight', space(sx.paddingRight ?? sx.pr));
  fillViewStyleIfNotNullish(ret, 'paddingBottom', space(sx.paddingBottom ?? sx.pb));
  fillViewStyleIfNotNullish(ret, 'paddingLeft', space(sx.paddingLeft ?? sx.pl));
  fillViewStyleIfNotNullish(ret, 'paddingVertical', space(sx.paddingY ?? sx.py));
  fillViewStyleIfNotNullish(ret, 'paddingHorizontal', space(sx.paddingX ?? sx.px));

  fillViewStyleIfNotNullish(ret, 'top', space(sx.top ?? (sx.absoluteFill ? 0 : undefined)));
  fillViewStyleIfNotNullish(ret, 'right', space(sx.right ?? (sx.absoluteFill ? 0 : undefined)));
  fillViewStyleIfNotNullish(ret, 'bottom', space(sx.bottom ?? (sx.absoluteFill ? 0 : undefined)));
  fillViewStyleIfNotNullish(ret, 'left', space(sx.left ?? (sx.absoluteFill ? 0 : undefined)));

  fillViewStyleIfNotNullish(ret, 'gap', spaceAsNumberOnly(sx.gap));
  fillViewStyleIfNotNullish(ret, 'columnGap', spaceAsNumberOnly(sx.gapX));
  fillViewStyleIfNotNullish(ret, 'rowGap', spaceAsNumberOnly(sx.gapY));
  // endregion

  // region sizes
  fillViewStyleIfNotNullish(ret, 'width', sizes(sx.width ?? sx.w));
  fillViewStyleIfNotNullish(ret, 'minWidth', sizes(sx.minWidth ?? sx.minW));
  fillViewStyleIfNotNullish(ret, 'maxWidth', sizes(sx.maxWidth ?? sx.maxW));

  fillViewStyleIfNotNullish(ret, 'height', sizes(sx.height ?? sx.h));
  fillViewStyleIfNotNullish(ret, 'minHeight', sizes(sx.minHeight ?? sx.minH));
  fillViewStyleIfNotNullish(ret, 'maxHeight', sizes(sx.maxHeight ?? sx.maxH));
  // endregion

  // region radii
  fillViewStyleIfNotNullish(ret, 'borderRadius', radii(sx.borderRadius ?? sx.radius));
  fillViewStyleIfNotNullish(
    ret,
    'borderTopLeftRadius',
    radii(sx.borderTopLeftRadius ?? sx.topLeftRadius),
  );
  fillViewStyleIfNotNullish(
    ret,
    'borderTopRightRadius',
    radii(sx.borderTopRightRadius ?? sx.topRightRadius),
  );
  fillViewStyleIfNotNullish(
    ret,
    'borderBottomLeftRadius',
    radii(sx.borderBottomLeftRadius ?? sx.bottomLeftRadius),
  );
  fillViewStyleIfNotNullish(
    ret,
    'borderBottomRightRadius',
    radii(sx.borderBottomRightRadius ?? sx.bottomRightRadius),
  );
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
  fillViewStyleIfNotNullish(ret, 'borderTopWidth', sx.borderTopWidth);
  fillViewStyleIfNotNullish(ret, 'borderRightWidth', sx.borderRightWidth);
  fillViewStyleIfNotNullish(ret, 'borderBottomWidth', sx.borderBottomWidth);
  fillViewStyleIfNotNullish(ret, 'borderLeftWidth', sx.borderLeftWidth);

  fillViewStyleIfNotNullish(ret, 'opacity', sx.opacity);
  fillViewStyleIfNotNullish(ret, 'overflow', sx.overflow);
  fillViewStyleIfNotNullish(ret, 'transform', sx.transform);
  fillViewStyleIfNotNullish(ret, 'aspectRatio', sx.aspectRatio);
  fillViewStyleIfNotNullish(ret, 'display', sx.display);
  fillViewStyleIfNotNullish(ret, 'elevation', sx.elevation);
  fillViewStyleIfNotNullish(ret, 'zIndex', sx.zIndex);
  // endregion

  if (styleType === 'TextStyle') {
    // region colors
    fillTextStyleIfNotNullish(ret, 'color', colors(sx.color));
    fillTextStyleIfNotNullish(ret, 'textDecorationColor', colors(sx.textDecorationColor));
    fillTextStyleIfNotNullish(ret, 'textShadowColor', colors(sx.textShadowColor));
    // endregion

    // region styles
    fillTextStyleIfNotNullish(ret, 'fontFamily', colors(sx.fontFamily));
    fillTextStyleIfNotNullish(ret, 'fontSize', sx.fontSize);
    fillTextStyleIfNotNullish(ret, 'fontStyle', sx.fontStyle);
    fillTextStyleIfNotNullish(ret, 'fontWeight', sx.fontWeight ?? sx.weight);
    fillTextStyleIfNotNullish(ret, 'letterSpacing', sx.letterSpacing);
    fillTextStyleIfNotNullish(ret, 'lineHeight', sx.lineHeight);
    fillTextStyleIfNotNullish(ret, 'textAlign', sx.textAlign ?? sx.align);
    fillTextStyleIfNotNullish(ret, 'textDecorationLine', sx.textDecorationLine);
    fillTextStyleIfNotNullish(ret, 'textDecorationStyle', sx.textDecorationStyle);
    fillTextStyleIfNotNullish(ret, 'textShadowOffset', sx.textShadowOffset);
    fillTextStyleIfNotNullish(ret, 'textShadowRadius', sx.textShadowRadius);
    fillTextStyleIfNotNullish(ret, 'textTransform', sx.textTransform);
    fillTextStyleIfNotNullish(ret, 'userSelect', sx.userSelect);
    // android
    fillTextStyleIfNotNullish(ret, 'includeFontPadding', sx.includeFontPadding);
    /* todo */
    // ios
    /* todo */
    // endregion
  }

  return ret;
};
