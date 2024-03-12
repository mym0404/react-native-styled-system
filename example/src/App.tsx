/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {ViewStyle} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {StyledSystemProvider} from '@mj-studio/react-native-styled-system';

import {useConstructThemedStyle} from '../../src';
import type {ThemedViewProps} from '../../src/@types/ThemedProps';

const Box = (props: ThemedViewProps & ViewStyle) => {
  const {viewStyle} = useConstructThemedStyle(props);

  return <View {...props} {...viewStyle()} />;
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StyledSystemProvider theme={{colors: {}, space: {}}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior={'automatic'}
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          />
          <Box />
        </ScrollView>
      </SafeAreaView>
    </StyledSystemProvider>
  );
}

export default App;
