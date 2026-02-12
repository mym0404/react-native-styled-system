import { resolveResponsiveSx, resolveResponsiveValue } from './resolveResponsiveValue';

describe('resolveResponsiveValue', () => {
  it('returns single value as-is', () => {
    expect(resolveResponsiveValue({ value: 100, breakpoints: [480, 768], screenWidth: 320 })).toBe(
      100,
    );

    expect(
      resolveResponsiveValue({ value: 'red', breakpoints: [480, 768], screenWidth: 320 }),
    ).toBe('red');
  });

  it('returns undefined for empty array', () => {
    expect(
      resolveResponsiveValue({ value: [], breakpoints: [480, 768], screenWidth: 320 }),
    ).toBeUndefined();
  });

  it('returns base value (index 0) when screenWidth < first breakpoint', () => {
    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [480, 768], screenWidth: 320 }),
    ).toBe(100);
  });

  it('returns index 1 when screenWidth >= first breakpoint', () => {
    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [480, 768], screenWidth: 480 }),
    ).toBe(200);

    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [480, 768], screenWidth: 600 }),
    ).toBe(200);
  });

  it('returns index 2 when screenWidth >= second breakpoint', () => {
    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [480, 768], screenWidth: 768 }),
    ).toBe(300);

    expect(
      resolveResponsiveValue({
        value: [100, 200, 300],
        breakpoints: [480, 768],
        screenWidth: 1024,
      }),
    ).toBe(300);
  });

  it('uses last matching value when array is shorter than breakpoints+1', () => {
    expect(
      resolveResponsiveValue({
        value: [100, 200],
        breakpoints: [480, 768, 1024],
        screenWidth: 1024,
      }),
    ).toBe(200);
  });

  it('always returns base value when breakpoints is empty', () => {
    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [], screenWidth: 0 }),
    ).toBe(100);

    expect(
      resolveResponsiveValue({ value: [100, 200, 300], breakpoints: [], screenWidth: 9999 }),
    ).toBe(100);
  });

  it('works with string token arrays', () => {
    expect(
      resolveResponsiveValue({
        value: ['red', 'blue', 'green'],
        breakpoints: [480, 768],
        screenWidth: 500,
      }),
    ).toBe('blue');
  });

  it('returns undefined for undefined value', () => {
    expect(
      resolveResponsiveValue({ value: undefined, breakpoints: [480], screenWidth: 320 }),
    ).toBeUndefined();
  });

  it('returns null for null value', () => {
    expect(
      resolveResponsiveValue({ value: null, breakpoints: [480], screenWidth: 320 }),
    ).toBeNull();
  });

  it('returns base value for single-element array', () => {
    expect(
      resolveResponsiveValue({ value: [100], breakpoints: [480, 768], screenWidth: 1024 }),
    ).toBe(100);
  });

  it('resolves undefined entry in array', () => {
    expect(
      resolveResponsiveValue({
        value: [100, undefined, 300],
        breakpoints: [480, 768],
        screenWidth: 500,
      }),
    ).toBeUndefined();

    expect(
      resolveResponsiveValue({
        value: [100, undefined, 300],
        breakpoints: [480, 768],
        screenWidth: 768,
      }),
    ).toBe(300);
  });
});

describe('resolveResponsiveSx', () => {
  it('resolves all array props to single values', () => {
    const result = resolveResponsiveSx({
      sx: { backgroundColor: ['red', 'blue'] as any, width: [100, 200] as any },
      breakpoints: [480],
      screenWidth: 500,
    });

    expect(result.backgroundColor).toBe('blue');
    expect(result.width).toBe(200);
  });

  it('keeps single values unchanged', () => {
    const result = resolveResponsiveSx({
      sx: { backgroundColor: 'red' as any, width: 100 as any },
      breakpoints: [480],
      screenWidth: 500,
    });

    expect(result.backgroundColor).toBe('red');
    expect(result.width).toBe(100);
  });

  it('handles mixed array and single values', () => {
    const result = resolveResponsiveSx({
      sx: { backgroundColor: ['red', 'blue'] as any, width: 100 as any },
      breakpoints: [480],
      screenWidth: 500,
    });

    expect(result.backgroundColor).toBe('blue');
    expect(result.width).toBe(100);
  });

  it('does not resolve transform arrays', () => {
    const transformValue = [{ translateX: 10 }];
    const result = resolveResponsiveSx({
      sx: { transform: transformValue as any },
      breakpoints: [480],
      screenWidth: 500,
    });

    expect(result.transform).toBe(transformValue);
  });

  it('returns empty object for undefined sx', () => {
    const result = resolveResponsiveSx({
      sx: undefined,
      breakpoints: [480],
      screenWidth: 500,
    });

    expect(result).toEqual({});
  });
});
