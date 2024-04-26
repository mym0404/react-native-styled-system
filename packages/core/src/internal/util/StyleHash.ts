import { type StyleProp, type TextStyle } from 'react-native';
import hash from 'object-hash';

const _CACHE: Record<string, any> = {};

export function getCachedStyle(style?: StyleProp<TextStyle>) {
  if (!style) {
    return style;
  }

  const key = hash(style);
  if (key in _CACHE) {
    return _CACHE[key];
  } else {
    _CACHE[key] = style;

    return style;
  }
}
