import type { TextStyle, ViewStyle } from 'react-native';

export type AnyStyle = Omit<ViewStyle & TextStyle, 'userSelect'>;
