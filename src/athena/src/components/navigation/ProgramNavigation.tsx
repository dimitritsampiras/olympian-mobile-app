import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Program } from '../screens/program/Program';
import { Workout } from '../screens/program/Workout';
import { RootParamList } from './RootNavigator';

export type ProgramParamList = {
  Program: { programId: string };
  Workout: { workoutId: string };
};

type ProgramStackNavigatorProps = NativeStackScreenProps<RootParamList, 'ProgramNavigator'>;

const ProgramStack = createNativeStackNavigator<ProgramParamList>();

export const ProgramStackNavigator: React.FC<ProgramStackNavigatorProps> = ({ route }) => {
  const { programId } = route.params;
  return (
    <>
      <ProgramStack.Navigator initialRouteName="Program" screenOptions={{ headerShown: false }}>
        <ProgramStack.Screen name="Program" component={Program} initialParams={{ programId }} />
        <ProgramStack.Screen name="Workout" component={Workout} />
      </ProgramStack.Navigator>
    </>
  );
};
