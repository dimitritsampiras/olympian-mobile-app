import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';

import { ScreenView } from '../containers/ScreenView';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Header } from '../containers/Header';
import theme from '../../theme';
import { ActionSheet } from 'react-native-ui-lib';
import { HomeParamList } from '../navigation/HomeNavigator';
import { TabParamList } from '../navigation';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { useStaticExercisesQuery, useUserProgramsQuery } from '../../lib/graphql';
import { Card } from '../containers/Card';
import WeightIcon from '../../../assets/weight.svg';
import WeightIconPurple from '../../../assets/weight2.svg';
import { BodyText, Button, Heading, SubHeading } from '../elements';
import { UserContext } from '../../lib/context';

interface HomeProps extends NativeStackScreenProps<HomeParamList & TabParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data } = useStaticExercisesQuery();

  const [visible, setVisible] = useState(false);

  const handleOnGetStartedPress = () => {
    setVisible(true);
  };

  const handleOnDismiss = () => {
    setVisible(false);
  };

  const programData = useUserProgramsQuery({ fetchPolicy: 'no-cache' });

  return (
    <ScreenView>
      <Header>
        <Heading style={{ width: 300 }}>
          Welcome back, {'\n'}
          {user?.profile?.name.split(' ')[0]} 👋
        </Heading>
      </Header>

      {/* TODO: render most recent Performed Workout instead this if there is one */}

      {programData.data && programData.data.userPrograms.length <= 0 ? (
        <View style={[styles.infoContainer]}>
          <BodyText style={{ marginBottom: 12 }}>
            You have no active programs. Click the button to get started.
          </BodyText>
          <Button variant="ghost" colorScheme="info" onPress={handleOnGetStartedPress}>
            Get Started
          </Button>
        </View>
      ) : (
        <Button
          style={{ paddingBottom: 20 }}
          colorScheme="primary"
          variant="flat"
          onPress={handleOnGetStartedPress}>
          Create Program
        </Button>
      )}

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
