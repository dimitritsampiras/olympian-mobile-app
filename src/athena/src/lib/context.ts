import { createContext } from 'react';
import { ActiveWorkoutQuery, ActiveWorkoutQueryResult, MeQuery, MeQueryResult } from './graphql';
import { CreateProgramInputWithoutUserId } from './types';

/**
 *
 * user context
 */
export const ActiveWorkoutContext = createContext({
  activeWorkout: {} as ActiveWorkoutQuery['activeWorkout'],
  refetch: (() => {}) as ActiveWorkoutQueryResult['refetch'],
  finishWorkout: async () => {},
  completed: 0,
  // default value
  toComplete: 99,
  currentExerciseNumber: 1,
  navigateCurrentExercise: (direction: 'forward' | 'back') => {},
});

export const UserContext = createContext({
  user: {} as MeQuery['me'],
  refetch: (async () => ({})) as MeQueryResult['refetch'],
});

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as CreateProgramInputWithoutUserId,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<CreateProgramInputWithoutUserId>>,
});

/**
 *
 * user context
 */
export const RouteContext = createContext({
  routeName: '' as string | undefined,
});
