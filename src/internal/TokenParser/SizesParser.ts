import { is } from '@mj-studio/js-util';

import type { ThemedDict } from '../../@types/ThemedDict';
import type { SizesValue, Token } from '../../@types/Token';
import { parsePxSuffixNumber } from '../util/parsePxSuffixNumber';

export const createSizesParser = (theme: ThemedDict) => {
  return (token?: Token<'sizes'>) => parseSizes(theme, token);
};

const parseSizes = (theme: ThemedDict, token?: Token<'sizes'>): SizesValue | undefined => {
  if (is.nullOrUndefined(token)) {
    return;
  }

  const px = parsePxSuffixNumber(token);
  if (is.number(px)) {
    return px;
  }

  // end with px but not number parsed
  if (is.string(token) && token.endsWith('px')) {
    return;
  }

  const sizes = theme.sizes;

  if ((is.string(token) || is.number(token)) && token in sizes) {
    return sizes[token];
  }

  if (is.number(token)) {
    const stringKey = `${token}`;
    if (stringKey in sizes) {
      return sizes[stringKey];
    }
  }

  if (is.numberString(token)) {
    return Number(token);
  }

  return token;
};
