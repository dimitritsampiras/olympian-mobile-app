import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading, SubHeading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';
import { View, Text } from 'react-native';
import { GoalCard, GoalCardProps } from '../../containers/GoalCard';
import { Button } from '../../elements';
import { useMyGoalsQuery, useStaticExerciseFromIdQuery } from '../../../lib/graphql';
import { UserContext } from '../../../lib/context';
import { useIsFocused } from '@react-navigation/native';

interface GoalsProps extends NativeStackScreenProps<ProfileParamList, 'Goals'> {}

export const Goals: React.FC<GoalsProps> = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const profileId = route.params.profileId;
  const { data, refetch } = useMyGoalsQuery({ variables: { profileId } });

  useEffect(() => {
      isFocused && (async () => {await refetch()})();
  }, [isFocused]);
  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading>Goals</Heading>
      </Header>
      <View>
        {data?.myGoals.map(({ staticExercise, weight, reps }) => {
          return (
            <>
              <GoalCard
                exercise={staticExercise!.name}
                weight={weight}
                reps={reps}
                unit={'lb'}></GoalCard>
            </>
          );
        })}
        <Button
          style={{ paddingBottom: 20 }}
          colorScheme="primary"
          variant="flat"
          onPress={() => {
            navigation.navigate('NewGoal', { profileId });
          }}>
          Set New Goal
        </Button>
        {/* <Card
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            height: 80,
            backgroundColor: theme.colors.gray[100],
          }}>
          <TrophyIcon size={30} color={'grey'} style={{ marginRight: 60 }} />
          <View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Set New Goal</Text>
          </View>
        </Card> */}
      </View>
    </ScreenView>
  );
};
