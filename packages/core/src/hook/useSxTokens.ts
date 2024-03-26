import { useContext } from 'react';
import { generateArray } from '@mj-studio/js-util';

import type { ThemedDict } from '../@types/ThemedDict';
import type { ThemedTypings } from '../@types/ThemedTypings';
import { printWarning } from '../internal/util/printWarning';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

export type UseSxTokensOptions = {
  theme?: ThemedDict;
};
export const useSxTokens = <T extends keyof ThemedTypings, V extends ThemedTypings[T]>(
  tokenType: T,
  tokenValues: Array<Exclude<V, null | undefined>>,
  { theme: optionTheme }: UseSxTokensOptions = {},
): Array<ThemedDict[T][keyof ThemedDict[T]]> => {
  const styledSystemContext = useContext(StyledSystemContext);

  const theme = optionTheme ?? styledSystemContext?.theme;

  if (!theme) {
    printWarning('theme not found from useSxTokens, undefineds will be returned.');

    return generateArray(tokenValues.length).map(() => undefined) as any;
  }

  const ret: Array<ThemedDict[T][keyof ThemedDict[T]]> = [];

  for (let i = 0; i < tokenValues.length; i++) {
    const tokenValue = tokenValues[i];
    if (!(tokenValue in theme[tokenType])) {
      printWarning(
        `tokenValue ${String(tokenValue)} at index ${i} doesn't exist in tokenType ${tokenType} from useSxTokens, undefined will be returned.`,
      );
      ret.push(undefined as any);
    } else {
      ret.push(theme[tokenType][tokenValue]);
    }
  }

  return ret;
};
