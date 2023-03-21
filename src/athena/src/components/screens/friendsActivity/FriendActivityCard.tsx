import React from 'react';
import { Text, View, ViewProps } from 'react-native';

import _, { sample } from 'lodash';

import { Card } from '../../containers/Card';
import { Heading, SubHeading } from '../../elements';
import { Avatar, TouchableOpacity } from 'react-native-ui-lib';
import theme from '../../../theme';

interface FriendActivityCardProps extends ViewProps {
  friendActivityData: any;
  userOwned?: boolean;
  square?: boolean;
  to?: string;
  onPress?: () => void;
}

export const FriendActivityCard: React.FC<FriendActivityCardProps> = ({
  friendActivityData,
  userOwned = false,
  style,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.white,
          padding: 10,
          borderRadius: 12,
          width: '95%',
        },
        style,
      ]}
      {...props}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          size={60}
          backgroundColor={friendActivityData.user.profileColor}
          name={friendActivityData.user.name}
        />
        <View style={{ marginLeft: 5 }}>
          <View
            style={{
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Heading as={'h4'} style={{ marginRight: 5 }}>
              {friendActivityData.user.name}
            </Heading>
            {friendActivityData.active && (
              <View
                style={{
                  backgroundColor: theme.colors.green[500],
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                }}></View>
            )}
          </View>

          <SubHeading>{friendActivityData.workout.name}</SubHeading>
        </View>
      </View>
    </TouchableOpacity>
  );
};
