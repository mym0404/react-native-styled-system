import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useStableCallback } from '../internal/useStableCallback.js';
import { StyledSystemContext } from '../provider/StyledSystemProvider.js';

const useConstructThemedStyle = (props) => {
    const styledSystemContext = useContext(StyledSystemContext);
    const styleProp = !props.style ? {} : StyleSheet.flatten(props.style);
    const parseColor = (token) => {
        if (!token || !styledSystemContext) {
            return;
        }
        return styledSystemContext.theme.colors[token];
    };
    // const parseSpace = (token: Token<'space'>): number => {};
    const viewStyle = useStableCallback(() => {
        const backgroundColor = styleProp.backgroundColor ?? parseColor(props.backgroundColor ?? props.bg);
        return {
            backgroundColor,
        };
    });
    return { viewStyle };
};

export { useConstructThemedStyle };
