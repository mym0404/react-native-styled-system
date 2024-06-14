import type { ComponentProps } from 'react';
import { Image, View } from 'react-native';
import { createSxComponent } from '@react-native-styled-system/core';

export const StyledView = createSxComponent(View)();
export type StyledViewProps = ComponentProps<typeof StyledView>;

export const StyledImage = createSxComponent(Image)();
export type StyledImageProps = ComponentProps<typeof StyledImage>;
