/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { ViewStyle } from 'react-native';
import { useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StyledSystemProvider theme={{ colors: { red: 'blue' }, space: {} }}>
      <Box bg={'red'} />
    </StyledSystemProvider>
  );
}

export default App;
