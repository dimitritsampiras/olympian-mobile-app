import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Incubator, PageControl, Text } from 'react-native-ui-lib';
import { Button } from '../../elements/Button';

import theme from '../../../theme';
import { RootParamList } from '../../navigation';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';

type ParamList = NativeStackScreenProps<RootParamList, 'CreateProgram'>;

interface CreateProgramProps extends ParamList {}

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {},
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<any>>
});

export const CreateProgram: React.FC<CreateProgramProps> = ({ navigation }) => {
  const [program, setProgram] = useState({
    name: ''
  });

  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log(step, program);
  }, [step, program]);

  return (
    <CreateProgramContext.Provider value={{ program, setProgram, step, setStep }}>
      <SafeAreaView style={styles.screen}>
        <View>
          {step === 0 && <ProgramName />}
          {step === 1 && <ProgramPublicity />}
        </View>
        <PageControl
          color={theme.blue[500]}
          inactiveColor={theme.gray[200]}
          currentPage={step}
          numOfPages={9}
          limitShownPages
          spacing={8}
          size={8}
        />
      </SafeAreaView>
    </CreateProgramContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.gray[50],
    height: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 60
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20
  }
});
