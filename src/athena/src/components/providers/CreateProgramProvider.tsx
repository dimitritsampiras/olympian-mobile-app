import React, { createContext, ReactNode, useState } from 'react';
import { Program } from '../../lib/graphql';

export const CreateProgramContext = createContext({
  program: {} as Partial<Program>,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<Partial<Program>>>,
});

interface CreateProgramProviderProps {
  children: ReactNode | ReactNode[];
}

export const CreateProgramProvider: React.FC<CreateProgramProviderProps> = ({ children }) => {
  const [program, setProgram] = useState<Partial<Program>>({
    name: '',
  });

  return (
    <CreateProgramContext.Provider value={{ program, setProgram }}>
      {children}
    </CreateProgramContext.Provider>
  );
};
