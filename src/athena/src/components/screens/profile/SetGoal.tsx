import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading, SubHeading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import theme from '../../../theme';

interface SetGoalProps extends NativeStackScreenProps<ProfileParamList, 'SetGoal'> {}

export const SetGoal: React.FC<SetGoalProps> = ({ navigation, route }) => {
  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading as="h2">Set Goal</Heading>
      </Header>
      <SubHeading>Choose the Weight and Reps to work towards</SubHeading>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          borderRadius: 16,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            style={{
              backgroundColor: theme.colors.gray[100],
              padding: 6,
              width: 50,
              borderRadius: 4,
              textAlign: 'right',
              marginRight: 8,
            }}
          />
          <Text>reps</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            keyboardType="numeric"
            maxLength={3}
            style={{
              backgroundColor: theme.colors.gray[100],
              padding: 6,
              width: 50,
              borderRadius: 4,
              textAlign: 'right',
              marginRight: 8,
            }}
          />
          <Text>weight</Text>
        </View>
      </View>
      <Button
        style={{ marginTop: 100 }}
        variant="flat"
        colorScheme="info"
        onPress={() => navigation.goBack()}>
        Add Goal
      </Button>
    </ScreenView>
  );
};
