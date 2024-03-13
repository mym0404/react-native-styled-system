import type { StyleProp, ViewStyle } from 'react-native';
import type { SxProps } from '../@types/SxProps';
type Props<T> = T & {
    style?: StyleProp<any>;
} & SxProps;
export declare const useSx: <T>(props: Props<T>) => {
    viewStyle: (sx?: SxProps) => StyleProp<ViewStyle> | undefined;
    filteredProps: T;
};
export {};
