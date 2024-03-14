// import { renderHook } from '@testing-library/react-hooks';
//
// import type { ThemedDict } from '../@types/ThemedDict';
// import type { ThemedTypings } from '../@types/ThemedTypings';
//
// import { useSxToken } from './useSxToken';
//
// const emptyTheme: ThemedDict = {
//   colors: {},
//   sizes: {},
//   space: {},
// };
//
// const baseTheme: ThemedDict = {
//   colors: {
//     red: 'red',
//     blue: 'blue',
//     green: 'green',
//   },
//   sizes: {
//     1: 4,
//     2: 8,
//     pagePadding: 20,
//   },
//   space: { 1: 4, 2: 8, pagePadding: 20 },
// };
//
// export function expectResult<T extends keyof ThemedTypings>(
//   theme: ThemedDict,
//   tokenGroup: T,
//   tokenValue: string,
//   expectation: any,
// ) {
//   const {
//     result: { current },
//   } = renderHook(() => useSxToken(tokenGroup, tokenValue, { theme }));
//
//   return expect(current).toEqual(expectation);
// }
//
// describe('', () => {
//   it('', () => {
//     expectResult(baseTheme, 'colors', 'red', 'red');
//   });
// });
