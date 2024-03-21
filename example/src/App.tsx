import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home } from './screen/Home';
import { AppThemeProvider } from './theme/AppThemeProvider';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <Home />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
