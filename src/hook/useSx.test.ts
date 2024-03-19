import type { StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import type { SxProps, TextSxProps } from '../@types/SxProps';
import type { ThemedDict } from '../@types/ThemedDict';
import { emptyThemedDict } from '../@types/ThemedDict';
import type { ThemedStyleType } from '../util/propsToThemedStyle';

import { useSx } from './useSx';

export function expectResult(
  theme: ThemedDict,
  props: { style?: StyleProp<any>; getStyleSx?: SxProps & TextSxProps } & TextSxProps &
    Record<string, any>,
  {
    expectation,
    filteredPropsExpectation,
    styleType,
  }: {
    expectation: object;
    filteredPropsExpectation?: object;
    styleType?: ThemedStyleType;
  },
) {
  const {
    result: {
      current: { getStyle, filteredProps },
    },
  } = renderHook(() => useSx(props, { theme, styleType }));

  if (expectation) {
    expect(StyleSheet.flatten(getStyle(props.getStyleSx))).toEqual(expectation);
  }

  if (filteredPropsExpectation) {
    expect(filteredProps).toEqual(filteredPropsExpectation);
  }
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
    expectResult(baseTheme, {}, { expectation: {} });
  });

  it('colors match', () => {
    expectResult(baseTheme, { bg: 'red' }, { expectation: { backgroundColor: 'red' } });
    expectResult(baseTheme, { bg: '#ffffff' }, { expectation: { backgroundColor: '#ffffff' } });
  });

  it('border widths should be match', () => {
    expectResult(
      emptyTheme,
      { borderTopWidth: 1, borderWidth: 1 },
      { expectation: { borderTopWidth: 1, borderWidth: 1 } },
    );

    expectResult(baseTheme, { borderLeftWidth: 1 }, { expectation: { borderLeftWidth: 1 } });
  });
});

describe('edge case', () => {
  it('invalid px suffix', () => {
    expectResult(baseTheme, { w: 'undefinedpx' as any }, { expectation: {} });
    expectResult(baseTheme, { w: 'nullpx' as any }, { expectation: {} });
    expectResult(baseTheme, { w: '-px' as any }, { expectation: {} });
    expectResult(baseTheme, { w: '-1px' as any }, { expectation: { width: -1 } });
  });

  it('if token is undefined, baseStyle is returned', () => {
    expectResult(undefined as any, {}, { expectation: {} });
    expectResult(undefined as any, { style: { width: 1 } }, { expectation: { width: 1 } });
  });

  it('if prop and getStyle sx parameter are nullish, return undefined', () => {
    const {
      result: {
        current: { getStyle },
      },
    } = renderHook(() => useSx(null, { theme: baseTheme }));

    return expect(getStyle()).toEqual(undefined);
  });

  it('if prop is nullish and getStyle sx parameter is not nullish, return style', () => {
    const {
      result: {
        current: { getStyle },
      },
    } = renderHook(() => useSx(null, { theme: baseTheme }));

    return expect(getStyle({ width: 1 })).toEqual({ width: 4 });
  });

  it("gap doesn't accept not number value", () => {
    expectResult(baseTheme, { gap: 'full' as any }, { expectation: {} });
  });
});

describe('space parsing', () => {
  it('if number token not found, return itself', () => {
    expectResult(emptyTheme, { m: 1 }, { expectation: { margin: 1 } });
  });

  it('px suffix string, return parsed pixel number value', () => {
    expectResult(emptyTheme, { m: '15px' }, { expectation: { margin: 15 } });
    expectResult(emptyTheme, { m: '-1.5px' }, { expectation: { margin: -1.5 } });
    expectResult(emptyTheme, { m: '-0px' }, { expectation: { margin: -0 } });
    expectResult(emptyTheme, { m: '0px' }, { expectation: { margin: 0 } });
    expectResult(emptyTheme, { m: '-1px' }, { expectation: { margin: -1 } });
  });

  it('percentage', () => {
    expectResult(emptyTheme, { m: '100%' }, { expectation: { margin: '100%' } });
  });

  it('number, string parsing', () => {
    expectResult(baseTheme, { m: 1 }, { expectation: { margin: 4 } });
    expectResult(baseTheme, { m: '1' }, { expectation: { margin: 4 } });
  });

  it('negative works', () => {
    expectResult(baseTheme, { m: -1 }, { expectation: { margin: -4 } });
  });

  it('negative number as key', () => {
    expectResult(baseTheme, { m: -1 }, { expectation: { margin: -4 } });
  });

  it('minus prefixed string', () => {
    expectResult(baseTheme, { m: '-pagePadding' as any }, { expectation: { margin: -20 } });
  });

  it('gap accepts number value', () => {
    expectResult(baseTheme, { gap: 1 }, { expectation: { gap: 4 } });
  });
});

