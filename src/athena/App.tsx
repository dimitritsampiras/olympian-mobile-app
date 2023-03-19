import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, ApolloClientProvider } from './src/components/providers';

import { AuthNavigator } from './src/components/navigation';
import { ActiveWorkoutProvider } from './src/components/providers/ActiveWorkout';
import { NavigatorProvider } from './src/components/providers/NavigatorProvider';

const ref = createNavigationContainerRef();

/**
 *
 * root of app
 */
export default function App() {
  return (
    <ApolloClientProvider>
      <UserProvider>
        {/* <NavigationContainer
          ref={ref}
          onReady={() => {
            console.log(ref.getCurrentRoute()?.name);
          }}
          onStateChange={async () => {
            console.log(ref.getCurrentRoute()?.name);
          }}> */}
        <NavigatorProvider>
          <ActiveWorkoutProvider>
            <SafeAreaProvider>
              <AuthNavigator />
            </SafeAreaProvider>
          </ActiveWorkoutProvider>
          <StatusBar style="auto" />
        </NavigatorProvider>
        {/* </NavigationContainer> */}
      </UserProvider>
    </ApolloClientProvider>
  );
}
