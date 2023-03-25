import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { ProfileFragment } from '../../../lib/graphql';
import theme from '../../../theme';

interface ProfileNameProps {
  profile: {
    name: ProfileFragment['name'];
    username: ProfileFragment['username'];
    profileInitialsDefaultColor: ProfileFragment['profileInitialsDefaultColor'];
  };
  onPress?: () => void;
}

export const ProfileName: React.FC<ProfileNameProps> = ({ profile, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center' }}
      disabled={!onPress}
      onPress={onPress}>
      <Avatar size={24} name={profile.name} backgroundColor={profile.profileInitialsDefaultColor} />
      <Text
        style={{
          marginLeft: 4,
          fontWeight: '500',
          color: theme.colors.gray[700],
          fontSize: 12,
        }}>
        {profile.username}
      </Text>
    </TouchableOpacity>
  );
};
