import type { TextStyle, ViewStyle } from 'react-native';
import { is } from '@mj-studio/js-util';

export function fillViewStyleIfNotNullish<K extends keyof ViewStyle>(
  into: ViewStyle,
  key: K,
  value?: ViewStyle[K] | null,
) {
  if (is.undefined(value) || is.null(value)) {
    return;
  }

  into[key] = value;
}

export function fillTextStyleIfNotNullish<K extends Exclude<keyof TextStyle, keyof ViewStyle>>(
  into: TextStyle,
  key: K,
  value?: TextStyle[K] | null,
) {
  if (is.undefined(value) || is.null(value)) {
    return;
  }

  into[key] = value;
}
