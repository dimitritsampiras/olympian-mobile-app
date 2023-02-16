import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Programs } from '../screens/Programs';

import { ProgramNavigator } from './ProgramNavigator';
import { TabParamList } from './TabNavigator';

export type MyProgramsParamList = {
  MyPrograms: undefined;
  ProgramNavigator: { programId: string };
};

const MyProgramsStack = createNativeStackNavigator<MyProgramsParamList>();

type MyProgramsStackNavigatorProps = NativeStackScreenProps<TabParamList, 'MyProgramsNavigator'>;

export const MyProgramsNavigator: React.FC<MyProgramsStackNavigatorProps> = ({ route }) => {
  // const {  } = route.params;
  return (
    <MyProgramsStack.Navigator initialRouteName="MyPrograms" screenOptions={{ headerShown: false }}>
      <MyProgramsStack.Screen name="MyPrograms" component={Programs} />
      <MyProgramsStack.Screen name="ProgramNavigator" component={ProgramNavigator} />
    </MyProgramsStack.Navigator>
  );
};
