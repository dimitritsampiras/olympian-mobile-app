import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActiveWorkoutContext } from '../../lib/context';
import { ActiveWorkoutQuery, useUpdateCompletionStatusMutation } from '../../lib/graphql';
import theme from '../../theme';
import { Heading } from '../elements';
import { ExerciseOrder } from '../elements/display/ExerciseOrder';
import { PerformedSet } from './PerformedSet';

interface CurrentExerciseProps {
  currentExercise: NonNullable<ActiveWorkoutQuery['activeWorkout']>['performedExercises'][0];
}

export const CurrentExercise: React.FC<CurrentExerciseProps> = ({ currentExercise }) => {
  const [expandedSetId, setExpandedSetId] = useState<string>();
  const { refetch } = useContext(ActiveWorkoutContext);
  const [completeSet] = useUpdateCompletionStatusMutation();

  const handleCompleteSet = async ({
    id: performedSetId,
    completed,
  }: {
    id: string;
    completed: boolean;
  }) => {
    await completeSet({ variables: { performedSetId, currentStatus: completed } });
    await refetch();
  };

  return (
    <View style={{ paddingHorizontal: 22 }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ExerciseOrder order={currentExercise?.exercise.order} />
        <Heading as="h2" style={{ color: theme.colors.gray[900], width: 200 }}>
          {currentExercise?.exercise.staticExercise.name}
        </Heading>
      </View>
      <View>
        <View style={styles.setContainer}>
          {[...currentExercise.performedSets]
            .sort((a, b) => a.set.number - b.set.number)
            .map((pe) => (
              <>
                <PerformedSet
                  key={pe.id}
                  performedSet={pe}
                  setExpandedSetId={setExpandedSetId}
                  expandedSetId={expandedSetId}
                  completeSet={() => handleCompleteSet(pe)}
                />
              </>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  set: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setValue: {
    fontSize: 25,
  },
  setLabel: {
    fontSize: 11,
    color: theme.colors.gray[500],
  },
});
