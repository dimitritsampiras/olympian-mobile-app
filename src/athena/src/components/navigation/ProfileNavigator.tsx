import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyProfile } from '../screens';
import { FollowingList } from '../screens/profile/FollowingList';
import { FollowersList } from '../screens/profile/FollowersList';

import { Socials } from '../screens/profile/Socials';
import { TabParamList } from './TabNavigator';
import { Profile } from '../screens/profile/Profile';
import { ProgramNavigator } from './ProgramNavigator';

export type ProfileParamList = {
  MyProfile: undefined;
  Goals: undefined;
  Socials: undefined;
  Activity: undefined;
  Account: undefined;
  FollowingList: undefined;
  FollowersList: undefined;
  Profile: { profileId: string };
  ProgramNavigator: { programId: string; back: boolean };
};

const ProfileStack = createNativeStackNavigator<ProfileParamList>();

type ProfileNavigatorProps = NativeStackScreenProps<TabParamList, 'ProfileNavigator'>;

export const ProfileNavigator: React.FC<ProfileNavigatorProps> = () => {
  return (
    <ProfileStack.Navigator initialRouteName="MyProfile" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyProfile" component={MyProfile} />
      <ProfileStack.Screen name="Socials" component={Socials} />
      <ProfileStack.Screen name="FollowingList" component={FollowingList} />
      <ProfileStack.Screen name="FollowersList" component={FollowersList} />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="ProgramNavigator"
        component={ProgramNavigator}
        initialParams={{ back: true }}
      />
    </ProfileStack.Navigator>
  );
};
