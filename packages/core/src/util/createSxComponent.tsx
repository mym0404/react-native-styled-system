import type { ComponentType } from 'react';
import React, { forwardRef } from 'react';

import type { SxProps, TextSxProps } from '../@types/SxProps';
import type { UseSxOptions } from '../hook/useSx';
import { useSx } from '../hook/useSx';

export function createSxComponent<Props extends object, Ref>(
  Base: ComponentType<Props>,
  { defaultProps, sxOptions }: { defaultProps?: Props & SxProps; sxOptions?: UseSxOptions } = {},
) {
  return () => {
    const Transformed = forwardRef<Ref, Props & SxProps>(function (props, ref) {
      const { filteredProps, getStyle } = useSx({ ...defaultProps, ...props }, sxOptions);

      return <Base {...(filteredProps as any)} style={getStyle()} ref={ref as any} />;
    });

    Transformed.displayName = `Sx.${Base.displayName || Base.name || 'NoName'}`;

    return Transformed;
  };
}

export function createSxTextComponent<Props extends object, Ref>(
  Base: ComponentType<Props>,
  {
    defaultProps,
    sxOptions,
  }: { defaultProps?: Props & TextSxProps; sxOptions?: UseSxOptions } = {},
) {
  return () => {
    const Transformed = forwardRef<Ref, Props & TextSxProps>(function (props, ref) {
      const { filteredProps, getStyle } = useSx(
        { ...defaultProps, ...props },
        { styleType: 'TextStyle', ...sxOptions },
      );

      return <Base {...(filteredProps as any)} style={getStyle()} ref={ref as any} />;
    });

    Transformed.displayName = `Sx.${Base.displayName || Base.name || 'NoName'}`;

    return Transformed;
  };
}
