import React from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';
import type { TextSxProps } from 'react-native-themed-styled-system';
import { useSx } from 'react-native-themed-styled-system';

type TxtProps = {} & TextSxProps & TextProps;

const Txt = (props: TxtProps) => {
  const { getStyle, filteredProps } = useSx(props, { styleType: 'TextStyle' });

  return (
    <Text style={getStyle({ color: 'white', includeFontPadding: false })} {...filteredProps} />
  );
};

export { Txt };
export type { TxtProps };
