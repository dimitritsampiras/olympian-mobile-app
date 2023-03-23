import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyProfile } from '../screens';
import { FollowingList } from '../screens/profile/FollowingList';
import { FollowersList } from '../screens/profile/FollowersList';

import { Socials } from '../screens/profile/Socials';
import { TabParamList } from './TabNavigator';

export type ProfileParamList = {
  Profile: undefined;
  Goals: undefined;
  Socials: undefined;
  Activity: undefined;
  Account: undefined;
  FollowingList: undefined;
  FollowersList: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileParamList>();

type ProfileNavigatorProps = NativeStackScreenProps<TabParamList, 'ProfileNavigator'>;

export const ProfileNavigator: React.FC<ProfileNavigatorProps> = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={MyProfile} />
      <ProfileStack.Screen name="Socials" component={Socials} />
      <ProfileStack.Screen name="FollowingList" component={FollowingList} />
      <ProfileStack.Screen name="FollowersList" component={FollowersList} />
    </ProfileStack.Navigator>
  );
};
