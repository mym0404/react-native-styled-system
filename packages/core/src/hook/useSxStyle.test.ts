import { StyleSheet } from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { baseTheme, emptyTheme, responsiveTheme } from '../__testUtils__/testTheme';
import type { TextSxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';

import type { UseSxStyleOptions } from './useSxStyle';
import { useSxStyle } from './useSxStyle';

const expectResult = (
  theme: ThemedDict,
  sx: TextSxProps,
  {
    expectation,
    cache,
    screenWidth,
  }: {
    expectation: object;
    cache?: boolean;
    screenWidth?: number;
  },
) => {
  const options: UseSxStyleOptions = { theme, cache, screenWidth };
  const {
    result: { current },
  } = renderHook(() => useSxStyle(options));

  expect(StyleSheet.flatten(current(sx))).toEqual(expectation);
};

describe('space parsing', () => {
  it('resolves space token', () => {
    expectResult(baseTheme, { mt: 2 }, { expectation: { marginTop: 8 } });
  });

  it('resolves multiple space tokens', () => {
    expectResult(baseTheme, { mt: 1, mb: 2 }, { expectation: { marginTop: 4, marginBottom: 8 } });
  });

  it('resolves px suffix', () => {
    expectResult(baseTheme, { m: '15px' }, { expectation: { margin: 15 } });
  });

  it('resolves percentage', () => {
    expectResult(baseTheme, { m: '100%' }, { expectation: { margin: '100%' } });
  });
});

describe('color parsing', () => {
  it('resolves color token', () => {
    expectResult(baseTheme, { bg: 'red' }, { expectation: { backgroundColor: 'red' } });
  });

  it('resolves raw hex color', () => {
    expectResult(baseTheme, { bg: '#ffffff' }, { expectation: { backgroundColor: '#ffffff' } });
  });
});

describe('sizes parsing', () => {
  it('resolves size token', () => {
    expectResult(baseTheme, { w: 1 }, { expectation: { width: 4 } });
  });

  it('resolves percentage size', () => {
    expectResult(baseTheme, { w: 'full' as any }, { expectation: { width: '100%' } });
  });
});

describe('radii parsing', () => {
  it('resolves radii token', () => {
    expectResult(baseTheme, { radius: 'sm' as any }, { expectation: { borderRadius: 8 } });
  });
});

describe('shortcut props', () => {
  it('resolves bg shortcut', () => {
    expectResult(baseTheme, { bg: 'red' }, { expectation: { backgroundColor: 'red' } });
  });

  it('resolves w/h shortcuts', () => {
    expectResult(baseTheme, { w: 1, h: 2 }, { expectation: { width: 4, height: 8 } });
  });
});

describe('responsive', () => {
  it('resolves responsive array', () => {
    expectResult(
      responsiveTheme,
      { w: [100, 200] as any },
      { expectation: { width: 200 }, screenWidth: 500 },
    );
  });

  it('uses base value when screenWidth below breakpoint', () => {
    expectResult(
      responsiveTheme,
      { w: [100, 200] as any },
      { expectation: { width: 100 }, screenWidth: 320 },
    );
  });
});

describe('cache', () => {
  it('cached results have same reference', () => {
    const options: UseSxStyleOptions = { theme: emptyTheme, cache: true };
    const {
      result: { current },
    } = renderHook(() => useSxStyle(options));

    const style1 = current({ bg: 'red' });
    const style2 = current({ bg: 'red' });

    expect(style1 === style2).toBe(true);
  });
});

describe('edge case', () => {
  it('returns empty style for empty sx', () => {
    expectResult(baseTheme, {}, { expectation: {} });
  });

  it('falls back to context default theme when option theme is undefined', () => {
    expectResult(undefined as any, { w: 1 }, { expectation: { width: 1 } });
  });
});
