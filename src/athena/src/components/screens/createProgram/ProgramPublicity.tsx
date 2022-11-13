import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import theme from '../../../theme';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';
import { CreateProgramContext } from './CreateProgram';

interface ProgramPublicityProps {}

export const ProgramPublicity: React.FC<ProgramPublicityProps> = ({}) => {
  const { program, setProgram, step, setStep } = useContext(CreateProgramContext);

  const [programName, setProgramName] = useState('');

  const handleOnTextChange = (text: string) => {
    setProgramName(text);
  };

  const handleOnNext = () => {
    if (!programName) return;
    setProgram((prev: any) => ({ ...prev, name: programName }));
    setStep(step + 1 < 9 ? step + 1 : step);
  };

  return (
    <>
      <Text style={styles.heading}>Choose Program Publicity</Text>
      <Pressable
        style={(pressed) => ({
          height: 40,
          backgroundColor: theme.gray[100],
          borderWidth: 1,
          borderColor: theme.gray[200],
          
        })}
      >
        <Text>hello</Text>
      </Pressable>

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
    marginBottom: 20
  }
});
