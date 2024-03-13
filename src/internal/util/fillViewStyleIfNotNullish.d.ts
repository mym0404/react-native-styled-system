import type { ViewStyle } from 'react-native';
export declare function fillViewStyleIfNotNullish<T extends keyof ViewStyle>(into: ViewStyle, key: T, value?: ViewStyle[T] | null): void;
