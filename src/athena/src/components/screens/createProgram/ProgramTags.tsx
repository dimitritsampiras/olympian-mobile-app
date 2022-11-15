import React, { useContext, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ChipsInput, Incubator, Text } from 'react-native-ui-lib';
import theme from '../../../theme';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';
import { CreateProgramContext } from './CreateProgram';

export const ProgramTags: React.FC = () => {
  const { program, setProgram, step, setStep } = useContext(CreateProgramContext);

  const [chips, setChips] = useState<{ label: string }[]>([]);

  const handleOnNext = () => {
    setProgram((prev) => ({ ...prev, tags: chips.map(({ label }) => label) }));
    setStep((prev) => prev + 1);
  };

  return (
    <>
      <Text style={styles.heading}>Add Tags to Program</Text>
      <View style={{ marginBottom: 24 }}>
        <Incubator.ChipsInput
          placeholder={'Enter tags..'}
          chips={chips}
          maxChips={6}
          onChange={(value) => setChips(value as { label: string }[])}
        />
      </View>
      <Button shadow={false} onPress={handleOnNext} style={{marginTop: 30}}>
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
    marginBottom: 40,
  },
});
