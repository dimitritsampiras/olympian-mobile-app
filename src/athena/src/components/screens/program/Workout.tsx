import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/mini';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { useWorkoutFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';

import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading } from '../../elements';

import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigator';

type WorkoutProps = NativeStackScreenProps<ProgramParamList, 'Workout'>;

export const Workout: React.FC<WorkoutProps> = ({ route, navigation }) => {
  const { workoutId } = route.params;
  // data
  const { data, loading, error, refetch } = useWorkoutFromIdQuery({
    variables: { workoutId },
  });

  // const [createWorkout, { loading: cwLoading }] = useCreateWorkoutMutation();

  // create new blank workout on add workout button press
  const handleAddExercise = async () => {
    // if (!data?.program) return;
    // const workout = await createWorkout({
    //   variables: { programId },
    // }).then(({ data }) => data?.createWorkout);
    // if (!workout) return;
    navigation.navigate('ExerciseSearch', { workoutId });
  };

  useEffect(() => {
    (async () => {
      await refetch({
        workoutId,
      });
    })();
  }, []);

  if (error) {
    return <BodyText>There was an error</BodyText>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenView>
      <View>
        <Header navigation={navigation}>
          <Heading as="h2" onPress={async () => await refetch()}>
            {data?.workout?.name}
          </Heading>
          <BodyText style={{ fontSize: 12, width: 200 }}>A sample workout description.</BodyText>
        </Header>
      </View>

      <View style={{ marginTop: 40, marginBottom: 150 }}>
        {data?.workout?.exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            // onPress={() => navigation.navigate('Workout', { workoutId: exercise.id })}
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              paddingVertical: 20,
              paddingHorizontal: 16,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: exerciseNumToColor[(exercise.number % 7) as 1 | 2][50],
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  marginRight: 14,
                }}>
                <Text
                  style={{
                    color: exerciseNumToColor[(exercise.number % 7) as 1][500],
                    fontWeight: '600',
                  }}>
                  {exercise.number}
                </Text>
              </View>
              <Text style={{ fontWeight: '600', marginRight: 14, width: 120 }}>
                {exercise.staticExercise.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 45,
                  justifyContent: 'space-between',
                  marginRight: 14,
                }}>
                <Text>{5}</Text>
                <XMarkIcon size={16} fill={theme.colors.gray[400]} />
                <Text>{5}</Text>
              </View>
              <ChevronRightIcon fill={theme.colors.gray[300]} size={18} />
            </View>
          </TouchableOpacity>
        ))}
        <Button variant="flat" colorScheme="info" onPress={handleAddExercise}>
          Add Exercise
        </Button>
      </View>
    </ScreenView>
  );
};

const exerciseNumToColor = {
  0: theme.colors.purple,
  1: theme.colors.violet,
  2: theme.colors.rose,
  3: theme.colors.orange,
  4: theme.colors.lime,
  5: theme.colors.teal,
  6: theme.colors.blue,
  7: theme.colors.purple,
} as const;
