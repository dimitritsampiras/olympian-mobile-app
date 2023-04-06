import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProgram } from '../screens/createProgram/CreateProgram';
import { Profile } from '../screens/profile/Profile';
import { Programs } from '../screens/Programs';

import { ProgramNavigator } from './ProgramNavigator';
import { TabParamList } from './TabNavigator';

export type MyProgramsParamList = {
  MyPrograms: undefined;
  CreateProgram: undefined;
  ProgramNavigator: { programId: string; back: boolean };
  Profile: { profileId: string };
};

const MyProgramsStack = createNativeStackNavigator<MyProgramsParamList>();

type MyProgramsStackNavigatorProps = NativeStackScreenProps<TabParamList, 'MyProgramsNavigator'>;

/**
 * navigator for programs
 */
export const MyProgramsNavigator: React.FC<MyProgramsStackNavigatorProps> = ({ route }) => {
  // const {  } = route.params;
  return (
    <MyProgramsStack.Navigator initialRouteName="MyPrograms" screenOptions={{ headerShown: false }}>
      <MyProgramsStack.Screen name="MyPrograms" component={Programs} />
      <MyProgramsStack.Screen name="CreateProgram" component={CreateProgram} />
      <MyProgramsStack.Screen
        name="ProgramNavigator"
        component={ProgramNavigator}
        initialParams={{ back: true }}
      />
    </MyProgramsStack.Navigator>
  );
};
