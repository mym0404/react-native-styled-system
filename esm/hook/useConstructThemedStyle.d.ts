import type { StyleProp, ViewStyle } from 'react-native';
import type { ThemedViewProps } from '../@types/ThemedProps';
type Props = {
    style?: StyleProp<any>;
} & ThemedViewProps;
export declare const useConstructThemedStyle: (props: Props) => {
    viewStyle: () => ViewStyle;
};
export {};
