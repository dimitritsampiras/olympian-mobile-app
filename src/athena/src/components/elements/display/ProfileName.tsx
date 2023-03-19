import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { ProfileFragment } from '../../../lib/graphql';
import theme from '../../../theme';

interface ProfileNameProps {
  profile: {
    name: ProfileFragment['name'];
    username: ProfileFragment['username'];
  };
}

export const ProfileName: React.FC<ProfileNameProps> = ({ profile }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size={24} name={profile.name} backgroundColor={theme.colors.amber[100]} />
      <Text
        style={{
          marginLeft: 4,
          fontWeight: '500',
          color: theme.colors.gray[700],
          fontSize: 12,
        }}>
        {profile.username}
      </Text>
    </View>
  );
};
