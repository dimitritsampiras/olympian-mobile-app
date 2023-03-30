import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActiveWorkoutContext } from '../../lib/context';
import {
  ActiveWorkoutQuery,
  ExerciseHistoryQuery,
  useUpdateCompletionStatusMutation,
} from '../../lib/graphql';
import theme from '../../theme';
import { Heading, SubHeading } from '../elements';
import { ExerciseOrder } from '../elements/display/ExerciseOrder';
import { Card } from './Card';
import { PerformedSet } from './PerformedSet';

interface CurrentExerciseProps {
  currentExercise: NonNullable<ActiveWorkoutQuery['activeWorkout']>['performedExercises'][0];
  exerciseHistory?: ExerciseHistoryQuery['exerciseHistory'];
}

export const CurrentExercise: React.FC<CurrentExerciseProps> = ({
  currentExercise,
  exerciseHistory,
}) => {
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
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: theme.colors.gray[100],
            marginVertical: 12,
          }}
        />
        <View style={{ marginTop: 22 }}>
          <SubHeading>History</SubHeading>
          <View style={{ overflow: 'hidden' }}>
            {exerciseHistory?.map((pe) => (
              <Card
                key={pe.id}
                style={{
                  backgroundColor: theme.colors.gray[50],
                  marginBottom: 10,
                  flexDirection: 'row',
                }}>
                <Text>{pe.performedSets.map((e) => `${e.reps}, `)}</Text>
                <Text> @ </Text>
                <Text>{pe.performedSets.map((e) => `${e.weight}, `)}</Text>
              </Card>
            ))}
          </View>
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
