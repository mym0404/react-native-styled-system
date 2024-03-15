import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import type { SxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';

import { useSx } from './useSx';

export function expectResult(
  theme: ThemedDict,
  props: { style?: StyleProp<any>; viewStyleSx?: SxProps } & SxProps,
  expectation: ViewStyle,
) {
  const {
    result: {
      current: { viewStyle },
    },
  } = renderHook(() => useSx(props, { theme }));

  return expect(StyleSheet.flatten(viewStyle(props.viewStyleSx))).toEqual(expectation);
}

const emptyTheme = emptyThemedDict;

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
};

describe('simple usages', () => {
  it('handle empty', () => {
    expectResult(baseTheme, {}, {});
  });

  it('color', () => {
    expectResult(baseTheme, { bg: 'red' }, { backgroundColor: 'red' });
  });
});

describe('edge case', () => {
  it('invalid px suffix', () => {
    expectResult(baseTheme, { w: 'undefinedpx' as any }, {});
    expectResult(baseTheme, { w: 'nullpx' as any }, {});
    expectResult(baseTheme, { w: '-px' as any }, {});
    expectResult(baseTheme, { w: '-1px' as any }, { width: -1 });
  });

  it('if token is undefined, baseStyle is returned', () => {
    expectResult(undefined as any, {}, {});
    expectResult(undefined as any, { style: { width: 1 } }, { width: 1 });
  });

  it('if prop and viewStyle sx parameter are nullish, return undefined', () => {
    const {
      result: {
        current: { viewStyle },
      },
    } = renderHook(() => useSx(null, { theme: baseTheme }));

    return expect(viewStyle()).toEqual(undefined);
  });

  it('if prop is nullish and viewStyle sx parameter is not nullish, return style', () => {
    const {
      result: {
        current: { viewStyle },
      },
    } = renderHook(() => useSx(null, { theme: baseTheme }));

    return expect(viewStyle({ width: 1 })).toEqual({ width: 4 });
  });

  it("gap doesn't accept not number value", () => {
    expectResult(baseTheme, { gap: 'full' as any }, {});
  });
});

describe('space parsing', () => {
  it('if number token not found, return itself', () => {
    expectResult(emptyTheme, { m: 1 }, { margin: 1 });
  });

  it('px suffix string, return parsed pixel number value', () => {
    expectResult(emptyTheme, { m: '15px' }, { margin: 15 });
    expectResult(emptyTheme, { m: '-1.5px' }, { margin: -1.5 });
    expectResult(emptyTheme, { m: '-0px' }, { margin: -0 });
    expectResult(emptyTheme, { m: '0px' }, { margin: 0 });
    expectResult(emptyTheme, { m: '-1px' }, { margin: -1 });
  });

  it('percentage', () => {
    expectResult(emptyTheme, { m: '100%' }, { margin: '100%' });
  });

  it('number, string parsing', () => {
    expectResult(baseTheme, { m: 1 }, { margin: 4 });
    expectResult(baseTheme, { m: '1' }, { margin: 4 });
  });

  it('negative works', () => {
    expectResult(baseTheme, { m: -1 }, { margin: -4 });
  });

  it('negative number as key', () => {
    expectResult(baseTheme, { m: -1 }, { margin: -4 });
  });

  it('minus prefixed string', () => {
    expectResult(baseTheme, { m: '-pagePadding' as any }, { margin: -20 });
  });

  it('gap accepts number value', () => {
    expectResult(baseTheme, { gap: 1 }, { gap: 4 });
  });
});

describe('sizes parsing', () => {
  it("negative doesn't work", () => {
    expectResult(baseTheme, { w: -1 }, { width: -1 });
  });
});

describe('shortcut priority', () => {
  it('bg', () => {
    expectResult(baseTheme, { bg: 'red', backgroundColor: 'blue' }, { backgroundColor: 'blue' });
  });

  it('w', () => {
    expectResult(emptyTheme, { w: 1, width: 2 }, { width: 2 });
  });

  it('radius', () => {
    expectResult(emptyTheme, { radius: 1, borderRadius: 2 }, { borderRadius: 2 });
  });
});

describe('style parse priority', () => {
  it('sx prop property > prop property', () => {
    expectResult(emptyTheme, { w: 1, sx: { w: 2 } }, { width: 2 });
  });

  it('prop property > viewStyle parameter', () => {
    expectResult(emptyTheme, { w: 1, viewStyleSx: { w: 2 } }, { width: 1 });
  });

  it('viewStyle parameter > style prop property', () => {
    expectResult(emptyTheme, { style: { width: 1 }, viewStyleSx: { w: 2 } }, { width: 2 });
  });
});

it('border widths should be match', () => {
  expectResult(
    emptyTheme,
    { borderTopWidth: 1, borderWidth: 1 },
    { borderTopWidth: 1, borderWidth: 1 },
  );

  expectResult(baseTheme, { borderLeftWidth: 1 }, { borderLeftWidth: 1 });
});

describe('radii', () => {
  it('simple case check', () => {
    expectResult(baseTheme, { topLeftRadius: '1px' }, { borderTopLeftRadius: 1 });
    expectResult(baseTheme, { topLeftRadius: '1' }, { borderTopLeftRadius: 1 });
    expectResult(baseTheme, { topLeftRadius: 'sm' as any }, { borderTopLeftRadius: 8 });
  });
});
