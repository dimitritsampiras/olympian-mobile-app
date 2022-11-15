import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../elements/Button';
import { RootParamList } from '../navigation/RootNavigator';
import { TabParamList } from '../navigation';
import { useMeAndUsersQuery } from '../../lib/graphql';

interface HomeProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { data, loading, error } = useMeAndUsersQuery({
    variables: {
      beans: [3, 2],
    },
  });

  return (
    <SafeAreaView
      style={{
        paddingLeft: 22,
        paddingRight: 22,
      }}>
      <Button onPress={() => navigation.navigate('CreateProgram')}>Create Program</Button>
    </SafeAreaView>
  );
};
