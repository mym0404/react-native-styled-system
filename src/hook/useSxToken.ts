import { useContext } from 'react';

import type { ThemedDict } from '../@types/ThemedDict';
import type { ThemedTypings } from '../@types/ThemedTypings';
import { printWarning } from '../internal/util/printWarning';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

export type UseSxTokenOptions = {
  theme?: ThemedDict;
};
export const useSxToken = <T extends keyof ThemedTypings>(
  tokenType: T,
  tokenValue: keyof ThemedDict[T],
  { theme: optionTheme }: UseSxTokenOptions = {},
): ThemedDict[T][typeof tokenValue] => {
  const styledSystemContext = useContext(StyledSystemContext);

  const theme = optionTheme ?? styledSystemContext?.theme;

  if (!theme) {
    printWarning('theme not found from useSxToken, undefined will be returned.');

    return undefined as any;
  }

  if (!(tokenValue in theme[tokenType])) {
    printWarning(
      `tokenValue ${String(tokenValue)} doesn't exist in tokenType ${tokenType} from useSxToken, undefined will be returned.`,
    );

    return undefined as any;
  }

  return theme[tokenType][tokenValue];
};
