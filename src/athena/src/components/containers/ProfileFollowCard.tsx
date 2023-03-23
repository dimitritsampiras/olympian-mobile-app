import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { Avatar } from 'react-native-ui-lib';
import { Profile } from '../../lib/graphql';
import theme from '../../theme';

interface ProfileFollowCardProps {
  profile: Profile | { name: string; username: string; followedBy: { id: string }[] };
  styles?: ViewProps['style'];
  onPress?: () => void;
}

export const ProfileFollowCard: React.FC<ProfileFollowCardProps> = ({ profile, onPress }) => {
  return (
    <TouchableOpacity style={styles.followProfile} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar size={34} name={profile.name} containerStyle={{ marginRight: 12 }} />
        <View>
          <Text>{profile.username}</Text>
          <Text style={{ marginTop: 4, fontSize: 12, color: theme.colors.gray[500] }}>
            {profile.followedBy.length} followers
          </Text>
        </View>
      </View>
      {onPress && <ChevronRightIcon size={20} color={theme.colors.gray[200]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  followProfile: {
    // backgroundColor: 'white',
    paddingVertical: 10,
    // paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
});
