import { AuthParamList } from '../../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpInput } from '../../../../lib/graphql';
import React, { createContext, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import { SignUpName } from './SignUpName';
import { Button } from '../../../elements/Button';

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
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <KeyboardAvoidingView style={styles.content} behavior="padding">
              {/* This header should be a component */}
              <View style={styles.header}>
                <Pressable onPress={() => setStep((prev) => prev - Number(prev > 0))}>
                  <ChevronLeftIcon size="20" {...{ fill: theme.gray[600] }} />
                </Pressable>
              </View>
              {step === 0 && <SignUpName />}
            </KeyboardAvoidingView>

            <View style={styles.footer}>
              <PageControl
                color={theme.blue[500]}
                inactiveColor={theme.gray[200]}
                currentPage={step}
                numOfPages={9}
                limitShownPages
                spacing={8}
                size={8}
              />
              <Button style={{ padding: 19 }} onPress={() => {}}>
                Next
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SignUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.gray[50],
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 25,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
