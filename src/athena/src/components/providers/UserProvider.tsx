import { ApolloQueryResult } from '@apollo/client';
import React, { createContext } from 'react';
import { Exact, MeQuery, useMeQuery, User } from '../../lib/graphql';

// type annotation for apollo client me query refetch function
type Refetch = (
  variables?: Partial<Exact<{ [key: string]: never }>> | undefined
) => Promise<ApolloQueryResult<MeQuery>>;

// user context
export const UserContext = createContext({
  user: {} as User | null,
  refetch: (async () => ({})) as Refetch,
});

interface UserProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

/**
 * User provider component
 * Allows all children components to have access to user object
 * @returns
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // ping server to parse token and return the associated user
  const { data, refetch } = useMeQuery();

  return (
    <UserContext.Provider value={{ user: data?.me as User | null, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
