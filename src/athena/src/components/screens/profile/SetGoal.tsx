import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading, SubHeading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import theme from '../../../theme';
import { useSetGoalMutation } from '../../../lib/graphql';
import { UserContext } from '../../../lib/context';

interface SetGoalProps extends NativeStackScreenProps<ProfileParamList, 'SetGoal'> {
}

export const SetGoal: React.FC<SetGoalProps> = ({ navigation, route }) => {

  const { profileId, staticExerciseId, staticExerciseName} = route.params
  const [setGoal] = useSetGoalMutation();
  const handleSetGoal = () => {
    setGoal({ variables: { profileId, staticExerciseId, reps: 5, weight: 215 } });
    navigation.navigate('Goals',{profileId})
  };

  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading as="h2">Set Goal</Heading>
      </Header>
      <SubHeading>Choose the Weight and Reps to work towards for {staticExerciseName}:</SubHeading>
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
          <Text>lbs</Text>
        </View>
        <Text>x</Text>
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
      </View>
      <Button style={{ marginTop: 100 }} variant="flat" colorScheme="info" onPress={handleSetGoal}>
        Add Goal
      </Button>
    </ScreenView>
  );
};
