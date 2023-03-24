import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  BookOpenIcon,
  UserIcon,
} from 'react-native-heroicons/solid';

import { HomeNavigator } from './HomeNavigator';
import { DiscoverNavigator } from './DiscoverNavigator';
import { MyProgramsNavigator } from './MyProgramsNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from './AuthNavigation';
import { TabBar } from '../containers/TabBar';
import { ProfileNavigator } from './ProfileNavigator';

export type TabParamList = {
  HomeNavigator: undefined;
  MyProgramsNavigator: undefined;
  DiscoverNavigator: undefined;
  ProfileNavigator: undefined;
};
const Tabs = createBottomTabNavigator<TabParamList>();
type TabStackNavigatorProps = NativeStackScreenProps<AuthParamList, 'Tabs'>;

export const TabNavigator: React.FC<TabStackNavigatorProps> = ({ route }) => {
  return (
    <Tabs.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <TabBar {...props} />}>
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
      <Tabs.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{ tabBarIcon: UserIcon }}
      />
    </Tabs.Navigator>
  );
};
