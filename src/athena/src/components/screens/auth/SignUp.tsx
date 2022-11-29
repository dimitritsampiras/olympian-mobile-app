import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthParamList } from '../../navigation';
import {
  useFindEmailMutation,
  useFindUsernameMutation,
  useSignUpMutation,
} from '../../../lib/graphql';
import { Input } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { object, string, number, date, InferType, ValidationError } from 'yup';

type ParamList = NativeStackScreenProps<AuthParamList, 'SignUp'>;
interface SignUpProps extends ParamList {}

interface SignUpInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

const initialValues: SignUpInput = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const defaultErrorsState = {
    name: false,
    username: false,
    email: false,
    password: false,
    errorMessage: '',
  };

  const [errors, setErrorStatus] = useState(defaultErrorsState);

  const [signup] = useSignUpMutation();
  const [findusername] = useFindUsernameMutation();
  const [findemail] = useFindEmailMutation();

  const SignUpSchema = object({
    name: string().required(),
    username: string()
      .required()
      .test('', 'Username is not available.', async (username) => {
        const { data } = await findusername({ variables: { input: username || '' } });

        return !data?.findusername;
      }),
    email: string()
      .required()
      .email('Must provide valid email address.')
      .test('', 'This email is already used on another account.', async (email) => {
        const { data } = await findemail({ variables: { input: email || '' } });

        return !data?.findemail;
      }),
    password: string()
      .required()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        'Password must be between 6 to 20 characters and contain at least 1 upper case letter, 1 lower case letter and 1 number.'
      ),
  });

  const onSubmit = async (values: SignUpInput) => {
    const valid = await SignUpSchema.validate(values, { abortEarly: false })
      .then(() => true)
      .catch((err: ValidationError) => {
        const { path, errors: errorMessage } = err.inner[0];
        if (path) {
          setErrorStatus({
            ...errors,
            [path]: true,
            errorMessage: errorMessage[0],
          });
        }
        return false;
      });
    if (!valid) {
      return;
    }
    // Ensure all fields are valid on submit
    const { data } = await signup({ variables: { input: values } });

    if (!data?.signup) {
      //default failure to sign up case. This is never the result of user error.
      setErrorStatus({
        ...errors,
        errorMessage: 'Failed to sign up with selected information.',
      });
      console.log(`Failed to sign up with selected information.`);
      return;
    }

    navigation.navigate('Login');
  };

  const validateInput = () => {
    // Clear errors on any field change
    // Guard prevents unnecessary setState calls. Only update if there's an actual change.
    if (errors.errorMessage !== '') {
      setErrorStatus(defaultErrorsState);
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'}>
            <Text style={{ ...styles.heading2, marginBottom: 20 }}>Sign Up</Text>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validateInput}>
              {({ handleChange, handleSubmit, values }) => (
                <>
                  <Input
                    placeholder="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={!!errors.name}
                    style={{ marginBottom: 14 }}
                  />
                  <Input
                    placeholder="username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={!!errors.username}
                    style={{ marginBottom: 14 }}
                  />
                  <Input
                    placeholder="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={!!errors.email}
                    style={{ marginBottom: 14 }}
                  />
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="password"
                    textContentType="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    error={!!errors.password}
                    style={{ marginBottom: 24 }}
                  />
                  <View style={{ minHeight: 16, marginBottom: 30 }}>
                    <Text style={styles.errorMessageStyle}>{errors.errorMessage}</Text>
                  </View>
                  <Button onPress={handleSubmit as () => void}>Sign Up</Button>
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
  },
  keyboardView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    zIndex: 99,
  },
  errorMessageStyle: {
    fontSize: 14,
    color: 'red',
  },
});
