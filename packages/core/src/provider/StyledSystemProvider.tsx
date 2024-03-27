import type { PropsWithChildren } from 'react';
import React from 'react';

import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';
import { fillNullishThemeKey } from '../internal/util/fillNullishThemeKey';

export type StyledSystemContextValue = {
  theme: ThemedDict;
};

export const StyledSystemContext = React.createContext<StyledSystemContextValue>({
  theme: emptyThemedDict,
});
type Props = PropsWithChildren<{ theme: Partial<ThemedDict> }>;

export const StyledSystemProvider = ({ children, theme }: Props) => {
  return (
    <StyledSystemContext.Provider value={{ theme: fillNullishThemeKey(theme) }}>
      {children}
    </StyledSystemContext.Provider>
  );
};