describe('sizes parsing', () => {
  it("negative doesn't work", () => {
    expectResult(baseTheme, { w: -1 }, { expectation: { width: -1 } });
  });
});

describe('shortcut priority', () => {
  it('backgroundColor', () => {
    expectResult(
      baseTheme,
      { bg: 'red', backgroundColor: 'blue' },
      { expectation: { backgroundColor: 'blue' } },
    );

    expectResult(
      baseTheme,
      { bg: 'red', backgroundColor: '#ffffff' },
      { expectation: { backgroundColor: '#ffffff' } },
    );
  });

  it('width', () => {
    expectResult(emptyTheme, { w: 1, width: 2 }, { expectation: { width: 2 } });
  });

  it('borderRadius', () => {
    expectResult(emptyTheme, { radius: 1, borderRadius: 2 }, { expectation: { borderRadius: 2 } });
  });

  it('align', () => {
    expectResult(
      emptyTheme,
      { textAlign: 'center', align: 'left' },
      { expectation: { textAlign: 'center' }, styleType: 'TextStyle' },
    );
  });
});

describe('style parse priority', () => {
  it('sx prop property > prop property', () => {
    expectResult(emptyTheme, { w: 1, sx: { w: 2 } }, { expectation: { width: 2 } });
  });

  it('prop property > getStyle parameter', () => {
    expectResult(emptyTheme, { w: 1, getStyleSx: { w: 2 } }, { expectation: { width: 1 } });
  });

  it('style prop property > getStyle parameter', () => {
    expectResult(
      emptyTheme,
      { style: { width: 1 }, getStyleSx: { w: 2 } },
      { expectation: { width: 1 } },
    );
  });
});

describe('radii', () => {
  it('simple case check', () => {
    expectResult(baseTheme, { topLeftRadius: '1px' }, { expectation: { borderTopLeftRadius: 1 } });
    expectResult(baseTheme, { topLeftRadius: '1' }, { expectation: { borderTopLeftRadius: 1 } });
    expectResult(
      baseTheme,
      { topLeftRadius: 'sm' as any },
      { expectation: { borderTopLeftRadius: 8 } },
    );
  });
});

describe('filteredProps', () => {
  it("filteredProps shouldn't have not style props - ViewStyle", () => {
    expectResult(
      baseTheme,
      { shouldBePersist: true, backgroundColor: 'red' },
      {
        expectation: { backgroundColor: 'red' },
        filteredPropsExpectation: { shouldBePersist: true },
      },
    );
  });

  it("styleTheme includes only ViewStyle, then props in TextStyle shouldn't be filtered", () => {
    expectResult(
      baseTheme,
      { color: 'red' },
      {
        expectation: {},
        filteredPropsExpectation: { color: 'red' },
      },
    );
  });

  it("filteredProps shouldn't have not style props - TextStyle", () => {
    expectResult(
      baseTheme,
      { color: 'red' },
      {
        expectation: { color: 'red' },
        filteredPropsExpectation: {},
        styleType: 'TextStyle',
      },
    );
  });
});

describe('TextStyle', () => {
  it('TextStyle props are parsed', () => {
    expectResult(
      baseTheme,
      { textShadowColor: 'red' },
      {
        expectation: { textShadowColor: 'red' },
        styleType: 'TextStyle',
      },
    );
  });
});
