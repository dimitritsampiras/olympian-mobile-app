import { createContext } from 'react';
import {
  ActiveWorkoutQuery,
  ActiveWorkoutQueryResult,
  MeQuery,
  MeQueryResult,
  SignUpInput,
} from './graphql';
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
  index: 0,
  setIndex: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
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

export const SignUpContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  signUpInput: {} as Partial<SignUpInput>,
  setSignUpInput: (() => {}) as React.Dispatch<React.SetStateAction<Partial<SignUpInput>>>,
});

/**
 *
 * user context
 */
export const RouteContext = createContext({
  routeName: '' as string | undefined,
});
