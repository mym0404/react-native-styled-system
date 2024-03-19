import type { TextStyle, ViewStyle } from 'react-native';

import type { Token } from './Token';

export type SxPropsKeys = keyof SxProps;
export type TextSxPropsKey = keyof TextSxProps;
/**
 * Always modify if you change API
 */
export const _viewStylePropList = [
  'style',
  'sx',
  'backgroundColor',
  'bg',
  'borderColor',
  'margin',
  'm',
  'marginTop',
  'mt',
  'marginRight',
  'mr',
  'marginBottom',
  'mb',
  'marginLeft',
  'ml',
  'marginX',
  'mx',
  'marginY',
  'my',
  'padding',
  'p',
  'paddingTop',
  'pt',
  'paddingRight',
  'pr',
  'paddingBottom',
  'pb',
  'paddingLeft',
  'pl',
  'paddingX',
  'px',
  'paddingY',
  'py',
  'top',
  'right',
  'bottom',
  'left',
  'gap',
  'gapX',
  'gapY',
  'width',
  'w',
  'minW',
  'minWidth',
  'maxW',
  'maxWidth',
  'height',
  'h',
  'minH',
  'minHeight',
  'maxH',
  'maxHeight',
  'flex',
  'alignItems',
  'alignContent',
  'justifyContent',
  'flexWrap',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
  'position',
  'pos',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRadius',
  'radius',
  'opacity',
  'overflow',
  'transform',
  'aspectRatio',
  'display',
  'elevation',
  'zIndex',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] satisfies (SxPropsKeys | 'style')[];
export const _textStylePropList = [
  'color',
  'textDecorationColor',
  'textShadowColor',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'weight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'align',
  'textDecorationLine',
  'textDecorationStyle',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'userSelect',
  'includeFontPadding',
  'typography',
  't',
] satisfies (Omit<TextSxPropsKey, keyof TextSxPropsKey> | 'style')[];
type ThemedColorTokenProps = {
  backgroundColor: Token<'colors'>;
  bg: Token<'colors'>; // backgroundColor
  borderColor: Token<'colors'>;
};
type ThemedColorTokenTextProps = {
  color: Token<'colors'>;
  textDecorationColor: Token<'colors'>;
  textShadowColor: Token<'colors'>;
};

type ThemedSpaceTokenProps = {
  margin: Token<'space'>;
  m: Token<'space'>; // margin
  marginTop: Token<'space'>;
  mt: Token<'space'>; // marginTop
  marginRight: Token<'space'>;
  mr: Token<'space'>; // marginRight
  marginBottom: Token<'space'>;
  mb: Token<'space'>; // marginBottom
  marginLeft: Token<'space'>;
  ml: Token<'space'>; // marginLeft
  marginX: Token<'space'>;
  mx: Token<'space'>; // marginX
  marginY: Token<'space'>;
  my: Token<'space'>; // marginY
  padding: Token<'space'>;
  p: Token<'space'>; // padding
  paddingTop: Token<'space'>;
  pt: Token<'space'>; // paddingTop
  paddingRight: Token<'space'>;
  pr: Token<'space'>; // paddingRight
  paddingBottom: Token<'space'>;
  pb: Token<'space'>; // paddingBottom
  paddingLeft: Token<'space'>;
  pl: Token<'space'>; // paddingLeft
  paddingX: Token<'space'>;
  px: Token<'space'>; // paddingX
  paddingY: Token<'space'>;
  py: Token<'space'>; // paddingY
  top: Token<'space'>;
  right: Token<'space'>;
  bottom: Token<'space'>;
  left: Token<'space'>;
  gap: Token<'space'>; // only works if parsed result is number
  gapX: Token<'space'>; // only works if parsed result is number
  gapY: Token<'space'>; // only works if parsed result is number
};

