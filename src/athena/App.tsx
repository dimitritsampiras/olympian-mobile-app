import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, ApolloClientProvider } from './src/components/providers';

import { AuthNavigator } from './src/components/navigation';
import { ActiveWorkoutProvider } from './src/components/providers/ActiveWorkout';
import { NavigatorProvider } from './src/components/providers/NavigatorProvider';

import { AssetProvider } from './src/components/providers/AssetProvider';

/**
 *
 * root of app
 */
export default function App() {
  return (
    <ApolloClientProvider>
      <AssetProvider>
        <UserProvider>
          <NavigatorProvider>
            <ActiveWorkoutProvider>
              <SafeAreaProvider>
                <AuthNavigator />
              </SafeAreaProvider>
            </ActiveWorkoutProvider>
            <StatusBar style="auto" />
          </NavigatorProvider>
        </UserProvider>
      </AssetProvider>
    </ApolloClientProvider>
  );
}
