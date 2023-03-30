import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStaticExercisesQuery } from '../../../lib/graphql';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading, SubHeading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';
import Body, { Muscle } from 'react-native-body-highlighter';
import theme from '../../../theme';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface NewGoalExerciseSearchProps extends NativeStackScreenProps<ProfileParamList, 'NewGoal'> {}

export const NewGoalExerciseSearch: React.FC<NewGoalExerciseSearchProps> = ({
  navigation,
  route,
}) => {
  const { data } = useStaticExercisesQuery({
    fetchPolicy: 'no-cache',
  });
  const handleSetGoal = (staticExerciseId: string) => {
    navigation.navigate('SetGoal');
  };
  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading as="h2">New Goal</Heading>
      </Header>
      <SubHeading>Pick an exercise to set a goal for!</SubHeading>
      {data?.staticExercises &&
        data.staticExercises.map((exercise) => {
          const muscles: string[] = [
            ...[exercise.primaryTargetMuscle],
            ...(exercise.secondaryTargetMuscle ? [exercise.secondaryTargetMuscle] : []),
            ...(exercise.tertiaryTargetMuscle ? [exercise.tertiaryTargetMuscle] : []),
          ];
          return (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => handleSetGoal(exercise.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                paddingVertical: 20,
                paddingHorizontal: 16,
                marginBottom: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 999,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    right: -8,
                    top: 0,
                  }}>
                  <Body
                    scale={0.6}
                    data={muscles.map((m) => ({
                      color: theme.colors.blue[600],
                      slug: m.split('_').join('-'),
                      intensity: 1,
                    }))}
                    frontOnly
                    colors={[theme.colors.blue[600], theme.colors.blue[300]]}
                  />
                </View>
              </View>
              {/* main info column */}
              <View style={{ marginLeft: 15, justifyContent: 'space-between', flex: 1 }}>
                <Text style={{ fontWeight: '700' }}>{exercise.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {muscles.slice(0, muscles.length - 1).map((muscle) => (
                    <View
                      key={muscle}
                      style={{
                        borderWidth: 1,
                        borderColor: theme.colors.gray[200],
                        padding: 3,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 4,
                        marginRight: 4,
                      }}>
                      <Text style={{ color: 'gray', fontSize: 10 }}>{muscle}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {/* chrevron column */}
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRightIcon width={18} fill={theme.colors.gray[200]} />
              </View>
            </TouchableOpacity>
          );
        })}
    </ScreenView>
  );
};
