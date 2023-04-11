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
import { Input } from '../../elements/Input';
import { Formik } from 'formik';
import { values } from 'lodash';
import { ArrowPathIcon, CubeIcon } from 'react-native-heroicons/solid';

interface SetGoalProps extends NativeStackScreenProps<ProfileParamList, 'SetGoal'> {
}

export const SetGoal: React.FC<SetGoalProps> = ({ navigation, route }) => {

  const { profileId, staticExerciseId, staticExerciseName } = route.params
  const [setGoal] = useSetGoalMutation();
  const handleSetGoal = (values: { weight: string, reps: string }) => {
    setGoal({ variables: { profileId, staticExerciseId, reps: parseInt(values.reps), weight: parseInt(values.weight) } });
    navigation.navigate('Goals', { profileId })
  };

  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading as="h2">Set Goal</Heading>
      </Header>
      <SubHeading>Set a goal for {staticExerciseName}:</SubHeading>
      <Formik initialValues={{ weight: '', reps: '' }} onSubmit={handleSetGoal}>
        {({ handleSubmit, handleChange, values }) => {
          return (
            <>
              <Text style={{ marginBottom: 10 }}>Weight (lbs):</Text>
              <Input
                style={{ marginBottom: 24 }}
                placeholder="Enter target weight in lbs"
                onChangeText={handleChange('weight')}
                value={values.weight.toString()
                }
                Icon={CubeIcon}
              >

              </Input>
              <Text style={{ marginBottom: 10 }}>Repetitions:</Text>
              <Input
                onChangeText={handleChange('reps')}
                placeholder="Enter target repetitions"
                value={values.reps.toString()
                }
                Icon={ArrowPathIcon}
              >

              </Input>
              <Button style={{ marginTop: 40 }} variant="flat" colorScheme="primary" onPress={handleSubmit as () => void}>
                Add Goal
              </Button>
            </>)
        }}

      </Formik>

    </ScreenView >
  );
};
