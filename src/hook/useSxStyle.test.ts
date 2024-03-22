import { StyleSheet } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import type { TextSxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';

import { useSxStyle } from './useSxStyle';

export function expectResult(
  theme: ThemedDict,
  sx: TextSxProps,
  {
    expectation,
  }: {
    expectation: object;
  },
) {
  const {
    result: { current },
  } = renderHook(() => useSxStyle({ theme }));

  expect(StyleSheet.flatten(current(sx))).toEqual(expectation);
}

const baseTheme: ThemedDict = {
  colors: {
    red: 'red',
    blue: 'blue',
    green: 'green',
  },
  sizes: {
    1: 4,
    2: 8,
    pagePadding: 20,
    full: '100%',
  },
  space: { 1: 4, 2: 8, pagePadding: 20, full: '100%' },
  radii: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  typography: {
    title: {
      fontFamily: 'Noto Sans',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
    },
  },
};

describe('general case', () => {
  it('', () => {
    expectResult(baseTheme, { mt: 2 }, { expectation: { marginTop: 8 } });
  });
});
