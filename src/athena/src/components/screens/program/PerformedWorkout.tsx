import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Program, usePerformedWorkoutFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';
import { InlineProgram } from '../../containers/InlineProgram';
import { ScreenView } from '../../containers/ScreenView';
import { Heading, SubHeading } from '../../elements';
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
              <View key={i} style={{ marginBottom: 20, ...styles.exerciseCard }}>
                <Heading as="h4">
                  {pe.exercise.staticExercise.name}
                  <SubHeading as="h3">
                    {' '}
                    {pe.exercise.order} of {data.performedWorkoutFromId?.performedExercises.length}
                  </SubHeading>
                </Heading>

                {pe.performedSets.map((set, i) => (
                  <View key={i} style={styles.setCard}>
                    <Text>Set: {i + 1}</Text>
                    <Text>Reps: {set.reps}</Text>
                    <Text>Weight: {set.weight}</Text>
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

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 10,
  },
  setCard: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 22,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
});
