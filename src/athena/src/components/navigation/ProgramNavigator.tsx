import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Program } from '../screens/program/Program';
import { Workout } from '../screens/program/Workout';
import { HomeParamList } from './HomeNavigator';

export type ProgramParamList = {
  Program: { programId: string };
  Workout: { workoutId: string };
};

type ProgramStackNavigatorProps = NativeStackScreenProps<HomeParamList, 'ProgramNavigator'>;

const ProgramStack = createNativeStackNavigator<ProgramParamList>();

export const ProgramNavigator: React.FC<ProgramStackNavigatorProps> = ({ route }) => {
  const { programId } = route.params;
  return (
    <>
      <ProgramStack.Navigator initialRouteName="Program" screenOptions={{ headerShown: false }}>
        <ProgramStack.Screen name="Program" component={Program} initialParams={{ programId }} />
        <ProgramStack.Screen name="Workout" component={Workout} />
        {/* <ProgramStack.Screen name="Workout" component={Workout} /> */}
      </ProgramStack.Navigator>
    </>
  );
};
