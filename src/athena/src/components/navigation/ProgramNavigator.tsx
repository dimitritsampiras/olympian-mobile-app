import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExerciseSearch } from '../screens/program/ExerciseSearch';
import { Program } from '../screens/program/Program';
import { StaticExercise } from '../screens/program/StaticExercise';
import { Workout } from '../screens/program/Workout';
import { HomeParamList } from './HomeNavigator';
import { MyProgramsParamList } from './MyProgramsNavigator';

export type ProgramParamList = {
  Program: { programId: string; back?: boolean };
  Workout: { workoutId: string };
  ExerciseSearch: { workoutId: string };
  StaticExercise: { workoutId: string; staticExerciseId: string };
};

type ProgramStackNavigatorProps = NativeStackScreenProps<
  HomeParamList & MyProgramsParamList,
  'ProgramNavigator'
>;

const ProgramStack = createNativeStackNavigator<ProgramParamList>();

export const ProgramNavigator: React.FC<ProgramStackNavigatorProps> = ({ route }) => {
  const { programId, back } = route.params;
  return (
    <>
      <ProgramStack.Navigator initialRouteName="Program" screenOptions={{ headerShown: false }}>
        <ProgramStack.Screen
          name="Program"
          component={Program}
          initialParams={{ programId, back }}
        />
        <ProgramStack.Screen name="Workout" component={Workout} />
        <ProgramStack.Screen name="ExerciseSearch" component={ExerciseSearch} />
        <ProgramStack.Screen name="StaticExercise" component={StaticExercise} />
        {/* <ProgramStack.Screen name="Workout" component={Workout} /> */}
      </ProgramStack.Navigator>
    </>
  );
};
