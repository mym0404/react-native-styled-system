import type { ReactElement } from 'react';
import React from 'react';

const ThemeContext = React.createContext({});

type Props = { children: ReactElement | null };

export const ThemeProvider = ({ children }: Props) => {
  return children;
};
