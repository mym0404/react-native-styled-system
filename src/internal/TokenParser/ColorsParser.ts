import type { ThemedDict } from '../../@types/ThemedDict';
import type { Token } from '../../@types/Token';

export const createColorsParser = (theme: ThemedDict) => {
  return (token?: Token<'colors'>) => parseColors(theme, token);
};

const parseColors = (theme: ThemedDict, token?: Token<'colors'>): string | undefined => {
  if (!token) {
    return;
  }

  if (token in theme.colors) {
    return theme.colors[token];
  } else {
    return token;
  }
};
