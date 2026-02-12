import { RESPONSIVE_EXCLUDED_KEYS } from '../../@types/Responsive';
import type { ResolvedTextSxProps, TextSxProps } from '../../@types/SxProps';

export const resolveResponsiveValue = <T>({
  value,
  breakpoints,
  screenWidth,
}: {
  value: T | T[] | undefined | null;
  breakpoints: number[];
  screenWidth: number;
}): T | undefined | null => {
  if (!Array.isArray(value)) {
    return value;
  }

  if (value.length === 0) {
    return undefined;
  }

  let resolved = value[0] as T;

  for (let i = 0; i < breakpoints.length && i + 1 < value.length; i++) {
    if (screenWidth >= breakpoints[i]!) {
      resolved = value[i + 1] as T;
    }
  }

  return resolved;
};

export const resolveResponsiveSx = ({
  sx,
  breakpoints,
  screenWidth,
}: {
  sx: TextSxProps | undefined;
  breakpoints: number[];
  screenWidth: number;
}): ResolvedTextSxProps => {
  if (!sx) {
    return {} as ResolvedTextSxProps;
  }

  const resolved: Record<string, unknown> = {};

  for (const key of Object.keys(sx)) {
    const val = (sx as Record<string, unknown>)[key];

    if (RESPONSIVE_EXCLUDED_KEYS.has(key) || !Array.isArray(val)) {
      resolved[key] = val;
    } else {
      resolved[key] = resolveResponsiveValue({ value: val, breakpoints, screenWidth });
    }
  }

  return resolved as ResolvedTextSxProps;
};
