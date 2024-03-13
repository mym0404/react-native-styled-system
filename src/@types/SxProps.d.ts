import type { ViewStyle } from 'react-native';
import type { Token } from './Token';
export type SxPropKeys = keyof SxProps;
/**
 * Always modify if you change API
 */
export declare const allPropNameList: ("sx" | "flex" | "alignItems" | "alignContent" | "justifyContent" | "flexWrap" | "flexDirection" | "flexGrow" | "flexShrink" | "flexBasis" | "alignSelf" | "position" | "pos" | "borderWidth" | "borderRadius" | "radius" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "t" | "r" | "b" | "l" | "gapX" | "gapY" | "width" | "w" | "minWidth" | "minW" | "maxWidth" | "maxW" | "height" | "h" | "minHeight" | "minH" | "maxHeight" | "maxH" | "backgroundColor" | "bg" | "borderColor" | "style")[];
export type ThemedColorTokenProps = {
    backgroundColor: Token<'colors'>;
    bg: Token<'colors'>;
    borderColor: Token<'colors'>;
};
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
    gapX: Token<'space'>;
    gapY: Token<'space'>;
};
type ThemedSizeTokenProps = {
    width: Token<'sizes'>;
    w: Token<'sizes'>;
    minWidth: Token<'sizes'>;
    minW: Token<'sizes'>;
    maxWidth: Token<'sizes'>;
    maxW: Token<'sizes'>;
    height: Token<'sizes'>;
    h: Token<'sizes'>;
    minHeight: Token<'sizes'>;
    minH: Token<'sizes'>;
    maxHeight: Token<'sizes'>;
    maxH: Token<'sizes'>;
};
export type SxProps = Partial<{
    sx?: Omit<SxProps, 'sx'>;
} & {
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
    pos: ViewStyle['position'];
    borderWidth: ViewStyle['borderWidth'];
    borderRadius: ViewStyle['borderRadius'];
    radius: ViewStyle['borderRadius'];
} & ThemedSpaceTokenProps & ThemedSizeTokenProps & ThemedColorTokenProps>;
export {};
