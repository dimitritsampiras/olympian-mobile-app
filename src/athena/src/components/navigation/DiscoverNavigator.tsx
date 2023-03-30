import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TrainingType } from '../../lib/graphql';

import { Discover } from '../screens/Discover';
import { TrainingTypeDiscover } from '../screens/discover/TrainingTypeDiscover';
import { Profile } from '../screens/profile/Profile';
import { ProgramNavigator } from './ProgramNavigator';
import { TabParamList } from './TabNavigator';

export type DiscoverParamList = {
  Discover: undefined;
  // ProgramNavigator: { programId: string };
  TrainingTypeDiscover: { trainingType: TrainingType };
  Profile: { profileId: string };
  ProgramNavigator: { programId: string; back: boolean };
};

const DisoverStack = createNativeStackNavigator<DiscoverParamList>();

type DiscoverStackNavigatorProps = NativeStackScreenProps<TabParamList, 'DiscoverNavigator'>;

export const DiscoverNavigator: React.FC<DiscoverStackNavigatorProps> = ({ route }) => {
  // const {  } = route.params;
  return (
    <DisoverStack.Navigator initialRouteName="Discover" screenOptions={{ headerShown: false }}>
      <DisoverStack.Screen name="Discover" component={Discover} />
      {/* <DisoverStack.Screen name="ProgramNavigator" component={ProgramNavigator} /> */}
      <DisoverStack.Screen name="TrainingTypeDiscover" component={TrainingTypeDiscover} />
      <DisoverStack.Screen name="Profile" component={Profile} />
      <DisoverStack.Screen name="ProgramNavigator" component={ProgramNavigator} />
    </DisoverStack.Navigator>
  );
};
