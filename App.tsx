
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/presentation/routes/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
