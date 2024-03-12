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

  return <View {...props} {...viewStyle()} style={{ height: 100, width: 100 }} />;
};

function App(): React.JSX.Element {
  return (
    <StyledSystemProvider theme={Theme}>
      <Box bg={'violet700'} mt={2}>
        <Box w={24} h={24} bg={'blue100'} />
      </Box>
    </StyledSystemProvider>
  );
}

export default App;
