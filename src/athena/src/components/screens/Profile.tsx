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

interface ProfileProps extends NativeStackScreenProps<TabParamList, 'Profile'> {}

export const Profile: React.FC<ProfileProps> = ({ route }) => {
  const { user, refetch } = useContext(UserContext);

  const handleLogout = async () => {
    await removeToken();
    await refetch();
  };

  return (
    <View style={styles.screen}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '100%',
        }}>
        <Card style={styles.headerBox}>
          <Avatar size={80} backgroundColor={theme.colors.gray[50]} name={user?.name} />
          <Heading style={{ textAlign: 'center' }}>Welcome, {user?.name}!</Heading>
          <Pressable>
            <Text style={{ fontSize: 12, color: theme.colors.blue[500] }}>Edit Profile</Text>
          </Pressable>
        </Card>

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
      </View>
    </View>
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
