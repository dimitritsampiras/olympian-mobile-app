import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, ApolloClientProvider } from './src/components/providers';

import { AuthNavigator } from './src/components/navigation';
import { useState } from 'react';

const ref = createNavigationContainerRef();

/**
 *
 * root of app
 */
export default function App() {
  const [routeName, setRouteName] = useState<string>();

  return (
    <ApolloClientProvider>
      <UserProvider>
        <NavigationContainer
        // ref={ref}
        // onReady={() => {
        //   console.log('ref', ref.getCurrentOptions());

        //   setRouteName(ref.getCurrentRoute()?.name);
        // }}
        // onStateChange={async () => {
        //   const currentRouteName = ref.getCurrentRoute()?.name;
        //   console.log('ref2', ref.getCurrentOptions());
        //   setRouteName(currentRouteName);
        // }}>
        >
          <SafeAreaProvider>
            <AuthNavigator routeName={routeName} />
          </SafeAreaProvider>
          <StatusBar style="auto" />
        </NavigationContainer>
      </UserProvider>
    </ApolloClientProvider>
  );
}
