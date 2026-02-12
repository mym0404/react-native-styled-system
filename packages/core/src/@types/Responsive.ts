export type Responsive<T> = T | (T | undefined)[];

export type ResponsiveExcludedKey = 'transform';

export const RESPONSIVE_EXCLUDED_KEYS: ReadonlySet<string> = new Set<ResponsiveExcludedKey>([
  'transform',
]);
