import type { ThemedDict } from '../@types/ThemedDict';
import { defaultTheme } from '../@types/ThemedDict';

import { createTheme } from './createTheme';

describe('createTheme', () => {
  describe('create mode (single argument)', () => {
    it('returns all empty defaults when called without arguments', () => {
      const theme = createTheme();
      expect(theme).toEqual({
        colors: {},
        space: {},
        sizes: {},
        radii: {},
        typography: {},
        breakpoints: [],
      });
    });

    it('returns all empty defaults when called with empty object', () => {
      const theme = createTheme({});
      expect(theme).toEqual({
        colors: {},
        space: {},
        sizes: {},
        radii: {},
        typography: {},
        breakpoints: [],
      });
    });

    it('keeps provided groups and fills missing ones with empty defaults', () => {
      const theme = createTheme({
        colors: { primary: '#000' },
        space: { '1': 4 },
      });
      expect(theme.colors).toEqual({ primary: '#000' });
      expect(theme.space).toEqual({ '1': 4 });
      expect(theme.sizes).toEqual({});
      expect(theme.radii).toEqual({});
      expect(theme.typography).toEqual({});
      expect(theme.breakpoints).toEqual([]);
    });

    it('keeps provided breakpoints', () => {
      const theme = createTheme({ breakpoints: [480, 768] });
      expect(theme.breakpoints).toEqual([480, 768]);
    });
  });

  describe('extend mode (two arguments)', () => {
    const base: ThemedDict = {
      colors: { red: '#FF0000', blue: '#0000FF' },
      space: { '1': 4, '2': 8 },
      sizes: { sm: 16 },
      radii: { md: 8 },
      typography: { body: { fontSize: 16, lineHeight: 24 } },
      breakpoints: [480, 768],
    };

    it('returns base as-is when overrides is empty', () => {
      const theme = createTheme(base, {});
      expect(theme).toEqual(base);
    });

    it('merges colors (keeps existing + adds new)', () => {
      const theme = createTheme(base, { colors: { brand: '#FF6600' } });
      expect(theme.colors).toEqual({ red: '#FF0000', blue: '#0000FF', brand: '#FF6600' });
    });

    it('overrides existing token values', () => {
      const theme = createTheme(base, { colors: { red: '#CC0000' } });
      expect(theme.colors.red).toBe('#CC0000');
      expect(theme.colors.blue).toBe('#0000FF');
    });

    it('merges each token group independently', () => {
      const theme = createTheme(base, {
        space: { '3': 12 },
        sizes: { lg: 32 },
        radii: { lg: 16 },
        typography: { h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 } },
      });
      expect(theme.space).toEqual({ '1': 4, '2': 8, '3': 12 });
      expect(theme.sizes).toEqual({ sm: 16, lg: 32 });
      expect(theme.radii).toEqual({ md: 8, lg: 16 });
      expect(theme.typography).toEqual({
        body: { fontSize: 16, lineHeight: 24 },
        h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
      });
    });

    it('replaces breakpoints when provided in overrides', () => {
      const theme = createTheme(base, { breakpoints: [500, 1024, 1440] });
      expect(theme.breakpoints).toEqual([500, 1024, 1440]);
    });

    it('falls back to base breakpoints when overrides omits breakpoints', () => {
      const theme = createTheme(base, { colors: { brand: '#000' } });
      expect(theme.breakpoints).toEqual([480, 768]);
    });

    it('does not mutate base or overrides', () => {
      const baseCopy = JSON.parse(JSON.stringify(base));
      const overrides = { colors: { brand: '#FF6600' } };
      const overridesCopy = JSON.parse(JSON.stringify(overrides));

      createTheme(base, overrides);

      expect(base).toEqual(baseCopy);
      expect(overrides).toEqual(overridesCopy);
    });

    it('works with defaultTheme as base', () => {
      const theme = createTheme(defaultTheme, {
        colors: { brand: '#FF6600' },
        space: { huge: 200 },
      });
      expect(theme.colors.brand).toBe('#FF6600');
      expect(theme.colors.white).toBe('#FFFFFF');
      expect(theme.space.huge).toBe(200);
      expect(theme.space['1']).toBe(4);
      expect(theme.breakpoints).toEqual(defaultTheme.breakpoints);
    });
  });
});
