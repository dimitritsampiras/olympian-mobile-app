import React, { useEffect, useState } from 'react';
import { ActiveWorkoutContext } from '../../lib/context';
import { useActiveWorkoutQuery, useFinishWorkoutMutation } from '../../lib/graphql';

/**
 *
 * component prop types
 */
interface ActiveWorkoutProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

/**
 * User provider component
 * Allows all children components to have access to user object
 * @returns
 */
export const ActiveWorkoutProvider: React.FC<ActiveWorkoutProviderProps> = ({ children }) => {
  const { data, refetch } = useActiveWorkoutQuery();
  const [finishWorkout] = useFinishWorkoutMutation();

  const [currentExerciseNumber, setCurrentExerciseNumber] = useState(1);
  const [completed, setCompleted] = useState(0);

  const finishWorkoutHandler = async () => {
    if (!data?.activeWorkout?.id) return;
    await finishWorkout({ variables: { performedWorkoutId: data.activeWorkout.id } });
    await refetch();
  };

  const navigateCurrentExercise = (direction: 'forward' | 'back') => {
    const exerciseLength = data?.activeWorkout?.performedExercises.length;

    if (!exerciseLength) return;
    if (direction === 'forward') {
      setCurrentExerciseNumber((prev) => (prev < exerciseLength ? prev + 1 : prev));
    }
    if (direction === 'back') {
      setCurrentExerciseNumber((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const setCompletedCount = () => {
    setCompleted(
      data?.activeWorkout?.performedExercises
        .flatMap((exercise) => exercise.performedSets)
        .reduce((a, c) => (a += c.completed ? 1 : 0), 0) || 0
    );
  };

  useEffect(() => {
    setCompletedCount();
  }, [data?.activeWorkout]);

  return (
    <ActiveWorkoutContext.Provider
      value={{
        activeWorkout: data?.activeWorkout,
        refetch,
        finishWorkout: finishWorkoutHandler,
        currentExerciseNumber,
        navigateCurrentExercise,
        completed,
        toComplete:
          data?.activeWorkout?.performedExercises.flatMap((exercise) => exercise.performedSets)
            .length || 99,
      }}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
