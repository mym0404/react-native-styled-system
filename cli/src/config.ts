import type { ThemeKeyOptions } from './create-theme-typings-interface.js';

export const themeKeyConfiguration: ThemeKeyOptions[] = [
  { key: 'colors', maxScanDepth: 3 },
  { key: 'radii' },
  { key: 'sizes', maxScanDepth: 2 },
  { key: 'space', flatMap: (value) => [value, `-${value}`] },
];
