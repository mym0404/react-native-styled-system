import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import type { SxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';

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

const emptyTheme: ThemedDict = {
  colors: {},
  sizes: {},
  space: {},
};

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
  },
  space: { 1: 4, 2: 8, pagePadding: 20 },
};

describe('simple usages', () => {
  it('handle empty', () => {
    expectResult(baseTheme, {}, {});
  });

  it('color', () => {
    expectResult(baseTheme, { bg: 'red' }, { backgroundColor: 'red' });
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
