import type { PropsWithChildren, Ref } from 'react';
import React, { forwardRef } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import type { SxProps } from '@react-native-styled-system/core';
import { useSx } from '@react-native-styled-system/core';

type StyledViewProps = PropsWithChildren<ViewProps & SxProps>;

const StyledView = forwardRef((props: StyledViewProps, ref: Ref<View>) => {
  const { getStyle, filteredProps } = useSx(props);

  return <View ref={ref} style={getStyle()} {...filteredProps} />;
});

export { StyledView };
export type { StyledViewProps };
