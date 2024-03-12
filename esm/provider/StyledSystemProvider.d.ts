import type { ReactElement } from 'react';
import React from 'react';
import type { ThemedDict } from '../@types/ThemedDict';
type ContextType = {
    theme: ThemedDict;
};
export declare const StyledSystemContext: React.Context<ContextType>;
type Props = {
    children: ReactElement | null;
    theme: ThemedDict;
};
export declare const StyledSystemProvider: ({ children, theme }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