type ThemedSizeTokenProps = {
  width: Token<'sizes'>;
  w: Token<'sizes'>; // width
  minWidth: Token<'sizes'>;
  minW: Token<'sizes'>; // minWidth
  maxWidth: Token<'sizes'>;
  maxW: Token<'sizes'>; // maxWidth
  height: Token<'sizes'>;
  h: Token<'sizes'>; // height
  minHeight: Token<'sizes'>;
  minH: Token<'sizes'>; // minHeight
  maxHeight: Token<'sizes'>;
  maxH: Token<'sizes'>; // maxHeight
};

type ThemedRadiiTokenProps = {
  borderRadius: Token<'radii'>;
  radius: Token<'radii'>; // borderRadius
  borderTopLeftRadius: Token<'radii'>;
  topLeftRadius: Token<'radii'>; // borderTopLeftRadius
  borderTopRightRadius: Token<'radii'>;
  topRightRadius: Token<'radii'>; // borderTopRightRadius
  borderBottomLeftRadius: Token<'radii'>;
  bottomLeftRadius: Token<'radii'>; // borderBottomLeftRadius
  borderBottomRightRadius: Token<'radii'>;
  bottomRightRadius: Token<'radii'>; // borderBottomRightRadius
};

type ThemedViewStyleProps = {
  flex: ViewStyle['flex'];
  alignItems: ViewStyle['alignItems'];
  alignContent: ViewStyle['alignContent'];
  justifyContent: ViewStyle['justifyContent'];
  flexWrap: ViewStyle['flexWrap'];
  flexDirection: ViewStyle['flexDirection'];
  flexGrow: ViewStyle['flexGrow'];
  flexShrink: ViewStyle['flexShrink'];
  flexBasis: ViewStyle['flexBasis'];
  alignSelf: ViewStyle['alignSelf'];
  position: ViewStyle['position'];
  pos: ViewStyle['position']; // position
  borderWidth: ViewStyle['borderWidth'];
  borderTopWidth: ViewStyle['borderTopWidth'];
  borderRightWidth: ViewStyle['borderRightWidth'];
  borderBottomWidth: ViewStyle['borderBottomWidth'];
  borderLeftWidth: ViewStyle['borderLeftWidth'];
  opacity: ViewStyle['opacity'];
  overflow: ViewStyle['overflow'];
  transform: ViewStyle['transform'];
  aspectRatio: ViewStyle['aspectRatio'];
  display: ViewStyle['display'];
  elevation: ViewStyle['elevation'];
  zIndex: ViewStyle['zIndex'];
  absoluteFill?: boolean; // shortcut - position: absoulte, t,r,b,l: 0
  center?: boolean; // shortcut - justifyContent, alignItems: center
};

type ThemedTextStyleProps = {
  fontFamily: TextStyle['fontFamily'];
  fontSize: TextStyle['fontSize'];
  fontStyle: TextStyle['fontStyle'];
  fontWeight: TextStyle['fontWeight'];
  weight: TextStyle['fontWeight']; // fontWeight
  letterSpacing: TextStyle['letterSpacing'];
  lineHeight: TextStyle['lineHeight'];
  textAlign: TextStyle['textAlign'];
  align: TextStyle['textAlign']; // textAlign
  textDecorationLine: TextStyle['textDecorationLine'];
  textDecorationStyle: TextStyle['textDecorationStyle'];
  textShadowOffset: TextStyle['textShadowOffset'];
  textShadowRadius: TextStyle['textShadowRadius'];
  textTransform: TextStyle['textTransform'];
  userSelect: TextStyle['userSelect'];
  includeFontPadding: TextStyle['includeFontPadding'];
  typography: Token<'typography'>;
  t: Token<'typography'>; // typography
};

type BaseSxProps = Partial<
  ThemedViewStyleProps &
    ThemedSpaceTokenProps &
    ThemedSizeTokenProps &
    ThemedColorTokenProps &
    ThemedRadiiTokenProps
>;

export type SxProps = BaseSxProps & { sx?: BaseSxProps };
export type TextSxProps = SxProps & Partial<ThemedColorTokenTextProps & ThemedTextStyleProps>;
