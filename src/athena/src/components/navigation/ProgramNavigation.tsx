import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Program } from '../screens/program/Program';

export type ProgramParamList = {
  Program: undefined;
  Workout: undefined;
};

const ProgramStack = createNativeStackNavigator<ProgramParamList>();

export const ProgramStackNavigator: React.FC = () => {
  return (
    <>
      <ProgramStack.Navigator initialRouteName="Program" screenOptions={{ headerShown: false }}>
        <ProgramStack.Screen name="Program" component={Program} />
        <ProgramStack.Screen name="Workout" component={Program} />
      </ProgramStack.Navigator>
    </>
  );
};
