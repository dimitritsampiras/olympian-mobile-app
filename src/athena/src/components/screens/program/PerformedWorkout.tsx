import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Program, usePerformedWorkoutFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';
import { InlineProgram } from '../../containers/InlineProgram';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { Calendar } from '../../elements/display/Calendar';
import { HomeParamList } from '../../navigation/HomeNavigator';

interface PerformedWorkoutProps extends NativeStackScreenProps<HomeParamList, 'PerformedWorkout'> {}

export const PerformedWorkout: React.FC<PerformedWorkoutProps> = ({ navigation, route }) => {
  const { data } = usePerformedWorkoutFromIdQuery({
    variables: { id: route.params.performedWorkoutId },
  });

  return (
    <ScreenView>
      {data?.performedWorkoutFromId?.id ? (
        <>
          <Header navigation={navigation}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar iso={data.performedWorkoutFromId.createdAt} />
              <View style={{ marginLeft: 10 }}>
                <Heading as="h2" noMargin>
                  {data.performedWorkoutFromId.workout.name}
                </Heading>
              </View>
            </View>
          </Header>
          <View style={{ marginVertical: 20 }}>
            <InlineProgram
              program={data.performedWorkoutFromId.program as Program}
              onPress={() =>
                navigation.navigate('ProgramNavigator', {
                  programId: data?.performedWorkoutFromId?.program.id || '',
                  back: true,
                })
              }
            />
          </View>
          <View>
            {data.performedWorkoutFromId.performedExercises.map((pe, i) => (
              <View key={i} style={{ marginBottom: 20 }}>
                <Text>{pe.exercise.staticExercise.name}</Text>
                <Text>
                  {pe.exercise.order} of {data.performedWorkoutFromId?.performedExercises.length}
                </Text>
                {pe.performedSets.map((set, i) => (
                  <View key={i}>
                    <Text>Reps {set.reps}</Text>
                    <Text>Weight {set.weight}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>couldnt find workout of id {route.params.performedWorkoutId}</Text>
      )}
    </ScreenView>
  );
};
