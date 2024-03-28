import { is } from '@mj-studio/js-util';
import invariant from 'invariant';

import type { ThemedDict } from '../../@types/ThemedDict';
import type { Token, TypographyValue } from '../../@types/Token';

export const createTypographyParser = (theme: ThemedDict) => {
  return (token?: Token<'typography'>) => parseTypography(theme, token);
};

const parseTypography = (
  theme: ThemedDict,
  token?: Token<'typography'>,
): TypographyValue | undefined => {
  if (is.nullOrUndefined(token)) {
    return;
  }

  invariant(is.string(token), 'typography token should be a string');

  if (is.string(token) && token in theme.typography) {
    return theme.typography[token];
  }

  return;
};
