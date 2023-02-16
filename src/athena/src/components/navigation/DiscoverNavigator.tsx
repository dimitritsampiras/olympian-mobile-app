import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Discover } from '../screens/Browse';

import { ProgramNavigator } from './ProgramNavigator';
import { TabParamList } from './TabNavigator';

export type DiscoverParamList = {
  Discover: undefined;
  ProgramNavigator: { programId: string };
};

const DisoverStack = createNativeStackNavigator<DiscoverParamList>();

type DiscoverStackNavigatorProps = NativeStackScreenProps<TabParamList, 'DiscoverNavigator'>;

export const DiscoverNavigator: React.FC<DiscoverStackNavigatorProps> = ({ route }) => {
  // const {  } = route.params;
  return (
    <DisoverStack.Navigator initialRouteName="Discover" screenOptions={{ headerShown: false }}>
      <DisoverStack.Screen name="Discover" component={Discover} />
      <DisoverStack.Screen name="ProgramNavigator" component={ProgramNavigator} />
    </DisoverStack.Navigator>
  );
};
