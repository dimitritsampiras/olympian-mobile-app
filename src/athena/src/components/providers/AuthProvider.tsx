import { ApolloQueryResult } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect } from 'react';
import { Exact, MeQuery, useMeQuery, User } from '../../lib/graphql';

export const UserContext = createContext({
  user: {} as User | null,
  refetch: (async (e) => ({})) as (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<MeQuery>>,
});

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, refetch } = useMeQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ user: data?.me as User | null, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
export const retrieveToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('AUTH_TOKEN');
};
