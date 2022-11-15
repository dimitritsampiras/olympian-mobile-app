import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageControl } from 'react-native-ui-lib';
import { Program } from '../../../lib/graphql';

import theme from '../../../theme';
import { RootParamList } from '../../navigation';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';
import { ProgramTags } from './ProgramTags';

type ParamList = NativeStackScreenProps<RootParamList, 'CreateProgram'>;

interface CreateProgramProps extends ParamList {}

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as Partial<Program>,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<Partial<Program>>>,
});

export const CreateProgram: React.FC<CreateProgramProps> = ({ navigation }) => {
  const [program, setProgram] = useState<Partial<Program>>({
    name: '',
  });

  const [step, setStep] = useState(0);

  return (
    <CreateProgramContext.Provider value={{ program, setProgram, step, setStep }}>
      <SafeAreaView style={styles.screen}>
        <View style={{ marginBottom: 24 }}>
          <Pressable onPress={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))}>
            <Text>{'<-Back'}</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          {step === 0 && <ProgramName />}
          {step === 1 && <ProgramPublicity />}
          {step === 2 && <ProgramTags />}
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
    paddingBottom: 60,
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
});
