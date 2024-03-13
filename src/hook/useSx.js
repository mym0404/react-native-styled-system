import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { allPropNameList } from '../@types/SxProps';
import { useStableCallback } from '../internal/useStableCallback';
import { StyledSystemContext } from '../provider/StyledSystemProvider';
import { propsToThemedStyle } from '../util/propsToThemedStyle';
export const useSx = (props) => {
    const styledSystemContext = useContext(StyledSystemContext);
    const styleProp = !props.style ? undefined : StyleSheet.flatten(props.style);
    const viewStyle = useStableCallback((sx) => {
        const mergedSx = { ...sx, ...props, ...props.sx };
        return propsToThemedStyle({
            theme: styledSystemContext?.theme,
            sx: mergedSx,
            baseStyle: styleProp,
        });
    });
    const filteredProps = useMemo(() => {
        const ret = { ...props };
        allPropNameList.forEach((keyName) => delete ret[keyName]);
        return ret;
    }, [props]);
    return { viewStyle, filteredProps };
};
//# sourceMappingURL=useSx.js.map