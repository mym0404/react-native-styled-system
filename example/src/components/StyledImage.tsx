import type { PropsWithChildren, Ref } from 'react';
import React, { forwardRef } from 'react';
import type { ImageProps, ImageStyle } from 'react-native';
import { Image } from 'react-native';
import type { SxProps } from '@react-native-styled-system/core';
import { useSx } from '@react-native-styled-system/core';

type StyledImageProps = PropsWithChildren<ImageProps & SxProps>;

const StyledImage = forwardRef((props: StyledImageProps, ref: Ref<Image>) => {
  const { getStyle, filteredProps } = useSx<ImageStyle>(props);

  return <Image ref={ref} style={getStyle()} {...filteredProps} />;
});

export { StyledImage };
export type { StyledImageProps };
