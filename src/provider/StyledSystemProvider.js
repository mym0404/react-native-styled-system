import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { emptyThemedDict } from '../@types/ThemedDict';
export const StyledSystemContext = React.createContext({
    theme: emptyThemedDict,
});
export const StyledSystemProvider = ({ children, theme }) => {
    return _jsx(StyledSystemContext.Provider, { value: { theme }, children: children });
};
//# sourceMappingURL=StyledSystemProvider.js.map