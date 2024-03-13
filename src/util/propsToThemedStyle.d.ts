import type { StyleProp, ViewStyle } from 'react-native';
import type { SxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
export declare const propsToThemedStyle: ({ baseStyle, theme, sx, }: {
    baseStyle?: ViewStyle;
    theme?: ThemedDict;
    sx?: SxProps;
}) => StyleProp<ViewStyle> | undefined;
