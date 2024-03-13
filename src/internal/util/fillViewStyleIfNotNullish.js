import { is } from '@mj-studio/js-util';
export function fillViewStyleIfNotNullish(into, key, value) {
    if (is.undefined(value) || is.null(value)) {
        return;
    }
    into[key] = value;
}
//# sourceMappingURL=fillViewStyleIfNotNullish.js.map