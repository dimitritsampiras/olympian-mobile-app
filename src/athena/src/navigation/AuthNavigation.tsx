import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { UserContext } from '../components/providers';
import { LandingPage } from '../components/screens/auth/LandingPage';
import { Login } from '../components/screens/auth/Login';
import theme from '../theme';
import { RootStackNavigator } from './RootNavigator';

export type AuthParamList = {
  LandingPage: undefined;
  Register: undefined;
  Login: undefined;
  Root: undefined;
};

// authentication screen stack
const AuthStack = createNativeStackNavigator<AuthParamList>();

// navigator props
interface AuthNavigatorProps {}

/**
 * Authentation Navigator FC
 *
 * @description
 * This renders all 3 auth screens: landing page, login page, register page.
 * @param _ Object with isLoggedIn boolean and isLoggedIn setter
 */
export const AuthNavigator: React.FC<AuthNavigatorProps> = ({}) => {
  const { user } = useContext(UserContext);

  return (
    <AuthStack.Navigator>
      {user === null || user === undefined ? (
        <>
          <AuthStack.Screen name="LandingPage" component={LandingPage} />
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ contentStyle: { backgroundColor: theme.gray[50] } }}
          />
        </>
      ) : (
        <AuthStack.Screen
          name="Root"
          component={RootStackNavigator}
          options={{ headerShown: false }}
        />
      )}
    </AuthStack.Navigator>
  );
};
