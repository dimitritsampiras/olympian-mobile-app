import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';

import { Button } from '../elements/Button';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { Header } from '../containers/Header';
import theme from '../../theme';
import { ActionSheet } from 'react-native-ui-lib';
import { BodyText } from '../elements/typography/BodyText';
import { HomeParamList } from '../navigation/HomeNavigator';
import { TabParamList } from '../navigation';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { useStaticExercisesQuery } from '../../lib/graphql';
import { Card } from '../containers/Card';
import WeightIcon from '../../../assets/weight.svg';
import WeightIconPurple from '../../../assets/weight2.svg';

interface HomeProps extends NativeStackScreenProps<HomeParamList & TabParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data } = useStaticExercisesQuery();

  const [visible, setVisible] = useState(false);

  const handleOnPress = () => {
    setVisible(true);
  };

  const handleOnDismiss = () => {
    setVisible(false);
  };

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
      <Header>
        <Heading style={{ width: 300 }}>
          Welcome back, {'\n'}
          {user?.name.split(' ')[0]} 👋
        </Heading>
      </Header>

      <View style={[styles.infoContainer]}>
        <BodyText style={{ marginBottom: 12 }}>
          You have no active programs. Click the button to get started.
        </BodyText>
        <Button variant="ghost" colorScheme="info" onPress={handleOnPress}>
          Get Started
        </Button>
      </View>
      <SubHeading>Trending Exercises</SubHeading>
      <HorizontalCardScroller>
        {data?.staticExercises.map((exercise) => {
          return (
            <Card key={exercise.id} square style={{ marginRight: 16 }}>
              <View style={{ justifyContent: 'flex-end' }}>
                <WeightIcon />
                <View style={{ marginTop: 8 }}>
                  <Heading as="h4" style={{ marginBottom: 5 }}>
                    {exercise.name}
                  </Heading>
                  <BodyText>5x5 @ 8 RPE</BodyText>
                </View>
              </View>
            </Card>
          );
        })}
      </HorizontalCardScroller>
      <SubHeading style={{ marginTop: 32 }}>Workouts to Swap In</SubHeading>
      <HorizontalCardScroller style={{ marginBottom: 150 }}>
        {data?.staticExercises.map((exercise) => {
          return (
            <Card key={exercise.id} square style={{ marginRight: 16 }}>
              <View style={{ justifyContent: 'flex-end' }}>
                <WeightIconPurple />
                <View style={{ marginTop: 8 }}>
                  <Heading as="h4" style={{ marginBottom: 5 }}>
                    {exercise.name}
                  </Heading>
                  <BodyText>5x5 @ 8 RPE</BodyText>
                </View>
              </View>
            </Card>
          );
        })}
      </HorizontalCardScroller>

      {/*
       *
       *
       * action sheet
       *  */}
      <ActionSheet
        title={'Get Started'}
        visible={visible}
        onDismiss={handleOnDismiss}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        containerStyle={{ paddingBottom: 20 } as ViewStyle}
        options={[
          {
            label: 'Create Program From Scratch',
            onPress: () => navigation.navigate('CreateProgram'),
          },
          { label: 'Browse Programs', onPress: () => navigation.navigate('DiscoverNavigator') },
        ]}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: theme.colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: theme.radius.md,
    marginBottom: 24,
  },
});
