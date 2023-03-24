import React from 'react';
import { UserContext } from '../../lib/context';
import { useMeQuery } from '../../lib/graphql';

/**
 *
 * component prop types
 */
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
    <UserContext.Provider value={{ user: data?.me, refetch }}>{children}</UserContext.Provider>
  );
};
