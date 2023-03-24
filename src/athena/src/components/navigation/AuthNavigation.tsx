import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { LandingPage } from '../screens/auth/LandingPage';
import { Login } from '../screens/auth/Login';
import theme from '../../theme';
import { SignUp } from '../screens/auth/SignUp/SignUp';
import { TabNavigator } from './TabNavigator';
import { UserContext } from '../../lib/context';

export type AuthParamList = {
  LandingPage: undefined;
  SignUp: undefined;
  Login: undefined;
  Tabs: { routeName: string };
};

// authentication screen stack
const AuthStack = createNativeStackNavigator<AuthParamList>();

/**
 * Authentation Navigator FC
 *
 * @description
 * This renders all 3 auth screens: landing page, login page, signup page.
 * @param _ Object with isLoggedIn boolean and isLoggedIn setter
 */
export const AuthNavigator: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <AuthStack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: theme.colors.gray[50] } }}>
      {user === null || user === undefined ? (
        <>
          <AuthStack.Screen name="LandingPage" component={LandingPage} />
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ contentStyle: { backgroundColor: theme.colors.gray[50] } }}
          />
          <AuthStack.Screen
            name="SignUp"
            component={SignUp}
            options={{ contentStyle: { backgroundColor: theme.colors.gray[50] } }}
          />
        </>
      ) : (
        <AuthStack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      )}
    </AuthStack.Navigator>
  );
};
