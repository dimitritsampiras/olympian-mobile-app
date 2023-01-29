import React from 'react';
import { Text, View } from 'react-native';
import { ScreenView } from '../../containers/ScreenView';

interface ProgramProps {}

export const Program: React.FC<ProgramProps> = () => {
  return (
    <ScreenView>
      <View>
        <Text>Hello</Text>
      </View>
    </ScreenView>
  );
};
