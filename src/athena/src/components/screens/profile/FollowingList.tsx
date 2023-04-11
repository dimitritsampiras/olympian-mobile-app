import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserPlusIcon } from 'react-native-heroicons/outline';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import { Avatar } from 'react-native-ui-lib';
import {
  useFollowMutation,
  useMyFollowersQuery,
  useMyFollowsQuery,
  useUnfollowMutation,
} from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';

interface FollowingListProps extends NativeStackScreenProps<ProfileParamList, 'FollowingList'> {}

export const FollowingList: React.FC<FollowingListProps> = ({ navigation }) => {
  const focused = useIsFocused();

  const { data, refetch } = useMyFollowsQuery();
  const { data: mfData, refetch: mfRefetch } = useMyFollowersQuery();

  const [unfollow, { data: unfollowData }] = useUnfollowMutation();
  const [follow, { data: followData }] = useFollowMutation();

  useEffect(() => {
    (async () => {
      await refetch();
      await mfRefetch();
    })();
  }, [focused, followData, unfollowData]);

  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading as="h3">Following</Heading>
      </Header>
      {data?.myFollows.length !== 0 ? (
        data?.myFollows.map((follower) => (
          <TouchableOpacity
            key={follower.id}
            style={styles.followProfile}
            onPress={() => navigation.navigate('Profile', { profileId: follower.id })}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar
                size={34}
                name={follower.name}
                backgroundColor={follower.defaultColor}
                containerStyle={{ marginRight: 12 }}
              />
              <View>
                <Text>{follower.username}</Text>
                <Text style={{ marginTop: 4, fontSize: 12, color: theme.colors.gray[500] }}>
                  {follower.followedBy.length} followers
                </Text>
              </View>
            </View>
            {!mfData?.myFollowers.find(({ username }) => follower.username === username) ? (
              <TouchableOpacity
                onPress={() => follow({ variables: { profileId: follower.id } })}
                style={{ padding: 4 }}>
                <UserPlusIcon size={20} color={theme.colors.gray[500]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => unfollow({ variables: { profileId: follower.id } })}
                style={{ padding: 4 }}>
                <CheckCircleIcon size={20} color={theme.colors.emerald[400]} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noFollows}>
          <Text style={{ color: theme.colors.gray[600] }}>no followers</Text>
        </View>
      )}
    </ScreenView>
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
  noFollows: {
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    padding: 22,
    borderRadius: 12,
  },
});
