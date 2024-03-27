import { is } from '@mj-studio/js-util';

import type { ThemedDict } from '../../@types/ThemedDict';
import type { SpaceValue, Token } from '../../@types/Token';
import { parsePxSuffixNumber } from '../util/parsePxSuffixNumber';

export const createSpaceParser = (theme: ThemedDict) => {
  return (token?: Token<'space'>) => parseSpace(theme, token);
};

export const createSpaceAsNumberOnlyParser = (theme: ThemedDict) => {
  return (token?: Token<'space'>) => parseSpaceAsNumberOnly(theme, token);
};

/**
 * Space should be handle negative string like '-1' as well
 */
const parseSpace = (theme: ThemedDict, token?: Token<'space'>): SpaceValue | undefined => {
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

  const spaces = theme.space;

  if ((is.string(token) || is.number(token)) && token in spaces) {
    return spaces[token];
  }

  // Parse is number
  if (is.number(token)) {
    const stringKey = `${token}`;
    if (stringKey in spaces) {
      return spaces[stringKey];
    }

    const negativeNumberKey = -token;
    if (negativeNumberKey in spaces) {
      const value = spaces[negativeNumberKey];
      if (is.number(value)) {
        return -value;
      }
    }

    const negativeStringKey =
      stringKey.charAt(0) === '-' ? stringKey.substring(1) : `-${stringKey}`;

    if (negativeStringKey in spaces) {
      const value = spaces[negativeStringKey];
      if (is.number(value)) {
        return -value;
      }
    }
  }

  // Parse prefix minus token string
  if (is.string(token) && token.startsWith('-')) {
    const originalToken = token.substring(1);
    if (originalToken in spaces) {
      const value = spaces[originalToken];
      if (is.number(value)) {
        return -value;
      }
      // not invert sign percent string yet(will be supported).
    }

    // don't return malformed string. It is not acceptable as SpaceValue
    return;
  }

  if (is.numberString(token)) {
    return Number(token);
  }

  return token;
};

/**
 * Parse space and filter if it is number for number only prop like gap
 */
const parseSpaceAsNumberOnly = (theme: ThemedDict, token?: Token<'space'>): number | undefined => {
  const ret = parseSpace(theme, token);
  if (is.number(ret)) {
    return ret;
  }
};
