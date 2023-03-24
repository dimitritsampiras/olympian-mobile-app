import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { LandingPage } from '../screens/auth/LandingPage';
import { Login } from '../screens/auth/Login';
import theme from '../../theme';
import { TabNavigator } from './TabNavigator';
import { UserContext } from '../../lib/context';
import { SignUpName } from '../screens/auth/SignUp/SignUpName';
import { SignUpEmail } from '../screens/auth/SignUp/SignUpEmail';
import { SignUpUsername } from '../screens/auth/SignUp/SignUpUsername';
import { SignUpPassword } from '../screens/auth/SignUp/SignUpPassword';

export type AuthParamList = {
  LandingPage: undefined;
  SignUpNavigator: undefined;
  Login: undefined;
  Name: undefined;
  Email: undefined;
  Username: undefined;
  Password: undefined;
};

// authentication screen stack
const AuthStack = createNativeStackNavigator<AuthParamList>();

type AuthStackNavigatorProps = NativeStackScreenProps<AuthParamList, 'LandingPage'>;

// SignUp screen stack
const SignUpStack = createNativeStackNavigator<AuthParamList>();

/**
 * Signup Navigator FC
 *
 * @description
 * This renders the signup process
 */
const SignUpNavigator: React.FC<AuthStackNavigatorProps> = () => {
  return (
    <SignUpStack.Navigator initialRouteName="Name" screenOptions={{ headerShown: false }}>
      <SignUpStack.Screen name="Name" component={SignUpName} />
      <SignUpStack.Screen name="Username" component={SignUpUsername} />
      <SignUpStack.Screen name="Email" component={SignUpEmail} />
      <SignUpStack.Screen name="Password" component={SignUpPassword} />
      <AuthStack.Screen name="Login" component={Login} />
    </SignUpStack.Navigator>
  );
};

/**
 * Authentation Navigator FC
 *
 * @description
 * This renders all 3 auth screens: landing page, login page, signup page.
 * @param _ Object with isLoggedIn boolean and isLoggedIn setter
 */
export const AuthNavigator: React.FC<AuthStackNavigatorProps> = () => {
  return (
    <AuthStack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LandingPage" component={LandingPage} />
      <SignUpStack.Screen name="SignUpNavigator" component={SignUpNavigator} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};
