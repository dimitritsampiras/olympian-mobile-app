import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { TabParamList } from '../navigation';
import { UserContext } from '../providers';
import { Card } from '../containers/Card';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { Heading, SubHeading } from '../elements';
import {
  CogIcon,
  ChartBarSquareIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  ClockIcon,
} from 'react-native-heroicons/solid';
import { SettingsCard } from '../containers/SettingCard';
import theme from '../../theme';
import { ScreenView } from '../containers/ScreenView';
import { Header } from '../containers/Header';

interface ProfileProps extends NativeStackScreenProps<TabParamList, 'Profile'> {}

export const Profile: React.FC<ProfileProps> = ({ route }) => {
  const { user, refetch } = useContext(UserContext);

  const handleLogout = async () => {
    await removeToken();
    await refetch();
  };

  return (
    <ScreenView>
      <Header style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Avatar size={60} backgroundColor={theme.colors.amber[200]} name={user?.name} />
        <View style={{ marginLeft: 14, paddingVertical: 10 }}>
          <Heading as="h3" noMargin style={{ marginBottom: 5 }}>
            {user?.username}
          </Heading>
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: '700' }}>2 </Text>followers •{' '}
            <Text style={{ fontWeight: '700' }}>15 </Text>following
          </Text>
        </View>
      </Header>

      <View style={{ flex: 1 }}>
        <SettingsCard Icon={CogIcon}>
          <Text>Settings</Text>
        </SettingsCard>
        <SettingsCard Icon={ChartBarSquareIcon}>
          <Text>Statistics & Goals</Text>
        </SettingsCard>
        <SettingsCard Icon={UsersIcon}>
          <Text>Friends</Text>
        </SettingsCard>
        <SettingsCard Icon={ClockIcon}>
          <Text>Activity</Text>
        </SettingsCard>
      </View>
      <SettingsCard
        Icon={ArrowLeftOnRectangleIcon}
        iconProps={{ size: 26, fill: 'red' }}
        excludeChevron
        onPress={handleLogout}>
        <Text>Log Out</Text>
      </SettingsCard>
    </ScreenView>
  );
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('AUTH_TOKEN');
  } catch (err) {
    console.error(err);
  }
};

const styles = StyleSheet.create({
  headerBox: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  screen: {
    backgroundColor: theme.colors.gray[50],
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10%',
  },
});
