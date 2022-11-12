import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Home } from '../components/screens';
import { CreateProgram } from '../components/screens/CreateProgram';
import { TabNavigator } from './TabNavigator';

export type RootParamList = {
  Tabs: undefined;
  CreateProgram: undefined;
};

const RootStack = createNativeStackNavigator<RootParamList>();

export const RootStackNavigator: React.FC = () => {
  return (
    <>
      <RootStack.Navigator initialRouteName="Tabs">
        <RootStack.Screen name="Tabs" component={TabNavigator} />
        <RootStack.Screen name="CreateProgram" component={CreateProgram} />
      </RootStack.Navigator>
    </>
  );
};
