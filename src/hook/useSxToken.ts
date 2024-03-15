import { useContext } from 'react';

import type { ThemedDict } from '../@types/ThemedDict';
import type { ThemedTypings } from '../@types/ThemedTypings';
import { printWarning } from '../internal/util/printWarning';
import { StyledSystemContext } from '../provider/StyledSystemProvider';

export type UseSxTokenOptions = {
  theme?: ThemedDict;
};
export const useSxToken = <T extends keyof ThemedTypings, V extends ThemedTypings[T]>(
  tokenType: T,
  tokenValue: Exclude<V, null | undefined>,
  { theme: optionTheme }: UseSxTokenOptions = {},
): ThemedDict[T][keyof ThemedDict[T]] => {
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
