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
import { Programs } from '../screens/program/Programs';
import { Browse } from '../screens/Browse';
import { StaticExercise } from '../screens/staticExercise/StaticExercise';

export type TabParamList = {
  Home: undefined;
  Programs: undefined;
  Explore: undefined;
  Profile: undefined;
  StaticExercise: undefined;
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
      <Tabs.Screen name="Programs" component={Programs} options={{ tabBarIcon: BookOpenIcon }} />
      <Tabs.Screen name="Profile" component={Settings} options={{ tabBarIcon: UserIcon }} />
      <Tabs.Screen
        name="Static Exercise"
        component={StaticExercise}
        options={{ tabBarIcon: BookOpenIcon }}
      />
    </Tabs.Navigator>
  );
};
