import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLongLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import _ from 'lodash';

import { Publicity, useCreateProgramMutation } from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading, SubHeading } from '../../elements';

import { HomeParamList } from '../../navigation/HomeNavigator';
import { UserContext } from '../../../lib/context';
import { useIsFocused } from '@react-navigation/native';
import { FriendActivityCard } from './FriendActivityCard';

type FriendsActivityProps = NativeStackScreenProps<HomeParamList, 'FriendsActivity'>;

/**
 *
 * Create Program Multi-page form
 */
export const FriendsActivity: React.FC<FriendsActivityProps> = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const focused = useIsFocused();
  console.log(focused, route.name);

  //use query to get list of friends and their last/current exercise
  //   const { data } = useQuery({ fetchPolicy: 'no-cache' });

  const data = [
    {
      id: 'id_1',
      user: {
        name: 'John',
        profileColor: 'blue',
      },
      active: true,
      workout: {
        id: '1',
        name: 'Bench',
      },
    },
    {
      id: 'id_2',
      user: {
        name: 'Yuviboo T. Louise',
        profileColor: 'red',
      },
      active: false,
      workout: {
        id: '3',
        name: 'Rip Curls',
      },
    },
    {
      id: 'id_3',
      user: {
        name: 'Mary',
        profileColor: 'green',
      },
      active: true,
      workout: {
        id: '2',
        name: 'Squats',
      },
    },
  ];

  const handlePressFriendActivityCard = (id: string) => {
    console.log(id);
  };

  const activeFriendData = data.filter((user) => user.active);
  const inactiveFriendData = data.filter((user) => !user.active);

  return (
    <ScreenView>
      <View>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 10, paddingTop: 0 }}>
            <ArrowLongLeftIcon stroke={theme.colors.gray[700]} />
          </TouchableOpacity>
          <Heading style={{ width: 300, textTransform: 'capitalize' }}>Friends Activity</Heading>
        </View>

        <SubHeading style={{ marginTop: 10 }}>Active</SubHeading>
        {activeFriendData?.map((friendActivityData) => (
          <FriendActivityCard
            key={friendActivityData.id}
            friendActivityData={friendActivityData}
            style={{ marginBottom: 8 }}
            onPress={() =>
              handlePressFriendActivityCard(friendActivityData.id)
            }></FriendActivityCard>
        ))}

        <SubHeading style={{ marginTop: 10 }}>Inactive</SubHeading>
        {inactiveFriendData?.map((friendActivityData) => (
          <FriendActivityCard
            key={friendActivityData.id}
            friendActivityData={friendActivityData}
            style={{ marginBottom: 8 }}
            onPress={() =>
              handlePressFriendActivityCard(friendActivityData.id)
            }></FriendActivityCard>
        ))}
      </View>
    </ScreenView>
  );
};
