import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens';
import { Settings } from '../screens/Settings';
import { Browse } from '../screens/Browse';

export type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Settings: undefined;
};
const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Browse" component={Browse} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};
