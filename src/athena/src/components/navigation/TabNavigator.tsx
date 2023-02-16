import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  BookOpenIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import { Profile } from '../screens/Profile';

import { HomeNavigator } from './HomeNavigator';
import { DiscoverNavigator } from './DiscoverNavigator';
import { MyProgramsNavigator } from './MyProgramsNavigator';

export type TabParamList = {
  HomeNavigator: undefined;
  MyProgramsNavigator: undefined;
  DiscoverNavigator: undefined;
  Profile: undefined;
  // StaticExercise: undefined;
};
const Tabs = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = (props) => {
  console.log('props', props);

  return (
    <Tabs.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="DiscoverNavigator"
        component={DiscoverNavigator}
        options={{ tabBarIcon: GlobeAsiaAustraliaIcon }}
      />
      <Tabs.Screen
        name="MyProgramsNavigator"
        component={MyProgramsNavigator}
        options={{ tabBarIcon: BookOpenIcon }}
      />
      <Tabs.Screen name="Profile" component={Profile} options={{ tabBarIcon: UserIcon }} />
      {/* <Tabs.Screen
        name="StaticExercise"
        component={StaticExercise}
        options={{ tabBarIcon: BookOpenIcon }}
      /> */}
    </Tabs.Navigator>
  );
};
