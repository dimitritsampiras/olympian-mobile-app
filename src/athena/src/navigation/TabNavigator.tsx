import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens';
import { Settings } from '../screens/Settings';
import { TabBar } from '../components/containers/TabBar';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../theme';

const Tabs = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor: theme.gray[50]
      }}
      screenOptions={{
        header: ({ route }) => {
          return (
            <View
              style={{
                height: 100,
                marginTop: insets.top,
                padding: 20
              }}
            >
              <Text style={{ fontSize: 35, fontWeight: '700' }}>{route.name}</Text>
            </View>
          );
        }
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};
