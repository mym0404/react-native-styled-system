import type { PropsWithChildren } from 'react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StyledSystemProvider } from '../../../src';

import AppTheme from './AppTheme';

type AppThemeProviderProps = PropsWithChildren<{}>;

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const theme = AppTheme;
  const safeArea = useSafeAreaInsets();

  return (
    <StyledSystemProvider
      theme={{
        ...theme,
        space: {
          ...theme.space,
          sfTop: safeArea.top,
          bottom: safeArea.bottom,
          left: safeArea.left,
          right: safeArea.right,
        },
      }}
    >
      {children}
    </StyledSystemProvider>
  );
};

export { AppThemeProvider };
export type { AppThemeProviderProps };
