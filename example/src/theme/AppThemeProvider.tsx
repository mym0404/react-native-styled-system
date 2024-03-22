import type { PropsWithChildren } from 'react';
import React, { useContext, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StyledSystemProvider } from '../../../src';

import AppTheme, { darkColors, lightColors } from './AppTheme';

type AppThemeProviderProps = PropsWithChildren<{}>;

type ContextType = { isDarkMode: boolean; toggleDarkMode: () => void };

const Context = React.createContext<ContextType>({ isDarkMode: true, toggleDarkMode: () => {} });

export function useDarkTheme() {
  const context = useContext(Context);

  return context!;
}

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const theme = AppTheme;
  const safeArea = useSafeAreaInsets();

  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <Context.Provider value={{ isDarkMode, toggleDarkMode: () => setDarkMode((v) => !v) }}>
      <StyledSystemProvider
        theme={{
          ...theme,
          colors: {
            ...theme.colors,
            ...(isDarkMode ? darkColors : lightColors),
          },
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
    </Context.Provider>
  );
};

export { AppThemeProvider };
export type { AppThemeProviderProps };
