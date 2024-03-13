import { is } from '@mj-studio/js-util';
export function parsePxSuffixNumber(value) {
    if (is.string(value) && value.endsWith('px')) {
        const sub = value.substring(0, value.length - 2);
        if (is.numberString(sub)) {
            return Number(sub);
        }
    }
}
//# sourceMappingURL=parsePxSuffixNumber.js.map