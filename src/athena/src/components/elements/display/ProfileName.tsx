import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import theme from '../../../theme';

interface ProfileNameProps {
  profile: {
    user: {
      name: string;
      username: string;
    };
  };
}

export const ProfileName: React.FC<ProfileNameProps> = ({ profile }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size={24} name={profile.user.name} backgroundColor={theme.colors.amber[100]} />
      <Text
        style={{
          marginLeft: 4,
          fontWeight: '500',
          color: theme.colors.gray[700],
          fontSize: 12,
        }}>
        {profile.user.username}
      </Text>
    </View>
  );
};
