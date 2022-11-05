import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from './src/components/elements/Button';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <TabNavigator />
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

