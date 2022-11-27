import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
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
import { LoginInput, useLoginMutation, User } from '../../../lib/graphql';
import { AUTH_TOKEN } from '../../../lib/constants';
import { Input } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { UserContext } from '../../providers';

type ParamList = NativeStackScreenProps<AuthParamList, 'Login'>;
interface LoginProps extends ParamList {}

const initialValues: LoginInput = {
  username: '',
  password: '',
};

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  // context
  const { refetch } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [usernameInputStyle, setUsernameInputStyle] = useState(styles.regularInputStyle);
  const [passwordInputStyle, setPasswordInputStyle] = useState(styles.regularInputStyle);

  // graphql
  const [login] = useLoginMutation();

  const onSubmit = async (values: LoginInput) => {
    if (!values.username || !values.password) {
      setUsernameInputStyle(!values.username ? styles.errorInputStyle : styles.regularInputStyle);
      setPasswordInputStyle(!values.password ? styles.errorInputStyle : styles.regularInputStyle);
      setErrorMessage('Please enter both a username and password.');
      return;
    }

    const { data } = await login({ variables: { input: values } });

    if (!data?.login) {
      setPasswordInputStyle(styles.errorInputStyle);
      setUsernameInputStyle(styles.errorInputStyle);
      setErrorMessage('Username and password do not match.');
      return;
    }

    await AsyncStorage.setItem(AUTH_TOKEN, data.login);
    await refetch();
  };

  const validate = (values: LoginInput) => {
    // This isn't really how validate should be used, but we want to clear error messages on change.
    setErrorMessage('');
    setPasswordInputStyle(styles.regularInputStyle);
    setUsernameInputStyle(styles.regularInputStyle);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'}>
            <Text style={{ ...styles.heading2, marginBottom: 20 }}>Login</Text>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
              {({ handleChange, handleSubmit, values }) => (
                <>
                  <Input
                    placeholder="username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={usernameInputStyle}
                  />
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="password"
                    textContentType="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={passwordInputStyle}
                  />
                  <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
                  <Button onPress={handleSubmit as () => void}>Login</Button>
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
  regularInputStyle: {
    marginBottom: 14,
  },
  errorMessageStyle: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    marginTop: 20,
  },
  errorInputStyle: {
    marginBottom: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
});
