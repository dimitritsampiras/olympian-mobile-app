import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  BookOpenIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import { Home } from '../screens';
import { Profile } from '../screens/Profile';
import { Programs } from '../screens/program/Programs';
import { Explore } from '../screens/Explore';

export type TabParamList = {
  Home: undefined;
  Programs: undefined;
  Explore: undefined;
  Profile: undefined;
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
        component={Explore}
        options={{ tabBarIcon: GlobeAsiaAustraliaIcon }}
      />
      <Tabs.Screen name="Programs" component={Programs} options={{ tabBarIcon: BookOpenIcon }} />
      <Tabs.Screen name="Profile" component={Profile} options={{ tabBarIcon: UserIcon }} />
    </Tabs.Navigator>
  );
};
