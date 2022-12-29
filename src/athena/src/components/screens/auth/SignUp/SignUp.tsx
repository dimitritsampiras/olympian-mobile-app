import { AuthParamList } from '../../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpInput } from '../../../../lib/graphql';
import React, { createContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import { SignUpName } from './SignUpName';

type ParamList = NativeStackScreenProps<AuthParamList, 'SignUp'>;

interface SignUpProps extends ParamList {}

export const SignUpContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  signUpInput: {} as SignUpInput,
  setSignUpInput: (() => {}) as React.Dispatch<React.SetStateAction<SignUpInput>>,
});

export const SignUp: React.FC<SignUpProps> = () => {
  const [signUpInput, setSignUpInput] = useState<SignUpInput>({
    email: '',
    name: '',
    password: '',
    username: '',
  });
  const [step, setStep] = useState(0);

  return (
    <SignUpContext.Provider value={{ signUpInput, setSignUpInput, step, setStep }}>
      <SafeAreaView style={styles.screen}>
        <View style={{ marginBottom: 24 }}>
          <Pressable onPress={() => setStep((prev) => prev - Number(prev > 0))}>
            <ChevronLeftIcon size="20" />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          {step === 0 && <SignUpName />}
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
    </SignUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.gray[50],
    height: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom:60,
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
});
