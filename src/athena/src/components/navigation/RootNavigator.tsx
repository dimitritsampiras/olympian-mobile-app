import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateProgramStackNavigator } from './CreateProgramNavigator';
import { TabNavigator } from './TabNavigator';

export type RootParamList = {
  'Tabs': undefined;
  'Create Program': undefined;
};

const RootStack = createNativeStackNavigator<RootParamList>();

export const RootStackNavigator: React.FC = () => {
  return (
    <>
      <RootStack.Navigator initialRouteName="Tabs">
        <RootStack.Screen name="Tabs" component={TabNavigator} />
        <RootStack.Screen name="Create Program" component={CreateProgramStackNavigator} />
      </RootStack.Navigator>
    </>
  );
};
