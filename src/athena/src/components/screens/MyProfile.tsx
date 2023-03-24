import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { Heading } from '../elements';
import {
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  ClockIcon,
  ChartBarIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid';

import theme from '../../theme';
import { ScreenView } from '../containers/ScreenView';
import { Header } from '../containers/Header';
import { UserContext } from '../../lib/context';
import { ProfileParamList } from '../navigation/ProfileNavigator';
import { useMyFollowersCountQuery, useMyFollowsCountQuery } from '../../lib/graphql';
import { useIsFocused } from '@react-navigation/native';

interface ProfileProps extends NativeStackScreenProps<ProfileParamList, 'MyProfile'> {}

const profileOptions = [
  {
    option: 'Statistics and Goals',
    screen: 'Goals',
    Icon: ChartBarIcon,
  },
  {
    option: 'Social',
    screen: 'Socials',
    Icon: UsersIcon,
  },
  {
    option: 'Activity',
    screen: 'Activity',
    Icon: ClockIcon,
  },
  {
    option: 'Account',
    screen: 'Account',
    Icon: ChartBarIcon,
  },
] as const;

export const MyProfile: React.FC<ProfileProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { user, refetch } = useContext(UserContext);

  const { data: followersCount, refetch: fsRefetch } = useMyFollowersCountQuery();
  const { data: followCount, refetch: fRefetch } = useMyFollowsCountQuery();

  const handleLogout = async () => {
    await removeToken();
    await refetch();
  };

  useEffect(() => {
    (async () => {
      await fsRefetch();
      await fRefetch();
    })();
  }, [isFocused]);

  return (
    <ScreenView>
      <Header style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Avatar size={60} backgroundColor={theme.colors.amber[200]} name={user?.profile?.name} />
        <View style={{ marginLeft: 14, paddingVertical: 10 }}>
          <Heading as="h3" noMargin style={{ marginBottom: 5 }}>
            {user?.profile?.username}
          </Heading>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.follow}
              onPress={() => navigation.navigate('FollowersList')}>
              <Text style={[{ fontWeight: '700' }, styles.followText]}>
                {followCount?.myFollowsCount}{' '}
              </Text>
              <Text style={styles.followText}>followers</Text>
            </TouchableOpacity>
            <Text> • </Text>
            <TouchableOpacity
              style={styles.follow}
              onPress={() => navigation.navigate('FollowingList')}>
              <Text style={[{ fontWeight: '700' }, styles.followText]}>
                {followersCount?.myFollowersCount}{' '}
              </Text>
              <Text style={styles.followText}>following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Header>

      <View style={{ flex: 1 }}>
        {profileOptions.map(({ Icon, option, screen }, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate(screen);
            }}
            style={styles.optionCard}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Icon color={theme.colors.gray[300]} size={20} />
              <Text style={{ marginLeft: 10, color: theme.colors.gray[800] }}>{option}</Text>
            </View>
            <View>
              <ChevronRightIcon color={theme.colors.gray[300]} size={20} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <ArrowLeftOnRectangleIcon color={theme.colors.rose[500]} size={20} />
          <Text style={{ marginLeft: 10 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN').catch((e) => e);
};

const styles = StyleSheet.create({
  optionCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logout: {
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 35,
    borderRadius: 98,
    flexDirection: 'row',
    alignItems: 'center',
  },
  follow: {
    flexDirection: 'row',
  },
  followText: {
    color: theme.colors.gray[700],
  },
});
