import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react';
import { RouteContext } from '../../lib/context';

interface NavigatorProviderProps {
  children: ReactNode[] | ReactNode;
}

const ref = createNavigationContainerRef();

/**
 *
 * tracks the top level route of the stack
 * used primarily to hide the nav bar on certain routes
 */
export const NavigatorProvider: React.FC<NavigatorProviderProps> = ({ children }) => {
  const [routeName, setRouteName] = useState<string>();

  return (
    <RouteContext.Provider value={{ routeName }}>
      <NavigationContainer
        ref={ref}
        onReady={() => {
          setRouteName(ref.getCurrentRoute()?.name);
        }}
        onStateChange={async () => {
          const currentRouteName = ref.getCurrentRoute()?.name;
          setRouteName(currentRouteName);
        }}>
        {children}
      </NavigationContainer>
    </RouteContext.Provider>
  );
};
