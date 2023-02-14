import React, { useContext, useState } from 'react';

import { Heading } from '../../elements';

import { Input } from '../../elements/Input';
import { BodyText } from '../../elements/typography/BodyText';

import { CreateProgramContext } from './CreateProgram';

interface ProgramNameProps {}

export const ProgramName: React.FC<ProgramNameProps> = () => {
  const { program, setProgram, handleOnNext } = useContext(CreateProgramContext);

  const handleOnTextChange = (text: string) => {
    setProgram((prev) => ({ ...prev, name: text }));
  };

  return (
    <>
      <Heading as="h2">Create your Program</Heading>
      <BodyText style={{ width: 250, marginBottom: 24 }}>
        Name your program and use our program creator to build a program tailored to your needs.
      </BodyText>

      <Input
        value={program.name}
        onChangeText={handleOnTextChange}
        onSubmitEditing={handleOnNext}
        placeholder="push pull legs, upper lower, etc."
        style={{ marginBottom: 30 }}
      />
    </>
  );
};
