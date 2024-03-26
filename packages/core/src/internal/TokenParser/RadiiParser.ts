import { is } from '@mj-studio/js-util';

import type { ThemedDict } from '../../@types/ThemedDict';
import type { RadiiValue, Token } from '../../@types/Token';
import { parsePxSuffixNumber } from '../util/parsePxSuffixNumber';

export const createRadiiParser = (theme: ThemedDict) => {
  return (token?: Token<'radii'>) => parseRadii(theme, token);
};

const parseRadii = (theme: ThemedDict, token?: Token<'radii'>): RadiiValue | undefined => {
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

  const radii = theme.radii;

  if ((is.string(token) || is.number(token)) && token in radii) {
    return radii[token] as number;
  }

  if (is.number(token)) {
    const stringKey = `${token}`;
    if (stringKey in radii) {
      return radii[stringKey] as number;
    }
  }

  if (is.numberString(token)) {
    return Number(token);
  }

  return token;
};
