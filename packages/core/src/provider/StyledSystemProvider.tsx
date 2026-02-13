import type { PropsWithChildren } from 'react';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createTheme } from '@react-native-styled-system/util';

import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';

export type StyledSystemContextValue = {
  theme: ThemedDict;
  screenWidth: number;
};

export const StyledSystemContext = React.createContext<StyledSystemContextValue>({
  theme: emptyThemedDict,
  screenWidth: 0,
});
type Props = PropsWithChildren<{ theme: Partial<ThemedDict>; screenWidth?: number }>;

const StyledSystemProviderInner = ({ children, theme, screenWidth }: Props) => {
  const { width } = useWindowDimensions();
  const resolvedScreenWidth = screenWidth ?? width;

  return (
    <StyledSystemContext.Provider
      value={{ theme: createTheme(theme), screenWidth: resolvedScreenWidth }}
    >
      {children}
    </StyledSystemContext.Provider>
  );
};

export const StyledSystemProvider = StyledSystemProviderInner;
