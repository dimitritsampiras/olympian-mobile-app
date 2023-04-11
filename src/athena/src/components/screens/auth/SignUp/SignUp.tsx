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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../../../theme';
import { ArrowLongLeftIcon } from 'react-native-heroicons/solid';
import { SignUpName } from './SignUpName';
import { SignUpUsername } from './SignUpUsername';
import { SignUpPassword } from './SignUpPassword';
import { SignUpEmail } from './SignUpEmail';
import { SignUpContext } from '../../../../lib/context';

type ParamList = NativeStackScreenProps<AuthParamList, 'SignUp'>;

interface SignUpProps extends ParamList {}

export const SignUp: React.FC<SignUpProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [signUpInput, setSignUpInput] = useState<Partial<SignUpInput>>({
    email: '',
    name: '',
    password: '',
    username: '',
  });
  const [step, setStep] = useState(0);

  return (
    <SignUpContext.Provider value={{ signUpInput, setSignUpInput, step, setStep }}>
      <SafeAreaView
        style={[styles.screen, { paddingBottom: insets.bottom + 50, paddingTop: insets.top }]}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <>
            {/* <View style={styles.screen}> */}
            {/* We only want stack navigation for the first one. Else, the back button should return to previous steps in the process*/}
            {step === 0 && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 10, paddingTop: 0 }}>
                <ArrowLongLeftIcon color={theme.colors.gray[700]} />
              </TouchableOpacity>
            )}
            {step > 0 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{ marginBottom: 10, paddingTop: 0 }}>
                <ArrowLongLeftIcon color={theme.colors.gray[700]} />
              </TouchableOpacity>
            )}
            {step === 0 && <SignUpName />}
            {step === 1 && <SignUpEmail />}
            {step === 2 && <SignUpUsername />}
            {step === 3 && <SignUpPassword navigation={navigation} route={route} />}
            {/* </View> */}
          </>
        </Pressable>
      </SafeAreaView>
    </SignUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
