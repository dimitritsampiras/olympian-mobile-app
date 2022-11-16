import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';
import { CreateProgramContext } from './CreateProgram';

interface ProgramNameProps {}

export const ProgramName: React.FC<ProgramNameProps> = () => {
  const { program, setProgram, step, setStep } = useContext(CreateProgramContext);

  const [programName, setProgramName] = useState(program.name || '');

  const handleOnTextChange = (text: string) => {
    setProgramName(text);
  };

  const handleOnNext = () => {
    if (!programName) return;
    setProgram((prev) => ({ ...prev, name: programName }));
    setStep(step + 1 < 9 ? step + 1 : step);
  };

  return (
    <>
      <Text style={styles.heading}>Enter Program Name</Text>
      <Input
        value={programName}
        onChangeText={handleOnTextChange}
        placeholder="push pull legs, upper lower, etc."
        style={{ marginBottom: 30 }}
      />

      <Button shadow={false} onPress={handleOnNext}>
        Next
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
});
