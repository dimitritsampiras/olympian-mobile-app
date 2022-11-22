import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateProgramProvider } from '../providers/CreateProgramProvider';
import { ExerciseSelector } from '../screens/createProgram/ExerciseSelector';
import { ProgramForm } from '../screens/createProgram/ProgramForm';
import { WorkoutForm } from '../screens/createProgram/WorkoutForm';

export type CreateProgramParamList = {
  'Program Form': undefined;
  'Workout Form': undefined;
  'Exercise Selector': undefined;
};

const CreateProgramStack = createNativeStackNavigator<CreateProgramParamList>();

export const CreateProgramStackNavigator: React.FC = () => {
  return (
    <CreateProgramProvider>
      <CreateProgramStack.Navigator initialRouteName="Program Form">
        <CreateProgramStack.Screen name="Program Form" component={ProgramForm} />
        <CreateProgramStack.Screen name="Workout Form" component={WorkoutForm} />
        <CreateProgramStack.Screen name="Exercise Selector" component={ExerciseSelector} />
      </CreateProgramStack.Navigator>
    </CreateProgramProvider>
  );
};
