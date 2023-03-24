import React, { useContext, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import theme from '../../theme';
import { ActiveWorkoutContext } from '../../lib/context';

import { CurrentExercise } from './CurrentExercise';

import { useExerciseHistoryQuery } from '../../lib/graphql';

interface PlayerProps {
  onPress?: () => void;
}

export const Player: React.FC<PlayerProps> = () => {
  const insets = useSafeAreaInsets();
  const { activeWorkout, index, setIndex } = useContext(ActiveWorkoutContext);

  // const [currentExercise, setCurrentExercise] = useState(activeWorkout?.performedExercises[index]);

  // const currentExercise = activeWorkout?.performedExercises.find(
  //   (pe) => pe.exercise.order === currentExerciseNumber
  // );

  const { data: ehData, refetch } = useExerciseHistoryQuery({
    variables: {
      exerciseId: activeWorkout?.performedExercises[index]?.exercise.id || '',
      currentPerformedExercise: activeWorkout?.performedExercises[index]?.id,
    },
  });

  const handleIndexChange = async (index: number) => {
    setIndex(index);
    await refetch({
      exerciseId: activeWorkout?.performedExercises[index]?.exercise.id || '',
      currentPerformedExercise: activeWorkout?.performedExercises[index]?.id,
    });
  };

  return (
    <View style={[styles.player, { paddingTop: insets.top }]}>
      {activeWorkout && activeWorkout?.performedExercises[index] && (
        <View style={{ height: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.progress} />
          </View>
          <View style={{ marginTop: 14, flex: 1 }}>
            <Text style={styles.workoutTitle}>{activeWorkout.workout.name}</Text>
            <Swiper
              loop={false}
              showsPagination={false}
              index={index}
              onIndexChanged={handleIndexChange}>
              {activeWorkout.performedExercises.map((pe) => (
                <CurrentExercise
                  currentExercise={pe}
                  key={pe.id}
                  exerciseHistory={ehData?.exerciseHistory}
                />
              ))}
            </Swiper>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 34,
    shadowColor: '#00000036',
    shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 2 : 3 },
    shadowOpacity: 0.23,
    shadowRadius: 12.62,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  progress: {
    backgroundColor: theme.colors.gray[200],
    height: 5,
    width: 40,
    borderRadius: 999,
  },
  workoutTitle: {
    color: theme.colors.gray[500],
    marginBottom: 18,
    paddingHorizontal: 22,
  },
});
