import type { ViewStyle } from 'react-native';
import { is } from '@mj-studio/js-util';

export function fillViewStyleIfNotNullish<T extends keyof ViewStyle>(
  into: ViewStyle,
  key: T,
  value?: ViewStyle[T] | null,
) {
  if (is.undefined(value) || is.null(value)) {
    return;
  }

  into[key] = value;
}
