// react contexts used throughout app

import { createContext } from 'react';
import { ActiveWorkoutQuery, ActiveWorkoutQueryResult, MeQuery, MeQueryResult } from './graphql';
import { CreateProgramInputWithoutUserId } from './types';

/**
 *
 * active workout context
 */
export const ActiveWorkoutContext = createContext({
  activeWorkout: {} as ActiveWorkoutQuery['activeWorkout'],
  refetch: (() => {}) as ActiveWorkoutQueryResult['refetch'],
  finishWorkout: async () => {},
  completed: 0,
  // default value
  toComplete: 99,
  index: 0,
  setIndex: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
});

/**
 *
 * user context
 */
export const UserContext = createContext({
  user: {} as MeQuery['me'],
  refetch: (async () => ({})) as MeQueryResult['refetch'],
});

/**
 * create program context for multi step program context
 */
export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as CreateProgramInputWithoutUserId,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<CreateProgramInputWithoutUserId>>,
});

/**
 *
 * route context for current route of app
 */
export const RouteContext = createContext({
  routeName: '' as string | undefined,
});
