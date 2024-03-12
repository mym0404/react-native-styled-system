import type { ReactElement } from 'react';
import React from 'react';

import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';

type ContextType = {
  theme: ThemedDict;
};

export const StyledSystemContext = React.createContext<ContextType>({ theme: emptyThemedDict });
type Props = { children: ReactElement | null; theme: ThemedDict };

export const StyledSystemProvider = ({ children, theme }: Props) => {
  return <StyledSystemContext.Provider value={{ theme }}>{children}</StyledSystemContext.Provider>;
};
