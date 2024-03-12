import type { ViewStyle } from 'react-native';

import type { Token } from './Token';

type ThemedSpaceTokenProps = {
  m: Token<'space'>;
  mt: Token<'space'>;
  mr: Token<'space'>;
  mb: Token<'space'>;
  ml: Token<'space'>;
  mx: Token<'space'>;
  my: Token<'space'>;
  p: Token<'space'>;
  pt: Token<'space'>;
  pr: Token<'space'>;
  pb: Token<'space'>;
  pl: Token<'space'>;
  px: Token<'space'>;
  py: Token<'space'>;
  t: Token<'space'>;
  r: Token<'space'>;
  b: Token<'space'>;
  l: Token<'space'>;
};

type ThemedSpaceSizeProps = {
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

export type ThemedColorTokenProps = {
  backgroundColor: Token<'colors'>;
  bg: Token<'colors'>; // backgroundColor
  borderColor: Token<'colors'>;
};

export type ThemedViewProps = Partial<
  {
    flex: ViewStyle['flex'];
    alignItems: ViewStyle['alignItems'];
    alignContent: ViewStyle['alignContent'];
    justifyItems: ViewStyle['justifyContent'];
    flexWrap: ViewStyle['flexWrap'];
    flexDirection: ViewStyle['flexDirection'];
    flexGrow: ViewStyle['flexGrow'];
    flexShrink: ViewStyle['flexShrink'];
    flexBasis: ViewStyle['flexBasis'];
    alignSelf: ViewStyle['alignSelf'];
    position: ViewStyle['position'];
    pos: ViewStyle['position']; // position
  } & ThemedSpaceTokenProps &
    ThemedSpaceSizeProps &
    ThemedColorTokenProps
>;
