import { renderHook } from '@testing-library/react-native';

import { baseTheme } from '../__testUtils__/testTheme';
import type { ThemedDict } from '../@types/ThemedDict';
import type { ThemedTypings } from '../@types/ThemedTypings';

import { useSxTokens } from './useSxTokens';

const expectResult = <T extends keyof ThemedTypings, V extends ThemedTypings[T]>(
  theme: ThemedDict,
  tokenGroup: T,
  tokenValues: Array<Exclude<V, null | undefined>>,
  expectation: unknown[],
) => {
  const {
    result: { current },
  } = renderHook(() => useSxTokens(tokenGroup, tokenValues, { theme }));

  return expect(current).toEqual(expectation);
};

describe('colors', () => {
  it('resolves single color', () => {
    expectResult(baseTheme, 'colors', ['red'], ['red']);
  });

  it('resolves multiple colors', () => {
    expectResult(baseTheme, 'colors', ['red', 'blue', 'green'], ['red', 'blue', 'green']);
  });
});

describe('radii', () => {
  it('resolves single radius', () => {
    expectResult(baseTheme, 'radii', ['sm' as any], [8]);
  });

  it('resolves multiple radii', () => {
    expectResult(baseTheme, 'radii', ['sm' as any, 'md' as any, 'lg' as any], [8, 12, 20]);
  });
});

describe('space', () => {
  it('resolves space tokens', () => {
    expectResult(baseTheme, 'space', [1 as any, 2 as any], [4, 8]);
  });

  it('resolves string key space tokens', () => {
    expectResult(baseTheme, 'space', ['pagePadding' as any], [20]);
  });
});

describe('sizes', () => {
  it('resolves size tokens', () => {
    expectResult(baseTheme, 'sizes', [1 as any, 2 as any], [4, 8]);
  });

  it('resolves percentage size token', () => {
    expectResult(baseTheme, 'sizes', ['full' as any], ['100%']);
  });
});

describe('typography', () => {
  it('resolves typography token', () => {
    expectResult(
      baseTheme,
      'typography',
      ['title' as any],
      [
        {
          fontFamily: 'Noto Sans',
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: '400',
        },
      ],
    );
  });
});

describe('edge case', () => {
  it('returns undefined for non-existent token value', () => {
    expectResult(baseTheme, 'radii', ['' as any], [undefined]);
  });

  it('returns undefined when theme is undefined', () => {
    expectResult(undefined as any, 'radii', ['' as any], [undefined]);
  });

  it('returns empty array for empty token values', () => {
    expectResult(baseTheme, 'colors', [], []);
  });
});
