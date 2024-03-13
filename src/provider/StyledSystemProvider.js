import React from 'react';
import { emptyThemedDict } from '../@types/ThemedDict';
export const StyledSystemContext = React.createContext({
    theme: emptyThemedDict,
});
export const StyledSystemProvider = ({ children, theme }) => {
    return React.createElement(StyledSystemContext.Provider, { value: { theme } }, children);
};
//# sourceMappingURL=StyledSystemProvider.js.map