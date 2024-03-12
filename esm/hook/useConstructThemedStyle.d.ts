import type { StyleProp, ViewStyle } from 'react-native';
import type { StyledProps } from '../@types/StyledProps';
type Props = {
    style?: StyleProp<any>;
} & StyledProps;
export declare const useConstructThemedStyle: (props: Props) => {
    viewStyle: () => ViewStyle;
};
export {};
