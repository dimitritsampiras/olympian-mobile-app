import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { globalstyles } from '../../theme/globalStyles';
import { Home } from '../screens';
import { CreateProgram } from '../screens/createProgram/CreateProgram';
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
