/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import {
  StyledSystemProvider,
  useConstructThemedStyle,
} from '@mj-studio/react-native-styled-system';

const Box = (props: any) => {
  const { viewStyle } = useConstructThemedStyle(props);

  return <View {...props} {...viewStyle()} style={{ height: 100, width: 100 }} />;
};

function App(): React.JSX.Element {
  return (
    <StyledSystemProvider theme={{ colors: { myColor: 'blue' }, space: {} }}>
      <Box />
    </StyledSystemProvider>
  );
}

export default App;
