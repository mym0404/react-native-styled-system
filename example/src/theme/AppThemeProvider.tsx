import type { PropsWithChildren } from 'react';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BaseColor, ThemeColor } from '@react-native-styled-system/core';
import { createTheme, createThemeColors, StyledSystemProvider } from '@react-native-styled-system/core';

import AppTheme from './AppTheme';

type ThemePreset = { label: string; base: BaseColor; theme: ThemeColor };

const themePresets: ThemePreset[] = [
  { label: 'Neutral', base: 'neutral', theme: 'neutral' },
  { label: 'Blue', base: 'zinc', theme: 'blue' },
  { label: 'Violet', base: 'slate', theme: 'violet' },
  { label: 'Rose', base: 'stone', theme: 'rose' },
  { label: 'Emerald', base: 'neutral', theme: 'emerald' },
  { label: 'Orange', base: 'gray', theme: 'orange' },
  { label: 'Cyan', base: 'slate', theme: 'cyan' },
  { label: 'Pink', base: 'zinc', theme: 'pink' },
  { label: 'Indigo', base: 'gray', theme: 'indigo' },
  { label: 'Amber', base: 'stone', theme: 'amber' },
];

type AppThemeProviderProps = PropsWithChildren<{}>;

type ContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentPreset: ThemePreset;
  nextTheme: () => void;
};

const Context = React.createContext<ContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {},
  currentPreset: themePresets[0]!,
  nextTheme: () => {},
});

export const useAppTheme = () => useContext(Context);

export const useDarkTheme = () => {
  const { isDarkMode, toggleDarkMode } = useAppTheme();
  return { isDarkMode, toggleDarkMode };
};

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const safeArea = useSafeAreaInsets();
  const [isDarkMode, setDarkMode] = useState(true);
  const [presetIndex, setPresetIndex] = useState(0);

  const currentPreset = themePresets[presetIndex]!;

  const { light, dark } = useMemo(
    () => createThemeColors({ base: currentPreset.base, theme: currentPreset.theme }),
    [currentPreset],
  );

  const nextTheme = useCallback(() => {
    setPresetIndex((i) => (i + 1) % themePresets.length);
  }, []);

  return (
    <Context.Provider
      value={{
        isDarkMode,
        toggleDarkMode: () => setDarkMode((v) => !v),
        currentPreset,
        nextTheme,
      }}
    >
      <StyledSystemProvider
        theme={createTheme(AppTheme, {
          colors: isDarkMode ? dark : light,
          space: {
            sfTop: safeArea.top,
            bottom: safeArea.bottom,
            left: safeArea.left,
            right: safeArea.right,
          },
        })}
      >
        {children}
      </StyledSystemProvider>
    </Context.Provider>
  );
};

export { AppThemeProvider };
export type { AppThemeProviderProps };
