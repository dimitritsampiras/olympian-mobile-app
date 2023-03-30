import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthParamList } from '../../navigation';
import { LoginInput, useLoginMutation } from '../../../lib/graphql';
import { AUTH_TOKEN } from '../../../lib/constants';
import { Input } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { UserCircleIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import theme from '../../../theme';
import { RouteContext, UserContext } from '../../../lib/context';
import { ScreenView } from '../../containers/ScreenView';
import { Header } from '../../containers/Header';
import { Heading } from '../../elements';
type ParamList = NativeStackScreenProps<AuthParamList, 'Login'>;
interface LoginProps extends ParamList {}

const initialValues: LoginInput = {
  username: '',
  password: '',
};

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  // context
  const { refetch } = useContext(UserContext);

  const [errors, setErrorStatus] = useState({
    username: false,
    password: false,
    errorMessage: '',
  });

  // graphql
  const [login] = useLoginMutation();

  const onSubmit = async (values: LoginInput) => {
    // Ensure both fields are present on submit
    if (!values.username || !values.password) {
      setErrorStatus({
        username: !values.username,
        password: !values.password,
        errorMessage: 'Please enter both a username and password',
      });
      return;
    }

    const { data } = await login({ variables: { input: values } });

    if (!data?.login) {
      setErrorStatus({
        username: true,
        password: true,
        errorMessage: 'Username and password do not match.',
      });
      console.log(
        `Failed login with username ${values.username}. Password did not match a database entry.`
      );
      return;
    }

    await AsyncStorage.setItem(AUTH_TOKEN, data.login);
    await refetch();
  };

  const clearErrors = () => {
    /**
     * Desired UX is to have all error messages clear on ANY field change in the form.
     * Instead of putting the error-clearing code into each of the Input components onChange,
     * we put it here because 1) Less repeated code and 2) onSubmit calls onChange (not sure why).
     * This means that errors set by onSubmit will be immediately wiped by onChange. This does not occur
     * for Formik's `validate`, which is run on each onChange and right BEFORE onSubmit.
     */

    // Clear errors on any field change
    // Guard prevents unnecessary setState calls. Only update if there's an actual change.
    if (errors.username || errors.password) {
      setErrorStatus({
        username: false,
        password: false,
        errorMessage: '',
      });
    }
  };

  return (
    <ScreenView type="form">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={(styles.screen, { flex: 1 })}>
          <Header navigation={navigation} style={{ marginBottom: 16 }}>
            <Heading>Login</Heading>
          </Header>
          <View style={styles.keyboardView}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={clearErrors}>
              {({ handleChange, handleSubmit, values }) => (
                <>
                  <Input
                    placeholder="username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={!!errors.username}
                    style={{ marginBottom: 14 }}
                    Icon={UserCircleIcon}
                    iconProps={{
                      size: 20,
                      color: errors.username ? 'red' : theme.colors.gray[400],
                    }}
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
                    Icon={LockClosedIcon}
                    iconProps={{
                      size: 20,
                      color: errors.password ? 'red' : theme.colors.gray[400],
                    }}
                  />
                  <View style={{ minHeight: 16, marginBottom: 30 }}>
                    <Text style={styles.errorMessageStyle}>{errors.errorMessage}</Text>
                  </View>
                  <Button onPress={handleSubmit as () => void} style={{ width: '100%' }}>
                    Login
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  keyboardView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    width: '100%',
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
