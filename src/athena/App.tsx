import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, ApolloClientProvider } from './src/components/providers';

import { AuthNavigator } from './src/components/navigation';

/**
 *
 * root of app
 */
export default function App() {
  return (
    <ApolloClientProvider>
      <UserProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <AuthNavigator />
          </SafeAreaProvider>
          <StatusBar style="auto" />
        </NavigationContainer>
      </UserProvider>
    </ApolloClientProvider>
  );
}
