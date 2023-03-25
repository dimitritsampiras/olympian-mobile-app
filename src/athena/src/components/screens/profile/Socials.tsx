import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { ActiveFollowersQuery, Profile, useActiveFollowersQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading, SubHeading } from '../../elements';
import { ProfileName } from '../../elements/display/ProfileName';
import { HomeParamList } from '../../navigation/HomeNavigator';
import { ProfileParamList } from '../../navigation/ProfileNavigator';

interface SocialsProps
  extends NativeStackScreenProps<ProfileParamList | HomeParamList, 'Socials'> {}

export const Socials: React.FC<SocialsProps> = ({ navigation }) => {
  const { data: activeData } = useActiveFollowersQuery({
    pollInterval: 2000,
  });
  const { data: followerData } = useActiveFollowersQuery();

  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading>Socials</Heading>
        <SubHeading as="h3">Live view</SubHeading>
      </Header>
      {activeData?.activeFollowers && activeData?.activeFollowers.length > 0 ? (
        activeData?.activeFollowers.map((performedWorkout, i) => (
          <View
            key={i}
            style={{
              borderBottomColor: theme.colors.gray[50],
              borderBottomWidth: 1,
              marginBottom: 14,
            }}>
            <ProfileName profile={performedWorkout.profile as Profile} />
            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: theme.colors.emerald[400],
                  height: 5,
                  width: 5,
                  marginRight: 7,
                }}
              />
              <Heading as="h4">{performedWorkout.workout.name}</Heading>
              <Text style={{ color: theme.colors.gray[500] }}>
                {'  • '} {getLatestExcerise(performedWorkout)?.exercise.staticExercise.name}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text>none of the people you follow are active</Text>
      )}
    </ScreenView>
  );
};

const getLatestExcerise = (activeFollow: ActiveFollowersQuery['activeFollowers'][0]) => {
  const sets = activeFollow.performedExercises.flatMap((exercise) => exercise.performedSets);

  const latestSet = sets.sort((a, b) => a.completedAt - b.completedAt)[0];
  const latestExercise = activeFollow.performedExercises.filter(
    (e) => e.performedSets.find((set) => set.id === latestSet?.id) !== null
  )[0];
  return latestExercise;
};
