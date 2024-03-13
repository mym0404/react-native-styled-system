import type { Token } from './Token';
export interface ThemedDict {
    space: Record<string | number, Token<'space'>>;
    sizes: Record<string | number, Token<'sizes'>>;
    colors: Record<string, string>;
}
export declare const emptyThemedDict: {
    space: {};
    colors: {};
    sizes: {};
};
