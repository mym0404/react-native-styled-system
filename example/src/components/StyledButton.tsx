import type { PropsWithChildren, Ref } from 'react';
import React, { forwardRef } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';
import type { SxProps } from '@react-native-styled-system/core';
import { useSx } from '@react-native-styled-system/core';

import { Txt } from './Txt';

type StyledButtonProps = PropsWithChildren<TouchableOpacityProps & SxProps & { title: string }>;

const StyledButton = forwardRef((props: StyledButtonProps, ref: Ref<TouchableOpacity>) => {
  const { getStyle, filteredProps } = useSx(props);

  const { title, ...rest } = filteredProps;

  return (
    <TouchableOpacity accessibilityRole={'button'} ref={ref} style={getStyle()} {...rest}>
      <Txt>{title}</Txt>
    </TouchableOpacity>
  );
});

export { StyledButton };
export type { StyledButtonProps };
