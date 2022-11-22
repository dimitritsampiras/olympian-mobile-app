import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../theme';
import { Button } from '../../elements/Button';
import { CreateProgramParamList } from '../../navigation/CreateProgramNavigator';
import { CreateProgramContext } from '../../providers/CreateProgramProvider';
interface WorkoutFormProps extends NativeStackScreenProps<CreateProgramParamList, 'Workout Form'> {}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ navigation }) => {
  const { program } = useContext(CreateProgramContext);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>{program.name}</Text>
      <Button onPress={() => navigation.navigate('Exercise Selector')}>Add Exercise</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
  screen: {
    backgroundColor: theme.gray[50],
    height: '100%',
    paddingHorizontal: 28,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
});
