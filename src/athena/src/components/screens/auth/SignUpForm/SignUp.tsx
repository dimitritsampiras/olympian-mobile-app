import { AuthParamList } from '../../../navigation';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpInput, useSignUpMutation } from '../../../../lib/graphql';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Keyboard, TextInputProps } from 'react-native';

import theme from '../../../../theme';

import { SignUpName } from './SignUpName';
import { SignUpUsername } from './SignUpUsername';
import { SignUpPassword } from './SignUpPassword';
import { SignUpEmail } from './SignUpEmail';
import { SignUpContext } from '../../../../lib/context';
import { ScreenView } from '../../../containers/ScreenView';
import { Header } from '../../../containers/Header';
import { BodyText, Button, Heading } from '../../../elements';
import { PageControl } from 'react-native-ui-lib';
import Swiper from 'react-native-swiper';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import { object, string } from 'yup';
import { FormikHandleChange } from '../../../../lib/types';

interface SignUpProps extends NativeStackScreenProps<AuthParamList, 'SignUp'> {}

export interface SignUpFormProps extends TextInputProps {
  handleChange: FormikHandleChange;
  errors: FormikErrors<SignUpInput>;
  touched: FormikTouched<Partial<SignUpInput>>;
  values: SignUpFormInput;
}

const PAGES: { page: React.FC<SignUpFormProps>; description: string }[] = [
  {
    page: SignUpName,
    description:
      "Lets get started letting us know what to call you. We won't dsplay this publicly.",
  },
  {
    page: SignUpUsername,
    description: 'This will be the name you display publicly. Make it uniquely yours!.',
  },
  {
    page: SignUpEmail,
    description: 'This will be the name you display publicly. Make it uniquely yours!.',
  },
  {
    page: SignUpPassword,
    description: 'Enter a strong password.',
  },
];

type SignUpFormInput = Partial<SignUpInput> & { confirmedPassword?: string };

const MAX_NAME_LENGTH = 16;

const nameSchema = object({
  // We may opt to make this optional in the future.
  name: string()
    .required('Cannot have an empty name.')
    .matches(/^[a-zA-Z]+$/, 'Name must only be composed of letters.')
    .max(MAX_NAME_LENGTH, `Please enter a maximum of ${MAX_NAME_LENGTH} characters.`),
});

export const SignUp: React.FC<SignUpProps> = ({ navigation, route }) => {
  const [signUpInput, setSignUpInput] = useState<SignUpFormInput>({
    email: '',
    name: '',
    password: '',
    username: '',
    confirmedPassword: '',
  });

  const [step, setStep] = useState(0);
  const [signup, { loading }] = useSignUpMutation();

  const handleOnNext = async (values: SignUpFormInput) => {
    if (step < PAGES.length) setStep(step + Number(step < 4));

    await signup({
      variables: {
        input: {
          email: values.email!,
          name: values.name!,
          password: values.password!,
          username: values.username!,
        },
      },
    });
    navigation.navigate('Login');
  };

  return (
    <SignUpContext.Provider value={{ signUpInput, setSignUpInput, step, setStep }}>
      <Formik initialValues={{ name: '' }} onSubmit={handleOnNext} validationSchema={nameSchema}>
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <ScreenView type="form" spaced>
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
              <>
                <Header navigation={navigation} style={{ marginBottom: 36 }}>
                  <Heading>Sign Up</Heading>
                  <BodyText style={{ width: 300 }}>{PAGES[step]?.description}</BodyText>
                </Header>
                {/* <Formik
              initialValues={{ name: '' }}
              onSubmit={handleOnNext}
              validationSchema={nameSchema}>
              {({ handleSubmit, handleChange, values, errors, touched }) => ( */}
                <Swiper index={step} pagingEnabled={true} showsPagination={false} loop={false}>
                  {PAGES.map(({ page: Page }, i) => (
                    <Page
                      // navigation={navigation}
                      // route={route}
                      key={i}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      values={values}
                    />
                  ))}
                </Swiper>
                {/* )}
            </Formik> */}
              </>
            </Pressable>

            <View style={{ marginBottom: 24 }}>
              <PageControl
                color={theme.colors.blue[500]}
                inactiveColor={theme.colors.gray[200]}
                currentPage={step}
                numOfPages={PAGES.length}
                limitShownPages
                spacing={8}
                size={8}
              />
              <Button onPress={handleSubmit as () => void} style={{ marginTop: 16 }}>
                Next
              </Button>
            </View>
          </ScreenView>
        )}
      </Formik>
    </SignUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});