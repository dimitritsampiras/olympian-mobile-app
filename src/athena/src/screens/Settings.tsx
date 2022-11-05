import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/elements/Button';

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  return (
    <SafeAreaView>
      <Text>hello</Text>
    </SafeAreaView>
  );
};
