import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthParamList, TabParamList } from '../navigation';
import { Button } from '../elements/Button';
import { UserContext } from '../providers';

interface SettingsProps extends NativeStackScreenProps<TabParamList, 'Settings'> {}

export const Settings: React.FC<SettingsProps> = () => {
  const { user, refetch } = useContext(UserContext);

  const handleLogout = async () => {
    await removeToken();
    await refetch();
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 25 }}>
      {user && (
        <>
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
          <Button onPress={handleLogout}>Log out</Button>
        </>
      )}
    </SafeAreaView>
  );
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('AUTH_TOKEN');
  } catch (err) {
    console.error(err);
  }
};
