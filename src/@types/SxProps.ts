import type { ViewStyle } from 'react-native';

import type { Token } from './Token';

export type SxPropKeys = keyof SxProps;
/**
 * Always modify if you change API
 */
export const _allPropList = [
  'style',
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
  't',
  'right',
  'r',
  'bottom',
  'b',
  'left',
  'l',
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
  'sx',
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
  'borderRadius',
  'radius',
  'opacity',
  'overflow',
  'transform',
  'aspectRatio',
  'display',
  'elevation',
  'zIndex',
] satisfies (SxPropKeys | 'style')[];

type ThemedColorTokenProps = {
  backgroundColor: Token<'colors'>;
  bg: Token<'colors'>; // backgroundColor
  borderColor: Token<'colors'>;
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
  t: Token<'space'>; // top
  right: Token<'space'>;
  r: Token<'space'>; // right
  bottom: Token<'space'>;
  b: Token<'space'>; // bottom
  left: Token<'space'>;
  l: Token<'space'>; // left
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

type BaseSxProps = Partial<
  {
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
    borderRadius: ViewStyle['borderRadius'];
    radius: ViewStyle['borderRadius']; // borderRadius
    opacity: ViewStyle['opacity'];
    overflow: ViewStyle['overflow'];
    transform: ViewStyle['transform'];
    aspectRatio: ViewStyle['aspectRatio'];
    display: ViewStyle['display'];
    elevation: ViewStyle['elevation'];
    zIndex: ViewStyle['zIndex'];
    absoluteFill?: boolean; // shortcut - position: absoulte, t,r,b,l: 0
    center?: boolean; // shortcut - justifyContent, alignItems: center
  } & ThemedSpaceTokenProps &
    ThemedSizeTokenProps &
    ThemedColorTokenProps
>;

export type SxProps = BaseSxProps & { sx?: BaseSxProps };
