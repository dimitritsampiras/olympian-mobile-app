import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../components/screens';
import { Settings } from '../components/screens/Settings';

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};
const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};
