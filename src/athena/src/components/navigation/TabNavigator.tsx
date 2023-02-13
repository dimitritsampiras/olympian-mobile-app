import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  BookOpenIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import { Home } from '../screens';
import { Settings } from '../screens/Settings';
import { Browse } from '../screens/Browse';

export type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Settings: undefined;
  Explore: undefined;
  MyPrograms: undefined;
};
const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Home" component={Home} options={{ tabBarIcon: HomeIcon }} />
      <Tabs.Screen
        name="Explore"
        component={Browse}
        options={{ tabBarIcon: GlobeAsiaAustraliaIcon }}
      />
      <Tabs.Screen name="My Programs" component={Home} options={{ tabBarIcon: BookOpenIcon }} />
      <Tabs.Screen name="Profile" component={Settings} options={{ tabBarIcon: UserIcon }} />
    </Tabs.Navigator>
  );
};
