/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import {
  StyledSystemProvider,
  useConstructThemedStyle,
} from '@mj-studio/react-native-styled-system';

import type { ThemedViewProps } from '../../src/@types/ThemedProps';

const Box = (props: ThemedViewProps & ViewStyle) => {
  const { viewStyle } = useConstructThemedStyle(props);

  return <View {...props} {...viewStyle()} style={{ height: 100, width: 100 }} />;
};

function App(): React.JSX.Element {
  return (
    <StyledSystemProvider theme={{ colors: { myColor: 'blue' }, space: {} }}>
      <Box bg={'myColor'} />
    </StyledSystemProvider>
  );
}

export default App;
