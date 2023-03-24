import { AuthParamList } from '../../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpInput } from '../../../../lib/graphql';
import React, { createContext, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../../theme';
import { ArrowLongLeftIcon } from 'react-native-heroicons/solid';
import { SignUpName } from './SignUpName';
import { SignUpUsername } from './SignUpUsername';
import { SignUpPassword } from './SignUpPassword';
import { SignUpEmail } from './SignUpEmail';
import { Header } from '../../../containers/Header';

type ParamList = NativeStackScreenProps<AuthParamList, 'SignUp'>;

interface SignUpProps extends ParamList {}

export const SignUpContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  signUpInput: {} as Partial<SignUpInput>,
  setSignUpInput: (() => {}) as React.Dispatch<React.SetStateAction<Partial<SignUpInput>>>,
});

export const SignUp: React.FC<SignUpProps> = ({ navigation, route }) => {
  const [signUpInput, setSignUpInput] = useState<Partial<SignUpInput>>({
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
            {/* We only want stack navigation for the first one. Else, the back button should return to previous steps in the process*/}
            {step === 0 && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 10, paddingTop: 0 }}>
                <ArrowLongLeftIcon stroke={theme.colors.gray[700]} />
              </TouchableOpacity>
            )}
            {step > 0 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{ marginBottom: 10, paddingTop: 0 }}>
                <ArrowLongLeftIcon stroke={theme.colors.gray[700]} />
              </TouchableOpacity>
            )}
            {step === 0 && <SignUpName />}
            {step === 1 && <SignUpEmail />}
            {step === 2 && <SignUpUsername />}
            {step === 3 && <SignUpPassword navigation={navigation} route={route} />}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SignUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.gray[50],
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
