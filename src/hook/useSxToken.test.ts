import { renderHook } from '@testing-library/react-hooks';

import type { ThemedDict } from '../@types/ThemedDict';
import type { ThemedTypings } from '../@types/ThemedTypings';

import { useSxToken } from './useSxToken';

const theme: ThemedDict = {
  colors: {
    red: 'red',
    blue: 'blue',
    green: 'green',
  },
  sizes: {
    1: 4,
    2: 8,
    pagePadding: 20,
  },
  space: { 1: 4, 2: 8, pagePadding: 20 },
  radii: {
    sm: 8,
    md: 12,
    lg: 20,
  },
};

export function expectResult<T extends keyof ThemedTypings, V extends ThemedTypings[T]>(
  theme: ThemedDict,
  tokenGroup: T,
  tokenValue: Exclude<V, null | undefined>,
  expectation: any,
) {
  const {
    result: { current },
  } = renderHook(() => useSxToken(tokenGroup, tokenValue, { theme }));

  return expect(current).toEqual(expectation);
}

describe('valid case', () => {
  it('colors', () => {
    expectResult(theme, 'colors', 'red', 'red');
  });

  it('radii', () => {
    expectResult(theme, 'radii', 'sm' as any, 8);
  });
});

describe('edge case', () => {
  it('cannot find value if tokenValue is not in tokenType', () => {
    expectResult(theme, 'radii', '' as any, undefined);
  });

  it('cannot find value if theme is undefined', () => {
    expectResult(undefined as any, 'radii', '' as any, undefined);
  });
});
