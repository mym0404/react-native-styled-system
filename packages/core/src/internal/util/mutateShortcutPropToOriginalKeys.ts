import type { TextSxProps } from '../../@types/SxProps';
import { SHORTCUT_NAME_MAP } from '../../@types/SxProps';

export function mutateShortcutPropToOriginalKeys(sx?: TextSxProps | null) {
  if (!sx) {
    return sx;
  }

  for (const key of Object.keys(sx)) {
    if (SHORTCUT_NAME_MAP[key]) {
      if (!(SHORTCUT_NAME_MAP[key] in sx)) {
        sx[SHORTCUT_NAME_MAP[key]] = sx[key];
      }
    }
  }

  return sx;
}
