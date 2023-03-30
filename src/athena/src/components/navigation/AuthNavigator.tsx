import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { LandingPage } from '../screens/auth/LandingPage';
import { Login } from '../screens/auth/Login';

import { SignUp } from '../screens/auth/SignUp/SignUp';
import { TabNavigator } from './TabNavigator';
import { UserContext } from '../../lib/context';

export type AuthParamList = {
  LandingPage: undefined;
  SignUp: undefined;
  Login: undefined;
  Tabs: undefined;
};

// authentication screen stack
const AuthStack = createNativeStackNavigator<AuthParamList>();

/**
 * Authentation Navigator FC
 *
 * @description
 * This renders all 3 auth screens: landing page, login page, signup page.
 */
export const AuthNavigator: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {user === null || user === undefined ? (
        <>
          <AuthStack.Screen name="LandingPage" component={LandingPage} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <AuthStack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      )}
    </AuthStack.Navigator>
  );
};
