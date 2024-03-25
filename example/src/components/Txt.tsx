import React from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';
import type { TextSxProps } from 'react-native-themed-styled-system';
import { useSx } from 'react-native-themed-styled-system';

type TxtProps = {} & TextSxProps & TextProps;

const Txt = (props: TxtProps) => {
  const { getStyle, filteredProps } = useSx(props, {
    styleType: 'TextStyle',
    fallback: { color: 'text', includeFontPadding: false },
  });

  return <Text style={getStyle()} {...filteredProps} />;
};

export { Txt };
export type { TxtProps };
