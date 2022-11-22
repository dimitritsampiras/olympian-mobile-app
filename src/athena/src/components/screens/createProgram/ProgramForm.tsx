import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageControl } from 'react-native-ui-lib';

import theme from '../../../theme';
import { CreateProgramParamList } from '../../navigation/CreateProgramNavigator';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';
import { ProgramTags } from './ProgramTags';

type ParamList = NativeStackScreenProps<CreateProgramParamList, 'Program Form'>;

interface ProgramFormProps extends ParamList {}

const PAGE_NUMBER = 3;

export const ProgramForm: React.FC<ProgramFormProps> = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const nextPage = () => {
    setStep((prev) => (prev < PAGE_NUMBER ? prev + 1 : prev));
  };

  const prevPage = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const navtoWorkoutForm = () => {
    navigation.navigate('Workout Form');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ marginBottom: 24 }}>
        {step > 0 && (
          <Pressable onPress={() => prevPage()}>
            <Text>{'<-Back'}</Text>
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {step === 0 && <ProgramName nextPage={nextPage} />}
        {step === 1 && <ProgramPublicity nextPage={nextPage} />}
        {step === 2 && <ProgramTags navtoWorkoutForm={navtoWorkoutForm} />}
      </View>
      <PageControl
        color={theme.blue[500]}
        inactiveColor={theme.gray[200]}
        currentPage={step}
        numOfPages={PAGE_NUMBER}
        limitShownPages
        spacing={8}
        size={8}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.gray[50],
    height: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
});
