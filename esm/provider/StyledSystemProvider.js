import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { emptyThemedDict } from '../@types/ThemedDict.js';

const StyledSystemContext = React.createContext({ theme: emptyThemedDict });
const StyledSystemProvider = ({ children, theme }) => {
    return jsx(StyledSystemContext.Provider, { value: { theme }, children: children });
};

export { StyledSystemContext, StyledSystemProvider };
