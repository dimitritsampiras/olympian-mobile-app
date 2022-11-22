import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../elements/Button';
import { RootParamList } from '../navigation/RootNavigator';
import { TabParamList } from '../navigation';

interface HomeProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingLeft: 22,
        paddingRight: 22,
      }}>
      <Button onPress={() => navigation.navigate('Create Program')}>Create Program</Button>
    </SafeAreaView>
  );
};
