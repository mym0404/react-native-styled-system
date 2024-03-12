/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from 'react';
import React from 'react';
import { View } from 'react-native';
import type { ThemedViewProps } from '@mj-studio/react-native-styled-system';
import {
  StyledSystemProvider,
  useConstructThemedStyle,
} from '@mj-studio/react-native-styled-system';

import Theme from './Theme.ts';

const Box = (props: PropsWithChildren<ThemedViewProps>) => {
  const { viewStyle } = useConstructThemedStyle(props);

  console.log(JSON.stringify(viewStyle(), null, 2));

  return <View {...props} {...viewStyle()} />;
};

function App(): React.JSX.Element {
  return (
    <StyledSystemProvider theme={Theme}>
      <Box w={'100%'} h={24} bg={'blue100'} mx={4} />
    </StyledSystemProvider>
  );
}

export default App;
