import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { TabParamList } from '../navigation';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { Heading } from '../elements';
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
import { UserContext } from '../../lib/context';

interface ProfileProps extends NativeStackScreenProps<TabParamList, 'Profile'> {}

export const Profile: React.FC<ProfileProps> = () => {
  const { user, refetch } = useContext(UserContext);

  const handleLogout = async () => {
    await removeToken();
    await refetch();
  };

  return (
    <ScreenView>
      <Header style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Avatar size={60} backgroundColor={theme.colors.amber[200]} name={user?.profile?.name} />
        <View style={{ marginLeft: 14, paddingVertical: 10 }}>
          <Heading as="h3" noMargin style={{ marginBottom: 5 }}>
            {user?.profile?.username}
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
  await AsyncStorage.removeItem('AUTH_TOKEN').catch((e) => e);
};
