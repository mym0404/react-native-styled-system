// import { useContext } from 'react';
//
// import type { ThemedDict } from '../@types/ThemedDict';
// import type { ThemedTypings } from '../@types/ThemedTypings';
// import { StyledSystemContext } from '../provider/StyledSystemProvider';
//
// export type UseSxTokenOptions = {
//   theme?: ThemedDict;
// };
// export const useSxToken = <T extends keyof ThemedTypings>(
//   tokenType: T,
//   tokenValue: string,
//   { theme: optionTheme }: UseSxTokenOptions = {},
// ): undefined | ThemedTypings[T][keyof ThemedTypings[T]] => {
//   const styledSystemContext = useContext(StyledSystemContext);
//
//   const theme = optionTheme ?? styledSystemContext?.theme;
//
//   if (!theme || tokenType! in theme) {
//     return;
//   }
//
//   return theme[tokenType][tokenValue] as any;
// };
