import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/components/providers';
import { AuthNavigator } from './src/components/navigation';
import { ApolloClientProvider } from './src/components/providers/ApolloClientProvider';

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
