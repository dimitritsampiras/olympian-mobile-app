import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { Button } from '../elements/Button';
import { RootParamList } from '../navigation/RootNavigator';
import { TabParamList } from '../navigation';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { View } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { ExerciseCard } from '../elements/ExerciseCard';

interface HomeProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  //dummy data to be replaced by result of graphql query
  const ExercisesForYou = [
    {
      id: 'exercise1',
      name: 'Bench Grips',
      description: 'test exercise 1',
      sets: 5,
      reps: 4,
      rpe: 10,
      muscles: ['neck'],
    },
    {
      id: 'exercise2',
      name: 'Jumping Jacks',
      description: 'test exercise 2',
      sets: 5,
      reps: 4,
      rpe: 10,
      muscles: ['forearm', 'head'],
    },
  ];

  const handleExerciseCardPress = (exerciseId: string) => {
    //change this to route to exercise page
    console.log(exerciseId);
  };

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <View style={{ paddingTop: 25, paddingBottom: 25 }}>
        <Heading style={{ width: 300 }}>
          Welcome back, {'\n'}
          {user?.name} 👋
        </Heading>
      </View>

      <SubHeading>Exercises For You</SubHeading>
      <HorizontalCardScroller>
        {ExercisesForYou.map((exercise) => (
          <ExerciseCard
            exercise={exercise}
            onPress={handleExerciseCardPress}
            style={{ marginRight: 10 }}></ExerciseCard>
        ))}
      </HorizontalCardScroller>
      <Button onPress={() => navigation.navigate('CreateProgram')}>Create Program</Button>
    </ScreenView>
  );
};
